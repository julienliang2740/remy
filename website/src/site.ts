/** Single source of truth for outbound links and the download's real facts. */
export const links = {
  /** APK is served from R2 — Cloudflare Pages rejects files this large. */
  download: "https://media.polyterminator.com/remy-app.apk",
  github: "https://github.com/julienliang2740/remy-agent-layer",
  author: "https://github.com/julienliang2740",
} as const;

export const download = {
  platform: "Android",
  size: "91 MB",
  format: "APK",
} as const;

/** Every frame Remy Live can show, with the cue the app actually gave. */
export type LiveFrame = {
  id: string;
  kind: "video" | "image";
  name: string;
  cue: string;
  src: string;
  poster: string;
  alt: string;
};

export const liveFrames: LiveFrame[] = [
  {
    id: "tracking",
    kind: "video",
    name: "Hand tracking",
    cue: "The tracker on its own: both hands, landmark by landmark, while a pepper is sliced.",
    src: "/media/hand-tracking-demo.mp4",
    poster: "/media/live-poster.webp",
    alt: "Hand-tracking landmarks following both hands while a pepper is sliced on a board",
  },
  {
    id: "knife",
    kind: "image",
    name: "Knife work",
    cue: "Step 3, knife work. Slice the pepper into thin strips, about 1 cm wide.",
    src: "/media/live-knife.webp",
    poster: "/media/live-knife.webp",
    alt: "Remy Live tracking both hands and coaching a cook slicing a pepper into strips",
  },
  {
    id: "sear",
    kind: "image",
    name: "Searing",
    cue: "Step 5, sear the salmon. Skin-side down for four minutes, listening for the sizzle.",
    src: "/media/live-salmon.webp",
    poster: "/media/live-salmon.webp",
    alt: "Remy Live tracking a cook's hands while salmon sears skin-side down in a pan",
  },
  {
    id: "prep",
    kind: "image",
    name: "Prep",
    cue: "Step 2, prep the pepper. Remove the core and seeds with a slow pull, not a squeeze.",
    src: "/media/live-pepper.webp",
    poster: "/media/live-pepper.webp",
    alt: "Remy Live tracking both hands while a cook removes the core and seeds from a pepper",
  },
];
