/** The Remy mark, drawn as paths so it matches the app icon at any size. */
export function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="var(--jade)" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M31 24h27.5c11 0 17.5 6.3 17.5 16.1 0 7.3-3.6 12.6-10 15l12.3 20.9H64.4L54 58H44.5v18H31V24Zm13.5 11.6v11.6h12c4 0 6.2-2.2 6.2-5.8s-2.2-5.8-6.2-5.8h-12Z"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={"flex items-center gap-2.5 " + className}>
      <Mark />
      <span className="text-[1.35rem] font-semibold tracking-[-0.035em]">Remy</span>
    </span>
  );
}
