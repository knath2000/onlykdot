import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
// Note: mojs is imported dynamically inside the click handler

// --- Interactive Bubble Component (Client Only) ---
export default function InteractiveBubbleClientOnly() {
    const buttonRef = useRef(); // Ref for the actual button element inside Html
    const label = "View Projects";

    const handleBubbleClick = (event) => {
        // Stop propagation *aggressively* to prevent R3F drag events
        event.stopPropagation();
        if (event.nativeEvent && typeof event.nativeEvent.stopImmediatePropagation === 'function') {
            event.nativeEvent.stopImmediatePropagation();
        }
        const buttonElement = buttonRef.current;
        if (!buttonElement) return;

        console.log(`Bubble button clicked, applying CSS burst and navigating...`);

        // Add burst animation class
        buttonElement.classList.add('bursting');

        // Set timeout for navigation (match animation duration)
        setTimeout(() => {
            console.log('CSS Burst animation likely complete, navigating to /projects');
            window.location.href = '/projects';
        }, 500); // Adjust delay (e.g., 500ms)
    };

    // CSS for the button embedded within the Html component
    const bubbleStyle = `
        .interactive-bubble-button-3d {
            width: 5rem; height: 5rem; cursor: pointer; /* Increased size */
            background-color: var(--color-accent-blue); /* Restore original */
            color: var(--color-text-inverse); /* Restore original */
            /* Remove background-image styles */
            border: none; -webkit-tap-highlight-color: transparent;
            position: relative; display: inline-flex; justify-content: center;
            align-items: center; border-radius: 50%;
            transition: transform 0.2s ease-out;
            pointer-events: auto;
            overflow: visible; /* Explicitly allow overflow */
        }
        .interactive-bubble-button-3d:hover { transform: scale(1.1); }
        .interactive-bubble-button-3d:active { transform: scale(0.95); } /* Restore active scale */

        .bubble-visual-3d { /* Restore bubble visual styles */
            position: absolute; inset: 0; border-radius: 50%;
            background: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 70%),
                        linear-gradient(to bottom right, var(--color-accent-blue), var(--color-accent-purple));
            background-size: 300% 300%; /* Make gradient larger for animation */
            animation: gradient-flow 8s linear infinite; /* Apply animation */
            transition: opacity 0.3s ease-out;
            pointer-events: none;
        }
        /* --- Image Icon Styles --- */
        .interactive-bubble-button-3d img {
            width: 4.0rem; /* Increased size proportionally */
            height: 4.0rem; /* Increased size proportionally */
            display: block;
            object-fit: contain;
            position: relative;
            z-index: 10;
            pointer-events: none;
            transition: opacity 0.3s ease-out; /* Keep transition */
            opacity: 1;
            background: transparent; /* Explicitly transparent default background */
            mask-image: none;
            -webkit-mask-image: none;
        }

        /* Hide SVG when hiding */
        /* Hide SVG when hiding */
        /* Hide Image when hiding */
        /* Hide SVG when hiding */
        /* Hide Image when hiding */
        .interactive-bubble-button-3d.hiding .bubble-visual-3d,
        .interactive-bubble-button-3d.hiding img {
            opacity: 0; transition: opacity 0.1s ease-out;
        }

        /* Gradient Animation */
        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* --- Icon Hover Gradient (Mask on Image) --- */
        @keyframes icon-gradient-shift { /* Keep for animation */
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Apply gradient and mask to the BUTTON on hover */
        .interactive-bubble-button-3d:hover {
            background: linear-gradient(to right, #F06, #0CF, #FC0, #F06); /* Apply gradient background */
            background-size: 400% 100%; /* For animation */
            animation: icon-gradient-shift 4s linear infinite; /* Apply animation */
            mask-image: url(/textures/code-brackets-icon.png); /* Use image as mask */
            mask-size: 4.0rem 4.0rem; /* Match increased image size */
            mask-repeat: no-repeat;
            mask-position: center;
            -webkit-mask-image: url(/textures/code-brackets-icon.png); /* Webkit prefix */
            -webkit-mask-size: 4.0rem 4.0rem; /* Match increased image size */
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
            transform: scale(1.1); /* Keep scale transform */
        }

        /* Hide the original image and bubble visual on hover */
        .interactive-bubble-button-3d:hover img,
        .interactive-bubble-button-3d:hover .bubble-visual-3d {
            opacity: 0;
            transition: opacity 0.1s ease-out; /* Faster fade out */
        }

        /* --- CSS Burst Animation --- */
        @keyframes bubble-burst {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(0.8); opacity: 0; }
        }

        /* Apply burst animation */
        .interactive-bubble-button-3d.bursting {
            animation: bubble-burst 0.5s ease-out forwards;
        }
        /* Ensure hiding class still works if needed */
        .interactive-bubble-button-3d.hiding img, /* Target img */
        .interactive-bubble-button-3d.hiding .bubble-visual-3d {
             opacity: 0;
             transition: opacity 0.1s ease-out;
        }

    `;

    return (
        <Html
            position={[0, 0, 2.5]} // Position on the front surface (sphereRadius)
            center
            zIndexRange={[10, 0]}
            // Stop pointer events here to prevent interference with R3F drag handlers
            onPointerDownCapture={(e) => e.stopPropagation()} // Use capture phase
        >
            <style>{bubbleStyle}</style>
            <button
                ref={buttonRef}
                id="reveal-content-button" // Keep ID if external non-Astro scripts might target it
                className="interactive-bubble-button-3d"
                aria-label={label}
                title={label}
                onClick={handleBubbleClick}
            >
                <span className="bubble-visual-3d"></span> {/* Restore bubble visual span */}
                {/* Use img tag */}
                <img src="/textures/code-brackets-icon.png" alt="Code Brackets Icon" />
            </button>
        </Html>
    );
}