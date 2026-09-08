import type { ReactNode } from "react";
import { links } from "@/site";
import { DownloadIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center gap-2 rounded-control px-5 py-3 text-[0.9375rem] font-medium " +
  "transition-colors duration-150 active:translate-y-px";

/** The APK lives in R2; Cloudflare Pages will not host a file this size. */
export function DownloadButton({
  tone = "light",
  children = "Download for Android",
  className,
}: {
  tone?: "light" | "dark";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={links.download}
      download
      className={cn(
        base,
        tone === "light"
          ? "bg-jade-deep text-white hover:bg-[#0d6244]"
          : "bg-paper text-pine hover:bg-white",
        className,
      )}
    >
      <DownloadIcon />
      {children}
    </a>
  );
}

export function SecondaryLink({
  href,
  tone = "light",
  children,
  className,
}: {
  href: string;
  tone?: "light" | "dark";
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        base,
        tone === "light"
          ? "border border-rule text-ink hover:bg-paper-raised"
          : "border border-pine-rule text-paper hover:bg-pine-raised",
        className,
      )}
    >
      {children}
    </a>
  );
}
