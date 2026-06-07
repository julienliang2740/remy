import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Mic, Pause, Volume2, X } from "lucide-react";

export const Route = createFileRoute("/app/live-cooking")({
  head: () => ({
    meta: [
      { title: "Cooking — Sous" },
      { name: "description", content: "Live cooking mode with gentle AI guidance." },
    ],
  }),
  component: LiveCookingPage,
});

function LiveCookingPage() {
  return (
    <div className="min-h-dvh bg-earth-950">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
        {/* Camera viewport */}
        <div className="relative flex-1 overflow-hidden">
          {/* Faux camera feed */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#5a4838_0%,#241a12_60%,#0a0604_100%)]" />
          <div className="absolute inset-0 opacity-60 mix-blend-overlay bg-[conic-gradient(at_40%_60%,#fdba74,#92400e,#1c1917,#fdba74)]" />
          <div className="absolute inset-0 grid place-items-center text-6xl opacity-30">🍳</div>

          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 pt-8">
            <Link
              to="/app/recipe-plan"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md"
            >
              <ChevronLeft className="size-4" />
            </Link>

            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-black/30 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-md">
                <p className="text-[11px] font-medium tracking-wide text-white">
                  Step 4 of 12 · Sauté the garlic
                </p>
              </div>
              {/* Progress dots */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < 4
                        ? "size-1.5 rounded-full bg-warm"
                        : i === 4
                          ? "h-1.5 w-4 rounded-full bg-white"
                          : "size-1.5 rounded-full bg-white/30"
                    }
                  />
                ))}
              </div>
            </div>

            <Link
              to="/app/feedback"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md"
            >
              <X className="size-4" />
            </Link>
          </div>

          {/* Side controls */}
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
            <button className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md">
              <Mic className="size-4" />
            </button>
            <button className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md">
              <Volume2 className="size-4" />
            </button>
            <button className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md">
              <Pause className="size-4" />
            </button>
          </div>

          {/* Bottom overlay stack */}
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-4 pb-6">
            {/* AI feedback bubble */}
            <div className="flex gap-3 rounded-[24px] bg-white/95 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-warm-soft">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-warm" />
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-earth-600">
                  Coach · live
                </p>
                <p className="text-pretty text-[15px] leading-snug text-earth-950">
                  Garlic is looking golden — ease the heat down a notch to keep it sweet.
                </p>
              </div>
            </div>

            {/* Primary guidance card */}
            <div className="space-y-3 rounded-[28px] bg-canvas p-5 ring-1 ring-black/5">
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-earth-600">
                  What's next
                </p>
                <h2 className="font-serif text-[1.4rem] leading-tight text-earth-950">
                  Add the reserved pasta water, slowly.
                </h2>
                <p className="text-[13px] leading-relaxed text-earth-600">
                  Look for a thin glossy emulsion — not a soup. A few tablespoons at a time.
                </p>
              </div>
              <div className="flex gap-2 pt-1">
                <button className="flex-1 rounded-2xl bg-earth-100 py-3 text-sm font-medium text-earth-950">
                  Back
                </button>
                <button className="flex-[2] rounded-2xl bg-earth-950 py-3 text-sm font-semibold text-canvas">
                  I'm done — next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
