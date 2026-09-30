-- =====================================================================
-- MCL-LRMS (DEMO) - 01-setup.sql
-- Paste this WHOLE block into the Supabase SQL Editor and click "Run".
-- It creates ONE table (lrms_records) that holds:
--   * citizen grievances              (record_type = 'Grievance')
--   * plot updates / field verifications (record_type = 'Plot update')
-- All data in this demo is MADE UP. Do not enter real personal data.
-- =====================================================================

-- 1. The table ---------------------------------------------------------
create table if not exists public.lrms_records (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  record_type     text not null check (record_type in ('Grievance', 'Plot update')),

  -- Common columns (every record)
  location        text not null,                    -- village name
  urgency         text not null default 'Medium' check (urgency in ('Low', 'Medium', 'High')),
  status          text not null default 'Open' check (status in ('Open', 'In progress', 'Resolved')),
  khata_no        text,
  plot_no         text,
  plot_id         text,                             -- id of the DEMO plot record
  updated_by      text,                             -- demo officer id / 'Citizen'

  -- Grievance columns
  ref_no          text unique,                      -- set by the database, e.g. MCL-KA-GRV-2026-000125
  stage           text check (stage in ('Submitted', 'Under Scrutiny', 'Field Verification Required',
                                        'Under Examination', 'Action Taken', 'Disposed')),
  applicant_name  text,
  mobile          text,
  email           text,
  landowner_name  text,
  category        text,
  description     text,
  language        text,
  consent         boolean default false,
  attachments     jsonb not null default '[]'::jsonb,  -- file names only (demo)
  assigned_to     text,
  public_remarks  text,                             -- shown to the citizen
  internal_notes  jsonb not null default '[]'::jsonb,  -- NOT shown on the tracking page
  disposal        jsonb,

  -- Plot-update columns
  plot_status     text check (plot_status in ('Green', 'Yellow', 'Orange', 'Red', 'Blue')),
  details         jsonb not null default '{}'::jsonb,  -- GPS, boundary points, photos, AI fields

  -- Audit trail (append-only, enforced below)
  history         jsonb not null default '[]'::jsonb
);

create index if not exists lrms_records_type_idx on public.lrms_records (record_type, created_at desc);
create index if not exists lrms_records_plot_idx on public.lrms_records (plot_id);

-- 2. Reference number counter ------------------------------------------
create sequence if not exists public.lrms_grievance_seq start 125;

-- 3. Rules applied by the database on every INSERT ---------------------
create or replace function public.lrms_before_insert()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.created_at := now();
  new.updated_at := now();
  if new.record_type = 'Grievance' then
    -- The reference number is always made here, never by the web page.
    new.ref_no := 'MCL-KA-GRV-' || to_char(now(), 'YYYY') || '-'
                  || lpad(nextval('public.lrms_grievance_seq')::text, 6, '0');
    new.stage := 'Submitted';
    new.status := 'Open';
    new.internal_notes := '[]'::jsonb;
    new.disposal := null;
    new.history := jsonb_build_array(jsonb_build_object(
      'at', now(), 'by', 'Citizen', 'action', 'Grievance registered',
      'old_status', null, 'new_status', 'Submitted'));
  else
    new.ref_no := null;
    if jsonb_typeof(new.history) <> 'array' or jsonb_array_length(new.history) = 0 then
      new.history := jsonb_build_array(jsonb_build_object(
        'at', now(), 'by', coalesce(new.updated_by, 'Unknown'), 'action', 'Plot update recorded',
        'old_status', null, 'new_status', new.plot_status));
    end if;
  end if;
  return new;
end $$;

drop trigger if exists lrms_before_insert on public.lrms_records;
create trigger lrms_before_insert before insert on public.lrms_records
  for each row execute function public.lrms_before_insert();

-- 4. Rules applied by the database on every UPDATE ---------------------
--    * id, created_at, record_type and ref_no can never change
--    * the audit trail (history) can only grow; old entries cannot be edited
create or replace function public.lrms_before_update()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  old_len int := jsonb_array_length(old.history);
  prefix  jsonb;
begin
  new.id := old.id;
  new.created_at := old.created_at;
  new.record_type := old.record_type;
  new.ref_no := old.ref_no;
  new.updated_at := now();

  if jsonb_typeof(new.history) <> 'array' or jsonb_array_length(new.history) < old_len then
    raise exception 'Audit trail is append-only: entries cannot be removed.';
  end if;
  select coalesce(jsonb_agg(e order by i), '[]'::jsonb) into prefix
    from jsonb_array_elements(new.history) with ordinality as t(e, i)
   where i <= old_len;
  if prefix <> old.history then
    raise exception 'Audit trail is append-only: existing entries cannot be edited.';
  end if;

  -- Keep the simple status in step with the grievance stage
  if new.record_type = 'Grievance' then
    new.status := case
      when new.stage = 'Submitted' then 'Open'
      when new.stage = 'Disposed'  then 'Resolved'
      else 'In progress' end;
  end if;
  return new;
end $$;

drop trigger if exists lrms_before_update on public.lrms_records;
create trigger lrms_before_update before update on public.lrms_records
  for each row execute function public.lrms_before_update();

-- 5. Safe public tracking: returns ONLY public fields ------------------
create or replace function public.track_grievance(p_ref text, p_mobile text)
returns table (ref_no text, created_at timestamptz, category text, stage text,
               assigned_to text, last_action text, public_remarks text,
               updated_at timestamptz, location text)
language sql security definer set search_path = public as $$
  select r.ref_no, r.created_at, r.category, r.stage,
         case when r.assigned_to is null then null else 'Land & Revenue Department, Kaniha Area' end,
         (select h->>'action' from jsonb_array_elements(r.history) with ordinality t(h, i)
           where coalesce((h->>'public')::boolean, true) order by i desc limit 1),
         r.public_remarks, r.updated_at, r.location
    from public.lrms_records r
   where r.record_type = 'Grievance'
     and upper(trim(r.ref_no)) = upper(trim(p_ref))
     and regexp_replace(r.mobile, '\D', '', 'g') = regexp_replace(p_mobile, '\D', '', 'g')
   limit 1;
$$;

-- 6. Citizen representation / reopen request after disposal -------------
create or replace function public.submit_representation(p_ref text, p_mobile text, p_text text)
returns text language plpgsql security definer set search_path = public as $$
declare
  rec public.lrms_records;
begin
  select * into rec from public.lrms_records
   where record_type = 'Grievance'
     and upper(trim(ref_no)) = upper(trim(p_ref))
     and regexp_replace(mobile, '\D', '', 'g') = regexp_replace(p_mobile, '\D', '', 'g')
   limit 1;
  if rec.id is null then
    raise exception 'No grievance found for this reference number and mobile number.';
  end if;
  if rec.stage <> 'Disposed' then
    raise exception 'A representation can be filed only after the grievance is disposed.';
  end if;
  if length(coalesce(trim(p_text), '')) < 10 then
    raise exception 'Please write at least 10 characters.';
  end if;
  update public.lrms_records
     set stage = 'Under Scrutiny',
         updated_by = 'Citizen',
         public_remarks = 'Representation received. The grievance has been reopened for scrutiny.',
         history = history || jsonb_build_array(jsonb_build_object(
           'at', now(), 'by', 'Citizen', 'action', 'Representation filed - grievance reopened',
           'old_status', 'Disposed', 'new_status', 'Under Scrutiny',
           'note', left(p_text, 1000)))
   where id = rec.id;
  return rec.ref_no;
end $$;

-- 7. Row Level Security and permissions (team rule: select, insert, update; no delete)
alter table public.lrms_records enable row level security;

drop policy if exists "lrms select" on public.lrms_records;
drop policy if exists "lrms insert" on public.lrms_records;
drop policy if exists "lrms update" on public.lrms_records;
create policy "lrms select" on public.lrms_records for select to anon, authenticated using (true);
create policy "lrms insert" on public.lrms_records for insert to anon, authenticated with check (true);
create policy "lrms update" on public.lrms_records for update to anon, authenticated using (true) with check (true);

grant select, insert, update on public.lrms_records to anon, authenticated;
grant execute on function public.track_grievance(text, text) to anon, authenticated;
grant execute on function public.submit_representation(text, text, text) to anon, authenticated;
