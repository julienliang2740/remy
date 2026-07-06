import type {
  AnchorHTMLAttributes,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";
import {
  ArrowRight,
  Camera,
  ChefHat,
  Flame,
  ImageOff,
  Package,
  Play,
  Receipt,
  ScanLine,
  ShoppingBasket,
  Sparkles,
  Target,
  TrendingDown,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { createElement, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const downloadUrl = "https://media.polyterminator.com/remy-app.apk";

function Link({ to, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return <a href={to} {...props} />;
}

function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  style,
  ...props
}: HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return createElement(
    as,
    {
      ...props,
      ref,
      className: cn("reveal-on-scroll", isVisible && "is-visible", className),
      style: {
        ...style,
        "--reveal-delay": delay.toString() + "ms",
      } as CSSProperties,
    },
    children,
  );
}

function ProductImage({
  alt,
  className,
  loading = "lazy",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-earth-100 px-6 text-center text-earth-600",
          className,
        )}
        role="img"
        aria-label={alt || "Product preview unavailable"}
      >
        <span className="flex flex-col items-center gap-2 text-xs font-medium">
          <ImageOff className="size-5" aria-hidden="true" />
          Preview unavailable
        </span>
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-canvas font-sans text-earth-950 antialiased">
      <SiteNav />
      <main>
        <Hero />
        <IngredientAnalysis />
        <LiveCoaching />
        <RealApp />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  return (
    <Reveal
      as="header"
      className="sticky top-0 z-40 border-b border-earth-200/60 bg-canvas/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2" aria-label="Remy home">
            <div className="grid size-8 place-items-center rounded-xl bg-earth-950 text-canvas">
              <ChefHat className="size-4" aria-hidden="true" />
            </div>
            <span className="font-serif text-2xl leading-none">Remy</span>
          </Link>
          <nav
            className="hidden items-center gap-8 text-sm text-earth-700 md:flex"
            aria-label="Main navigation"
          >
            <a href="#how" className="transition-colors hover:text-earth-950">
              How it works
            </a>
            <a href="#live" className="transition-colors hover:text-earth-950">
              Live demo
            </a>
            <a href="#app" className="transition-colors hover:text-earth-950">
              The app
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/julienliang2740/remy-agent-layer"
            target="_blank"
            rel="noreferrer"
            aria-label="View Remy Agent Layer on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-full bg-white text-earth-950 ring-1 ring-black/5 transition-colors hover:bg-earth-100 sm:w-auto sm:gap-2 sm:px-3"
          >
            <img src="/images/github-mark.svg" alt="" className="size-4" aria-hidden="true" />
            <span className="hidden text-sm font-semibold sm:inline">GitHub</span>
          </a>
          <Link
            to={downloadUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-earth-950 px-4 py-2 text-sm font-semibold text-canvas transition-transform active:scale-95"
          >
            Get Remy <Package className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function Hero() {
  return (
    <Reveal
      as="section"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(60% 70% at 75% 25%, color-mix(in oklab, var(--warm) 14%, transparent) 0%, transparent 60%), radial-gradient(50% 60% at 15% 80%, color-mix(in oklab, var(--leaf) 10%, transparent) 0%, transparent 65%)",
      }}
    >
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-12 px-5 py-12 md:grid-cols-[0.88fr_1.12fr] md:px-8 lg:py-16">
        <Reveal className="space-y-5" delay={100}>
          <p className="inline-flex items-center gap-2 rounded-full bg-warm-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm ring-1 ring-warm/20">
            <Sparkles className="size-3" aria-hidden="true" />
            From fridge scan to finished dinner
          </p>
          <h1 className="text-balance font-serif text-[2.7rem] leading-[0.98] sm:text-5xl md:text-6xl lg:text-[4.35rem]">
            Cook with what you have. Get help while it&apos;s happening.
          </h1>
          <p className="max-w-[52ch] text-pretty text-base leading-relaxed text-earth-700 md:text-[1.05rem]">
            Recipes describe the ideal cook. Dinner happens in a real kitchen. Remy scans what you
            have, then follows the cook with live guidance for timing, technique, and motion.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to={downloadUrl}
              download
              className="inline-flex items-center gap-2 rounded-2xl bg-earth-950 px-6 py-3.5 text-sm font-semibold text-canvas transition-transform active:scale-[0.98]"
            >
              <Flame className="size-4" aria-hidden="true" />
              Get Remy
            </Link>
            <a
              href="#live"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-earth-950 ring-1 ring-black/5 transition-colors hover:bg-earth-100"
            >
              Watch a real cook
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="grid gap-2 pt-1 sm:grid-cols-3 md:grid-cols-1">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <div
                  key={problem.title}
                  className="rounded-2xl bg-white/75 p-3 ring-1 ring-black/5 backdrop-blur md:flex md:items-start md:gap-3"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-earth-100 text-earth-800">
                    <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-sm font-semibold leading-snug">{problem.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-earth-600">
                      {problem.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="relative mx-auto w-full max-w-[650px] pb-14 sm:pb-20" delay={240}>
          <figure className="overflow-hidden rounded-[30px] bg-white p-2 shadow-2xl shadow-earth-950/10 ring-1 ring-black/5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[23px] bg-earth-100">
              <ProductImage
                src="/images/product/inventory-pantry.png"
                alt="Remy inventory scan identifying pantry ingredients and suggesting Sesame Farfalle"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-3 py-3 text-xs">
              <span className="font-semibold text-earth-900">Inventory scan</span>
              <span className="text-earth-600">Pantry ingredients become a starting point</span>
            </figcaption>
          </figure>

          <figure className="absolute -bottom-2 right-1 w-[72%] rotate-[2deg] overflow-hidden rounded-[24px] bg-earth-950 p-1.5 shadow-2xl shadow-earth-950/25 ring-1 ring-black/10 sm:-right-3 sm:w-[68%]">
            <div className="relative aspect-video overflow-hidden rounded-[19px] bg-earth-900">
              <ProductImage
                src="/images/product/live-knife.png"
                alt="Remy Live tracking both hands while guiding a cook to slice a pepper into thin strips"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <figcaption className="flex items-center gap-2 px-3 py-2 text-[11px] font-medium text-canvas">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-warm" />
              </span>
              Live technique and motion guidance
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Reveal>
  );
}

const problems: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: ShoppingBasket,
    title: "Recipes ignore your kitchen",
    body: "A useful dinner should start with the ingredients already in your fridge and pantry.",
  },
  {
    icon: Camera,
    title: "Instructions stop too soon",
    body: "A recipe can name the next step. It cannot tell when your timing or motion needs help.",
  },
  {
    icon: Receipt,
    title: "One meal gets expensive",
    body: "Specialty ingredients add up fast, especially when a cheaper swap would work.",
  },
];

function IngredientAnalysis() {
  return (
    <Reveal
      as="section"
      id="how"
      className="scroll-mt-16 border-y border-earth-200/60 bg-earth-100/40"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader
          eyebrow="01 · Start with what is there"
          title="Scan the kitchen before choosing the recipe."
          description="Remy identifies ingredients from fridge and pantry photos, then suggests a meal based on what it found. The starting point is your actual shelf, not a shopping list written for someone else."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.58fr_1.42fr]">
          <Reveal className="overflow-hidden rounded-[28px] bg-white p-2 ring-1 ring-black/5">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-earth-100">
                <ProductImage
                  src="/images/step1.jpg"
                  alt="A full household refrigerator photographed before choosing what to cook"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-canvas/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-earth-800 backdrop-blur">
                  The real starting point
                </span>
              </div>
              {/* <figcaption className="p-4">
                <p className="font-serif text-xl">A fridge does not arrive recipe-ready.</p>
                <p className="mt-1 text-sm leading-relaxed text-earth-600">
                  Remy works from the kitchen as it is: crowded shelves, leftovers, and all.
                </p>
              </figcaption> */}
            </figure>
          </Reveal>

          <div className="grid gap-5">
            <ScanCard
              src="/images/product/inventory-fridge.png"
              alt="Remy inventory scan labeling yogurt, carrots, blueberries, noodles, eggs, and other refrigerator ingredients"
              label="Fridge scan"
              title="Ingredients identified in place"
              body="The scan labels what it can use and proposes Pasta Rustica from the available food."
            />
            {/* <ScanCard
              src="/images/product/inventory-pantry.png"
              alt="Remy inventory scan labeling pasta, tofu, vinegar, chili oil, flour, and other pantry ingredients"
              label="Pantry scan"
              title="A second shelf changes the options"
              body="Pantry staples are folded into the same decision, producing a Sesame Farfalle suggestion."
            /> */}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const appScreens = [
  {
    src: "/images/product/progress-overview.png",
    alt: "Remy cooking progress screen showing coached skills and recent cooking activity",
    icon: Target,
    label: "Skills coached",
    title: "See where each cook is adding up.",
  },
  {
    src: "/images/product/progress-recap.png",
    alt: "Remy weekly cooking recap showing meals, time cooked, improvement, and a next goal",
    icon: Sparkles,
    label: "After the cook",
    title: "Review what improved and what to try next.",
  },
  {
    src: "/images/product/grocery-prices.png",
    alt: "Remy grocery plan comparing nearby prices for recipe ingredients",
    icon: Wallet,
    label: "Local prices",
    title: "Compare the cost of the ingredients you need.",
  },
  {
    src: "/images/product/grocery-route.png",
    alt: "Remy grocery plan mapping a route between nearby stores",
    icon: ShoppingBasket,
    label: "Store route",
    title: "Turn the final list into a practical shop.",
  },
];

function RealApp() {
  return (
    <Reveal
      as="section"
      id="app"
      className="scroll-mt-16 border-y border-earth-200/60 bg-earth-100/40"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader
          eyebrow="03 · Learn, adapt, and spend less"
          title="The cook ends. The useful part does not."
          description="After the meal, Remy shows what went well and what to try next time. When ingredients are missing, the grocery plan can compare prices, suggest cheaper swaps, and organize nearby stops."
        />

        <div className="-mx-5 mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:mx-auto sm:px-0 md:grid md:max-w-2xl md:grid-cols-2 md:gap-x-10 md:gap-y-12 md:overflow-visible md:pb-0 xl:max-w-5xl xl:grid-cols-4 xl:gap-6">
          {appScreens.map((screen, index) => {
            const Icon = screen.icon;
            return (
              <Reveal
                as="article"
                key={screen.src}
                delay={index * 70}
                className="w-[78vw] max-w-[310px] shrink-0 snap-center sm:w-[290px] md:w-full md:max-w-[280px] md:justify-self-center xl:max-w-none"
              >
                <div className="aspect-[9/16]">
                  <PhoneFrame>
                    <ProductImage
                      src={screen.src}
                      alt={screen.alt}
                      className="h-full w-full object-cover"
                    />
                  </PhoneFrame>
                </div>
                <div className="px-2 pt-5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-warm">
                    <Icon className="size-3.5" aria-hidden="true" />
                    {screen.label}
                  </p>
                  <h3 className="mt-2 font-serif text-xl leading-tight">{screen.title}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full rounded-[36px] bg-earth-950 p-2 shadow-2xl shadow-earth-950/15 ring-1 ring-black/10">
      <div className="relative h-full w-full overflow-hidden rounded-[29px] bg-canvas">
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-earth-950/90" />
        {children}
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <Reveal as="section" className="px-5 py-20 md:px-8 md:py-28">
      <div
        className="mx-auto w-full max-w-5xl overflow-hidden rounded-[36px] p-10 ring-1 ring-warm/15 md:p-16"
        style={{
          background:
            "radial-gradient(70% 100% at 80% 0%, color-mix(in oklab, var(--warm) 22%, var(--canvas)) 0%, var(--canvas) 70%)",
        }}
      >
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm">
              Your kitchen is enough to start
            </p>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] md:text-6xl">
              Open the fridge.
              <br />
              Make the next meal.
            </h2>
            <p className="max-w-[46ch] text-base leading-relaxed text-earth-700">
              Scan what you have, choose a recipe that fits, and keep Remy beside you through the
              parts a written recipe cannot see.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={downloadUrl}
                download
                className="inline-flex items-center gap-2 rounded-2xl bg-earth-950 px-6 py-3.5 text-sm font-semibold text-canvas transition-transform active:scale-[0.98]"
              >
                <Flame className="size-4" aria-hidden="true" />
                Get Remy
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-earth-950 ring-1 ring-black/5 hover:bg-earth-100"
              >
                Start with the scan
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            <JourneyChip icon={ScanLine} label="Scan" body="Fridge and pantry" />
            <JourneyChip icon={Camera} label="Cook" body="Live hand and video analysis" />
            <JourneyChip icon={TrendingDown} label="Adapt" body="Feedback, swaps, and prices" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function JourneyChip({
  icon: Icon,
  label,
  body,
}: {
  icon: LucideIcon;
  label: string;
  body: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/75 p-3.5 ring-1 ring-black/5 backdrop-blur">
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-leaf-soft text-leaf">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-earth-600">{body}</p>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <Reveal as="footer" className="border-t border-earth-200/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-5 px-5 py-12 sm:flex-row sm:items-end md:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2" aria-label="Remy home">
            <div className="grid size-8 place-items-center rounded-xl bg-earth-950 text-canvas">
              <ChefHat className="size-4" aria-hidden="true" />
            </div>
            <span className="font-serif text-2xl leading-none">Remy</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-earth-600">
            A cooking coach for the gap between choosing dinner and getting it onto the plate.
          </p>
        </div>
        <a href="#live" className="text-sm font-semibold text-earth-700 hover:text-earth-950">
          Watch Remy cook
        </a>
      </div>
    </Reveal>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal as="header" className="mx-auto max-w-3xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm">{eyebrow}</p>
      <h2 className="mt-3 text-balance font-serif text-4xl leading-tight md:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-earth-700">
        {description}
      </p>
    </Reveal>
  );
}

function ScanCard({
  src,
  alt,
  label,
  title,
  body,
}: {
  src: string;
  alt: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="overflow-hidden rounded-[28px] bg-white p-2 ring-1 ring-black/5">
      <figure className="grid items-center gap-3 sm:grid-cols-[1.35fr_0.65fr]">
        <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-earth-100">
          <ProductImage src={src} alt={alt} className="h-full w-full object-cover" />
        </div>
        <figcaption className="px-3 pb-4 sm:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-warm">{label}</p>
          <h3 className="mt-2 font-serif text-2xl leading-tight">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-earth-600">{body}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function TrackingVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Controls remain available when a browser blocks autoplay.
    });
  }, [prefersReducedMotion]);

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-cover"
      poster="/images/product/hand-tracking-salmon.png"
      controls
      muted
      loop
      playsInline
      autoPlay={!prefersReducedMotion}
      preload="metadata"
      aria-label="Hand-tracking demo showing Remy following a cook's hand movements"
    >
      <source src="/videos/hand-tracking-demo.mp4" type="video/mp4" />
      Your browser cannot play this demo.
      <a href="/videos/hand-tracking-demo.mp4">Open the hand-tracking video</a>.
    </video>
  );
}

const liveGalleryItems = [
  {
    kind: "video" as const,
    thumbnail: "/images/product/hand-tracking-salmon.png",
    alt: "Hand-tracking landmarks following a cook's movements",
    label: "",
    title: "",
    body: "",
  },
  {
    kind: "image" as const,
    src: "/images/product/live-knife.png",
    thumbnail: "/images/product/live-knife.png",
    alt: "Remy Live hand tracking during knife work",
    label: "",
    title: "",
    body: "",
  },
  {
    kind: "image" as const,
    src: "/images/product/live-salmon.png",
    thumbnail: "/images/product/live-salmon.png",
    alt: "Remy Live tracking hands while salmon sears in a pan",
    label: "",
    title: "",
    body: "",
  },
  {
    kind: "image" as const,
    src: "/images/product/live-pepper.png",
    thumbnail: "/images/product/live-pepper.png",
    alt: "Remy Live tracking both hands while a cook removes pepper seeds",
    label: "",
    title: "",
    body: "",
  },
];

function LiveCoaching() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = liveGalleryItems[activeIndex];

  return (
    <Reveal as="section" id="live" className="scroll-mt-16 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow="02 · Cook with live guidance"
          title="The recipe stays with you when the cooking starts."
          description="Remy uses live hand tracking and video analysis to follow timing, technique, and motion. The current step remains visible while short cues respond to what is happening."
        />

        <div className="mx-auto mt-14 max-w-5xl">
          <Reveal className="overflow-hidden rounded-[28px] bg-earth-950 p-2 shadow-xl ring-1 ring-black/10">
            <figure>
              <div className="aspect-video overflow-hidden rounded-[22px] bg-earth-900">
                {activeItem.kind === "video" ? (
                  <TrackingVideo />
                ) : (
                  <ProductImage
                    src={activeItem.src}
                    alt={activeItem.alt}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                )}
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-canvas">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-warm">
                    {activeItem.label}
                  </p>
                  <p className="mt-1 font-serif text-xl">{activeItem.title}</p>
                  <p className="mt-1 max-w-2xl text-xs leading-relaxed text-canvas/65">
                    {activeItem.body}
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-canvas/75">
                  {activeItem.kind === "video" ? "" : ""}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mx-auto mt-4 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
          {liveGalleryItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={"Show " + item.label}
                aria-pressed={isActive}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-[20px] bg-earth-950 p-1.5 text-left ring-1 ring-black/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm",
                  isActive
                    ? "scale-[0.98] ring-2 ring-warm ring-offset-2 ring-offset-canvas"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <ProductImage
                  src={item.thumbnail}
                  alt=""
                  className="h-full w-full rounded-[15px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-x-1.5 bottom-1.5 flex items-center justify-between gap-2 rounded-b-[15px] bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-2 pt-8 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  {item.label}
                  {item.kind === "video" ? (
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-earth-950">
                      <Play className="size-3 fill-current" aria-hidden="true" />
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
