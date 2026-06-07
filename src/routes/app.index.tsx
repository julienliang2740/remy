import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, Timer } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";


export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Home — Sous" },
      { name: "description", content: "Your kitchen, your coach. Start a cooking session or pick up where you left off." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <MobileShell>
      <header className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-earth-600">
          Good afternoon, Alex
        </p>
        <h1 className="text-balance font-serif text-[2.5rem] leading-[1.05]">
          The kitchen
          <br />
          is yours.
        </h1>
      </header>

      {/* Weekly progress */}
      <section className="mt-7 rounded-[24px] bg-earth-100/70 p-5 ring-1 ring-black/5">
        <div className="flex items-end justify-between">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-leaf-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-leaf">
              <Sparkles className="size-3" /> This week
            </span>
            <p className="text-2xl font-medium tracking-tight">4 of 10 skills</p>
          </div>
          <p className="text-right text-xs text-earth-600">
            Last:
            <br />
            <span className="font-medium text-earth-950">Knife skills</span>
          </p>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-earth-200">
          <div className="h-full w-[40%] rounded-full bg-leaf" />
        </div>
      </section>

      {/* Continue session */}
      <section className="mt-7 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-earth-600">
          Jump back in
        </h2>
        <Link
          to="/app/live-cooking"
          className="group flex items-center gap-3 rounded-[20px] bg-white p-3 ring-1 ring-black/5 transition-all active:scale-[0.99]"
        >
          <div className="grid size-16 shrink-0 place-items-center rounded-[14px] bg-warm-soft text-2xl">
            🍅
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Slow-simmered marinara</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-earth-600">
              <Timer className="size-3" /> Step 3 of 8 · 12 min left
            </p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-warm text-white ring-4 ring-warm/10">
            <ArrowRight className="size-4" />
          </span>
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/app/recipe-plan"
            className="rounded-[20px] bg-white p-4 ring-1 ring-black/5"
          >
            <div className="mb-3 grid size-10 place-items-center rounded-xl bg-earth-100 text-lg">
              🍳
            </div>
            <p className="text-sm font-medium leading-tight">Saved: Crispy fried eggs</p>
            <p className="mt-1 text-[11px] text-earth-600">Beginner · 8 min</p>
          </Link>
          <Link
            to="/app/savings"
            className="rounded-[20px] bg-leaf-soft p-4 ring-1 ring-leaf/15"
          >
            <div className="mb-3 grid size-10 place-items-center rounded-xl bg-white/70 text-lg">
              🥬
            </div>
            <p className="text-sm font-medium leading-tight">Saved $14 on swaps</p>
            <p className="mt-1 text-[11px] text-leaf">3 new this week</p>
          </Link>
        </div>
      </section>

      {/* Primary CTA */}
      <div className="mt-auto pt-8">
        <Link
          to="/app/setup"
          className="block w-full rounded-[20px] bg-earth-950 py-4 text-center text-sm font-semibold text-canvas ring-1 ring-earth-950 transition-transform active:scale-[0.98]"
        >
          <span className="inline-flex items-center gap-2">
            <Flame className="size-4" /> Start a new session
          </span>
        </Link>
        <p className="mt-3 text-center text-[11px] text-earth-600">
          We'll suggest a recipe based on what you have.
        </p>
      </div>
    </MobileShell>
  );
}

