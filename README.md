# Discipline OS v7

Offline-first PWA, vanilla JS, no build step, all data stays on your device (localStorage).
Tabs: **Today · Progress · Journal · Namaz (Tarika + Dua) · Gym · Diet · Finance · Edit**.

## Deploy (GitHub Pages)
1. Put **all files in the repo root** (no subfolders):
   `index.html, app.js, namaz.js, duas.js, gym.js, diet.js, finance.js, styles.css, service-worker.js, manifest.json, icon-192.png, icon-512.png, icon.svg, README.md`
2. Commit and push. In the repo: Settings → Pages → Deploy from branch → `main` / root.
3. Open `https://<user>.github.io/<repo>/` on your phone → Chrome menu → **Install app / Add to Home screen**.
4. Open once online (this caches Chart.js and adhan). After that everything works offline except the "Auto-calculate prayer times" button.

> Every file listed in `service-worker.js` (`FILES`) must exist in the repo root. If one is missing, the service worker cannot install and offline mode will not work.

## Updating without losing data
Your data lives in the browser's localStorage, not in the files. Replacing files in GitHub never touches it.
1. **Journal → Export Backup** first (safe habit).
2. Overwrite the files in the repo and push.
3. Open the app. The "Naya version aa gaya" bar appears → tap **Reload**.
Migrations are additive: existing days, habits, schedules, syllabus, memorization and PIN stay as they are. The only automatic change to your habits is that **"Finance learning (30 min)"** is added once (weight 2, Mind, non-core). If you delete it later it will not come back.

## v7 changelog
**Fixes**
- **Isha is now 17 rakat** (Sunnat 4 ghair-muakkadah, Farz 4, Sunnat 2, Nafl 2, Witr 3, Nafl 2). The new chip is `isha_5`; `isha_0…isha_4` are unchanged so old ticks stay valid. Jumu'ah (14) and other prayers are unchanged. A "Rakat ek nazar me" card and note were added to the Namaz tab.
- **Progress charts no longer grow/shrink.** Each chart sits in a fixed-height box (220px, radar 280px) with `maintainAspectRatio:false`; the CSS `zoom` on `<html>` is gone (zoom now scales the root font-size and the UI is rem-based); charts are rebuilt only when Progress opens, the range/theme/zoom/data changes, and every chart is destroyed before recreation (no leaks). Colors come from CSS variables.

**New**
- **Dua** section in Namaz: 35 duas with Arabic (full tashkeel), transliteration, Hinglish meaning, when to read, source; search, category chips, Copy, "Mark as memorized" (stored in `dos_mem` as `dua:<id>`), Tasbih-e-Fatima tap counter with rings and haptics, Quiet-time box, editable *My duas*.
- **Gym** tab: PPL (+ optional beginner 3-day full-body) plan, set-by-set kg/reps logging without re-rendering while you type, "Last time", progressive-overload hint, PR detection (weight, Epley 1RM, volume), rest timer (survives tab switches), session timer/volume/note, Finish → ticks the Gym schedule item (`s10`) and stamps the Journal workout text, per-exercise history chart + weekly muscle volume, plan editor (add/remove/reorder/rename/swap/reset), rest-day card, body stats (shares `numbers.weight/waist` with Journal), editable goals, form & safety.
- **Diet** tab: Veg / Eggetarian / Non-veg, 7-day plan each (21 days), every meal has Option A/B with quantities, kcal, protein and a tip; totals are computed from a food table. Tap-to-eat tracker, kcal/protein rings, water counter, custom foods, diet score, grocery list, rules, Sunday flex meal. Auto-ticks existing **Water** and **Protein** habits.
- **Finance** tab: 15 levels + optional Halal track (152 topics, hours exactly as specified), statuses, notes, YouTube / Google / Ask-AI buttons, self-checks, mini tasks, level map, streak, calculators (SIP/lumpsum, EMI, Rule of 72, inflation, emergency fund, zakat), Progress-tab trend. Marking a topic Done auto-ticks the Finance habit.
- **Navigation**: scrollable pill nav with the active tab always in view; swipe left/right between tabs (with edge, input, chart, scroller, selection and modal guards), arrow keys on desktop, per-tab scroll memory, 220 ms slide (none with reduced motion).
- **UI**: design tokens (dark default, light theme, respects OS theme on first launch only), animated day ring, XP/Level, discipline-streak flame with 3/7/14/30/60/100 milestones, weekly score card, badges, confetti/glow above 90%, "Now" hero card, quick actions (Urge, Water +250, Start workout, Log weight), toasts, haptics.
- **Backup v3** (adds gym, diet, finance, duas, badges, UI prefs). Import accepts v1/v2/v3, validates first and applies atomically (rolls back on error). Storage-full errors show a warning.
- manifest shortcuts: Today, Gym.

## Notes you should know
- **Waist unit:** the Journal label is now "Waist (inch)". If you previously typed waist in cm, edit those entries or the trend line will mix units.
- **Diet numbers** are home-cooking estimates. Non-veg plans total ≈1,908-1,974 kcal and 142-153 g protein; egg ≈1,929-2,011 kcal / 138-148 g; veg ≈1,940-2,004 kcal / 132-151 g (whey is optional and helps veg days). Mixing Option A and B moves totals a little. Protein/Water habits auto-tick at 90% of the protein target and at the water target.
- Dua text and pronunciation: please verify with a qualified teacher/scholar. Sources are named by collection, without hadith numbers.
- Finance content is educational only, not financial advice. Zakat calculator: confirm with a scholar; enter today's silver price per gram.

## Troubleshooting
- **Old version still showing:** the app is network-first, so one online open fetches new files. If it still looks old: Chrome → Settings → Site settings → your site → Clear & reset (this clears data too, so export a backup first), or on desktop DevTools → Application → Service Workers → Unregister, then hard reload.
- **"Naya version" bar does not appear:** check `VERSION` in `service-worker.js` and that all files in `FILES` exist.
- **Charts say "Chart.js chahiye":** open the app once online so the CDN scripts get cached.
- **Storage full warning:** Export Backup, then clear old data you do not need.
- **Notifications:** only work while the app is open; use the `.ics` export for real alarms.

## 5-minute test checklist (phone)
1. Namaz → Isha shows **17** in the Rakat card; Today → Isha habit has 6 chips.
2. Progress: switch Daily/Weekly/Monthly/Yearly several times, rotate, change zoom (Today A+/A−), toggle theme: charts keep their size.
3. Swipe left/right on Today: tabs change; swipe on the day chips or inside an input: nothing happens.
4. Gym: pick today, type kg/reps (keyboard stays up), tick a set (rest pill appears, switch tabs, it keeps running), Finish → Today's Gym item is ticked.
5. Diet: switch Veg/Eggetarian/Non-veg, tap meals (kcal ring moves), +250 ml water, open Grocery list and tick an item.
6. Finance: open L0, mark a topic Done (Finance habit ticks), tap Ask AI (prompt copied), try the SIP calculator.
7. Namaz → Dua: search "rizq", tap Copy, mark memorized, do 33 taps on Tasbih.
8. Journal → Export Backup, then in another browser Import it: everything returns. Airplane mode + reload: app still opens.
