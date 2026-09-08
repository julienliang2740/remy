import { links } from "@/site";
import { Wordmark } from "@/components/Logo";
import { GitHubIcon } from "@/components/icons";
import { DownloadButton } from "@/components/Actions";

/** The three parts of a cook, in the order the page tells them. */
const nav = [
  { href: "#top", label: "Cook" },
  { href: "#scan", label: "Scan" },
  { href: "#after", label: "Progress" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper text-ink shadow-[0_1px_0_var(--rule)]">
      <div className="mx-auto flex h-[60px] max-w-[1180px] items-center gap-8 px-6 md:px-10">
        <a href="#top" aria-label="Remy, back to top">
          <Wordmark />
        </a>

        <nav className="hidden gap-7 text-[0.9375rem] text-ink-muted md:flex" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-control px-3 py-2 text-[0.9375rem] text-ink-muted transition-colors hover:text-ink sm:inline-flex"
          >
            <GitHubIcon />
            GitHub
          </a>
          <DownloadButton className="px-4 py-2.5">Download</DownloadButton>
        </div>
      </div>
    </header>
  );
}
