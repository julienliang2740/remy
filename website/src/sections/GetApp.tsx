import { download, links } from "@/site";
import { DownloadButton } from "@/components/Actions";
import { ArrowIcon } from "@/components/icons";

export function GetApp() {
  return (
    <section
      className="mt-20 bg-pine bg-cover bg-[position:60%_center] text-paper md:mt-28"
      style={{
        backgroundImage:
          "linear-gradient(96deg, rgb(20 49 40 / 0.96) 0%, rgb(20 49 40 / 0.9) 38%, rgb(20 49 40 / 0.45) 100%), url('/media/band-pan.webp')",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-[46ch]">
          <h2 className="t-section max-w-[16ch]">Cook something tonight.</h2>
          <p className="t-lead mt-5 max-w-[40ch] text-paper/75">
            Open the fridge, take the photo, and see what Remy comes back with.
          </p>

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

          <p className="t-meta mt-8 text-paper/60">
            {download.platform} {download.format} · {download.size}
          </p>
          <p className="mt-1.5 max-w-[40ch] text-[0.875rem] leading-relaxed text-paper/55">
            Android asks you to allow installs from unknown sources the first time.
          </p>
        </div>
      </div>
    </section>
  );
}
