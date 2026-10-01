-- =====================================================================
-- MCL-LRMS - 02-officer-login.sql
-- Locks the officer area: only LOGGED-IN officers (Supabase accounts)
-- can read grievances or change any record.
-- Citizens can still register, track and file a representation through
-- safe functions, and can still see plot status on the map.
-- Paste this WHOLE block into the Supabase SQL Editor and click "Run".
-- It does not delete any data.
-- =====================================================================

-- 1. Replace the open policies with officer-only policies
drop policy if exists "lrms select" on public.lrms_records;
drop policy if exists "lrms insert" on public.lrms_records;
drop policy if exists "lrms update" on public.lrms_records;
drop policy if exists "lrms officers select" on public.lrms_records;
drop policy if exists "lrms officers insert" on public.lrms_records;
drop policy if exists "lrms officers update" on public.lrms_records;
drop policy if exists "lrms public plot updates" on public.lrms_records;

create policy "lrms officers select" on public.lrms_records for select to authenticated using (true);
create policy "lrms officers insert" on public.lrms_records for insert to authenticated with check (true);
create policy "lrms officers update" on public.lrms_records for update to authenticated using (true) with check (true);
-- The public map shows plot status, so plot updates stay readable by everyone
create policy "lrms public plot updates" on public.lrms_records for select to anon
  using (record_type = 'Plot update');

grant select, insert, update on public.lrms_records to anon, authenticated;

-- 2. Citizens register grievances through this function (returns the reference number)
create or replace function public.register_grievance(p jsonb)
returns table (ref_no text, created_at timestamptz)
language plpgsql security definer set search_path = public as $$
begin
  if coalesce(trim(p->>'applicant_name'), '') = '' or coalesce(trim(p->>'location'), '') = ''
     or coalesce(trim(p->>'landowner_name'), '') = '' or coalesce(trim(p->>'category'), '') = ''
     or length(coalesce(trim(p->>'description'), '')) < 20 then
    raise exception 'Please fill in all required fields.';
  end if;
  if coalesce(p->>'mobile', '') !~ '^[6-9][0-9]{9}$' then
    raise exception 'Please give a valid 10-digit mobile number.';
  end if;
  if coalesce((p->>'consent')::boolean, false) is not true then
    raise exception 'The declaration must be accepted.';
  end if;
  return query
  insert into public.lrms_records as r (record_type, location, urgency, status, khata_no, plot_no, plot_id,
      updated_by, applicant_name, mobile, email, landowner_name, category, description, language,
      consent, attachments)
  values ('Grievance', left(p->>'location', 100),
      case when p->>'urgency' in ('Low', 'Medium', 'High') then p->>'urgency' else 'Medium' end,
      'Open', left(p->>'khata_no', 20), left(p->>'plot_no', 20), left(p->>'plot_id', 40), 'Citizen',
      left(p->>'applicant_name', 80), p->>'mobile', left(p->>'email', 80), left(p->>'landowner_name', 80),
      left(p->>'category', 60), left(p->>'description', 2000), left(p->>'language', 20), true,
      case when jsonb_typeof(p->'attachments') = 'array' then p->'attachments' else '[]'::jsonb end)
  returning r.ref_no, r.created_at;
end $$;

grant execute on function public.register_grievance(jsonb) to anon, authenticated;
