import React, { useEffect, useRef, useState } from "react";

// Palette for particles (Tailwind classes can be used if configured)
const COLORS = [
  "bg-indigo-500", // Accent Blue
  "bg-yellow-400", // Gold
  "bg-purple-400", // Purple
  "bg-white", // White (for glow)
];

const PARTICLE_COUNT = 30; // Reduced count for DOM performance
const DURATION = 1200; // ms

export default function TransitionOverlay({ onComplete }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Start animation on mount
    setIsAnimating(true);

    // Set timeout to call onComplete after animation duration
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false); // Optional: reset state if needed
      if (onComplete) {
        onComplete();
      }
    }, DURATION + 200); // Add buffer

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999, // Ensure it's on top
        pointerEvents: "none", // Allow clicks through
        overflow: "hidden", // Prevent scrollbars if particles go off-screen
        background: isAnimating
          ? "radial-gradient(circle at 50% 50%, rgba(129,140,248,0.2) 0%, rgba(52,211,153,0.1) 80%, transparent 100%)"
          : "transparent", // Optional: fade background
        transition: `background ${DURATION}ms ease-out`, // Match duration
      }}
      className="flex items-center justify-center"
    >
      {/* Shockwave Element */}
      {isAnimating && (
        <div
          className="absolute rounded-full border-2 border-white/50"
          style={{
            width: '1px',
            height: '1px',
            animation: `shockwave ${DURATION}ms cubic-bezier(0.25, 1, 0.5, 1) forwards`,
          }}
        />
      )}

      {/* Particle Elements */}
      {isAnimating &&
        Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
          const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
          const distance = 50 + Math.random() * 50; // vw/vh units or pixels
          const delay = Math.random() * (DURATION / 4); // Stagger start
          const particleDuration = DURATION * (0.6 + Math.random() * 0.4); // Vary duration

          return (
            <div
              key={i}
              className={`absolute rounded-full ${
                COLORS[i % COLORS.length]
              } opacity-0`}
              style={{
                width: `${2 + Math.random() * 4}px`, // Particle size
                height: `${2 + Math.random() * 4}px`,
                // Initial position is center, transform animates it outward
                animation: `particle-burst ${particleDuration}ms cubic-bezier(0.1, 0.8, 0.25, 1) ${delay}ms forwards`,
                // Custom properties for animation
                '--angle': `${angle}rad`,
                '--distance': `${distance}vmax`, // Use viewport max for distance
              }}
            />
          );
        })}

      {/* Keyframes defined inline (could move to global.css) */}
      <style>{`
        @keyframes shockwave {
          0% {
            width: 1px;
            height: 1px;
            opacity: 0.6;
          }
          100% {
            width: 200vmax; /* Expand beyond viewport */
            height: 200vmax;
            opacity: 0;
          }
        }

        @keyframes particle-burst {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          20% {
             opacity: 1; /* Fade in quickly */
          }
          100% {
            transform: translate(
              calc(cos(var(--angle)) * var(--distance)),
              calc(sin(var(--angle)) * var(--distance))
            ) scale(1);
            opacity: 0; /* Fade out at end */
          }
        }
      `}</style>
    </div>
  );
}