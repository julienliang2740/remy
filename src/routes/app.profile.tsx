import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Bookmark, ChevronRight, Settings, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "You — Sous" },
      { name: "description", content: "Your progress, saved recipes, and preferences." },
    ],
  }),
  component: ProfilePage,
});

const skills = [
  { name: "Sauté", level: 0.7 },
  { name: "Knife work", level: 0.5 },
  { name: "Roasting", level: 0.35 },
  { name: "Sauces", level: 0.2 },
];

const saved = [
  { name: "Brown butter pasta", emoji: "🍝", meta: "20 min · Easy+" },
  { name: "Lemony roasted chicken", emoji: "🍗", meta: "55 min · Intermediate" },
  { name: "Tomato + bread soup", emoji: "🍅", meta: "30 min · Easy" },
];

function ProfilePage() {
  return (
    <MobileShell>
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-warm-soft font-serif text-xl text-warm">
            A
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-earth-600">
              Home cook
            </p>
            <h1 className="font-serif text-2xl leading-none">Alex Rivera</h1>
          </div>
        </div>
        <button className="grid size-10 place-items-center rounded-full bg-white ring-1 ring-black/5">
          <Bell className="size-4 text-earth-800" />
        </button>
      </header>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-2 rounded-[20px] bg-earth-100/70 p-4 ring-1 ring-black/5">
        <Stat label="Sessions" value="14" />
        <div className="border-x border-earth-200">
          <Stat label="Streak" value="5 days" />
        </div>
        <Stat label="Saved" value="$32" />
      </div>

      {/* Skill tree */}
      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
            Your skill tree
          </h2>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-leaf">
            <Sparkles className="size-3" /> Growing
          </span>
        </div>
        <ul className="space-y-3 rounded-[24px] bg-white p-5 ring-1 ring-black/5">
          {skills.map((s) => (
            <li key={s.name}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="text-earth-600">{Math.round(s.level * 100)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-earth-200">
                <div
                  className="h-full rounded-full bg-warm"
                  style={{ width: `${s.level * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Saved recipes */}
      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
            Saved recipes
          </h2>
          <button className="text-[11px] font-medium text-warm">Manage</button>
        </div>
        <ul className="space-y-2">
          {saved.map((r) => (
            <li
              key={r.name}
              className="flex items-center gap-3 rounded-[20px] bg-white p-3 ring-1 ring-black/5"
            >
              <div className="grid size-12 place-items-center rounded-xl bg-earth-100 text-xl">
                {r.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-[11px] text-earth-600">{r.meta}</p>
              </div>
              <Bookmark className="size-4 text-earth-600" />
            </li>
          ))}
        </ul>
      </section>

      {/* Preferences */}
      <section className="mt-7">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
          Preferences
        </h2>
        <ul className="divide-y divide-earth-200 overflow-hidden rounded-[24px] bg-white ring-1 ring-black/5">
          <PrefRow label="Dietary preferences" value="No restrictions" />
          <PrefRow label="Kitchen confidence" value="Confident beginner" />
          <PrefRow label="Coach voice" value="Calm & warm" />
          <PrefRow label="Camera & mic" value="Always ask" />
        </ul>
      </section>

      <section className="mt-5">
        <Link
          to="/app/onboarding"
          className="flex items-center justify-between rounded-[20px] bg-white p-4 ring-1 ring-black/5"
        >
          <span className="flex items-center gap-3 text-sm font-medium">
            <Settings className="size-4 text-earth-600" />
            Settings & account
          </span>
          <ChevronRight className="size-4 text-earth-600" />
        </Link>
      </section>

      <p className="mt-6 text-center text-[11px] text-earth-600">
        Sous learns gently. You can clear what it remembers anytime.
      </p>
    </MobileShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center px-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-earth-600">{label}</p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

function PrefRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between px-5 py-4">
      <span className="text-sm font-medium">{label}</span>
      <span className="flex items-center gap-1 text-[12px] text-earth-600">
        {value} <ChevronRight className="size-3.5" />
      </span>
    </li>
  );
}
