import React, { useEffect, useRef } from "react";

/**
 * MojsBurstOverlay
 * Renders a mo.js burst animation overlay at the center of the screen.
 * Triggers on mount, then fades out and calls onComplete.
 * - Uses brand accent colors and geometric shapes for a game-like effect.
 * - Pointer events are disabled so it doesn't block UI.
 * 
 * NOTE: Requires <script src="https://cdn.jsdelivr.net/npm/@mojs/core"></script> in your HTML!
 */
export default function MojsBurstOverlay({ onComplete }) {
  const overlayRef = useRef();

  useEffect(() => {
    let burst, timeline;
    let timeout;

    // Wait for mojs to be available on window
    function runBurst() {
      const mojs = window.mojs;
      if (!mojs) {
        setTimeout(runBurst, 50);
        return;
      }
      // Brand accent colors
      const COLORS = [
        "#4f46e5", // Accent Blue
        "#facc15", // Gold
        "#a78bfa", // Purple
        "#fff",    // White
      ];
      burst = new mojs.Burst({
        parent: overlayRef.current,
        radius:   { 0: 120 },
        count:    18,
        angle:    { 0: 360 },
        children: {
          shape:        ["polygon", "circle", "rect"],
          points:       6,
          fill:         COLORS,
          degreeShift:  "stagger(0,-5)",
          duration:     700,
          easing:       "cubic.out",
          radius:       { 20: 80 },
          scale:        { 1: 0.7 },
          opacity:      { 1: 0 },
          swirl:        true,
          swirlSize:    15,
          delay:        "stagger(0,20)",
        }
      });

      // Timeline for burst
      timeline = new mojs.Timeline({ speed: 1.1 });
      timeline.add(burst);
      timeline.play();

      // Fade out overlay after burst
      timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 900);
    }

    runBurst();

    return () => {
      if (timeout) clearTimeout(timeout);
      if (burst) burst.stop();
      if (timeline) timeline.stop();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
      }}
    />
  );
}