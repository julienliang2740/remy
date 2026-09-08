const grocery = [
  {
    src: "/media/app-prices.webp",
    label: "Priced",
    alt: "Remy's grocery plan comparing the price of eggs, spinach, chicken and rice across nearby stores",
  },
  {
    src: "/media/app-swaps.webp",
    label: "Swapped",
    alt: "Remy suggesting firm tofu, frozen spinach and block cheese as cheaper swaps for the same dish",
  },
  {
    src: "/media/app-route.webp",
    label: "Routed",
    alt: "Remy mapping a fourteen minute walking route between H-E-B, Trader Joe's and Walmart",
  },
];

export function Afterward() {
  return (
    <section id="after" className="scroll-mt-[60px] pb-20 md:pb-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid gap-10 border-t border-rule pt-16 md:pt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div>
            <h2 className="t-section max-w-[14ch]">It keeps going after the plate.</h2>
            <p className="t-lead mt-5 max-w-[44ch] text-ink-muted">
              Remy scores the skills it watched, shows the week in one chart, and turns the next
              recipe into a grocery run priced across the stores near you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <img
              src="/media/app-progress.webp"
              width={900}
              height={1600}
              alt="Remy's progress screen showing a five day streak and skill scores for knife safety, stirring control and timing"
              className="screen w-full"
              loading="lazy"
            />
            <img
              src="/media/app-recap.webp"
              width={900}
              height={1600}
              alt="Remy's weekly recap showing meals cooked per day, average cook time and this week's improvement"
              className="screen w-full lg:mt-10"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <h3 className="text-[1.5rem] tracking-[-0.02em]">The next shop</h3>
          <ol className="mt-8 grid max-w-[940px] grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-6">
            {grocery.map((screen) => (
              <li key={screen.src}>
                <img
                  src={screen.src}
                  width={900}
                  height={1600}
                  alt={screen.alt}
                  className="screen w-full"
                  loading="lazy"
                />
                <p className="t-meta mt-3 text-ink-faint">{screen.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
