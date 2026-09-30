# Demo script: the 19-step workflow (about 10 minutes)

All data is fictional **DEMO DATA**. Use a phone for steps 7-9 to show GPS and camera.

| Step | Where | What to click / say |
|---|---|---|
| 1 | `dashboard.html` | Pick **DEMO-LRO-01 - Land & Revenue Officer**, then **Sign in (demo)**. Say: "In production this is Officer ID → PIN → OTP." |
| 2 | Menu → **Find Plot & Field** | Village **Demopur (DEMO)** → Khata **145** → Plot **234**, then **Locate Plot**. |
| 3 | same | The plot record appears with the map zoomed in. Point out the **AI discrepancy check**: 0.82 vs 0.81 acre, and the name variation. |
| 4 | Tab **AI Document Analysis** | Click **Try the sample old map (DEMO)**. You can also upload any scanned image to show real OCR. |
| 5 | same | Show the extracted village, khata, plot, area and notification. Point out "124/356 vs 124". **Detect plot boundaries (AI)** shows the High/Medium/Low confidence. |
| 6 | same | **Georeference & show on GIS map**: purple dashed outlines appear on the satellite layer. Tick "I have reviewed" and save. |
| 7 | Sign out, then sign in as **DEMO-FVO-01** | Tab **Field Verification**. Choose Plot 234, then **Start Field Verification**. |
| 8 | same | **Capture my GPS location**, or use the simulated GPS indoors. Mark 4 boundary points; the polygon and its area appear. Take a photo: it is stamped with GPS, time, plot and officer. |
| 9 | same | Choose the result **Blue**, write remarks, then **Submit verification**. |
| 10 | same | The plot turns Blue on the map. The previous status stays in the plot history. |
| 11 | same | **Field verification / possession report**, then Save as PDF. |
| 12 | Menu → **Home** | **Register Grievance**: village Demopur (DEMO), khata 145, plot 234, a made-up name and mobile (e.g. 9000000001), and a description about demarcation. |
| 13 | same | The reference number appears, e.g. **MCL-KA-GRV-2026-000125**. |
| 14 | `dashboard.html` as **DEMO-GO-01** | The notification bell shows "New grievance received". Open it from the list. |
| 15 | Grievance window | **Schedule field verification**, then assign to DEMO-FVO-01. |
| 16 | Sign in as **DEMO-FVO-01** | Open the grievance, then **Do field verification**. Repeat steps 8-9 with the grievance linked. The grievance moves to *Under Examination*. |
| 17 | Sign in as **DEMO-GO-01** | **Record action taken**. |
| 18 | same | **Dispose grievance**: fill in the category, action and remarks, re-enter the Officer ID, and confirm "Are you sure?". Then print the **Grievance Disposal Report**. |
| 19 | Home → **Track Grievance** | Enter the reference number and mobile number. The status shows **Disposed**, with the progress steps and public remarks only. |

Tip: the **Audit trail** tab (sign in as DEMO-SA-01 or DEMO-RO-01) shows every
action with the officer, time, old status and new status.
