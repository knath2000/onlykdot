// src/components/ThreeCanvas.jsx
import React, { useRef, useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, useTexture, Plane, Circle } from '@react-three/drei';
import mailIcon from '../../assets/textures/mail.png';
import userIcon from '../../assets/textures/user.png';
import particleTex from '../../assets/textures/particle.png'; // Import particle texture
import { Color, NormalBlending } from 'three';
// import mojs from '@mojs/core'; // REMOVE this import - mojs is handled in the client component
// import SphereNavButton from './SphereNavButton.jsx'; // Direct import removed for lazy loading
const LazySphereNavButton = lazy(() => import('./SphereNavButton.jsx')); // Lazy load the button

// --- Configuration ---
const particleCount = 5000;
const sphereRadius = 2.5;
const enableInteractivity = true;

// --- Constants --- (Moved outside ParticleSystem for potential use in Bubble)
const dragSensitivity = 0.005;
const dampingFactor = 0.95;
const velocityThreshold = 0.0001;

// --- InteractiveBubble3D component removed, logic moved to InteractiveBubbleClientOnly.jsx ---


// --- Main Scene Content Component ---
function SceneContent() { // Renamed from ParticleSystem
    const groupRef = useRef(); // Ref for the parent group (particles + button)
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    // --- Drag State and Refs ---
    const [isDragging, setIsDragging] = useState(false);
    const previousPointerPos = useRef({ x: 0, y: 0 });
    const rotationalVelocity = useRef({ x: 0, y: 0 });

    // Load particle texture
    const particleTexture = useTexture(particleTex.src); // Use imported texture src
    // useEffect(() => { console.log('Loaded particle texture:', particleTexture); }, [particleTexture]); // Keep console log if needed

    // Generate particle data
    const particlesData = useMemo(() => {
        // ... (particle generation logic remains the same) ...
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
        // Remove the target vs currentTarget check, as it was incorrectly blocking drags
        // if (event.target !== event.currentTarget) {
        //      console.log("PointerDown ignored, target !== currentTarget");
        //      return;
        // }
        if (!enableInteractivity) return;
        console.log("PointerDown: Starting drag");
        event.stopPropagation();
        setIsDragging(true);
        previousPointerPos.current = { x: event.clientX, y: event.clientY };
        rotationalVelocity.current = { x: 0, y: 0 };
        (event.target).setPointerCapture(event.pointerId); // Capture on the group
         // Set cursor on body for better UX during drag
        document.body.style.cursor = 'grabbing';
    };

    const handlePointerUp = (event) => {
        if (!enableInteractivity || !isDragging) return;
        console.log("PointerUp: Stopping drag");
        event.stopPropagation();
        setIsDragging(false);
        // Check if target still exists before releasing capture
        if (event.target.hasPointerCapture(event.pointerId)) {
            (event.target).releasePointerCapture(event.pointerId);
        }
        document.body.style.cursor = 'default';
    };

     const handlePointerLeave = (event) => {
        // Only stop drag if leaving the canvas while dragging
        if (isDragging) {
             console.log("PointerLeave: Stopping drag (if active)");
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
        // Only process move if dragging
        if (!isDragging) return;

        console.log("PointerMove: Dragging...");
        event.stopPropagation();

        const dx = event.clientX - previousPointerPos.current.x;
        const dy = event.clientY - previousPointerPos.current.y;

        if (groupRef.current) { // Rotate the group
            // Correct mapping: dx affects Y rotation, dy affects X rotation
            // Invert dy for more natural up/down drag feel
            groupRef.current.rotation.y += dx * dragSensitivity;
            groupRef.current.rotation.x += dy * dragSensitivity; // Remove inversion
        }

        // Update velocity correctly based on applied rotation
        rotationalVelocity.current.x = dy * dragSensitivity; // Remove inversion
        rotationalVelocity.current.y = dx * dragSensitivity;

        previousPointerPos.current = { x: event.clientX, y: event.clientY };
    };

    // Animation loop (applies to the group)
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (isDragging) {
            // Rotation handled in move handler
        } else if (Math.abs(rotationalVelocity.current.x) > velocityThreshold || Math.abs(rotationalVelocity.current.y) > velocityThreshold) {
            // Apply damping
            groupRef.current.rotation.x += rotationalVelocity.current.x;
            groupRef.current.rotation.y += rotationalVelocity.current.y;
            rotationalVelocity.current.x *= dampingFactor;
            rotationalVelocity.current.y *= dampingFactor;
            if (Math.abs(rotationalVelocity.current.x) <= velocityThreshold) rotationalVelocity.current.x = 0;
            if (Math.abs(rotationalVelocity.current.y) <= velocityThreshold) rotationalVelocity.current.y = 0;
        } else {
            // Apply incremental auto-rotation
            const autoRotateSpeedY = 0.05;
            const autoRotateSpeedX = 0.02;
            groupRef.current.rotation.y += delta * autoRotateSpeedY;
            groupRef.current.rotation.x += delta * autoRotateSpeedX;
        }
    });

    return (
        // Group containing particles and HTML button, handles drag rotation
        <group
            ref={groupRef}
            // Event handlers moved to the invisible mesh below
        >
            {/* Invisible sphere for capturing drag events reliably */}
            <mesh
                visible={false} // Make it invisible
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                onPointerMove={handlePointerMove}
            >
                <sphereGeometry args={[sphereRadius + 0.2, 32, 32]} /> {/* Slightly larger */}
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <Points
                // Event handlers are now on the invisible mesh, not the group
                positions={particlesData.positions}
                colors={particlesData.colors}
                sizes={particlesData.sizes}
                stride={3}
            >
                <PointMaterial
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
            {/* Wrap lazy-loaded buttons in Suspense */}
            <Suspense fallback={null}> {/* Or provide a simple placeholder mesh */}
                <LazySphereNavButton
                    iconPath="/textures/code-brackets-icon.png"
                    targetUrl="/projects"
                    label="View Projects"
                    position={[0, 0, 2.6]} // Center, slightly forward
                />
                <LazySphereNavButton
                    iconPath={userIcon.src} // Use imported image src
                    targetUrl="/about"
                    label="About Me"
                    position={[-0.8, 0, 2.4]} // Left offset
                />
                <LazySphereNavButton
                    iconPath={mailIcon.src} // Use imported image src
                    targetUrl="/contact"
                    label="Contact Me"
                    position={[0.8, 0, 2.4]} // Right offset
                />
            </Suspense>
        </group>
    );
}

// --- BubbleButton3D Component Removed ---
// The logic is now entirely within InteractiveBubbleClientOnly.jsx

// --- Main Canvas Component ---
export default function ThreeCanvas() {
    // console.log("ThreeCanvas (R3F): Initializing..."); // Keep if needed
    return (
        <div
            // aria-hidden="true" removed to allow focus on interactive elements within
            style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                zIndex: -1,
                pointerEvents: 'none' // Container doesn't need events
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 4], fov: 75 }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); }}
                // Let R3F handle pointer events on its elements within the canvas
            >
                <ambientLight intensity={0.8} />
                <SceneContent /> {/* Renamed from ParticleSystem */}
            </Canvas>
        </div>
    );
}