'use client'

import React, { useEffect, useState } from 'react';
import {
    Link,
    CheckCircle,
    AlertCircle,
    Settings,
    Zap,
    BarChart3,
    Users,
    Calendar,
    Landmark,
    FeatherIcon,
    Building2,
    ChevronRight,
    Trash2,
} from 'lucide-react';
import PlatformConnectionsSkeleton from './platformconnectionsskeleton';


interface SocialPlatform {
    id: string;
    name: string;
    connected: boolean;
    username?: string;
    followers?: number;
    lastPost?: string;
    status: 'connected' | 'error' | 'pending' | 'disconnected';
    features: string[];
    provider_display: string;
    provider: string;
}



const PlatformConnections: React.FC<{ currentBrand: { name: string; brand_id: string } | null }> = ({ currentBrand }) => {
    const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'connected':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            case 'pending':
                return <Zap className="w-5 h-5 text-yellow-600" />;
            default:
                return <Link className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'connected':
                return 'bg-green-100 text-green-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleConnect = (platformId: string) => {
        setPlatforms(platforms.map(platform =>
            platform.id === platformId
                ? { ...platform, status: 'pending' as const }
                : platform
        ));

        // Simulate connection process
        setTimeout(() => {
            setPlatforms(platforms.map(platform =>
                platform.id === platformId
                    ? {
                        ...platform,
                        connected: true,
                        status: 'connected' as const,
                        username: `@tacosofia_${platformId}`,
                        followers: Math.floor(Math.random() * 2000) + 500
                    }
                    : platform
            ));
        }, 2000);
    };

    const handleDisconnect = (platformId: string) => {
        setPlatforms(platforms.map(platform =>
            platform.id === platformId
                ? {
                    ...platform,
                    connected: false,
                    status: 'disconnected' as const,
                    username: undefined,
                    followers: undefined,
                    lastPost: undefined
                }
                : platform
        ));
    };

    const fetchSocialsUsingBrand = async (brand: any) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        if (!brand || !brand.brand_id) throw new Error('Invalid brand provided for socials');

        const response = await fetch(`https://mktmem-backend.onrender.com/api/users/brands/${brand.brand_id}/social-details/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch social details: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPlatforms(data.social_connections);
        console.log('Platforms fetched successfully!'

        );
        return data;
    };

    useEffect(() => {
        const loadPlatforms = async () => {
            if (!currentBrand) return;

            try {
                setIsLoading(true);
                setError(null);
                await fetchSocialsUsingBrand(currentBrand);
            } catch (error: any) {
                console.error("Error loading platforms:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadPlatforms();
    }, [currentBrand]);


    if (isLoading) {
        return <PlatformConnectionsSkeleton />;
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mx-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Platform Connections</h2>
                <div className="text-center py-8">
                    <div className="text-red-500 text-xl mb-2">⚠️</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load platforms</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mx-2">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Platform Connections</h2>

            <div className="space-y-4 md:space-y-6">
                {platforms.map(platform => (
                    <div key={platform.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                            <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    {getStatusIcon(platform.status)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">{platform.provider_display}</h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1 sm:gap-0">
                                        <span className={`px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(platform.status)}`}>
                                            {platform.status.charAt(0).toUpperCase() + platform.status.slice(1)}
                                        </span>
                                        {platform.username && (
                                            <span className="text-xs md:text-sm text-gray-600 truncate">{platform.provider}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-2 md:space-x-3 flex-shrink-0">
                                {platform.status == "connected" && (
                                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <Settings className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                )}

                                {platform.status == "connected" ? (
                                    <button
                                        onClick={() => handleDisconnect(platform.id)}
                                        className="px-3 md:px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                                    >
                                        Disconnect
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleConnect(platform.id)}
                                        disabled={platform.status === 'pending'}
                                        className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${platform.status === 'pending'
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-purple-600 text-white hover:bg-purple-700'
                                            }`}
                                    >
                                        {platform.status === 'pending' ? 'Connecting...' : 'Connect'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {platform.status == "connected" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pt-4 border-t border-gray-100">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Users className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-800">Followers</span>
                                    </div>
                                    <p className="text-base md:text-lg font-bold text-blue-900">{platform.followers?.toLocaleString()}</p>
                                </div>

                                <div className="bg-green-50 p-3 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Calendar className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium text-green-800">Last Post</span>
                                    </div>
                                    <p className="text-base md:text-lg font-bold text-green-900">{platform.lastPost}</p>
                                </div>

                                <div className="bg-purple-50 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Zap className="w-4 h-4 text-purple-600" />
                                        <span className="text-sm font-medium text-purple-800">Features</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlatformConnections