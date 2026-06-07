import { Link } from "@tanstack/react-router";
import { Home, ChefHat, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/setup", label: "Cook", icon: ChefHat, exact: false },
  { to: "/app/savings", label: "Savings", icon: Tag, exact: false },
  { to: "/app/profile", label: "Profile", icon: User, exact: false },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-earth-200/60 bg-canvas/85 backdrop-blur-xl">
      <ul className="flex items-stretch justify-around px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <li key={tab.to} className="flex-1">
              <Link
                to={tab.to}
                activeOptions={{ exact: tab.exact }}
                activeProps={{ className: "text-earth-950" }}
                inactiveProps={{ className: "text-earth-600" }}
                className="group flex flex-col items-center gap-1 py-1.5 transition-colors"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        "grid size-9 place-items-center rounded-2xl transition-all",
                        isActive
                          ? "bg-earth-950 text-canvas"
                          : "bg-transparent text-earth-600",
                      )}
                    >
                      <Icon className="size-[18px]" strokeWidth={isActive ? 2.4 : 2} />
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-medium tracking-wide",
                        isActive ? "text-earth-950" : "text-earth-600",
                      )}
                    >
                      {tab.label}
                    </span>
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
