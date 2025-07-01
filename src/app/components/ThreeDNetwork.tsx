"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Html } from "@react-three/drei";
import { Instagram, Facebook, Linkedin, Twitter, Youtube, TrendingUp, Bot } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
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
    const ref = useRef<any>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.position.y = y + Math.sin(clock.getElapsedTime() + x) * 0.13;
            ref.current.position.x = x + Math.cos(clock.getElapsedTime() + y) * 0.09;
        }
    });
    return (
        <group ref={ref} position={[x, y, 0]}>
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

function PulsingCenterNode() {
    const meshRef = useRef<any>(null);
    useFrame(({ clock }) => {
        if (meshRef.current) {
            const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.06;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[0.85, 48, 48]} />
            <meshStandardMaterial color="#3b82f6" emissive="#6366f1" emissiveIntensity={1.1} />
        </mesh>
    );
}

const ThreeDNetwork = () => (
    <div style={{ width: "100%", maxWidth: 520, height: 'min(56vw, 340px)', minHeight: 180, maxHeight: 360, margin: '0 auto', position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={0.9} />
            {/* Central One4All Node with pulsing and fixed Bot icon */}
            <PulsingCenterNode />
            <Html center position={[0, 0, 0]} style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={32} color="#fff" style={{ filter: 'drop-shadow(0 2px 8px #6366f1aa)' }} />
                <div style={{ color: '#fff', fontWeight: 900, fontSize: 18, textShadow: '0 2px 12px #3b82f6', letterSpacing: 1, marginTop: 2 }}>One4All</div>
            </Html>
            <Html center position={[0, 1.2, 0]} style={{ pointerEvents: 'none' }}>
                <TrendingUp size={24} color="#22c55e" style={{ filter: 'drop-shadow(0 2px 8px #22c55e88)' }} />
            </Html>
            {/* Platform Nodes and Connections */}
            {platforms.map((p, i) => {
                const radius = 2.1;
                const x = Math.cos(p.angle) * radius;
                const y = Math.sin(p.angle) * radius;
                return (
                    <React.Fragment key={p.name}>
                        {/* Connection Line */}
                        <Line points={[[0, 0, 0], [x, y, 0]]} color="#a5b4fc" lineWidth={1.5} />
                        {/* Node */}
                        <AnimatedNode x={x} y={y} color={p.color} Icon={p.Icon} name={p.name} />
                    </React.Fragment>
                );
            })}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
        </Canvas>
        {/* Animated floating description */}
        <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 8, textAlign: 'center', pointerEvents: 'none',
            fontWeight: 600, fontSize: 15, color: '#6366f1', textShadow: '0 2px 8px #fff',
            animation: 'floatDesc 3s ease-in-out infinite alternate',
            padding: '0 8px',
            maxWidth: 420,
            margin: '0 auto'
        }}>
            One4All connects your business to every social platform — <span style={{ color: '#22c55e', fontWeight: 700 }}>grow faster</span>, beat competitors, and win your audience.
        </div>
        <style>{`
          @keyframes floatDesc {
            0% { transform: translateY(0); }
            100% { transform: translateY(-8px); }
          }
        `}</style>
    </div>
);

export default ThreeDNetwork; 