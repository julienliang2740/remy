const legend = [
  {
    term: "Named in place",
    detail: "Every item is labelled where it sits, with a confidence score beside it.",
  },
  {
    term: "A recipe that fits",
    detail: "Remy proposes one meal built from the shelf it just read, with a time on it.",
  },
  {
    term: "Swaps when you're short",
    detail: "If something is missing, it offers what you already have instead.",
  },
];

export function Scan() {
  return (
    <section id="scan" className="scroll-mt-[60px] pt-20 md:pt-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid gap-6 border-t border-rule pt-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <h2 className="t-section max-w-[16ch]">It starts with one photo of the shelf.</h2>
          <p className="t-lead max-w-[48ch] text-ink-muted md:pt-1">
            Remy labels what it can identify and scores how sure it is, then builds a meal out of
            what is actually in front of it. Nothing here assumes a shopping trip first.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] md:items-end md:gap-8 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1.64fr)] lg:gap-10">
          <figure className="max-w-[320px] md:max-w-none">
            <img
              src="/media/kitchen-fridge.webp"
              width={1200}
              height={1500}
              alt="A full household refrigerator, crowded with jars, tubs and leftovers"
              className="w-full rounded-panel"
              loading="lazy"
            />
            <figcaption className="t-meta mt-3 text-ink-faint">
              A real shelf, before anything is labelled.
            </figcaption>
          </figure>

          <figure>
            <img
              src="/media/scan-pantry.webp"
              width={1700}
              height={1285}
              alt="Remy labelling pasta, tofu, vinegar, chili oil and flour on a pantry shelf, and proposing Sesame Farfalle"
              className="w-full rounded-panel shadow-panel"
              loading="lazy"
            />
            <figcaption className="t-meta mt-3 text-ink-faint">
              Pantry scan · Sesame Farfalle from staples
            </figcaption>
          </figure>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-3 md:mt-14">
          {legend.map((item) => (
            <div key={item.term} className="border-t border-rule pt-4">
              <dt className="text-[0.9375rem] font-medium">{item.term}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
