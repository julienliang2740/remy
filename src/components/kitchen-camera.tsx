import { useEffect, useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  Loader2,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CapturedShot = {
  id: string;
  dataUrl: string;
  label: string;
};

type PermissionState =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unsupported";

type Props = {
  open: boolean;
  onClose: () => void;
  shots: CapturedShot[];
  onShotsChange: (shots: CapturedShot[]) => void;
  onDone: (shots: CapturedShot[]) => void;
};

const LABEL_CYCLE = ["Fridge", "Pantry", "Counter", "Spice rack", "Freezer"];

export function KitchenCamera({
  open,
  onClose,
  shots,
  onShotsChange,
  onDone,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [permission, setPermission] = useState<PermissionState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  // Tear down stream when closing
  useEffect(() => {
    if (!open) {
      stopStream();
      setPermission("idle");
      setError(null);
    }
  }, [open]);

  // Detect support on open
  useEffect(() => {
    if (!open) return;
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setPermission("unsupported");
    }
  }, [open]);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const requestCamera = async () => {
    setError(null);
    setPermission("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setPermission("granted");
    } catch (e) {
      const err = e as DOMException;
      if (err.name === "NotAllowedError" || err.name === "SecurityError") {
        setPermission("denied");
      } else if (err.name === "NotFoundError") {
        setPermission("denied");
        setError("No camera found on this device.");
      } else {
        setPermission("denied");
        setError(err.message || "Could not access your camera.");
      }
    }
  };

  const snap = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;
    const canvas = document.createElement("canvas");
    const maxW = 1280;
    const scale = Math.min(1, maxW / video.videoWidth);
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
    const label = LABEL_CYCLE[shots.length % LABEL_CYCLE.length];
    onShotsChange([
      ...shots,
      { id: crypto.randomUUID(), dataUrl, label },
    ]);
    setFlash(true);
    setTimeout(() => setFlash(false), 180);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const readers = files.map(
      (file) =>
        new Promise<CapturedShot>((resolve) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({
              id: crypto.randomUUID(),
              dataUrl: reader.result as string,
              label:
                LABEL_CYCLE[(shots.length + 0) % LABEL_CYCLE.length] ?? "Photo",
            });
          reader.readAsDataURL(file);
        }),
    );
    Promise.all(readers).then((newShots) => {
      onShotsChange([...shots, ...newShots]);
    });
    e.target.value = "";
  };

  const removeShot = (id: string) => {
    onShotsChange(shots.filter((s) => s.id !== id));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative mx-auto flex w-full max-w-md flex-col bg-earth-950 text-canvas">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-6 pb-3">
          <button
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur-md"
            aria-label="Close camera"
          >
            <X className="size-4" />
          </button>
          <div className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-wide ring-1 ring-white/15 backdrop-blur-md">
            Scan your kitchen
          </div>
          <div className="size-10" />
        </div>

        {/* Viewport */}
        <div className="relative flex-1 overflow-hidden">
          {permission === "granted" ? (
            <>
              <video
                ref={videoRef}
                playsInline
                muted
                className="absolute inset-0 size-full object-cover"
              />
              {/* Framing guides */}
              <div className="pointer-events-none absolute inset-6 rounded-[28px] border border-white/30">
                <CornerMarks />
              </div>
              {flash && <div className="absolute inset-0 bg-white/70" />}
            </>
          ) : (
            <PermissionPanel
              state={permission}
              error={error}
              onRequest={requestCamera}
              onUpload={() => fileInputRef.current?.click()}
            />
          )}
        </div>

        {/* Captured shots row */}
        {shots.length > 0 && (
          <div className="border-t border-white/10 bg-black/40 px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                {shots.length} shot{shots.length === 1 ? "" : "s"} captured
              </p>
              <button
                onClick={() => onShotsChange([])}
                className="text-[11px] text-white/60"
              >
                Clear
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {shots.map((shot) => (
                <div key={shot.id} className="relative shrink-0">
                  <img
                    src={shot.dataUrl}
                    alt={shot.label}
                    className="size-16 rounded-xl object-cover ring-1 ring-white/20"
                  />
                  <button
                    onClick={() => removeShot(shot.id)}
                    className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-earth-950 text-white ring-2 ring-earth-950"
                  >
                    <X className="size-3" />
                  </button>
                  <span className="absolute inset-x-0 bottom-0 truncate rounded-b-xl bg-black/60 px-1 text-center text-[8px] font-medium">
                    {shot.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom controls */}
        <div className="bg-earth-950 px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {permission === "granted" ? (
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="grid size-12 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15"
                aria-label="Upload from gallery"
              >
                <ImagePlus className="size-5" />
              </button>

              <button
                onClick={snap}
                className="grid size-[72px] place-items-center rounded-full bg-white ring-4 ring-white/20 active:scale-95"
                aria-label="Take photo"
              >
                <span className="grid size-[60px] place-items-center rounded-full bg-white ring-2 ring-earth-950">
                  <Camera className="size-6 text-earth-950" />
                </span>
              </button>

              <button
                onClick={() => onDone(shots)}
                disabled={shots.length === 0}
                className={cn(
                  "flex h-12 items-center gap-1.5 rounded-2xl px-4 text-sm font-semibold transition-opacity",
                  shots.length === 0
                    ? "bg-white/10 text-white/40"
                    : "bg-warm text-white ring-2 ring-warm/30",
                )}
              >
                Done
                <CheckCircle2 className="size-4" />
              </button>
            </div>
          ) : (
            <p className="text-center text-[11px] text-white/60">
              Photos stay on your device until you're ready to share them.
            </p>
          )}
        </div>

        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}

function PermissionPanel({
  state,
  error,
  onRequest,
  onUpload,
}: {
  state: PermissionState;
  error: string | null;
  onRequest: () => void;
  onUpload: () => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center">
      <div className="grid size-16 place-items-center rounded-3xl bg-warm-soft text-warm">
        {state === "requesting" ? (
          <Loader2 className="size-7 animate-spin" />
        ) : state === "denied" || state === "unsupported" ? (
          <ShieldAlert className="size-7" />
        ) : (
          <Camera className="size-7" />
        )}
      </div>

      <h2 className="mt-5 font-serif text-[1.75rem] leading-tight text-white">
        {state === "requesting"
          ? "Waking up the camera…"
          : state === "denied"
            ? "Camera is blocked"
            : state === "unsupported"
              ? "Camera isn't available"
              : "Show Sous your kitchen"}
      </h2>
      <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-white/70">
        {state === "requesting"
          ? "If your browser asks, tap Allow to share the view."
          : state === "denied"
            ? error ??
              "Open your browser settings and allow camera access for this site — or upload photos instead."
            : state === "unsupported"
              ? "Your browser can't open the camera here. You can still upload photos."
              : "Snap a few photos — the fridge, the pantry, what's on the counter. Sous will piece together what you can cook."}
      </p>

      {state !== "requesting" && state !== "unsupported" && state !== "denied" && (
        <>
          <ul className="mt-5 space-y-1.5 text-left text-[12px] text-white/70">
            <Bullet>Photos never leave your device until you tap Done.</Bullet>
            <Bullet>You can retake or remove any shot.</Bullet>
            <Bullet>Sous skips anything it isn't sure about.</Bullet>
          </ul>

          <button
            onClick={onRequest}
            className="mt-7 flex w-full max-w-xs items-center justify-center gap-2 rounded-[20px] bg-warm py-4 text-sm font-semibold text-white ring-4 ring-warm/20 active:scale-[0.98]"
          >
            <Zap className="size-4" /> Allow camera
          </button>
          <button
            onClick={onUpload}
            className="mt-3 text-[12px] font-medium text-white/70 underline-offset-4 hover:underline"
          >
            Or upload photos instead
          </button>
        </>
      )}

      {state === "denied" && (
        <div className="mt-6 flex w-full max-w-xs flex-col gap-2">
          <button
            onClick={onRequest}
            className="flex items-center justify-center gap-2 rounded-[20px] bg-white/10 py-3.5 text-sm font-semibold text-white ring-1 ring-white/15"
          >
            <RefreshCw className="size-4" /> Try again
          </button>
          <button
            onClick={onUpload}
            className="flex items-center justify-center gap-2 rounded-[20px] bg-warm py-3.5 text-sm font-semibold text-white"
          >
            <ImagePlus className="size-4" /> Upload photos instead
          </button>
        </div>
      )}

      {state === "unsupported" && (
        <button
          onClick={onUpload}
          className="mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-[20px] bg-warm py-3.5 text-sm font-semibold text-white"
        >
          <ImagePlus className="size-4" /> Upload photos
        </button>
      )}
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Sparkles className="mt-0.5 size-3 shrink-0 text-warm" />
      <span>{children}</span>
    </li>
  );
}

// Decorative corner marks inside the framing rectangle
function CornerMarks() {
  const base =
    "absolute size-5 border-white/70";
  return (
    <>
      <span className={cn(base, "left-0 top-0 border-l-2 border-t-2 rounded-tl-[28px]")} />
      <span className={cn(base, "right-0 top-0 border-r-2 border-t-2 rounded-tr-[28px]")} />
      <span className={cn(base, "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[28px]")} />
      <span className={cn(base, "bottom-0 right-0 border-b-2 border-r-2 rounded-br-[28px]")} />
    </>
  );
}

export function CameraEmptyHint() {
  return (
    <div className="flex items-center gap-2 text-[11px] text-earth-600">
      <Trash2 className="size-3" /> Removing a shot is one tap.
    </div>
  );
}
