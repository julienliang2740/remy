export function Scan() {
  return (
    <section id="scan" className="scroll-mt-[60px] py-16 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-16">
          <h2 className="t-section max-w-[14ch]">It starts before the stove.</h2>
          <p className="t-lead max-w-[46ch] text-ink-muted md:pt-1">
            Take one photo of the shelf. Each item gets a label and a confidence score, and the
            recipe comes from what is actually there.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-8 lg:gap-10">
          <img
            src="/media/scan-fridge.webp"
            width={1700}
            height={1285}
            alt="Remy labelling yogurt, pasta sauce, carrots, blueberries, noodles and oranges inside an open refrigerator, and proposing Pasta Rustica"
            className="w-full rounded-panel shadow-panel"
            loading="lazy"
          />
          <img
            src="/media/scan-pantry.webp"
            width={1700}
            height={1285}
            alt="Remy labelling pasta, tofu, vinegar, chili oil and flour on a pantry shelf, and proposing Sesame Farfalle"
            className="w-full rounded-panel shadow-panel"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
