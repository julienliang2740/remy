import { useEffect, useRef, useState } from "react";
import { liveFrames, type LiveFrame } from "@/site";
import { PlayIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** Plays only while on screen, so scrolling past never costs the download. */
function TrackingVideo({ frame }: { frame: LiveFrame }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      poster={frame.thumb}
      controls
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={frame.src} type="video/mp4" />
      <a href={frame.src}>Open the hand-tracking video</a>
    </video>
  );
}

export function LiveDemo() {
  const [activeId, setActiveId] = useState(liveFrames[0].id);
  const active = liveFrames.find((frame) => frame.id === activeId) ?? liveFrames[0];

  return (
    <div>
      <div className="aspect-video overflow-hidden rounded-panel bg-black/40 ring-1 ring-white/10">
        {active.kind === "video" ? (
          <TrackingVideo frame={active} />
        ) : (
          <img
            src={active.src}
            width={1600}
            height={900}
            alt={active.alt}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
        {liveFrames.map((frame) => {
          const isActive = frame.id === active.id;
          return (
            <button
              key={frame.id}
              type="button"
              onClick={() => setActiveId(frame.id)}
              aria-pressed={isActive}
              className="group text-left"
            >
              <span
                className={cn(
                  "relative block aspect-video overflow-hidden rounded-[7px] ring-1 transition",
                  isActive ? "ring-mint" : "opacity-75 ring-white/15 group-hover:opacity-100",
                )}
              >
                <img src={frame.thumb} alt="" className="h-full w-full object-cover" />
                {frame.kind === "video" && (
                  <span className="absolute bottom-1.5 left-1.5 grid size-5 place-items-center rounded-full bg-ink/80 text-paper">
                    <PlayIcon className="size-2" />
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "mt-2 block text-[0.75rem] leading-tight transition-colors sm:text-[0.8125rem]",
                  isActive ? "text-paper" : "text-paper/60 group-hover:text-paper/90",
                )}
              >
                {frame.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
