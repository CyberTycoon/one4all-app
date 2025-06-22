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
    ArrowDown
} from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';

const Overview: React.FC = () => {
    const stats = [
        {
            name: 'Monthly Revenue Impact',
            value: '$4,280',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-600'
        },
        {
            name: 'New Customers',
            value: '147',
            change: '+8.2%',
            trend: 'up',
            icon: Users,
            color: 'text-blue-600'
        },
        {
            name: 'Active Campaigns',
            value: '3',
            change: '0%',
            trend: 'neutral',
            icon: TrendingUp,
            color: 'text-purple-600'
        }
    ];

    const services = [
        {
            name: 'Presence Marketing',
            status: 'Active',
            metric: '24 posts scheduled',
            nextAction: 'Review content calendar',
            icon: Calendar,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            name: 'QR Placements',
            status: 'Active',
            metric: '5 winning bids',
            nextAction: 'Review new inventory',
            icon: QrCode,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            name: 'Itinerary Inclusion',
            status: 'Active',
            metric: '3 categories active',
            nextAction: 'Update discount settings',
            icon: MapPin,
            color: 'bg-green-100 text-green-600'
        }
    ];

    const navigate = useRouter();
    const { useContext } = React;

    const { loggedUser } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const delayAndCheckUser = async () => {
            // Simulate intentional load delay (e.g., to fetch user & stats)
            await new Promise((res) => setTimeout(res, 500)); // Adjust as needed

            if (loggedUser === null) {
                navigate.push('/onboarding/login');
            } else {
                setIsLoading(false);
            }
        };

        delayAndCheckUser();
    }, [loggedUser, navigate]);

    const displayName = loggedUser?.business_name || 'User';

    // === Spinner while loading ===
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-solid"></div>
            </div>
        );
    }


    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500">loading</div>
            </div>
        }>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {displayName}!</h1>
                    <p className="text-purple-100 text-lg">
                        Here's how your business is performing across all marketing channels.
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className={`w-12 h-12 rounded-lg ${stat.color === 'text-green-600' ? 'bg-green-100' : stat.color === 'text-blue-600' ? 'bg-blue-100' : 'bg-purple-100'} flex items-center justify-center`}>
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

                {/* Service Status Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div key={service.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {service.status}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{service.metric}</p>
                                <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
                                    {service.nextAction} →
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            {
                                action: 'New QR placement won',
                                location: 'Downtown Loft A',
                                time: '2 hours ago',
                                type: 'success'
                            },
                            {
                                action: 'Content post published',
                                location: 'Instagram',
                                time: '4 hours ago',
                                type: 'info'
                            },
                            {
                                action: 'Itinerary booking received',
                                location: 'Romantic Nights package',
                                time: '6 hours ago',
                                type: 'success'
                            },
                            {
                                action: 'Monthly billing processed',
                                location: '$247.50',
                                time: '1 day ago',
                                type: 'neutral'
                            }
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                                <div className={`w-3 h-3 rounded-full ${activity.type === 'success' ? 'bg-green-400' :
                                    activity.type === 'info' ? 'bg-blue-400' : 'bg-gray-400'
                                    }`} />
                                <div className="flex-1">
                                    <p className="text-gray-900 font-medium">{activity.action}</p>
                                    <p className="text-gray-600 text-sm">{activity.location}</p>
                                </div>
                                <span className="text-gray-500 text-sm">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Overview;