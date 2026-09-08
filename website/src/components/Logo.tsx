/** Chef hat from Lucide (ISC), inlined so the site carries no icon dependency. */
export function Mark({ className = "size-8" }: { className?: string }) {
  return (
    <span
      className={"grid shrink-0 place-items-center rounded-panel bg-jade text-white " + className}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[62%]"
        aria-hidden="true"
      >
        <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
        <path d="M6 17h12" />
      </svg>
    </span>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Mark />
      <span className="text-[1.35rem] font-semibold tracking-[-0.035em]">Remy</span>
    </span>
  );
}
