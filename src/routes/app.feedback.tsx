import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles, TrendingUp } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";

export const Route = createFileRoute("/app/feedback")({
  head: () => ({
    meta: [
      { title: "Nicely done — Sous" },
      { name: "description", content: "A calm recap of your cooking session." },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  return (
    <MobileShell>
      <header className="pt-2 text-center">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-leaf-soft text-leaf ring-1 ring-leaf/15">
          <Check className="size-6" strokeWidth={2.5} />
        </div>
        <h1 className="font-serif text-[2.25rem] leading-tight">Beautifully done.</h1>
        <p className="mx-auto mt-2 max-w-[34ch] text-sm leading-relaxed text-earth-600">
          That sauce had a real gloss to it. Your prep was faster, too — about 2 minutes quicker than last week.
        </p>
      </header>

      {/* Score row */}
      <div className="mt-6 grid grid-cols-3 gap-2 rounded-[20px] bg-white p-4 ring-1 ring-black/5">
        <Stat label="Steps" value="12/12" />
        <div className="border-x border-earth-200">
          <Stat label="Focus" value="8m 40s" />
        </div>
        <Stat label="Skill +" value="Sauté" />
      </div>

      {/* Win / Focus */}
      <section className="mt-6 grid grid-cols-2 gap-3">
        <div className="space-y-2 rounded-[24px] bg-leaf-soft p-4 ring-1 ring-leaf/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-leaf">Win</p>
          <p className="text-sm font-medium leading-snug">
            Heat management was steady through the sear.
          </p>
        </div>
        <div className="space-y-2 rounded-[24px] bg-warm-soft p-4 ring-1 ring-warm/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-warm">To try</p>
          <p className="text-sm font-medium leading-snug">
            Slice garlic a touch thinner next time for even color.
          </p>
        </div>
      </section>

      {/* Skipped */}
      <section className="mt-5 rounded-[24px] bg-white p-5 ring-1 ring-black/5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
          Things we noticed
        </p>
        <ul className="space-y-3 text-sm">
          <NoticeRow label="Skipped: salt the pasta water" tone="warm" />
          <NoticeRow label="Uncertain: was the pan hot enough?" tone="earth" />
          <NoticeRow label="Nice touch: finished with olive oil" tone="leaf" />
        </ul>
      </section>

      {/* Next actions */}
      <section className="mt-5 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
          Tiny next steps
        </p>
        <NextAction
          icon={Sparkles}
          title="5-min knife skills drill"
          meta="Tomorrow · builds on today"
          to="/app/setup"
        />
        <NextAction
          icon={TrendingUp}
          title="Track sauté in your skill tree"
          meta="2 sessions to unlock 'Confident sauté'"
          to="/app/profile"
        />
      </section>

      <div className="mt-auto pt-8">
        <Link
          to="/app"
          className="block w-full rounded-[20px] bg-earth-950 py-4 text-center text-sm font-semibold text-canvas active:scale-[0.98]"
        >
          Back to home
        </Link>
      </div>
    </MobileShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-earth-600">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function NoticeRow({ label, tone }: { label: string; tone: "warm" | "leaf" | "earth" }) {
  const dot = {
    warm: "bg-warm",
    leaf: "bg-leaf",
    earth: "bg-earth-400",
  }[tone];
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${dot}`} />
      <span className="text-earth-800">{label}</span>
    </li>
  );
}

function NextAction({
  icon: Icon,
  title,
  meta,
  to,
}: {
  icon: typeof Sparkles;
  title: string;
  meta: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-[20px] bg-white p-4 ring-1 ring-black/5"
    >
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-earth-100">
        <Icon className="size-4 text-earth-800" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-[11px] text-earth-600">{meta}</p>
      </div>
      <ArrowRight className="size-4 text-earth-600" />
    </Link>
  );
}
