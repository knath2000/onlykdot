import React, { useState, useCallback } from "react";
import MojsBurstOverlay from "./MojsBurstOverlay.jsx";
import TransitionOverlay from "./TransitionOverlay.jsx";
import ThreeCanvas from "./ThreeCanvas.jsx";

/**
 * OverlayManager
 * - Renders MojsBurstOverlay and TransitionOverlay as siblings to the Three.js scene.
 * - Manages overlay state and navigation at the React root.
 * - Passes a callback to ThreeScene to trigger the transition.
 */
export default function OverlayManager() {
  const [showMojs, setShowMojs] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handler to trigger overlays and navigation
  const handlePageTransition = useCallback(() => {
    setIsTransitioning(true);
    setShowMojs(true);
    setShowTransition(true);
    setTimeout(() => {
      setShowMojs(false);
      setShowTransition(false);
      setIsTransitioning(false);
      window.location.href = "/projects";
    }, 1300);
  }, []);

  return (
    <>
      {showMojs && <MojsBurstOverlay onComplete={() => {}} />}
      {showTransition && <TransitionOverlay onComplete={() => {}} />}
      <ThreeCanvas handleTransition={handlePageTransition} isTransitioning={isTransitioning} />
    </>
  );
}