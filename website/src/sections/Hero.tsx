import { DownloadButton } from "@/components/Actions";
import { LiveDemo } from "@/components/LiveDemo";

export function Hero() {
  return (
    <section id="top" className="scroll-mt-[60px] bg-pine text-paper">
      <div className="mx-auto max-w-[1180px] px-6 pt-14 pb-12 md:px-10 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14">
          <div>
            <h1 className="t-display max-w-[15ch]">Remy watches your hands while you cook.</h1>
            <p className="t-lead mt-5 max-w-[40ch] text-paper/70">
              It tracks both hands and the pan through your camera, and speaks up about grip, timing
              and heat.
            </p>
            <div className="mt-7">
              <DownloadButton tone="dark" />
            </div>
          </div>

          <LiveDemo />
        </div>
      </div>
    </section>
  );
}
