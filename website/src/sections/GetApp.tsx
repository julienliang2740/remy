import { links } from "@/site";
import { DownloadButton } from "@/components/Actions";
import { ArrowIcon } from "@/components/icons";

export function GetApp() {
  return (
    <section className="bg-pine text-paper">
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
        <h2 className="t-section max-w-[16ch]">Cook something tonight.</h2>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <DownloadButton tone="dark" />
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.9375rem] text-paper/75 underline-offset-4 transition-colors hover:text-paper hover:underline"
          >
            Read the source
            <ArrowIcon className="size-3.5" />
          </a>
        </div>

        <p className="mt-8 max-w-[42ch] text-[0.875rem] leading-relaxed text-paper/55">
          Android asks you to allow installs from unknown sources the first time.
        </p>
      </div>
    </section>
  );
}
