export const links = {
  /** APK is served from R2 — Cloudflare Pages will not host a file this large. */
  download: "https://media.polyterminator.com/remy-app.apk",
  github: "https://github.com/julienliang2740/remy-agent-layer",
} as const;

export type LiveFrame = {
  id: string;
  kind: "video" | "image";
  name: string;
  src: string;
  /** Filmstrip image, and the video's poster. */
  thumb: string;
  alt: string;
};

export const liveFrames: LiveFrame[] = [
  {
    id: "tracking",
    kind: "video",
    name: "Hand tracking",
    src: "/media/hand-tracking-demo.mp4",
    thumb: "/media/live-poster.webp",
    alt: "Hand-tracking landmarks following both hands while a pepper is sliced on a board",
  },
  {
    id: "knife",
    kind: "image",
    name: "Knife work",
    src: "/media/live-knife.webp",
    thumb: "/media/live-knife.webp",
    alt: "Remy Live tracking both hands and coaching a cook slicing a pepper into strips",
  },
  {
    id: "sear",
    kind: "image",
    name: "Searing",
    src: "/media/live-salmon.webp",
    thumb: "/media/live-salmon.webp",
    alt: "Remy Live tracking a cook's hands while salmon sears skin-side down in a pan",
  },
  {
    id: "prep",
    kind: "image",
    name: "Prep",
    src: "/media/live-pepper.webp",
    thumb: "/media/live-pepper.webp",
    alt: "Remy Live tracking both hands while a cook removes the core and seeds from a pepper",
  },
];
