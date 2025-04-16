import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
// Note: Click animation is handled via CSS (.bursting class)

// --- Reusable Sphere Navigation Button Component ---
// Removed onClick prop temporarily, will be passed from wrapper
export default function SphereNavButton({ iconPath, targetUrl, label, position, onClick, isTransitioning }) {
    const buttonRef = useRef(); // Ref for the actual button element inside Html

    // Simplified click handler - just calls the passed onClick prop
    const handleInternalClick = (event) => {
        // Stop propagation *aggressively* to prevent R3F drag events
        event.stopPropagation();
        if (event.nativeEvent && typeof event.nativeEvent.stopImmediatePropagation === 'function') {
            event.nativeEvent.stopImmediatePropagation();
        }
        // Call the onClick passed from the parent/wrapper component
        if (onClick) {
            onClick(event, buttonRef.current); // Pass event and button element
        }
    };

    // CSS for the button embedded within the Html component
    // Using a unique class name based on label to avoid potential style conflicts if needed,
    // but primarily relying on inline style for the mask URL.
    const buttonClassName = `interactive-bubble-button-3d${isTransitioning ? " hiding" : ""}`; // Add hiding class if transitioning

    const bubbleStyle = `
        .interactive-bubble-button-3d {
            width: 5rem; height: 5rem; cursor: pointer; /* Increased size */
            background-color: var(--color-accent-blue); /* Restore original */
            color: var(--color-text-inverse); /* Restore original */
            border: none; -webkit-tap-highlight-color: transparent;
            position: relative; display: inline-flex; justify-content: center;
            align-items: center; border-radius: 50%;
            transition: transform 0.2s ease-out;
            pointer-events: auto;
            overflow: visible; /* Explicitly allow overflow */
        }
        .interactive-bubble-button-3d:hover { transform: scale(1.1); }
        .interactive-bubble-button-3d:active { transform: scale(0.95); }

        .${buttonClassName} .bubble-visual-3d { /* Target child span */
            position: absolute; inset: 0; border-radius: 50%;
            background: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 70%),
                        linear-gradient(to bottom right, var(--color-accent-blue), var(--color-accent-purple));
            background-size: 300% 300%;
            animation: gradient-flow 8s linear infinite;
            transition: opacity 0.3s ease-out;
            pointer-events: none;
        }
        /* --- Image Icon Styles --- */
        .${buttonClassName} img { /* Target child img */
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

        /* Hide Image when hiding */
        .${buttonClassName}.hiding .bubble-visual-3d,
        .${buttonClassName}.hiding img {
            opacity: 0; transition: opacity 0.1s ease-out;
        }

        /* Gradient Animation */
        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* --- Icon Hover Gradient (Mask on Button) --- */
        @keyframes icon-gradient-shift { /* Keep for animation */
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Apply gradient and mask to the BUTTON on hover */
        .${buttonClassName}:hover {
            background: linear-gradient(to right, #F06, #0CF, #FC0, #F06); /* Apply gradient background */
            background-size: 400% 100%; /* For animation */
            animation: icon-gradient-shift 4s linear infinite; /* Apply animation */
            mask-image: var(--icon-url); /* Use CSS variable for mask */
            mask-size: 4.0rem 4.0rem; /* Match increased image size */
            mask-repeat: no-repeat;
            mask-position: center;
            -webkit-mask-image: var(--icon-url); /* Webkit prefix */
            -webkit-mask-size: 4.0rem 4.0rem; /* Match increased image size */
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
            transform: scale(1.1); /* Keep scale transform */
        }

        /* Hide the original image and bubble visual on hover */
        .${buttonClassName}:hover img,
        .${buttonClassName}:hover .bubble-visual-3d {
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
        .${buttonClassName}.bursting {
            animation: bubble-burst 0.5s ease-out forwards;
        }
        /* Ensure hiding class still works if needed */
        .${buttonClassName}.hiding img, /* Target img */
        .${buttonClassName}.hiding .bubble-visual-3d {
             opacity: 0;
             transition: opacity 0.1s ease-out;
        }

    `;

    return (
        // Removed Fragment and conditional overlay rendering
        <Html
            position={position} // Use position prop
            center
            zIndexRange={[100, 0]}
            pointerEvents="auto"
            // Stop pointer events here to prevent interference with R3F drag handlers - REMOVED
            // onPointerDownCapture={(e) => e.stopPropagation()} // Use capture phase
        >
            <style>{bubbleStyle}</style>
            <button
                ref={buttonRef}
                // id is less critical now, but keep if needed for external scripts
                className={buttonClassName}
                aria-label={label} // Use label prop
                title={label} // Use label prop
                onClick={handleInternalClick} // Use internal handler
                // Set CSS variable for the mask URL
                style={{ '--icon-url': `url(${iconPath})` }}
            >
                <span className="bubble-visual-3d"></span>
                <img src={iconPath} alt={label} />
                {/* img tag removed to decouple LCP image loading */}
            </button>
            </Html>
        // Removed Fragment closing tag
    );
}