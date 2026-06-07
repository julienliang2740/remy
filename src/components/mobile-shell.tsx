import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BottomNav } from "./bottom-nav";

type MobileShellProps = {
  children: ReactNode;
  className?: string;
  /** Hide bottom nav (e.g. onboarding, live cooking) */
  hideNav?: boolean;
  /** Remove default padding for full-bleed screens */
  bleed?: boolean;
};

export function MobileShell({ children, className, hideNav, bleed }: MobileShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      <div
        className={cn(
          "mx-auto w-full max-w-md min-h-dvh flex flex-col",
          !bleed && "px-5 pt-8",
          hideNav ? "pb-6" : "pb-28",
          className,
        )}
      >
        {children}
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
