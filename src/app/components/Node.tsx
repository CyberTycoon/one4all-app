'use client'
import React, { useState, useEffect } from 'react';
import { Network, Calendar, Users, MapPin, MessageSquare, Zap } from 'lucide-react';

const NetworkVisualization = () => {
    const [animationPhase, setAnimationPhase] = useState(0);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationPhase(prev => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const nodes = [
        { id: 'social', icon: Calendar, label: 'Social Media', position: { x: 15, y: 15 }, color: 'from-blue-500 to-cyan-500' },
        { id: 'targeting', icon: Users, label: 'Targeting', position: { x: 85, y: 15 }, color: 'from-emerald-500 to-teal-500' },
        { id: 'experiences', icon: MapPin, label: 'Experiences', position: { x: 15, y: 85 }, color: 'from-amber-500 to-orange-500' },
        { id: 'messaging', icon: MessageSquare, label: 'Messaging', position: { x: 85, y: 85 }, color: 'from-pink-500 to-rose-500' }
    ];

    const centerNode = { x: 50, y: 50 };

    interface Point {
        x: number;
        y: number;
    }

    const getConnectionPath = (from: Point, to: Point, phase: number): string => {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Create curved path with control points
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;

        // Offset for curve based on animation phase
        const curveOffset = 8 + Math.sin(phase * Math.PI / 2) * 4;
        const perpX = -dy / distance * curveOffset;
        const perpY = dx / distance * curveOffset;

        const controlX = midX + perpX;
        const controlY = midY + perpY;

        return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
    };

    const getDataFlowPath = (from: Point, to: Point, phase: number, offset = 0) => {
        const progress = (phase + offset) % 4 / 4;
        const dx = to.x - from.x;
        const dy = to.y - from.y;

        const currentX = from.x + dx * progress;
        const currentY = from.y + dy * progress;

        return { x: currentX, y: currentY };
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8">
            <div className=" rounded-3xl p-8 shadow-2xl border border-purple-500/20 overflow-hidden relative">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"></div>

                <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-full relative z-10">
                    <h2 className="text-3xl font-bold text-white text-center mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Business Network Hub
                    </h2>

                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                        <div className="relative w-full h-96">
                            {/* SVG for connections */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    {/* Animated gradient for connections */}
                                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8">
                                            <animate attributeName="stopColor"
                                                values="#8b5cf6;#06b6d4;#10b981;#f59e0b;#8b5cf6"
                                                dur="4s" repeatCount="indefinite" />
                                        </stop>
                                        <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9">
                                            <animate attributeName="stopColor"
                                                values="#06b6d4;#10b981;#f59e0b;#ef4444;#06b6d4"
                                                dur="4s" repeatCount="indefinite" />
                                        </stop>
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.8">
                                            <animate attributeName="stopColor"
                                                values="#10b981;#f59e0b;#ef4444;#8b5cf6;#10b981"
                                                dur="4s" repeatCount="indefinite" />
                                        </stop>
                                    </linearGradient>

                                    {/* Glow effect */}
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>

                                    {/* Data flow gradient */}
                                    <radialGradient id="dataFlow">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                                        <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                    </radialGradient>
                                </defs>

                                {/* Connection lines */}
                                {nodes.map((node, index) => (
                                    <g key={`connection-${node.id}`}>
                                        {/* Main connection path */}
                                        <path
                                            d={getConnectionPath(centerNode, node.position, animationPhase)}
                                            stroke="url(#connectionGradient)"
                                            strokeWidth="0.8"
                                            fill="none"
                                            filter="url(#glow)"
                                            opacity={hoveredNode === node.id || hoveredNode === 'center' ? 1 : 0.6}
                                        >
                                            <animate attributeName="strokeWidth"
                                                values="0.8;1.2;0.8"
                                                dur="3s"
                                                repeatCount="indefinite"
                                                begin={`${index * 0.5}s`} />
                                        </path>

                                        {/* Data flow particles */}
                                        <circle
                                            r="1"
                                            fill="url(#dataFlow)"
                                            opacity="0.9"
                                        >
                                            <animateMotion dur="2s" repeatCount="indefinite" begin={`${index * 0.5}s`}>
                                                <mpath href={`#connection-${node.id}`} />
                                            </animateMotion>
                                            <animate attributeName="r" values="0.5;1.5;0.5" dur="2s" repeatCount="indefinite" />
                                        </circle>

                                        {/* Reverse data flow */}
                                        <circle
                                            r="0.8"
                                            fill="#06b6d4"
                                            opacity="0.7"
                                        >
                                            <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${index * 0.3}s`}>
                                                <mpath href={`#connection-${node.id}`} />
                                            </animateMotion>
                                        </circle>

                                        {/* Hidden path for animation reference */}
                                        <path
                                            id={`connection-${node.id}`}
                                            d={getConnectionPath(node.position, centerNode, animationPhase)}
                                            stroke="none"
                                            fill="none"
                                        />
                                    </g>
                                ))}
                            </svg>

                            {/* Central node */}
                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300"
                                onMouseEnter={() => setHoveredNode('center')}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{
                                    transform: `translate(-50%, -50%) scale(${hoveredNode === 'center' ? 1.1 : 1})`
                                }}
                            >
                                <div className="relative">
                                    {/* Outer glow ring */}
                                    <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-spin opacity-75 blur-sm"></div>

                                    {/* Middle ring */}
                                    <div className="absolute inset-1 w-22 h-22 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full animate-pulse"></div>

                                    {/* Core node */}
                                    <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30">
                                        <Network className="w-10 h-10 text-white drop-shadow-lg" />

                                        {/* Inner sparkle effect */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-ping"></div>
                                    </div>

                                    {/* Floating energy particles */}
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
                                            style={{
                                                top: `${20 + Math.sin(i * Math.PI / 3) * 30}px`,
                                                left: `${20 + Math.cos(i * Math.PI / 3) * 30}px`,
                                                animationDelay: `${i * 0.2}s`,
                                                animationDuration: `${2 + i * 0.1}s`
                                            }}
                                        ></div>
                                    ))}
                                </div>

                                <div className="text-center mt-3">
                                    <p className="font-bold text-white text-lg drop-shadow-lg">Your Business</p>
                                    <p className="text-cyan-300 text-sm">Network Hub</p>
                                </div>
                            </div>

                            {/* Service nodes */}
                            {nodes.map((node, index) => {
                                const IconComponent = node.icon;
                                return (
                                    <div
                                        key={node.id}
                                        className="absolute z-10 transition-all duration-300 cursor-pointer"
                                        style={{
                                            top: `${node.position.y}%`,
                                            left: `${node.position.x}%`,
                                            transform: `translate(-50%, -50%) scale(${hoveredNode === node.id ? 1.2 : 1})`
                                        }}
                                        onMouseEnter={() => setHoveredNode(node.id)}
                                        onMouseLeave={() => setHoveredNode(null)}
                                    >
                                        <div className="relative">
                                            {/* Node glow effect */}
                                            <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-r ${node.color} rounded-full blur-md opacity-60 animate-pulse`}></div>

                                            {/* Main node */}
                                            <div className={`relative w-14 h-14 bg-gradient-to-br ${node.color} rounded-full flex items-center justify-center shadow-xl border-2 border-white/40 transition-all duration-300`}>
                                                <IconComponent className="w-7 h-7 text-white drop-shadow-md" />

                                                {/* Activity indicator */}
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                            </div>

                                            {/* Data transmission effect */}
                                            {hoveredNode === node.id && (
                                                <div className="absolute inset-0 w-14 h-14 border-2 border-cyan-400 rounded-full animate-ping"></div>
                                            )}
                                        </div>

                                        <div className="text-center mt-2">
                                            <p className="text-white text-sm font-medium drop-shadow-md">{node.label}</p>
                                        </div>
                                    </div>
                                );
                            })}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkVisualization;