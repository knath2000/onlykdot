// src/components/ProjectCardHoverEffect.jsx
// R3F component for the card hover effect (e.g., subtle shimmer)

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

// Simple shader for a shimmer effect
const ShimmerMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0.0 } // 0 = not hovered, 1 = hovered
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover; // Interpolated hover state (0 to 1)
    varying vec2 vUv;

    // Simple noise function (replace with better one if needed)
    float random (vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // --- Subtle UV Distortion on Hover ---
      vec2 direction = normalize(vUv - uMouse);
      float dist = distance(vUv, uMouse);
      // Distortion is strongest near the mouse (dist=0) and fades out, only active on hover
      float distortionStrength = smoothstep(0.4, 0.0, dist) * uHover * 0.03; // Max 0.03 UV offset
      vec2 distortedUv = vUv + direction * distortionStrength;

      // --- Effects using Distorted UVs ---
      // Shimmer effect based on time, distorted UVs, and hover state
      float shimmer = smoothstep(0.4, 0.6, sin(distortedUv.x * 10.0 + uTime * 2.0 + random(distortedUv) * 0.5)) * 0.5;
      // Fade effect based on hover (remains the same)
      float hoverFade = uHover; // Use the direct interpolated value

      // Make shimmer more prominent near mouse when hovered (using original mouse distance)
      float mouseEffect = smoothstep(0.3, 0.0, dist) * uHover * 0.5;

      // Base color (transparent) + shimmer + mouse effect
      vec3 color = vec3(0.0); // Base transparent
      color += vec3(0.8, 0.8, 1.0) * shimmer * hoverFade; // Light blue shimmer
      color += vec3(1.0, 1.0, 1.0) * mouseEffect * hoverFade; // White highlight near mouse

      // Calculate final alpha based on combined effect intensity and hover fade
      float alpha = clamp((shimmer + mouseEffect) * hoverFade * 0.4, 0.0, 1.0); // Slightly increased alpha

      gl_FragColor = vec4(color, alpha);
    }
  `,
    transparent: true,
    side: THREE.DoubleSide,
};

function ShimmerPlane() { // Removed isHovered prop
    const meshRef = useRef(); // Ref for the mesh/plane itself
    const materialRef = useRef();
    const [isHovered, setIsHovered] = useState(false); // Internal hover state
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.elapsedTime;
            // Lerp hover state for smooth transition
            // Lerp hover state for smooth transition based on internal state
            materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uHover.value,
                isHovered ? 1.0 : 0.0, // Use internal state
                0.1 // Adjust lerp factor for speed
            );
            // Update mouse position uniform
            materialRef.current.uniforms.uMouse.value.x = mousePos.x;
            materialRef.current.uniforms.uMouse.value.y = mousePos.y;
        }
    });

    // Track mouse position relative to the plane
    const handlePointerMove = (event) => {
        // Calculate UV coordinates from intersection point
        if (event.uv) {
            setMousePos({ x: event.uv.x, y: event.uv.y });
        }
    };

    const handlePointerEnter = () => setIsHovered(true);
    const handlePointerLeave = () => setIsHovered(false);

    // Attach hover events to the mesh
    return (
        <Plane
            ref={meshRef} // Add ref to the mesh
            args={[2, 2]} // Covers the card area (adjust if needed based on aspect ratio)
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter} // Set hover state true
            onPointerLeave={handlePointerLeave} // Set hover state false
        >
            <shaderMaterial ref={materialRef} attach="material" args={[ShimmerMaterial]} />
        </Plane>
    );
}


export default function ProjectCardHoverEffect() { // Removed isHovered prop
    return (
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'auto' }}>
            <ambientLight intensity={0.5} />
            {/* No camera needed if using default orthographic for Plane */}
            <ShimmerPlane />
        </Canvas>
    );
}