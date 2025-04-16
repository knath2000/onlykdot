import React, { useEffect, useRef } from 'react';

export default function AnimatedBorder({ slug, width, height, borderRadius, strokeWidth }) {
  switch (slug) {
    case 'animated-card-sports':
      return <SportsBorder width={width} height={height} borderRadius={borderRadius} strokeWidth={strokeWidth} />;
    case 'sample-animated-card':
      return <FlutterBorder width={width} height={height} borderRadius={borderRadius} strokeWidth={strokeWidth} />;
    case 'animated-card-copy':
      return <QuranBorder width={width} height={height} borderRadius={borderRadius} strokeWidth={strokeWidth} />;
    default:
      return null;
  }
}

function SportsBorder({ width, height, borderRadius, strokeWidth }) {
  return (
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0 pointer-events-none"
      style={{ borderRadius }}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sportsGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2="0">
          <stop offset="0%" stopColor="#00eaff">
            <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#00ff85">
            <animate attributeName="offset" values="0.5;1.5;0.5" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#6f00ff">
            <animate attributeName="offset" values="1;2;1" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={width - strokeWidth}
        height={height - strokeWidth}
        rx={borderRadius}
        ry={borderRadius}
        fill="none"
        stroke="url(#sportsGrad)"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

function FlutterBorder({ width, height, borderRadius, strokeWidth }) {
  return (
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0 pointer-events-none"
      style={{ borderRadius }}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={width - strokeWidth}
        height={height - strokeWidth}
        rx={borderRadius}
        ry={borderRadius}
        fill="none"
        stroke="#5f5fff"
        strokeWidth={strokeWidth}
        strokeDasharray="6 4"
      >
        <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
      </rect>
      <circle cx={strokeWidth / 2} cy={strokeWidth / 2} r={strokeWidth / 2} fill="#5f5fff">
        <animate attributeName="fillOpacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={width - strokeWidth / 2} cy={strokeWidth / 2} r={strokeWidth / 2} fill="#5f5fff">
        <animate attributeName="fillOpacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx={strokeWidth / 2} cy={height - strokeWidth / 2} r={strokeWidth / 2} fill="#5f5fff">
        <animate attributeName="fillOpacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1s" />
      </circle>
      <circle cx={width - strokeWidth / 2} cy={height - strokeWidth / 2} r={strokeWidth / 2} fill="#5f5fff">
        <animate attributeName="fillOpacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1.5s" />
      </circle>
    </svg>
  );
}

function QuranBorder({ width, height, borderRadius, strokeWidth }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const container = ref.current;
    (async () => {
      try {
        const mojs = (await import('@mojs/core')).default;
        const burst = new mojs.Burst({
          parent: container,
          radius: { 40: Math.max(borderRadius, strokeWidth * 2) },
          count: 20,
          children: {
            shape: 'circle',
            fill: ['#ffe066', '#a259ff', '#ff6f91', '#34d399', '#38bdf8'],
            radius: { strokeWidth: 0 },
            duration: 1500,
            easing: 'cubic.out'
          }
        });
        burst.play();
      } catch (error) {
        console.error('mo.js sparkles error:', error);
      }
    })();
  }, [borderRadius, strokeWidth]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible', borderRadius }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="quranGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2={height}>
            <stop offset="0%" stopColor="#ffe066" />
            <stop offset="25%" stopColor="#a259ff" />
            <stop offset="50%" stopColor="#ff6f91" />
            <stop offset="75%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke="url(#quranGrad)"
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
}
