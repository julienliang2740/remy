import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Sparkles, Timer } from "lucide-react";

export const Route = createFileRoute("/app/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — Sous" },
      { name: "description", content: "Meet your friendly AI kitchen coach." },
    ],
  }),
  component: OnboardingPage,
});

const steps = [
  {
    icon: Sparkles,
    title: "A coach for everyday skills.",
    body: "Sous helps you learn things hands-on — starting with cooking. Friendly guidance, never judgmental.",
  },
  {
    icon: Camera,
    title: "Watches with you, gently.",
    body: "Point your camera at the pan. Sous offers small nudges in the moment, then a calm recap afterwards.",
  },
  {
    icon: Timer,
    title: "Practical. Affordable. Yours.",
    body: "Get cheaper ingredient swaps, sale-aware ideas, and small wins that build real kitchen confidence.",
  },
];

function OnboardingPage() {
  return (
    <div className="min-h-dvh bg-canvas font-sans text-earth-950">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-10 pt-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-warm">
          Sous
        </p>
        <h1 className="mt-3 font-serif text-[2.75rem] leading-[1.02] text-balance">
          A calm coach
          <br />
          for the kitchen.
        </h1>
        <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-earth-600">
          Real-time nudges while you cook, plus a warm recap when the plate is down.
        </p>

        <ul className="mt-10 space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="flex gap-4 rounded-[24px] bg-white p-5 ring-1 ring-black/5"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-warm-soft text-warm">
                  <Icon className="size-5" strokeWidth={2} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-[13px] leading-relaxed text-earth-600">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-10">
          <Link
            to="/app"
            className="flex items-center justify-center gap-2 rounded-[20px] bg-earth-950 py-4 text-sm font-semibold text-canvas active:scale-[0.98]"
          >
            Let's cook <ArrowRight className="size-4" />
          </Link>
          <p className="mt-3 text-center text-[11px] text-earth-600">
            Suggestions are guidance, not gospel. You're the chef.
          </p>
        </div>
      </div>
    </div>
  );
}
