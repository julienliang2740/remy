import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChefHat, Flame, Timer, Utensils } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";

export const Route = createFileRoute("/app/recipe-plan")({
  head: () => ({
    meta: [
      { title: "Recipe — Sous" },
      { name: "description", content: "Your suggested recipe, with a calm plan." },
    ],
  }),
  component: RecipePlanPage,
});

function RecipePlanPage() {
  return (
    <MobileShell bleed>
      {/* Hero */}
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-warm-soft via-earth-100 to-earth-200">
          <div className="absolute inset-0 grid place-items-center text-7xl opacity-80">🍝</div>
          <Link
            to="/app/setup"
            className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-canvas/90 backdrop-blur-md ring-1 ring-black/5"
          >
            <ArrowLeft className="size-4 text-earth-950" />
          </Link>
          <span className="absolute right-4 top-4 rounded-full bg-canvas/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-earth-800 backdrop-blur-md">
            Suggested
          </span>
        </div>

        <div className="relative -mt-6 rounded-t-[28px] bg-canvas px-5 pt-6">
          <div className="space-y-2">
            <h1 className="text-pretty font-serif text-[2rem] leading-tight">
              Pasta + 3 pantry items
            </h1>
            <p className="text-sm leading-relaxed text-earth-600">
              A buttery, garlicky weeknight bowl. We'll focus on getting the garlic golden, not burnt.
            </p>
          </div>

          {/* Meta row */}
          <div className="mt-5 grid grid-cols-3 gap-2 rounded-[20px] bg-earth-100/70 p-3 ring-1 ring-black/5">
            <Meta icon={Timer} label="Time" value="20 min" />
            <div className="border-x border-earth-200/80">
              <Meta icon={Flame} label="Level" value="Easy+" />
            </div>
            <Meta icon={ChefHat} label="Skill" value="Sauté" />
          </div>

          {/* Ingredients */}
          <section className="mt-7">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
              The kit
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Dried rigatoni",
                "Salted butter",
                "Garlic, 3 cloves",
                "Olive oil",
                "Parmesan",
                "Chili flakes",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-earth-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section className="mt-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-600">
              Tools you'll grab
            </p>
            <div className="flex items-center gap-2 text-sm text-earth-800">
              <Utensils className="size-4 text-earth-600" />
              <span>Pot · skillet · wooden spoon</span>
            </div>
          </section>

          {/* Coach note */}
          <section className="mt-6 rounded-[24px] bg-warm-soft p-5 ring-1 ring-warm/15">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm">
              From your coach
            </p>
            <p className="font-serif text-lg italic leading-snug text-earth-950">
              "We'll watch the garlic together. Pull it the moment it smells nutty."
            </p>
          </section>

          {/* CTA */}
          <div className="mt-8 pb-4">
            <Link
              to="/app/live-cooking"
              className="block w-full rounded-[20px] bg-warm py-4 text-center text-sm font-semibold text-white ring-4 ring-warm/10 active:scale-[0.98]"
            >
              Enter live mode
            </Link>
            <button className="mt-2 block w-full rounded-[20px] py-3 text-center text-sm font-medium text-earth-800">
              Save for later
            </button>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Timer;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-2">
      <Icon className="size-4 text-earth-600" />
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-earth-600">
        {label}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
