# Sandbox product-spec implementation — 2026-11-17

Scope: `/test/` only. Latest product brief and README re-read; production remains unchanged.

Implemented: existing real map, three sourced approximate-area story labels, compact text above wide full-color map, bilingual hash detail pages and route navigation. Archive now shows at most three matches, with full matching count and deterministic ID order when ratings are absent. Pure ranking function supports trusted aggregates using unrounded average, count and ID; it is tested but not fed fabricated votes. All public map stories remain accessible regardless of list filter.

Added conditional local photo/caption/credit display, related-story links from actual IDs, bilingual local pre-made share-image slots, explicit missing-photo/share-image states, basic-information and unverified access/transport/review statements. No generated photos, invented historical facts or false formal-review dates were added.

Submission uses test-only `site-config.js` `contributionFormUrl`; null gives “form in preparation,” hides the old TXT primary action and collects nothing. A supplied HTTPS published form can be linked, but no Google Form or file-upload account has been created. Detail supplementation follows the same entry; prefill awaits actual field IDs.

Ratings and reviews clearly remain unavailable. No browser-local votes, mock successful submissions, fake counts or local admin authentication. `#admin` explains that protected server-side administration is not connected. No analytics are collected. Rank function alone does not constitute a functioning rating service.

Still required for full brief acceptance: publication-cleared photos, formal content-review dates, verified transit/access facts, actual published Simplified Chinese form and both submission-path tests, server-side anonymous ratings/idempotency/rate limits/moderation, authenticated admin and event statistics, pre-made bilingual licensed-photo/QR sharing images and real download tests. Add architecture/related narrative only when sourced content exists.

Verification: JS syntax, ranking tests and local import/static checks pass. Official CUA still reports Mac locked; no browser bypass attempted. Mobile/desktop/iOS/Android interaction and visual acceptance remain unverified. HTTP readback and Pages status are checked separately and are not visual acceptance.
