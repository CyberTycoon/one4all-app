'use client'

import React, { Suspense, useState, useEffect } from 'react';
import {
    Calendar,
    Filter,
    Plus,
    Eye,
    MessageSquare,
    Heart,
    Share2,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    Search,
    ChevronLeft,
    ChevronRight,
    Grid3X3,
    List,
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    Linkedin,
    BarChart3,
    X,
    Upload,
    Image as ImageIcon,
    Video,
    FileText,
    Sparkles
} from 'lucide-react';

const ContentCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedFilters, setSelectedFilters] = useState({
        platform: 'all',
        campaign: 'all',
        status: 'all'
    });
    const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        platform: 'instagram',
        campaign: '',
        scheduledDate: '',
        scheduledTime: '',
        mediaType: 'image',
        hashtags: '',
        status: 'draft'
    });

    // Mock data for content posts
    const contentPosts = [
        {
            id: 1,
            title: "Summer Vegan Burger Launch",
            platform: "instagram",
            scheduledDate: new Date(2025, 5, 25, 14, 30),
            status: "scheduled",
            campaign: "Summer Menu 2025",
            content: "🌱 Introducing our NEW Summer Vegan Burger! Made with fresh...",
            metrics: { views: 0, likes: 0, shares: 0, comments: 0 },
            imageUrl: "/api/placeholder/300/300"
        },
        {
            id: 2,
            title: "Weekend Special Promotion",
            platform: "facebook",
            scheduledDate: new Date(2025, 5, 28, 10, 0),
            status: "published",
            campaign: "Weekend Deals",
            content: "Weekend vibes call for weekend deals! 🎉 Get 20% off...",
            metrics: { views: 1250, likes: 89, shares: 12, comments: 23 },
            imageUrl: "/api/placeholder/300/300"
        },
        {
            id: 3,
            title: "Behind the Scenes - Kitchen",
            platform: "tiktok",
            scheduledDate: new Date(2025, 5, 26, 16, 45),
            status: "draft",
            campaign: "Brand Awareness",
            content: "Ever wondered how we make our signature sauce? 👨‍🍳",
            metrics: { views: 0, likes: 0, shares: 0, comments: 0 },
            imageUrl: "/api/placeholder/300/300"
        },
        {
            id: 4,
            title: "Customer Testimonial Feature",
            platform: "linkedin",
            scheduledDate: new Date(2025, 5, 30, 9, 0),
            status: "scheduled",
            campaign: "Social Proof",
            content: "Here's what our customers are saying about our service...",
            metrics: { views: 0, likes: 0, shares: 0, comments: 0 },
            imageUrl: "/api/placeholder/300/300"
        },
        {
            id: 5,
            title: "Recipe Tutorial Video",
            platform: "youtube",
            scheduledDate: new Date(2025, 5, 24, 18, 0),
            status: "published",
            campaign: "Educational Content",
            content: "Learn how to recreate our famous avocado toast at home!",
            metrics: { views: 3420, likes: 156, shares: 34, comments: 67 },
            imageUrl: "/api/placeholder/300/300"
        }
    ];

    const platforms = [
        { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-100 text-pink-600' },
        { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-100 text-blue-600' },
        { id: 'tiktok', name: 'TikTok', icon: MessageSquare, color: 'bg-black text-white' },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-100 text-blue-800' },
        { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-100 text-red-600' }
    ];

    const campaigns = ['Summer Menu 2025', 'Weekend Deals', 'Brand Awareness', 'Social Proof', 'Educational Content'];

    const statusOptions = [
        { id: 'draft', name: 'Draft', color: 'bg-gray-100 text-gray-600', icon: AlertCircle },
        { id: 'scheduled', name: 'Scheduled', color: 'bg-blue-100 text-blue-600', icon: Clock },
        { id: 'published', name: 'Published', color: 'bg-green-100 text-green-600', icon: CheckCircle }
    ];

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const getPlatformIcon = (platformId: string) => {
        const platform = platforms.find(p => p.id === platformId);
        return platform ? platform.icon : MessageSquare;
    };

    const getPlatformColor = (platformId: string) => {
        const platform = platforms.find(p => p.id === platformId);
        return platform ? platform.color : 'bg-gray-100 text-gray-600';
    };

    const getStatusConfig = (status: string) => {
        return statusOptions.find(s => s.id === status) || statusOptions[0];
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const getPostsForDate = (date: Date | null) => {
        if (!date) return [];
        return contentPosts.filter(post => {
            const postDate = new Date(post.scheduledDate);
            return postDate.toDateString() === date.toDateString();
        });
    };

    const handleCreatePost = () => {
        // Here you would typically send the data to your backend
        console.log('Creating post:', newPost);
        setShowCreateDialog(false);
        // Reset form
        setNewPost({
            title: '',
            content: '',
            platform: 'instagram',
            campaign: '',
            scheduledDate: '',
            scheduledTime: '',
            mediaType: 'image',
            hashtags: '',
            status: 'draft'
        });
    };

    const mediaTypes = [
        { id: 'image', name: 'Image', icon: ImageIcon },
        { id: 'video', name: 'Video', icon: Video },
        { id: 'text', name: 'Text Only', icon: FileText }
    ];

    const filteredPosts = contentPosts.filter(post => {
        if (selectedFilters.platform !== 'all' && post.platform !== selectedFilters.platform) return false;
        if (selectedFilters.campaign !== 'all' && post.campaign !== selectedFilters.campaign) return false;
        if (selectedFilters.status !== 'all' && post.status !== selectedFilters.status) return false;
        return true;
    });

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

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
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 sm:gap-3">
                                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
                                Content Calendar
                            </h1>
                            <p className="text-purple-100 text-base sm:text-lg">
                                Manage and track your scheduled content across all platforms
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateDialog(true)}
                            className="bg-white text-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            New Post
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                {contentPosts.filter(p => p.status === 'scheduled').length}
                            </span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mt-2">Scheduled Posts</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                {contentPosts.filter(p => p.status === 'published').length}
                            </span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mt-2">Published This Month</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                {contentPosts.filter(p => p.status === 'draft').length}
                            </span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mt-2">Drafts</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                {Math.round(contentPosts.reduce((acc, post) => acc + post.metrics.views, 0) / contentPosts.length) || 0}
                            </span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mt-2">Avg. Views per Post</p>
                    </div>
                </div>

                {/* Filters and View Toggle */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-x-auto w-full lg:w-auto">
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <span className="font-medium text-gray-700 text-sm sm:text-base">Filters:</span>
                            </div>

                            <div className="flex gap-2 sm:gap-4 min-w-max">
                                <select
                                    className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-0"
                                    value={selectedFilters.platform}
                                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, platform: e.target.value }))}
                                >
                                    <option value="all">All Platforms</option>
                                    {platforms.map(platform => (
                                        <option key={platform.id} value={platform.id}>
                                            {platform.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-0"
                                    value={selectedFilters.campaign}
                                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, campaign: e.target.value }))}
                                >
                                    <option value="all">All Campaigns</option>
                                    {campaigns.map(campaign => (
                                        <option key={campaign} value={campaign}>
                                            {campaign}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-0"
                                    value={selectedFilters.status}
                                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value }))}
                                >
                                    <option value="all">All Status</option>
                                    {statusOptions.map(status => (
                                        <option key={status.id} value={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                            <button
                                className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial justify-center ${viewMode === 'calendar' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                onClick={() => setViewMode('calendar')}
                            >
                                <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Calendar</span>
                            </button>
                            <button
                                className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial justify-center ${viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">List</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calendar View */}
                {viewMode === 'calendar' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h2>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <button
                                    onClick={() => navigateMonth('prev')}
                                    className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <button
                                    onClick={() => setCurrentDate(new Date())}
                                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => navigateMonth('next')}
                                    className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                            {/* Day headers */}
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="bg-gray-50 p-2 sm:p-3 text-center text-xs sm:text-sm font-medium text-gray-600">
                                    <span className="hidden sm:inline">{day}</span>
                                    <span className="sm:hidden">{day.charAt(0)}</span>
                                </div>
                            ))}

                            {/* Calendar days */}
                            {getDaysInMonth(currentDate).map((date, index) => {
                                const dayPosts = getPostsForDate(date);
                                const filteredDayPosts = dayPosts.filter(post => {
                                    if (selectedFilters.platform !== 'all' && post.platform !== selectedFilters.platform) return false;
                                    if (selectedFilters.campaign !== 'all' && post.campaign !== selectedFilters.campaign) return false;
                                    if (selectedFilters.status !== 'all' && post.status !== selectedFilters.status) return false;
                                    return true;
                                });

                                return (
                                    <div key={index} className="bg-white min-h-[60px] sm:min-h-[100px] p-1 sm:p-2 relative">
                                        {date && (
                                            <>
                                                <div className="text-xs sm:text-sm text-gray-900 font-medium mb-1">
                                                    {date.getDate()}
                                                </div>
                                                <div className="space-y-1">
                                                    {filteredDayPosts.slice(0, window.innerWidth < 640 ? 1 : 2).map(post => {
                                                        const PlatformIcon = getPlatformIcon(post.platform);
                                                        const statusConfig = getStatusConfig(post.status);
                                                        return (
                                                            <div
                                                                key={post.id}
                                                                className="text-xs p-1 rounded-md bg-gray-50 border-l-2 border-purple-400 hover:bg-gray-100 cursor-pointer transition-colors"
                                                            >
                                                                <div className="flex items-center gap-1 mb-1">
                                                                    <PlatformIcon className="w-2 h-2 sm:w-3 sm:h-3" />
                                                                    <span className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${statusConfig.color.includes('bg-gray') ? 'bg-gray-400' : statusConfig.color.includes('bg-blue') ? 'bg-blue-400' : 'bg-green-400'}`} />
                                                                </div>
                                                                <div className="text-gray-700 font-medium line-clamp-1 text-xs">
                                                                    {post.title}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    {filteredDayPosts.length > (window.innerWidth < 640 ? 1 : 2) && (
                                                        <div className="text-xs text-gray-500 font-medium">
                                                            +{filteredDayPosts.length - (window.innerWidth < 640 ? 1 : 2)} more
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Content Posts ({filteredPosts.length})
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {filteredPosts.map(post => {
                                const PlatformIcon = getPlatformIcon(post.platform);
                                const statusConfig = getStatusConfig(post.status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className={`w-10 h-10 rounded-lg ${getPlatformColor(post.platform)} flex items-center justify-center flex-shrink-0`}>
                                                    <PlatformIcon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {post.title}
                                                        </h3>
                                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                            <StatusIcon className="w-3 h-3" />
                                                            {statusConfig.name}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                        {post.content}
                                                    </p>
                                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {post.scheduledDate.toLocaleDateString()} at {post.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-xs font-medium text-gray-400">Campaign:</span>
                                                            {post.campaign}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 ml-4">
                                                {post.status === 'published' && (
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="w-4 h-4" />
                                                            {post.metrics.views.toLocaleString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Heart className="w-4 h-4" />
                                                            {post.metrics.likes}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MessageSquare className="w-4 h-4" />
                                                            {post.metrics.comments}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Share2 className="w-4 h-4" />
                                                            {post.metrics.shares}
                                                        </div>
                                                    </div>
                                                )}
                                                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Suspense>
    );
};

export default ContentCalendar;