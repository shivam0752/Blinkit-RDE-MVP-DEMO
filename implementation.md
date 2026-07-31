Follow this implementation plan:
Phase 0 — Setup & style lock (do this first, before any screen)

* Stack: Vite + React + Tailwind CSS. No backend, no database — everything runs on hardcoded/mock JSON data (user profiles, category barrier-lines, product catalog). This is the leanest possible stack for a Vercel deploy and avoids burning credits on server setup you don't need.
* Upload your Blinkit reference page now, in this first prompt to Claude Code — ask it to extract the exact color hex codes, font, spacing, and card style once, and save them as Tailwind config / a design-tokens file. Do this once, upfront — if you re-describe "make it look like Blinkit" on every subsequent screen prompt, you'll pay for restyling the same thing 6 times instead of once.
* Ask Claude Code to scaffold the project + routing shell only — empty screens with navigation working, no real content yet. Confirm this runs locally before moving on.

Phase 1 — Screens 1 & 2 (Exposure + Engagement)

* Search results screen with the inserted zero-history item
* Product detail screen with the reassurance-line box
* Use the exact Stitch prompts I gave you as the content spec, but ask Claude Code to build them as real React components with mock data, not images.
* Token-saving tip: build both screens in one prompt/session since they share the same product data model — don't split them into two separate back-and-forth requests.

Phase 2 — Screens 3 & 4 (Checkout-completion Exposure + Conversion)

* Cart review screen with the "you might be missing" card
* Add-confirmation toast
* These two are small and share the cart state, so build together in one pass.

Phase 3 — Screens 5 & 6 (NSM realized + trust transparency)

* Order confirmation with the new-category badge
* The "why this" bottom sheet modal
* Wire the bottom sheet to be triggerable from Screen 2's reassurance box (reuse, don't rebuild).

Phase 4 — Mock RDE logic layer

* A small, static decision function: given a hardcoded "user history" (2-3 sample profiles), determine which zero-history category to surface and pull the matching reassurance line from a small JSON lookup table keyed by category → barrier theme → line text (this directly mirrors your real classified-data mechanism, just static instead of live).
* This is the piece that makes it feel like "the AI decided this" rather than a hardcoded demo — worth getting right, but keep it simple: an if/else or lookup table is enough, you don't need a real model call for a prototype.

Phase 5 — Polish & deploy

* Final pass: consistent spacing/colors across all screens (should be minimal work if Phase 0's design tokens were done right)
* Ask Claude Code to walk you through `vercel deploy` (or connect the GitHub repo to Vercel for auto-deploy) — this is usually a few commands, not a big lift
* Get the live URL, drop it into your slide 7/deck link section

General credit-saving rules across all phases

* One phase per session/prompt, don't ask for the whole app in one go — large single asks burn more tokens re-generating context and are more likely to need costly corrections.
* Reuse components explicitly — tell Claude Code "reuse the ProductCard component from Screen 1" rather than letting it regenerate similar UI from scratch each time.
* Test locally after each phase, not just at the end — catching a broken screen early is cheaper than debugging four screens' worth of accumulated issues at once.
* Don't ask for animations/polish until Phase 5 — visual refinement early gets thrown away or redone as functionality changes; lock function first, polish last.