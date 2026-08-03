# Scout MVP — Full Verification & Audit Plan

Your MVP is already built. This is not a build plan — it's a phase-by-phase audit to check the live implementation against every decision we've locked in across this project. For each phase: what correct behavior looks like, how to test it, and the exact fix-prompt to give Claude Code if it's wrong.

Run this top to bottom, in order. Don't skip a phase just because it "probably" works — the retiming bug (Scout re-suggesting immediately after a purchase) proves things drift silently between what was specced and what's actually running.

---

## Phase A — Trigger Timing (highest priority, most recently found broken)

**Correct behavior:**
- On Search Results: Scout's suggestion does NOT appear on page load / in the raw results list.
- It only appears AFTER the user taps "Add" on their searched item — surfaced as part of the confirmation state (toast or inline card), still on the search screen.
- On Product Detail: same rule — Scout's box appears only after "Add to Cart" is tapped, not on page load.
- Cart Review's suggestion (checkout-completion trigger) is unaffected by this rule — it's a separate, correct trigger point.

**How to test:** Open Search Results fresh (no prior action) — Scout's card should be absent. Tap "Add" on any searched item — Scout's suggestion should now appear.

**If broken, fix with:**
```
Verify and fix: Scout's suggestion must NOT render on Search Results or Product Detail page load. It should only render after the user taps "Add to Cart" on the item they searched for — as part of the post-add confirmation state, still on the same screen. Show me the exact condition/state check that currently controls when Scout's card renders, and confirm it's gated on an "item added" event, not a page-mount event.
```

---

## Phase B — Monthly Cadence Cap (the second bug just found)

**Correct behavior:**
- Once a user completes ONE new-category purchase in a session, Scout does NOT immediately suggest another new category.
- Further searches during the same mocked "month" show the "Running Low On This?" restock nudge instead (see Phase E) — not a fresh zero-history suggestion.
- This should be enforced by a simple mocked "current month" flag, not real date math.

**How to test:** As any persona, complete one new-category purchase. Immediately search a different occasion term (e.g., bought via "bread," now search "dog food"). Confirm no fresh new-category suggestion appears — only the restock nudge, if anything.

**If broken, fix with:**
```
Add a hard cap: once a user completes one new-category purchase, suppress ALL further zero-history-category suggestions for the rest of the current mocked month — regardless of what they search next. Any further searches during this period should show the "Running Low On This?" restock nudge instead. Use a simple mocked "current_month" flag in state for this, not real date logic. After implementing, show me the exact code enforcing this cap, and confirm whether the cap resets on page reload or persists for the demo session.
```

---

## Phase C — Suggestion Logic Correctness (occasion matching, zero-history filter, fallback)

**Correct behavior — check each of the 4 curated searches against the ground-truth table (Section 7b of the spec):**

| Search | Persona A sees | Persona B sees | Persona C sees |
|---|---|---|---|
| bread | Epigamia, Spread, Granola (3) | Same 3 | All 4-5 (richest) |
| dog food | All 4 Pet Supplies items | All 4 | All 4 |
| diapers | All 4 items | 3 items (Monitor filtered) | Only 1 item (Monitor) |
| swiss knife | 3 items (Household filtered) | 4 Household camping items | All 4 original items |

**How to test:** For each persona × search combination above, confirm the actual number and identity of items shown matches this table exactly.

**Fallback check:** manually force a scenario where both the main pool and category-fallback are exhausted for a persona — confirm the system shows the "Running Low On This?" nudge, NOT an unrelated category (this was the original bug — a baby product surfacing for a camping search).

**If broken, fix with:**
```
Audit the suggestion filtering logic against this reference table: [paste table above]. For any persona/search combination that doesn't match, identify whether the bug is in the occasion pool definition (Section 2), the zero-history filter, or the fallback logic (Section 2a), and fix at that specific layer — do not patch by hardcoding results for specific personas.
```

---

## Phase D — Trust Panel Content (default-visible, correct reasons only)

**Correct behavior:**
- "Scout Trusted" badge is visible by default on the suggestion card — no tap required.
- Product Detail's reasoning box is visible by default — the "Why am I seeing this?" tap-gate should be GONE, not collapsed.
- Content is limited to exactly two reasons: (1) cohort pattern line, (2) category trust stat (e.g., "Zero complaints on this category in the past 3 months").
- NO price-related content anywhere in this panel (no "priced to match," no discount mention).
- NO product-review-based reasoning (no star ratings, no "X buyers rated this").
- Opt-out option is present but visually de-emphasized, not competing with the badge.

**How to test:** Land on Product Detail after triggering a suggestion — confirm the trust reasoning is immediately visible, not behind a tap. Read the exact text — confirm it's cohort + trust-stat only.

**If broken, fix with:**
```
Verify the "Why you're seeing this" panel: (1) it must be default-visible on Product Detail, no tap-to-expand gate remaining, (2) content must be exactly two reasons — a cohort pattern line and a category trust stat — with zero price-related or review-rating-based content. Show me the current rendered text for one example (Epigamia Greek Yogurt) so I can confirm it matches this spec exactly.
```

---

## Phase E — "Running Low On This?" Fallback Card

**Correct behavior:**
- Visually and functionally distinct from a Scout suggestion — different label ("Running low on this?" not "Scout Trusted"), no reassurance/trust line attached.
- Surfaces a habitual category the user already buys from (least-recently-reordered), not a zero-history category.
- Interactions with this card must NOT count toward Exposure/Engagement/Conversion or the NSM — tracked separately or not at all.

**How to test:** Trigger the true dead-end case (Phase C's fallback check, or the Phase B monthly cap). Confirm the card that appears looks visually different from a normal Scout suggestion, and check the metrics panel (Phase F) to confirm it isn't incrementing Scout's funnel counters.

**If broken, fix with:**
```
Confirm the "Running Low On This?" card is visually distinct (different label, no trust-reason box) from Scout's normal suggestion cards, and confirm its shown/clicked/purchased events are NOT feeding into the same counters as Exposure/Engagement/Conversion. Show me where these two event streams are tracked separately in the code.
```

---

## Phase F — Persona Selector & Live Insight Panel

**Correct behavior:**
- Sidebar shows 3 personas (Habitual Stocker, Price-Blocked Explorer / Cautious Explorer, Growing Family Shopper) with visible habitual categories per persona.
- Selecting a persona changes `active_user` and immediately changes what Scout would suggest for the same search.
- Right-side panel shows: active persona snapshot, detected occasion, full candidate pool with shown/filtered tags, and simple live counters (Suggestions shown, Clicked, Added to cart).

**How to test:** Switch personas, run the same search ("bread") for each, confirm the suggestion set changes to match the Phase C table exactly.

**If broken, fix with:**
```
Confirm persona switching actually changes active_user.purchase_history and that all suggestion logic re-reads from the currently active persona, not a cached/default one. Test by switching from Persona A to Persona C and re-running the same search — the result set should change per the reference table.
```

---

## Phase G — Content Density

**Correct behavior:**
- Every search results screen shows 5-6 real organic product cards for the literal search term, plus 2-3 Scout suggestions in the "Complete your basket" row.
- Screen should feel populated on load, not sparse.

**How to test:** Count visible items on each of the 4 demo search screens.

**If broken, fix with:**
```
Confirm each search results screen renders 5-6 organic product results for the literal search term, independent of Scout's suggestions. If any screen shows fewer, add mock product data for that search term until it meets this minimum.
```

---

## Phase H — Naming & Branding

**Correct behavior:** Zero instances of "RDE" or "Reasoned Discovery Engine" anywhere user-facing — all replaced with "Scout."

**How to test:** Search the rendered UI (view-source or visual scan) for "RDE."

**If broken, fix with:**
```
Search the entire user-facing codebase for any remaining instance of "RDE" or "Reasoned Discovery Engine" and replace with "Scout." Confirm zero matches remain in component text, toasts, labels, or the persona/insight panels.
```

---

## Phase I — Deploy & Link Check

**Correct behavior:** Live Vercel link reflects all fixes above — not a stale build.

**How to test:** After every fix above, redeploy (or confirm auto-deploy triggered), then test the LIVE link fresh — not localhost — in an incognito window to rule out cached state.

**Reminder for testing generally:** if a prompt "doesn't seem to work," check three things before re-prompting: (1) did you redeploy after the change, (2) are you testing the live link or localhost, (3) is the behavior session-based (resets on reload) — a fresh reload can look like "nothing changed" when it actually reset expected state.

---

## Order to run this in, given limited time

Phase A and B are the two confirmed live bugs — do these first. Phase C and D are the most likely to have silent drift given how many times the spec changed. Phase E-H are lower-risk verification passes, faster to confirm than to fix if everything else was built correctly the first time.
