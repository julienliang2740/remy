import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Plus, Search, Sparkles, X } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { KitchenCamera, type CapturedShot } from "@/components/kitchen-camera";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/setup")({
  head: () => ({
    meta: [
      { title: "What do you have? — Sous" },
      { name: "description", content: "Snap your fridge or tap what you have — Sous suggests a recipe." },
    ],
  }),
  component: SetupPage,
});

const pantry = [
  { name: "Eggs", emoji: "🥚" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Garlic", emoji: "🧄" },
  { name: "Olive oil", emoji: "🫒" },
  { name: "Onion", emoji: "🧅" },
  { name: "Butter", emoji: "🧈" },
  { name: "Tomato", emoji: "🍅" },
  { name: "Lemon", emoji: "🍋" },
  { name: "Rice", emoji: "🍚" },
  { name: "Spinach", emoji: "🥬" },
  { name: "Parmesan", emoji: "🧀" },
  { name: "Chili flakes", emoji: "🌶️" },
];

const tools = ["Skillet", "Pot", "Sheet pan", "Chef's knife", "Wood spoon"];

function SetupPage() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["Pasta", "Garlic", "Olive oil", "Parmesan", "Chili flakes"]),
  );
  const [shots, setShots] = useState<CapturedShot[]>([]);
  const [cameraOpen, setCameraOpen] = useState(false);

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <MobileShell>
      <header className="space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
          Step 1 of 2
        </p>
        <h1 className="font-serif text-[2.25rem] leading-[1.05] text-balance">
          What do you
          <br />
          have on hand?
        </h1>
        <p className="pt-1 text-sm text-earth-600">
          Snap your fridge, or tap anything you've got — even loosely.
        </p>
      </header>

      {/* Scan card — primary, camera-led path */}
      <button
        onClick={() => setCameraOpen(true)}
        className="mt-6 w-full overflow-hidden rounded-[24px] bg-earth-950 p-5 text-left text-canvas ring-1 ring-earth-950 active:scale-[0.99]"
      >
        <div className="flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-warm text-white ring-4 ring-warm/20">
            <Camera className="size-5" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-soft/90">
              Fastest way
            </p>
            <p className="font-serif text-xl leading-tight">
              Scan your fridge & pantry
            </p>
            <p className="text-[12px] leading-relaxed text-canvas/70">
              Snap a few photos — Sous figures out what you can cook.
            </p>
          </div>
        </div>

        {shots.length > 0 && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/5 p-2 ring-1 ring-white/10">
            <div className="flex -space-x-2">
              {shots.slice(0, 4).map((s) => (
                <img
                  key={s.id}
                  src={s.dataUrl}
                  alt={s.label}
                  className="size-9 rounded-lg object-cover ring-2 ring-earth-950"
                />
              ))}
            </div>
            <div className="flex-1 text-[11px] leading-snug">
              <span className="font-semibold">{shots.length} photo{shots.length === 1 ? "" : "s"}</span>{" "}
              <span className="text-canvas/60">attached · tap to add more</span>
            </div>
          </div>
        )}
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-earth-200" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-earth-600">
          or build it by hand
        </span>
        <div className="h-px flex-1 bg-earth-200" />
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
        <Search className="size-4 text-earth-600" />
        <input
          type="text"
          placeholder="Search or add an ingredient"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-earth-400"
        />
        <button className="grid size-7 place-items-center rounded-full bg-earth-100 text-earth-800">
          <Plus className="size-4" />
        </button>
      </div>

      {/* Selected chips */}
      {selected.size > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
            In your basket
          </p>
          <div className="flex flex-wrap gap-2">
            {[...selected].map((name) => (
              <button
                key={name}
                onClick={() => toggle(name)}
                className="flex items-center gap-1.5 rounded-full bg-earth-950 px-3 py-1.5 text-xs font-medium text-canvas"
              >
                {name}
                <X className="size-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pantry grid */}
      <section className="mt-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
          Common pantry
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {pantry.map((item) => {
            const active = selected.has(item.name);
            return (
              <button
                key={item.name}
                onClick={() => toggle(item.name)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl p-3 ring-1 transition-all active:scale-95",
                  active
                    ? "bg-warm-soft text-warm ring-warm/30"
                    : "bg-white text-earth-950 ring-black/5",
                )}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[11px] font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tools */}
      <section className="mt-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
          Tools
        </p>
        <div className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <button
              key={t}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium ring-1 ring-black/5"
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-auto pt-8">
        <Link
          to="/app/recipe-plan"
          className="flex w-full items-center justify-center gap-2 rounded-[20px] bg-earth-950 py-4 text-sm font-semibold text-canvas active:scale-[0.98]"
        >
          <Sparkles className="size-4" />
          Suggest a recipe
          {shots.length + selected.size > 0 && (
            <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">
              {shots.length > 0
                ? `${shots.length} photo${shots.length === 1 ? "" : "s"}${selected.size ? ` · ${selected.size} item${selected.size === 1 ? "" : "s"}` : ""}`
                : `${selected.size} item${selected.size === 1 ? "" : "s"}`}
            </span>
          )}
        </Link>
        <p className="mt-3 text-center text-[11px] text-earth-600">
          Sous will pick something doable with what you've shown it.
        </p>
      </div>

      <KitchenCamera
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        shots={shots}
        onShotsChange={setShots}
        onDone={(s) => {
          setShots(s);
          setCameraOpen(false);
        }}
      />
    </MobileShell>
  );
}
