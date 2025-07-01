"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Instagram, Facebook, Linkedin, Twitter, Youtube, Bot } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

const platforms = [
    { name: "Instagram", color: "#E1306C", Icon: Instagram, angle: 0 },
    { name: "Facebook", color: "#1877F3", Icon: Facebook, angle: Math.PI / 3 },
    { name: "LinkedIn", color: "#0A66C2", Icon: Linkedin, angle: 2 * Math.PI / 3 },
    { name: "TikTok", color: "#000000", Icon: SiTiktok, angle: Math.PI },
    { name: "Twitter", color: "#1DA1F2", Icon: Twitter, angle: 4 * Math.PI / 3 },
    { name: "YouTube", color: "#FF0000", Icon: Youtube, angle: 5 * Math.PI / 3 },
];

function PlatformNode({ x, y, color, Icon, name }: any) {
    return (
        <group position={[x, y, 0]}>
            <mesh>
                <sphereGeometry args={[0.45, 32, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <Html center style={{ pointerEvents: 'none', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', borderRadius: '50%', padding: 6, boxShadow: '0 2px 8px #0002', border: `2px solid ${color}` }}>
                    <Icon size={28} color={color === '#000000' ? '#111' : color} style={{ display: 'block' }} />
                </div>
            </Html>
        </group>
    );
}

const ThreeDFloatingIcon = () => (
    <div style={{ width: "100%", maxWidth: 520, height: 'min(56vw, 320px)', minHeight: 160, maxHeight: 320, margin: '0 auto' }}>
        <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />
            <Suspense fallback={null}>
                {/* Central One4All Node */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.85, 48, 48]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#6366f1" emissiveIntensity={0.8} />
                </mesh>
                <Html center position={[0, 0, 0]} style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={32} color="#fff" style={{ filter: 'drop-shadow(0 2px 8px #6366f1aa)' }} />
                    <div style={{ color: '#fff', fontWeight: 900, fontSize: 16, textShadow: '0 2px 12px #3b82f6', letterSpacing: 1, marginTop: 2 }}>One4All</div>
                </Html>
                {/* Orbiting Platform Nodes */}
                {platforms.map((p, i) => {
                    const radius = 1.5;
                    const x = Math.cos(p.angle) * radius;
                    const y = Math.sin(p.angle) * radius;
                    return <PlatformNode key={p.name} x={x} y={y} color={p.color} Icon={p.Icon} name={p.name} />;
                })}
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2.5} />
        </Canvas>
    </div>
);

export default ThreeDFloatingIcon; 