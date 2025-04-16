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
}) {
  const cardRef = useRef(null);

  // Burst animation on click (browser-only, dynamic import)
  const handleBurst = async (e) => {
    // Prevent navigation if this is the anchor
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (typeof window === "undefined") return;
    const mojs = (await import("@mojs/core")).default;
    const burst = new mojs.Burst({
      parent: cardRef.current,
      radius:   { 0: 80 },
      count:    12,
      children: {
        shape:        "polygon",
        points:       6,
        fill:         [ "#f472b6", "#818cf8", "#facc15", "#34d399", "#38bdf8" ],
        degreeShift:  "stagger(0,-5)",
        duration:     900,
        easing:       "cubic.out"
      }
    });
    burst.play();
  };

  const CardContent = (
    <div
      className="transition-transform duration-500 group-hover:rotate-y-6 group-hover:-rotate-x-3 group-hover:scale-105 group-active:scale-95
        bg-gradient-to-br from-pink-500 via-indigo-500 to-yellow-400 shadow-2xl rounded-3xl p-8 flex flex-col items-center border-4 border-accent-blue/60
        animate-pulse"
      style={{
        boxShadow: "0 0 40px 10px #818cf8, 0 0 0 4px #f472b6 inset"
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
      <button
        className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-accent-blue to-pink-400 text-white font-bold shadow-lg transition-all duration-300 hover:scale-110 hover:from-pink-400 hover:to-accent-blue focus:outline-none focus:ring-4 focus:ring-pink-300"
        onClick={handleBurst}
      >
        See Animation
      </button>
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