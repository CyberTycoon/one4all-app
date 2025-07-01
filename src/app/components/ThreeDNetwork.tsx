"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Html } from "@react-three/drei";
import { Instagram, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SiTiktok } from 'react-simple-icons';
import * as THREE from 'three';

const platforms = [
    { name: "Instagram", color: "#E1306C", Icon: Instagram, angle: 0 },
    { name: "Facebook", color: "#1877F3", Icon: Facebook, angle: Math.PI / 3 },
    { name: "LinkedIn", color: "#0A66C2", Icon: Linkedin, angle: 2 * Math.PI / 3 },
    { name: "TikTok", color: "#000000", Icon: SiTiktok, angle: Math.PI },
    { name: "Twitter", color: "#1DA1F2", Icon: Twitter, angle: 4 * Math.PI / 3 },
    { name: "YouTube", color: "#FF0000", Icon: Youtube, angle: 5 * Math.PI / 3 },
];

function AnimatedNode({ x, y, color, Icon, name }: any) {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.position.y = y + Math.sin(clock.getElapsedTime() + x) * 0.15;
            ref.current.position.x = x + Math.cos(clock.getElapsedTime() + y) * 0.08;
        }
    });
    return (
        <group ref={ref} position={[x, y, 0]}>
            <mesh>
                <sphereGeometry args={[0.32, 24, 24]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <Html center style={{ pointerEvents: 'none', width: 32, height: 32 }}>
                <Icon size={24} color={color} style={{ background: '#fff', borderRadius: '50%', padding: 2, boxShadow: '0 2px 8px #0001' }} />
            </Html>
        </group>
    );
}

const ThreeDNetwork = () => (
    <div style={{ width: "100%", height: "320px", minHeight: 220, maxHeight: 400 }}>
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />
            {/* Central One4All Node */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial color="#3b82f6" emissive="#6366f1" emissiveIntensity={0.7} />
            </mesh>
            <Html center position={[0, -1.1, 0]} style={{ pointerEvents: 'none' }}>
                <div style={{ color: '#3b82f6', fontWeight: 700, fontSize: 18, textShadow: '0 2px 8px #fff' }}>One4All</div>
            </Html>
            {/* Platform Nodes and Connections */}
            {platforms.map((p, i) => {
                const radius = 2.2;
                const x = Math.cos(p.angle) * radius;
                const y = Math.sin(p.angle) * radius;
                return (
                    <React.Fragment key={p.name}>
                        {/* Connection Line */}
                        <Line points={[[0, 0, 0], [x, y, 0]]} color="#a5b4fc" lineWidth={2} />
                        {/* Node */}
                        <AnimatedNode x={x} y={y} color={p.color} Icon={p.Icon} name={p.name} />
                    </React.Fragment>
                );
            })}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
        </Canvas>
    </div>
);

export default ThreeDNetwork; 