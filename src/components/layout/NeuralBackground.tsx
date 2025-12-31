'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSphere() {
    const ref = useRef<THREE.Points>(null!);

    // Generating particles
    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(5000 * 3);
        const cols = new Float32Array(5000 * 3);
        const color = new THREE.Color();

        for (let i = 0; i < 5000; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

            // Teal and Purple theme
            const mixedColor = i % 2 === 0 ? '#00d9ff' : '#6366f1';
            color.set(mixedColor);
            cols[i * 3] = color.r;
            cols[i * 3 + 1] = color.g;
            cols[i * 3 + 2] = color.b;
        }
        return [pos, cols];
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x += delta / 20;
        ref.current.rotation.y += delta / 30;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function NeuralBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020617]">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <color attach="background" args={['#020617']} />
                <ambientLight intensity={0.5} />
                <ParticleSphere />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]/50 pointer-events-none" />
        </div>
    );
}
