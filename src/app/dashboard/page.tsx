'use client'

import React, { Suspense, useState, useEffect } from 'react';
import {
    TrendingUp,
    DollarSign,
    Users,
    Calendar,
    QrCode,
    MapPin,
    ArrowUp,
    ArrowDown,
    Eye,
    MessageSquare,
    Zap,
    Clock,
    ThumbsUp,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Client-side wrapper to prevent hydration issues
const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
};

// Shimmer loading component
const ShimmerCard = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
        <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
            <div className="w-24 h-6 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>
    </div>
);

const Overview: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [timeGreeting, setTimeGreeting] = useState('');

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1000);

        // Set time-based greeting
        const hour = new Date().getHours();
        if (hour < 12) setTimeGreeting('Good morning');
        else if (hour < 17) setTimeGreeting('Good afternoon');
        else setTimeGreeting('Good evening');

        return () => clearTimeout(timer);
    }, []);

    const stats = [
        {
            name: 'Scheduled Posts This Week',
            value: '12',
            change: '+3',
            trend: 'up',
            icon: Calendar,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            name: 'Most Engaging Post',
            value: '2.4K',
            change: 'likes',
            trend: 'up',
            icon: ThumbsUp,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            name: 'Next Best Time to Post',
            value: '2:30 PM',
            change: 'Today',
            trend: 'neutral',
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        }
    ];

    const aiSuggestion = {
        title: 'New Trend Detected',
        description: 'Vegan food hashtags trending +15% this week',
        action: 'Create a post now',
        icon: Zap,
        color: 'bg-blue-100 text-blue-600'
    };

    const calendarPreview = [
        { time: '10:00 AM', platform: 'Instagram', status: 'scheduled' },
        { time: '2:30 PM', platform: 'TikTok', status: 'scheduled' },
        { time: '6:00 PM', platform: 'Facebook', status: 'draft' }
    ];

    const setupChecklist = [
        { item: 'Connect Instagram Account', completed: true },
        { item: 'Connect TikTok Account', completed: false },
        { item: 'Set up posting schedule', completed: true },
        { item: 'Configure AI preferences', completed: false }
    ];

    const navigate = useRouter();

    if (isLoading) {
        return (
            <div className="space-y-8">
                {/* Shimmer Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 animate-pulse">
                    <div className="w-64 h-8 bg-blue-500 rounded mb-2"></div>
                    <div className="w-96 h-6 bg-blue-500 rounded"></div>
                </div>

                {/* Shimmer Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <ShimmerCard key={i} />
                    ))}
                </div>

                {/* Shimmer AI Suggestion */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
                    <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="w-64 h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600">loading</div>
            </div>
        }>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        <ClientOnly>
                            {timeGreeting}, Sighlars!
                        </ClientOnly>
                    </h1>
                    <p className="text-blue-100 text-lg">
                        Here's your platform status — performance, content activity, and AI insights.
                    </p>
                </div>

                {/* Key Metrics - 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <div className={`flex items-center space-x-1 text-sm ${stat.trend === 'up' ? 'text-green-600' :
                                        stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                                        }`}>
                                        {stat.trend === 'up' && <ArrowUp className="w-4 h-4" />}
                                        {stat.trend === 'down' && <ArrowDown className="w-4 h-4" />}
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                    <p className="text-gray-600 text-sm">{stat.name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* AI Suggestion Box - Wide Row */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg ${aiSuggestion.color} flex items-center justify-center`}>
                                <aiSuggestion.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{aiSuggestion.title}</h3>
                                <p className="text-gray-600 text-sm">{aiSuggestion.description}</p>
                            </div>
                        </div>
                        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                            {aiSuggestion.action} →
                        </button>
                    </div>
                </div>

                {/* Calendar Preview & Setup Checklist - 2 Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Calendar Preview */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Next 3 Post Slots</h3>
                        <div className="space-y-4">
                            {calendarPreview.map((slot, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${slot.status === 'scheduled' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                                        <div>
                                            <p className="text-gray-900 font-medium">{slot.time}</p>
                                            <p className="text-gray-600 text-sm">{slot.platform}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${slot.status === 'scheduled'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {slot.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Account Setup Checklist */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Setup</h3>
                        <div className="space-y-4">
                            {setupChecklist.map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    {item.completed ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-orange-500" />
                                    )}
                                    <span className={`text-sm ${item.completed ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                                        {item.item}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                            Complete setup →
                        </button>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Overview;