import { links } from "@/site";
import { Wordmark } from "@/components/Logo";
import { GitHubIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-muted">
            A cooking coach for the gap between picking a recipe and getting it onto the plate.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-[0.9375rem] md:items-end">
          <div className="flex items-center gap-5">
            <a href={links.download} download className="text-ink-muted hover:text-ink">
              Download
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
            >
              <GitHubIcon className="size-3.5" />
              GitHub
            </a>
          </div>
          <p className="t-meta text-ink-faint">
            © {new Date().getFullYear()} Remy · built by{" "}
            <a href={links.author} target="_blank" rel="noreferrer" className="hover:text-ink">
              Julien Liang
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
