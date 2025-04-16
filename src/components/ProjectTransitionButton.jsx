import React from 'react'; // Removed useState
import SphereNavButton from './SphereNavButton.jsx';
// import MojsBurstOverlay from './MojsBurstOverlay.jsx'; // Removed import

export default function ProjectTransitionButton({ iconPath, targetUrl, label, position, onTransition, isTransitioning }) {
    // Handler: Just call the onTransition prop passed from ThreeCanvas
    const handleClick = (event, buttonElement) => {
        if (onTransition) {
             onTransition(event, buttonElement); // Call the handler passed from parent
        }
    };

    // Render only the SphereNavButton, overlays are handled by OverlayManager
    return (
        <SphereNavButton
            iconPath={iconPath}
            targetUrl={targetUrl}
            label={label}
            position={position}
            onClick={handleClick}
            isTransitioning={isTransitioning}
        />
    );
}