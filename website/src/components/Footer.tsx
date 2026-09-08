import { links } from "@/site";
import { Wordmark } from "@/components/Logo";
import { GitHubIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-8 gap-y-4 px-6 py-10 md:px-10">
        <a href="#top" aria-label="Remy, back to top">
          <Wordmark />
        </a>
        <div className="ml-auto flex items-center gap-6 text-[0.9375rem] text-ink-muted">
          <a href={links.download} download className="hover:text-ink">
            Download
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-ink"
          >
            <GitHubIcon className="size-3.5" />
            GitHub
          </a>
          <span className="t-meta text-ink-faint">© {new Date().getFullYear()} Remy</span>
        </div>
      </div>
    </footer>
  );
}
