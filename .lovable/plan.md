# Marketing Landing Page + App Route Reorg

## Goal
Introduce a polished, desktop-first marketing site at `/` for the Sous AI cooking coach, and relocate the existing mobile app screens under `/app/*`. Shared design system, but the marketing page is spacious and editorial, while the app stays mobile-first.

## Route Reorganization

Move every existing app screen under an `/app` prefix. Use a pathless layout file so the URL stays clean and the mobile shell only applies to app routes.

```text
src/routes/
  __root.tsx                 (unchanged shell + fonts)
  index.tsx                  -> /          NEW marketing landing page (desktop-first)
  app.tsx                    -> /app       NEW layout route: <Outlet /> only
  app.index.tsx              -> /app       Home dashboard (current index.tsx content)
  app.onboarding.tsx         -> /app/onboarding
  app.setup.tsx              -> /app/setup
  app.recipe-plan.tsx        -> /app/recipe-plan
  app.live-cooking.tsx       -> /app/live-cooking
  app.feedback.tsx           -> /app/feedback
  app.savings.tsx            -> /app/savings
  app.profile.tsx            -> /app/profile
```

Update all `<Link to="/...">` inside app screens + `BottomNav` to point at the `/app/...` equivalents. Update `createFileRoute("/...")` strings to match new filenames. The marketing CTA links go to `/app/onboarding` (primary) and `/app` (secondary "See the app").

## Landing Page Sections (`src/routes/index.tsx`)

Desktop-first, max-w ~1200px, generous vertical rhythm. Reuses tokens from `src/styles.css` (canvas, earth-*, warm, leaf, Instrument Serif/Sans). Fully responsive: stacks to single column under `md`.

1. **Top nav bar** — wordmark "Sous" left; right-side links (How it works, Features, Trust); primary "Open the app" button → `/app/onboarding`. Sticky, translucent with blur.

2. **Hero** — Two-column.
   - Left: tiny eyebrow ("AI kitchen co-pilot · cooking, first"), big serif headline ("Cook with quiet confidence."), supporting line, primary CTA ("Start cooking") + secondary ("See how it works" anchor).
   - Right: tilted phone frame mock showing a Live Cooking screen (camera viewport + AI feedback bubble), plus a floating "Smart swap" savings card and a "Step 3 of 8" progress chip for layered depth.
   - Soft warm radial-gradient backdrop, subtle grain.

3. **Problem strip** — "Cooking shouldn't feel like a quiz." 4-up card row of relatable pains: "Empty fridge, blank mind" / "Wasted ingredients" / "Stuck mid-recipe" / "Grocery bill creep". Muted earth cards, small emoji or lucide icons.

4. **How it works** — 3 numbered steps in a horizontal row with connector line.
   - 01 Tell us what you have (chip selector mock + camera-scan badge)
   - 02 Cook with real-time guidance (mini camera frame + AI bubble)
   - 03 Reflect & save money (feedback + smart-swap card)
   Each step: thumbnail mock + one-line title + 1-2 sentence description.

5. **Feature deep-dives** — Alternating zigzag rows (text ↔ mock), 5 features:
   - Recipe from what you have
   - Live camera guidance
   - Thoughtful post-cook feedback
   - Affordable swaps & grocery help
   - Progress that compounds
   Each row: serif sub-headline, body copy, 2-3 bullets, and a stylized device/card mock built with existing tokens.

6. **Example journey** — Editorial timeline ("A Tuesday with Sous"). 5 short story beats with timestamps and small thumbnail cards (6:42pm opens app → snaps fridge → picks pasta → cooks with coach → sees $4 swap suggestion). Quiet, narrative feel.

7. **Trust & control** — Section with reassuring header ("Guidance, not judgment."). 3-up cards: "You're in control" (camera on/off, opt-in), "Explainable feedback" (every tip cites why), "Calm by design" (no streaks, no shaming). Sage `leaf-soft` accents.

8. **FAQ (compact)** — 4 collapsible items using existing shadcn `accordion`: privacy of camera footage, device requirements, cost, future skills beyond cooking.

9. **Final CTA** — Full-width warm gradient panel with serif headline ("Your kitchen, your coach."), waitlist email input (visual only — no backend), primary button "Start cooking", secondary "Join the waitlist".

10. **Footer** — Wordmark, short tagline, column links (Product / Company / Legal — placeholder), tiny copyright.

## Visual Mocks Strategy

All "phone" / "card" mocks are built with divs + existing tokens — no images required.
- Phone frame: `rounded-[40px] ring-1 ring-black/10 bg-earth-950 p-2` wrapping `rounded-[32px] bg-canvas` inner.
- Camera viewport card: dark earth panel + pulsing warm dot + AI bubble (white/90 backdrop-blur, serif quote).
- Recipe card / swap card / feedback card: reuse the visual language already used in `src/routes/app.*` screens.
- Tilt with `rotate-[-3deg]` / `rotate-[2deg]` and `shadow-2xl shadow-earth-950/10` for depth.

## New Components

- `src/components/marketing/site-nav.tsx` — sticky top bar.
- `src/components/marketing/site-footer.tsx`
- `src/components/marketing/phone-frame.tsx` — reusable device frame wrapping children.
- `src/components/marketing/mock-cards.tsx` — `AIBubble`, `SwapCard`, `FeedbackCard`, `RecipeCard` exports for reuse across sections.
- `src/components/marketing/section.tsx` — `<Section eyebrow title>` wrapper for consistent spacing/typography.

Keep marketing components out of `src/components/` root so they don't pollute the app shell.

## SEO / head

Landing `index.tsx` head: title "Sous — Your AI kitchen co-pilot", strong description, og:title/og:description, og:type website. Keep root metadata as fallback.

## Design Tokens

No new tokens needed — all sections use existing `canvas`, `earth-*`, `warm`, `warm-soft`, `leaf`, `leaf-soft`, Instrument Serif/Sans. Add one utility class for a subtle warm radial gradient via inline style on the hero (`background: radial-gradient(...)`).

## Implementation Steps

1. Rename app routes: create `app.tsx` (layout returning `<Outlet />`), move 8 existing screen files to `app.<name>.tsx`, update each `createFileRoute` string and internal `<Link to>` (BottomNav too).
2. Replace `src/routes/index.tsx` with the new marketing page.
3. Add marketing components under `src/components/marketing/`.
4. Verify all internal links resolve and bottom-nav highlights work under `/app/*`.

## Out of Scope

- Real waitlist backend (email input is visual only).
- Auth, analytics, payments.
- Real photography / illustration assets (all mocks are CSS).
- A `/blog` or `/pricing` route.
