// src/components/ThreeCanvas.jsx
import React, { useRef, useMemo, useState, useEffect, lazy, Suspense } from 'react';
import TransitionOverlay from './TransitionOverlay.jsx';
import MojsBurstOverlay from './MojsBurstOverlay.jsx';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, useTexture, Plane, Circle } from '@react-three/drei';
import mailIcon from '../assets/textures/mail.png'; // Corrected path
import userIcon from '../assets/textures/user.png'; // Corrected path
import particleTex from '../assets/textures/particle.png'; // Corrected path
import { Color, NormalBlending } from 'three';
// import mojs from '@mojs/core'; // REMOVE this import - mojs is handled in the client component
// import SphereNavButton from './SphereNavButton.jsx'; // Direct import removed for lazy loading
const LazySphereNavButton = lazy(() => import('./SphereNavButton.jsx')); // Lazy load the button
import ProjectTransitionButton from './ProjectTransitionButton.jsx'; // Import the transition wrapper

// --- Configuration ---
const particleCount = 5000;
const sphereRadius = 2.5;
const enableInteractivity = true;

// --- Constants --- (Moved outside ParticleSystem for potential use in Bubble)
const dragSensitivity = 0.005;
const dampingFactor = 0.95;
const velocityThreshold = 0.0001;

import { MathUtils } from 'three';
// --- Main Scene Content Component ---
function SceneContent({ handleTransition, isTransitioning }) { // Accept handler and transition state as props
    const groupRef = useRef(); // Ref for the parent group (particles + button)
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    // --- Drag State and Refs ---
    const [isDragging, setIsDragging] = useState(false);
    const previousPointerPos = useRef({ x: 0, y: 0 });
    const rotationalVelocity = useRef({ x: 0, y: 0 });

    // Load particle texture
    const particleTexture = useTexture(particleTex.src); // Use imported texture src

    // Generate particle data
    const particlesData = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colorOptions = [new Color(0x00ffff), new Color(0xff00ff), new Color(0x00ff7f)];
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            positions[i3] = sphereRadius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = sphereRadius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = sphereRadius * Math.cos(phi);
            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors[i3] = color.r; colors[i3 + 1] = color.g; colors[i3 + 2] = color.b;
            sizes[i] = (Math.random() * 0.05 + 0.01) * aspect;
        }
        return { positions, colors, sizes };
    }, [aspect]);

    // --- Event Handlers (Attached to the group) ---
    const handlePointerDown = (event) => {
        if (!enableInteractivity) return;
        event.stopPropagation();
        setIsDragging(true);
        previousPointerPos.current = { x: event.clientX, y: event.clientY };
        rotationalVelocity.current = { x: 0, y: 0 };
        (event.target).setPointerCapture(event.pointerId);
        document.body.style.cursor = 'grabbing';
    };

    const handlePointerUp = (event) => {
        if (!enableInteractivity || !isDragging) return;
        event.stopPropagation();
        setIsDragging(false);
        if (event.target.hasPointerCapture(event.pointerId)) {
            (event.target).releasePointerCapture(event.pointerId);
        }
        document.body.style.cursor = 'default';
    };

    const handlePointerLeave = (event) => {
        if (isDragging) {
            event.stopPropagation();
            setIsDragging(false);
            if (event.target.hasPointerCapture(event.pointerId)) {
                (event.target).releasePointerCapture(event.pointerId);
            }
            document.body.style.cursor = 'default';
        }
    };

    const handlePointerMove = (event) => {
        if (!enableInteractivity) return;
        if (!isDragging) return;
        event.stopPropagation();

        const dx = event.clientX - previousPointerPos.current.x;
        const dy = event.clientY - previousPointerPos.current.y;

        if (groupRef.current) {
            groupRef.current.rotation.y += dx * dragSensitivity;
            groupRef.current.rotation.x += dy * dragSensitivity;
        }

        rotationalVelocity.current.x = dy * dragSensitivity;
        rotationalVelocity.current.y = dx * dragSensitivity;

        previousPointerPos.current = { x: event.clientX, y: event.clientY };
    };

    // --- Sphere Fade Animation ---
    const pointMaterialRef = useRef();

    // For button fade: collect refs for all nav buttons
    const navButtonRefs = useRef([]);

    // Animation loop (applies to the group and handles fade)
    // Fade duration in seconds
    const FADE_DURATION = 1.3; // 1300ms

    // Track fade progress
    const fadeProgress = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Sphere rotation logic
        if (isDragging) {
            // Rotation handled in move handler
        } else if (Math.abs(rotationalVelocity.current.x) > velocityThreshold || Math.abs(rotationalVelocity.current.y) > velocityThreshold) {
            groupRef.current.rotation.x += rotationalVelocity.current.x;
            groupRef.current.rotation.y += rotationalVelocity.current.y;
            rotationalVelocity.current.x *= dampingFactor;
            rotationalVelocity.current.y *= dampingFactor;
            if (Math.abs(rotationalVelocity.current.x) <= velocityThreshold) rotationalVelocity.current.x = 0;
            if (Math.abs(rotationalVelocity.current.y) <= velocityThreshold) rotationalVelocity.current.y = 0;
        } else {
            const autoRotateSpeedY = 0.05;
            const autoRotateSpeedX = 0.02;
            groupRef.current.rotation.y += delta * autoRotateSpeedY;
            groupRef.current.rotation.x += delta * autoRotateSpeedX;
        }

        // --- Fade logic for sphere and nav buttons ---
        if (pointMaterialRef.current) {
            if (isTransitioning) {
                fadeProgress.current = Math.min(fadeProgress.current + delta / FADE_DURATION, 1);
            } else {
                fadeProgress.current = Math.max(fadeProgress.current - delta / 0.2, 0); // quick reset
            }
            const opacity = MathUtils.lerp(1, 0, fadeProgress.current);
            pointMaterialRef.current.opacity = opacity;
        }
        // Nav button fade handled via prop/class, not here
    });

    return (
        // Group containing particles and HTML button, handles drag rotation
        <group
            ref={groupRef}
        >
            {/* Invisible sphere for capturing drag events reliably */}
            <mesh
                visible={false}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                onPointerMove={handlePointerMove}
            >
                <sphereGeometry args={[sphereRadius + 0.2, 32, 32]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <Points
                positions={particlesData.positions}
                colors={particlesData.colors}
                sizes={particlesData.sizes}
                stride={3}
            >
                <PointMaterial
                    ref={pointMaterialRef}
                    transparent
                    vertexColors
                    size={0.1}
                    sizeAttenuation={true}
                    map={particleTexture}
                    alphaMap={particleTexture}
                    alphaTest={0.01}
                    depthWrite={false}
                    blending={NormalBlending}
                />
            </Points>
            {/* Bubble Button 3D Implementation */}
            <Suspense fallback={null}>
                <ProjectTransitionButton
                    iconPath="/textures/code-brackets-icon.png"
                    targetUrl="/projects"
                    label="View Projects"
                    position={[0, 0, 2.6]}
                    onTransition={handleTransition}
                    isTransitioning={isTransitioning}
                />
                <LazySphereNavButton
                    iconPath={userIcon.src}
                    targetUrl="/about"
                    label="About Me"
                    position={[-0.8, 0, 2.4]}
                    isTransitioning={isTransitioning}
                />
                <LazySphereNavButton
                    iconPath={mailIcon.src}
                    targetUrl="/contact"
                    label="Contact Me"
                    position={[0.8, 0, 2.4]}
                    isTransitioning={isTransitioning}
                />
            </Suspense>
        </group>
    );
}

/**
 * ThreeCanvas now receives handleTransition and isTransitioning as props from OverlayManager.
 * It no longer manages overlay state or navigation.
 */
export default function ThreeCanvas({ handleTransition, isTransitioning }) {
    return (
        <div
            style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                zIndex: 1,
                pointerEvents: 'auto'
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 4], fov: 75 }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); }}
            >
                <ambientLight intensity={0.8} />
                <SceneContent handleTransition={handleTransition} isTransitioning={isTransitioning} />
            </Canvas>
        </div>
    );
}