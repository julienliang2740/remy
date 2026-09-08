import { download } from "@/site";
import { DownloadButton, SecondaryLink } from "@/components/Actions";
import { PlayIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="pt-12 pb-4 md:pt-16">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:pt-6">
            <h1 className="t-display max-w-[15ch]">Remy reads your fridge, then cooks with you.</h1>
            <p className="t-lead mt-6 max-w-[44ch] text-ink-muted">
              Take one photo of the shelf. Remy names what it sees, suggests a recipe you can make
              tonight, and follows your hands on camera while you cook it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <DownloadButton />
              <SecondaryLink href="#live">
                <PlayIcon className="size-3.5" />
                Watch it cook
              </SecondaryLink>
            </div>

            <p className="t-meta mt-5 text-ink-faint">
              {download.platform} · {download.format} · {download.size}
            </p>
          </div>

          <figure>
            <img
              src="/media/scan-fridge.webp"
              width={1700}
              height={1285}
              alt="Remy labelling yogurt, pasta sauce, carrots, blueberries, noodles and oranges inside an open refrigerator, and proposing Pasta Rustica"
              className="w-full rounded-panel shadow-lift"
              fetchPriority="high"
            />
            <figcaption className="t-meta mt-4 text-ink-faint">
              Fridge scan · labelled in place · Pasta Rustica, 16 min
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
