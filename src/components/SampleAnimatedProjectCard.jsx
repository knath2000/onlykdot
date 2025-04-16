import React, { useRef } from "react";

// NOTE: Do NOT import mojs at the top level! It must be dynamically imported in the browser only.

export default function SampleAnimatedProjectCard({
  title,
  shortDesc,
  techStack = [],
  summary,
  thumbnail,
  links = {},
  projectUrl,
  onOpenModal,
  gradient,
  borderColor,
  slug,
}) {
  const cardRef = useRef(null);
  
  const fallbackGradient = "linear-gradient(135deg, #ec4899 0%, #6366f1 50%, #facc15 100%)";
  const appliedGradient = gradient || fallbackGradient;
  const fallbackBorderColor = "#f472b6";
  const appliedBorderColor = borderColor || fallbackBorderColor;
  const boxShadowStyle = `0 0 20px ${appliedBorderColor}, 0 0 0 4px ${appliedBorderColor} inset`;

  // Burst animation on click (browser-only, dynamic import)
  const handleBurst = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (typeof window === "undefined") return;
    const mojs = (await import("@mojs/core")).default;
    switch (slug) {
      case "animated-card-sports": {
        const burst = new mojs.Burst({
          parent: cardRef.current,
          radius: { 0: 80 },
          count: 12,
          children: {
            shape: "polygon",
            points: 6,
            fill: [ "#00eaff", "#00ff85", "#6f00ff" ],
            degreeShift: "stagger(0,-5)",
            duration: 900,
            easing: "cubic.out"
          }
        });
        burst.play();
        break;
      }
      case "sample-animated-card": {
        const primary = new mojs.Burst({
          parent: cardRef.current,
          shape: "circle",
          count: 18,
          radius: { 0: 100 },
          fill: [ "#00cfff", "#5f5fff", "#e0e0e0" ],
          children: { duration: 1200, easing: "cubic.out", stroke: "#5f5fff", strokeWidth: 2 }
        });
        const secondary = new mojs.Burst({
          parent: cardRef.current,
          shape: "rect",
          count: 8,
          radius: { 0: 60 },
          fill: "#e0e0e0",
          delay: 200
        });
        primary.play();
        setTimeout(() => secondary.play(), 200);
        break;
      }
      case "animated-card-copy": {
        const burst1 = new mojs.Burst({
          parent: cardRef.current,
          shape: "star",
          points: 5,
          count: 10,
          radius: { 0: 120 },
          degreeShift: "stagger(0,10)",
          fill: [ "#ffe066", "#a259ff", "#ff6f91", "#34d399", "#38bdf8" ],
          duration: 1000
        });
        const burst2 = new mojs.Burst({
          parent: cardRef.current,
          shape: "circle",
          count: 16,
          radius: { 0: 80 },
          fill: "#fff",
          delay: 200,
          duration: 800
        });
        const burst3 = new mojs.Burst({
          parent: cardRef.current,
          shape: "polygon",
          points: 7,
          count: 7,
          radius: { 0: 60 },
          fill: "#a259ff",
          delay: 400,
          duration: 800
        });
        burst1.play();
        setTimeout(() => burst2.play(), 200);
        setTimeout(() => burst3.play(), 400);
        break;
      }
      default: {
        const defaultBurst = new mojs.Burst({
          parent: cardRef.current,
          radius: { 0: 80 },
          count: 12,
          children: {
            shape: "polygon",
            points: 6,
            fill: [ "#f472b6", "#818cf8", "#facc15", "#34d399", "#38bdf8" ],
            degreeShift: "stagger(0,-5)",
            duration: 900,
            easing: "cubic.out"
          }
        });
        defaultBurst.play();
      }
    }
  };

  const CardContent = (
    <div
      className="transition-transform duration-500 group-hover:rotate-y-6 group-hover:-rotate-x-3 group-hover:scale-105 group-active:scale-95 shadow-2xl rounded-3xl p-8 flex flex-col items-center border-4 animate-pulse"
      style={{
        background: appliedGradient,
        borderColor: appliedBorderColor,
        boxShadow: boxShadowStyle,
      }}
    >
      <h2 className="text-2xl font-bold text-white drop-shadow-glow mb-2 tracking-wide">
        {title}
      </h2>
      <p className="text-base text-white/90 mb-4 text-center">
        {shortDesc}
      </p>
      <div className="relative w-full aspect-video mb-4 rounded-xl overflow-hidden shadow-lg border-2 border-white">
        {thumbnail && (
          <img
            src={
              typeof thumbnail === "object" && thumbnail?.src
                ? thumbnail.src
                : (typeof thumbnail === "string"
                    ? (thumbnail.startsWith('/')
                        ? thumbnail
                        : `/src/assets/project-thumbnails/${thumbnail.replace(/^.*[\\/]/, '')}`)
                    : undefined)
            }
            alt={`Thumbnail for ${title}`}
            className="w-full h-full object-cover"
          />
        )}
        {!thumbnail && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-yellow-300 via-pink-400 to-indigo-400 animate-spin-slow">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" rx="8" fill="#fff" opacity="0.8"/>
              <path d="M16 32L24 16L32 32" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="2" fill="#f472b6"/>
            </svg>
          </div>
        )}
        {/* Hover overlay with summary */}
        {summary && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-xl">
            <div className="text-white text-sm text-center">{summary}</div>
          </div>
        )}
      </div>
      {techStack.length > 0 && (
        <div className="flex gap-2 flex-wrap justify-center mb-2">
          {techStack.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded bg-indigo-600 text-white text-xs font-semibold shadow animate-pulse">
              {tag}
            </span>
          ))}
        </div>
      )}
      {/* summary is now shown only on hover over the thumbnail */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {links.live && (
          <a
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-green border border-accent-green/50 hover:bg-accent-green/10 px-3 py-1 rounded text-xs font-medium transition-colors duration-200 z-10 relative"
            onClick={e => e.stopPropagation()}
          >
            Live Demo
          </a>
        )}
        {links.repo && (
          <a
            href={links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-magenta border border-accent-magenta/50 hover:bg-accent-magenta/10 px-3 py-1 rounded text-xs font-medium transition-colors duration-200 z-10 relative"
            onClick={e => e.stopPropagation()}
          >
            GitHub Repo
          </a>
        )}
      </div>
      {/* See Animation button removed as per requirements */}
    </div>
  );
  if (onOpenModal) {
    return (
      <div
        ref={cardRef}
        className="block"
        tabIndex={0}
        aria-label={title || "Animated Project Card"}
        onClick={(e) => onOpenModal(e)}
        style={{ textDecoration: "none", cursor: "pointer" }}
      >
        <div className="relative">
          {CardContent}
          {/* Decorative floating particles */}
          <div className="absolute -top-6 -left-6 w-8 h-8 bg-pink-400 rounded-full opacity-60 blur-lg animate-float" />
          <div className="absolute -bottom-8 right-0 w-10 h-10 bg-indigo-400 rounded-full opacity-50 blur-lg animate-float2" />
          <div className="absolute top-1/2 left-full w-6 h-6 bg-yellow-300 rounded-full opacity-70 blur-md animate-float3" />
        </div>
        <style jsx>{`  @keyframes spin-slow { 100% { transform: rotate(360deg); } }
  .animate-spin-slow { animation: spin-slow 6s linear infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .animate-float { animation: float 3s ease-in-out infinite; }
  @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
  .animate-float2 { animation: float2 4s ease-in-out infinite; }
  @keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  .animate-float3 { animation: float3 2.5s ease-in-out infinite; }
  .drop-shadow-glow { filter: drop-shadow(0 0 8px #818cf8) drop-shadow(0 0 2px #f472b6); }`}</style>
      </div>
    );
  }


  return projectUrl ? (
    <a
      href={projectUrl}
      className="block"
      tabIndex={0}
      aria-label={title || "Animated Project Card"}
      style={{ textDecoration: "none" }}
      ref={cardRef}
    >
      <div className="relative">
        {CardContent}
        {/* Decorative floating particles */}
        <div className="absolute -top-6 -left-6 w-8 h-8 bg-pink-400 rounded-full opacity-60 blur-lg animate-float" />
        <div className="absolute -bottom-8 right-0 w-10 h-10 bg-indigo-400 rounded-full opacity-50 blur-lg animate-float2" />
        <div className="absolute top-1/2 left-full w-6 h-6 bg-yellow-300 rounded-full opacity-70 blur-md animate-float3" />
      </div>
      <style jsx>{`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        .animate-float2 { animation: float2 4s ease-in-out infinite; }
        @keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float3 { animation: float3 2.5s ease-in-out infinite; }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px #818cf8) drop-shadow(0 0 2px #f472b6); }
      `}</style>
    </a>
  ) : (
    <div
      ref={cardRef}
      className="relative group w-full max-w-md mx-auto mb-12 cursor-pointer"
      onClick={handleBurst}
      tabIndex={0}
      aria-label={title || "Animated Project Card"}
      style={{
        perspective: "1200px"
      }}
    >
      {CardContent}
      {/* Decorative floating particles */}
      <div className="absolute -top-6 -left-6 w-8 h-8 bg-pink-400 rounded-full opacity-60 blur-lg animate-float" />
      <div className="absolute -bottom-8 right-0 w-10 h-10 bg-indigo-400 rounded-full opacity-50 blur-lg animate-float2" />
      <div className="absolute top-1/2 left-full w-6 h-6 bg-yellow-300 rounded-full opacity-70 blur-md animate-float3" />
      <style jsx>{`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        .animate-float2 { animation: float2 4s ease-in-out infinite; }
        @keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float3 { animation: float3 2.5s ease-in-out infinite; }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px #818cf8) drop-shadow(0 0 2px #f472b6); }
      `}</style>
    </div>
  );
}