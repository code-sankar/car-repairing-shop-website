import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import WorkArt from "../art/WorkArt";
import { cn } from "../../lib/cn";

/**
 * Drag-to-compare slider. Works with pointer, touch and arrow keys, so it is
 * not a mouse-only party trick.
 */
export default function BeforeAfter({ art, hue, beforeLabel = "Before", afterLabel = "After", className }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef(null);

  const moveTo = useCallback((clientX) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => moveTo(e.touches ? e.touches[0].clientX : e.clientX);
    const stop = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", stop);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging, moveTo]);

  return (
    <div
      ref={frameRef}
      className={cn(
        "relative aspect-16/10 select-none overflow-hidden rounded-2xl border border-white/10",
        className,
      )}
      onPointerDown={(e) => { setDragging(true); moveTo(e.clientX); }}
    >
      {/* After state fills the frame */}
      <div className="absolute inset-0">
        <WorkArt art={art} hue={hue} repaired />
      </div>

      {/* Before state, clipped to the left of the handle */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <WorkArt art={art} hue={hue} repaired={false} />
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-brand-500 px-3 py-1 font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
        {afterLabel}
      </span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <span className="absolute inset-y-0 -left-px w-0.5 bg-white/90" />
        <button
          type="button"
          role="slider"
          aria-label="Compare before and after"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
          onPointerDown={(e) => { e.stopPropagation(); setDragging(true); }}
          className="pointer-events-auto absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-white bg-ink-950 text-white shadow-xl"
        >
          <MoveHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
