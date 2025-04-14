// src/components/SkillsEffect.jsx
// R3F component for a subtle, animated background shader effect.

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

// Simple animated noise shader
const BackgroundShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2() }, // Pass canvas resolution
        uOpacity: { value: 0.3 } // Control overall opacity via uniform
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
    uniform vec2 uResolution;
    uniform float uOpacity;
    varying vec2 vUv;

    // Simple pseudo-random noise function
    float random (vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // 2D Noise based on Morgan McGuire @morgan3d article
    float noise (vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth interpolation (smoothstep)
        vec2 u = f*f*(3.0-2.0*f);
        // Mix 4 corners percentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    void main() {
      // Scale UVs and add time for animation
      vec2 scaledUv = vUv * 4.0 + vec2(uTime * 0.05, uTime * 0.03); // Adjust scaling and speed
      float n = noise(scaledUv);

      // Use noise to create a subtle pattern, map to a color
      vec3 color = vec3(n * 0.1, n * 0.15, n * 0.2); // Dark blueish noise

      gl_FragColor = vec4(color, n * uOpacity); // Use noise value for alpha, scaled by uniform
    }
  `,
    transparent: true,
    depthWrite: false, // No need to write depth for background
};

function ShaderBackgroundPlane() {
    const materialRef = useRef();
    const { size, viewport } = useThree(); // Get canvas size for resolution uniform

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // Pass pixel resolution for potential pixel-based effects
            materialRef.current.uniforms.uResolution.value.x = size.width * window.devicePixelRatio;
            materialRef.current.uniforms.uResolution.value.y = size.height * window.devicePixelRatio;
        }
    });

    // Use a Plane that covers the viewport.
    // We scale it based on the viewport dimensions derived from the camera settings.
    return (
        <Plane args={[viewport.width, viewport.height]}>
            <shaderMaterial ref={materialRef} args={[BackgroundShaderMaterial]} />
        </Plane>
    );
}


export default function SkillsEffect() {
    console.log("SkillsEffect Canvas Initializing (should happen when visible)");
    return (
        // Container div for positioning and accessibility
        <div
            aria-hidden="true" // Decorative element
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, // Ensure it's behind content
                pointerEvents: 'none' // Prevent interaction blocking
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 1], fov: 50 }} // Camera position less critical for full-screen shader
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                }}
            >
                {/* No lighting needed for this shader */}
                <ShaderBackgroundPlane />
            </Canvas>
        </div>
    );
}