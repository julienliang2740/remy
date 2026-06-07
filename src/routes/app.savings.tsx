import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Sparkles, TrendingDown } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";

export const Route = createFileRoute("/app/savings")({
  head: () => ({
    meta: [
      { title: "Savings — Sous" },
      { name: "description", content: "Smart swaps and sale-aware grocery ideas." },
    ],
  }),
  component: SavingsPage,
});

const swaps = [
  {
    from: "Pine nuts",
    to: "Toasted sunflower seeds",
    note: "Same nutty crunch in pesto.",
    save: "$4.80",
  },
  {
    from: "Heavy cream",
    to: "Whole milk + butter",
    note: "Works for most weeknight sauces.",
    save: "$2.10",
  },
  {
    from: "Fresh basil",
    to: "Frozen basil cubes",
    note: "Keeps for months, same flavor.",
    save: "$1.40",
  },
];

const tips = [
  {
    title: "Salt the pasta water, save the rest",
    body: "Reserved starchy water replaces extra cream or butter in most sauces.",
  },
  {
    title: "Day-old bread → breadcrumbs",
    body: "Toast, blitz, freeze. Boxed crumbs cost 5× more per cup.",
  },
];

function SavingsPage() {
  return (
    <MobileShell>
      <header className="space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-leaf">
          Smart living
        </p>
        <h1 className="font-serif text-[2.25rem] leading-[1.05]">Cook well, spend less.</h1>
        <p className="pt-1 text-sm leading-relaxed text-earth-600">
          Honest swaps from your coach — no upsell, no spam.
        </p>
      </header>

      {/* Savings summary */}
      <div className="mt-6 flex items-center justify-between rounded-[24px] bg-leaf-soft p-5 ring-1 ring-leaf/15">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-leaf">
            Saved this month
          </p>
          <p className="mt-1 font-serif text-3xl text-earth-950">$32.40</p>
        </div>
        <div className="grid size-14 place-items-center rounded-2xl bg-white/70 text-leaf">
          <TrendingDown className="size-6" />
        </div>
      </div>

      {/* Swaps */}
      <section className="mt-7 space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
            Try these swaps
          </h2>
          <button className="text-[11px] font-medium text-warm">See all</button>
        </div>
        <ul className="space-y-2.5">
          {swaps.map((s) => (
            <li key={s.from} className="rounded-[20px] bg-white p-4 ring-1 ring-black/5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="text-earth-600 line-through">{s.from}</span>{" "}
                    <span className="font-semibold text-earth-950">→ {s.to}</span>
                  </p>
                  <p className="text-[12px] leading-snug text-earth-600">{s.note}</p>
                </div>
                <span className="shrink-0 rounded-full bg-leaf-soft px-2.5 py-1 text-[11px] font-semibold text-leaf">
                  −{s.save}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Sale nearby */}
      <section className="mt-7">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
          On sale near you
        </h2>
        <div className="rounded-[24px] bg-warm-soft p-5 ring-1 ring-warm/15">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-warm">
            <MapPin className="size-3" /> Market St · 2 blocks
          </div>
          <p className="mt-2 font-serif text-xl leading-snug text-earth-950">
            Organic tomatoes, $1.99/lb until Sunday.
          </p>
          <p className="mt-1 text-[12px] text-earth-700">
            Perfect for the marinara you're mid-way through.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="mt-7 space-y-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
          Practical tips
        </h2>
        {tips.map((t) => (
          <div key={t.title} className="rounded-[20px] bg-white p-4 ring-1 ring-black/5">
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-earth-100 text-earth-800">
                <Sparkles className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="text-[12px] leading-relaxed text-earth-600">{t.body}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </MobileShell>
  );
}
