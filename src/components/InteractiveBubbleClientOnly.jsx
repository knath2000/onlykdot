import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import codeBracketsIcon from '../../assets/textures/code-brackets-icon.png';
import dynamic from 'next/dynamic';

const TransitionOverlay = dynamic(() => import('./TransitionOverlay.jsx'), { ssr: false });

// --- Interactive Bubble Component (Client Only) ---
export default function InteractiveBubbleClientOnly() {
    const buttonRef = useRef();
    const [showTransition, setShowTransition] = useState(false);
    const label = "View Projects";

    const handleBubbleClick = async (event) => {
        event.stopPropagation();
        if (event.nativeEvent && typeof event.nativeEvent.stopImmediatePropagation === 'function') {
            event.nativeEvent.stopImmediatePropagation();
        }
        const buttonElement = buttonRef.current;
        if (!buttonElement) return;

        // Trigger mo.js burst
        const mojs = (await import('@mojs/core')).default;
        const burst = new mojs.Burst({
            parent: buttonElement,
            radius:   { 0: 60 },
            count:    14,
            children: {
                shape:        ["polygon", "circle", "star"],
                points:       6,
                fill:         [ "#f472b6", "#818cf8", "#facc15", "#34d399", "#38bdf8" ],
                degreeShift:  "stagger(0,-5)",
                duration:     600,
                easing:       "cubic.out"
            }
        });
        burst.play();

        // Add burst animation class for CSS
        buttonElement.classList.add('bursting');

        // Show ThreeJS transition overlay
        setShowTransition(true);

        // Delay navigation to allow animation to play
        setTimeout(() => {
            window.location.href = '/projects';
        }, 1300); // Match ThreeJS overlay duration
    };

    // CSS for the button embedded within the Html component
    const bubbleStyle = `
        .interactive-bubble-button-3d {
            width: 5rem; height: 5rem; cursor: pointer;
            background-color: var(--color-accent-blue);
            color: var(--color-text-inverse);
            border: none; -webkit-tap-highlight-color: transparent;
            position: relative; display: inline-flex; justify-content: center;
            align-items: center; border-radius: 50%;
            transition: transform 0.2s ease-out;
            pointer-events: auto;
            overflow: visible;
        }
        .interactive-bubble-button-3d:hover { transform: scale(1.1); }
        .interactive-bubble-button-3d:active { transform: scale(0.95); }
        .bubble-visual-3d {
            position: absolute; inset: 0; border-radius: 50%;
            background: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 70%),
                        linear-gradient(to bottom right, var(--color-accent-blue), var(--color-accent-purple));
            background-size: 300% 300%;
            animation: gradient-flow 8s linear infinite;
            transition: opacity 0.3s ease-out;
            pointer-events: none;
        }
        .interactive-bubble-button-3d img {
            width: 4.0rem;
            height: 4.0rem;
            display: block;
            object-fit: contain;
            position: relative;
            z-index: 10;
            pointer-events: none;
            transition: opacity 0.3s ease-out;
            opacity: 1;
            background: transparent;
            mask-image: none;
            -webkit-mask-image: none;
        }
        .interactive-bubble-button-3d.hiding .bubble-visual-3d,
        .interactive-bubble-button-3d.hiding img {
            opacity: 0; transition: opacity 0.1s ease-out;
        }
        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes icon-gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .interactive-bubble-button-3d:hover {
            background: linear-gradient(to right, #F06, #0CF, #FC0, #F06);
            background-size: 400% 100%;
            animation: icon-gradient-shift 4s linear infinite;
            mask-image: url(${codeBracketsIcon.src});
            mask-size: 4.0rem 4.0rem;
            mask-repeat: no-repeat;
            mask-position: center;
            -webkit-mask-image: url(${codeBracketsIcon.src});
            -webkit-mask-size: 4.0rem 4.0rem;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
            transform: scale(1.1);
        }
        .interactive-bubble-button-3d:hover img,
        .interactive-bubble-button-3d:hover .bubble-visual-3d {
            opacity: 0;
            transition: opacity 0.1s ease-out;
        }
        @keyframes bubble-burst {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        .interactive-bubble-button-3d.bursting {
            animation: bubble-burst 0.5s ease-out forwards;
        }
        .interactive-bubble-button-3d.hiding img,
        .interactive-bubble-button-3d.hiding .bubble-visual-3d {
             opacity: 0;
             transition: opacity 0.1s ease-out;
        }
    `;

    return (
        <>
            {showTransition && <TransitionOverlay />}
            <Html
                position={[0, 0, 2.5]}
                center
                zIndexRange={[10, 0]}
                onPointerDownCapture={(e) => e.stopPropagation()}
            >
                <style>{bubbleStyle}</style>
                <button
                    ref={buttonRef}
                    id="reveal-content-button"
                    className="interactive-bubble-button-3d"
                    aria-label={label}
                    title={label}
                    onClick={handleBubbleClick}
                >
                    <span className="bubble-visual-3d"></span>
                    <img src={codeBracketsIcon.src} alt="Code Brackets Icon" fetchpriority="high" />
                </button>
            </Html>
        </>
    );
}