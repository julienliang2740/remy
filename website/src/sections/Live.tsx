import { useEffect, useRef, useState } from "react";
import { liveFrames, type LiveFrame } from "@/site";
import { PlayIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** Plays only while the frame is on screen, so scrolling past costs nothing. */
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
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      poster={frame.poster}
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

export function Live() {
  const [activeId, setActiveId] = useState(liveFrames[0].id);
  const active = liveFrames.find((frame) => frame.id === activeId) ?? liveFrames[0];

  return (
    <section
      id="live"
      className="mt-20 scroll-mt-[60px] bg-pine py-18 text-paper md:mt-28 md:py-24"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <h2 className="t-section max-w-[18ch]">
            Remy Live keeps watching after the cooking starts.
          </h2>
          <p className="t-lead max-w-[48ch] text-paper/70 lg:pt-1">
            It tracks both hands and the pan through your camera, holds the current step on screen,
            and speaks up about grip, timing and heat while you work.
          </p>
        </div>

        <figure className="mt-10 md:mt-12">
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
                loading="lazy"
              />
            )}
          </div>
          <figcaption className="mt-5 max-w-[60ch] text-[0.9375rem] leading-relaxed text-paper/70">
            {active.cue}
          </figcaption>
        </figure>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 md:gap-x-5">
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
                    "relative block aspect-video overflow-hidden rounded-[8px] ring-1 transition",
                    isActive ? "ring-mint" : "opacity-80 ring-white/15 group-hover:opacity-100",
                  )}
                >
                  <img
                    src={frame.poster}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {frame.kind === "video" && (
                    <span className="absolute bottom-2 left-2 grid size-6 place-items-center rounded-full bg-pine/80 text-paper">
                      <PlayIcon className="size-2.5" />
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "mt-2.5 block text-[0.875rem] transition-colors",
                    isActive ? "text-paper" : "text-paper/65 group-hover:text-paper/90",
                  )}
                >
                  {frame.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
