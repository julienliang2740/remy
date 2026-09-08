import { useEffect, useState } from "react";
import { links } from "@/site";
import { Wordmark } from "@/components/Logo";
import { GitHubIcon } from "@/components/icons";
import { DownloadButton } from "@/components/Actions";

const nav = [
  { href: "#scan", label: "The scan" },
  { href: "#live", label: "Remy Live" },
  { href: "#after", label: "After the cook" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  /* The rule under the header only appears once content passes behind it. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 bg-paper transition-shadow duration-200 " +
        (scrolled ? "shadow-[0_1px_0_var(--rule)]" : "")
      }
    >
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
            className="hidden items-center gap-2 rounded-control px-3 py-2 text-[0.9375rem] text-ink-muted transition-colors hover:bg-paper-raised hover:text-ink sm:inline-flex"
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
