import { useEffect, useState } from "react";
import { links } from "@/site";
import { Wordmark } from "@/components/Logo";
import { GitHubIcon } from "@/components/icons";
import { DownloadButton } from "@/components/Actions";

const nav = [
  { href: "#scan", label: "The scan" },
  { href: "#after", label: "After the cook" },
];

export function Header() {
  const [overHero, setOverHero] = useState(true);

  /* The hero is dark, the rest of the page is not, so the bar changes with it. */
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: "-60px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 transition-colors duration-200 " +
        (overHero ? "bg-transparent text-paper" : "bg-paper text-ink shadow-[0_1px_0_var(--rule)]")
      }
    >
      <div className="mx-auto flex h-[60px] max-w-[1180px] items-center gap-8 px-6 md:px-10">
        <a href="#top" aria-label="Remy, back to top">
          <Wordmark />
        </a>

        <nav
          className={
            "hidden gap-7 text-[0.9375rem] transition-colors md:flex " +
            (overHero ? "text-paper/70" : "text-ink-muted")
          }
          aria-label="Sections"
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:opacity-100">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className={
              "hidden items-center gap-2 rounded-control px-3 py-2 text-[0.9375rem] transition-colors sm:inline-flex " +
              (overHero ? "text-paper/70 hover:text-paper" : "text-ink-muted hover:text-ink")
            }
          >
            <GitHubIcon />
            GitHub
          </a>
          <DownloadButton tone={overHero ? "dark" : "light"} className="px-4 py-2.5">
            Download
          </DownloadButton>
        </div>
      </div>
    </header>
  );
}
