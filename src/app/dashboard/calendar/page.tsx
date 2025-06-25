'use client'

import React, { useState } from 'react';
import {
    Calendar,
    Plus,
    Image,
    Video,
    Type,
    Clock,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Users,
    TrendingUp,
    Settings,
    Link,
    Eye,
    Edit,
    Trash2,
    Upload,
    Grid,
    List,
    Filter,
    Menu,
    X
} from 'lucide-react';

interface ScheduledPost {
    id: string;
    date: string;
    time: string;
    type: 'text' | 'image' | 'video';
    content: string;
    caption: string;
    platforms: string[];
    status: 'scheduled' | 'published' | 'draft';
    canvaLink?: string;
}

const PresenceMarketing: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showSocialConnections, setShowSocialConnections] = useState(false);
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
    const [postType, setPostType] = useState<'text' | 'image' | 'video'>('text');
    const [draggedPost, setDraggedPost] = useState<ScheduledPost | null>(null);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
        {
            id: '1',
            date: '2024-01-15',
            time: '12:00',
            type: 'image',
            content: 'Fresh tacos made daily!',
            caption: 'Start your week right with our signature tacos! 🌮 #TacoSofia #FreshDaily',
            platforms: ['Instagram', 'Facebook'],
            status: 'scheduled'
        },
        {
            id: '2',
            date: '2024-01-17',
            time: '18:00',
            type: 'text',
            content: 'Taco Tuesday special: Buy 2 get 1 free!',
            caption: 'It\'s Taco Tuesday! 🎉 Buy 2 tacos and get 1 FREE! Valid all day. #TacoTuesday #SpecialOffer',
            platforms: ['Facebook', 'Twitter'],
            status: 'scheduled'
        },
        {
            id: '3',
            date: '2024-01-20',
            time: '15:30',
            type: 'video',
            content: 'Behind the scenes: Making our signature salsa',
            caption: 'Watch our chef prepare our famous salsa verde! 👨‍🍳✨ #BehindTheScenes #FreshSalsa',
            platforms: ['Instagram', 'TikTok'],
            status: 'draft'
        }
    ]);

    const [socialConnections, setSocialConnections] = useState({
        facebook: { connected: true, username: '@tacosofia' },
        instagram: { connected: true, username: '@tacosofia_atx' },
        twitter: { connected: false, username: '' },
        linkedin: { connected: false, username: '' },
        googleBusiness: { connected: true, username: 'Taco Sofia' },
        tiktok: { connected: false, username: '' },
        youtube: { connected: false, username: '' }
    });

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const formatMonth = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        setCurrentDate(newDate);
    };

    const getPostsForDate = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return scheduledPosts.filter(post => post.date === dateStr);
    };

    const getPostTypeColor = (type: string) => {
        switch (type) {
            case 'image': return 'bg-blue-500';
            case 'video': return 'bg-purple-500';
            case 'text': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-800';
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'draft': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleDragStart = (post: ScheduledPost) => {
        setDraggedPost(post);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetDate: string) => {
        e.preventDefault();
        if (draggedPost) {
            setScheduledPosts(posts =>
                posts.map(post =>
                    post.id === draggedPost.id
                        ? { ...post, date: targetDate }
                        : post
                )
            );
            setDraggedPost(null);
        }
    };

    const SocialConnectionsModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Social Media Connections</h3>
                        <button
                            onClick={() => setShowSocialConnections(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                        {Object.entries(socialConnections).map(([platform, data]) => {
                            const platformNames = {
                                facebook: 'Facebook',
                                instagram: 'Instagram',
                                twitter: 'X (Twitter)',
                                linkedin: 'LinkedIn',
                                googleBusiness: 'Google Business Profile',
                                tiktok: 'TikTok',
                                youtube: 'YouTube Shorts'
                            };

                            return (
                                <div key={platform} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg space-y-3 sm:space-y-0">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${data.connected ? 'bg-green-100' : 'bg-gray-100'
                                            }`}>
                                            <Link className={`w-5 h-5 ${data.connected ? 'text-green-600' : 'text-gray-400'
                                                }`} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-gray-900 truncate">
                                                {platformNames[platform as keyof typeof platformNames]}
                                            </h4>
                                            <p className="text-sm text-gray-600 truncate">
                                                {data.connected ? data.username : 'Not connected'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex-shrink-0 w-full sm:w-auto ${data.connected
                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                            : 'bg-purple-600 text-white hover:bg-purple-700'
                                            }`}
                                    >
                                        {data.connected ? 'Disconnect' : 'Connect'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mt-6">
                        <h4 className="font-medium text-blue-900 mb-2">📱 Connection Benefits</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Schedule posts across all platforms simultaneously</li>
                            <li>• Unified analytics and performance tracking</li>
                            <li>• Automatic optimal posting time suggestions</li>
                            <li>• Cross-platform content optimization</li>
                        </ul>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            onClick={() => setShowSocialConnections(false)}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const CreatePostModal = () => (
        <div
            onClick={() => {
                setShowCreatePost(false);
            }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Create New Post</h3>
                        <button
                            onClick={() => setShowCreatePost(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    {/* Post Type Selection */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                        {[
                            { type: 'text', icon: Type, label: 'Text Post' },
                            { type: 'image', icon: Image, label: 'Image Post' },
                            { type: 'video', icon: Video, label: 'Video Post' }
                        ].map(({ type, icon: Icon, label }) => (
                            <button
                                key={type}
                                onClick={() => setPostType(type as any)}
                                className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 px-2 sm:px-4 py-3 rounded-lg border-2 transition-colors ${postType === type
                                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-xs sm:text-sm text-center">{label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Media Upload Section */}
                    {postType !== 'text' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                {postType === 'image' ? 'Upload Image' : 'Upload Video'}
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                    <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Upload from device</p>
                                    <p className="text-xs text-gray-500">JPG, PNG, MP4 up to 10MB</p>
                                </div>

                                <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 sm:p-6 text-center hover:border-purple-400 transition-colors cursor-pointer bg-purple-50">
                                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-purple-600 rounded mx-auto mb-2 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">C</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-purple-700 mb-1">Import from Canva</p>
                                    <p className="text-xs text-purple-600">Paste Canva share link</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                rows={3}
                                placeholder="Write your post caption..."
                            />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 space-y-2 sm:space-y-0">
                                <button className="flex items-center space-x-2 text-purple-600 text-sm hover:text-purple-700">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Generate with AI</span>
                                </button>
                                <span className="text-xs text-gray-500">0/280 characters</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
                                <input
                                    type="time"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Platforms</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Object.entries(socialConnections)
                                    .filter(([_, data]) => data.connected)
                                    .map(([platform, data]) => {
                                        const platformNames = {
                                            facebook: 'Facebook',
                                            instagram: 'Instagram',
                                            twitter: 'X (Twitter)',
                                            linkedin: 'LinkedIn',
                                            googleBusiness: 'Google Business',
                                            tiktok: 'TikTok',
                                            youtube: 'YouTube'
                                        };

                                        return (
                                            <label key={platform} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <input type="checkbox" className="rounded text-purple-600 flex-shrink-0" />
                                                <span className="text-sm font-medium truncate">
                                                    {platformNames[platform as keyof typeof platformNames]}
                                                </span>
                                            </label>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-8 space-y-4 sm:space-y-0">
                        <button className="text-gray-600 hover:text-gray-800 font-medium">
                            Save as Draft
                        </button>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={() => setShowCreatePost(false)}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowCreatePost(false)}
                                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Schedule Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const PostPreview = ({ post }: { post: ScheduledPost }) => (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
            <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status}
                </span>
                <span className="text-xs text-gray-500">{post.time}</span>
            </div>
            <p className="text-sm text-gray-900 mb-2">{post.caption}</p>
            <div className="flex flex-wrap gap-1">
                {post.platforms.map(platform => (
                    <span key={platform} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {platform}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col space-y-4">
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Content Calendar</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Schedule and manage your social media presence</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                        onClick={() => setShowSocialConnections(true)}
                        className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        <Settings className="w-4 h-4" />
                        <span>Social Accounts</span>
                    </button>
                    <button
                        onClick={() => setShowCreatePost(true)}
                        className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Post</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                    { label: 'Posts This Month', value: '12', icon: Calendar, color: 'purple' },
                    { label: 'Scheduled Posts', value: '8', icon: Clock, color: 'blue' },
                    { label: 'Total Reach', value: '2.4K', icon: Users, color: 'green' },
                    { label: 'Engagement Rate', value: '4.2%', icon: TrendingUp, color: 'purple' }
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.color === 'purple' ? 'bg-purple-100' :
                                    stat.color === 'blue' ? 'bg-blue-100' :
                                        stat.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                                    }`}>
                                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color === 'purple' ? 'text-purple-600' :
                                        stat.color === 'blue' ? 'text-blue-600' :
                                            stat.color === 'green' ? 'text-green-600' : 'text-purple-600'
                                        }`} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-gray-600 text-xs sm:text-sm truncate">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{formatMonth(currentDate)}</h2>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <button
                                    onClick={() => navigateMonth('prev')}
                                    className="p-1.5 sm:p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <button
                                    onClick={() => navigateMonth('next')}
                                    className="p-1.5 sm:p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            {[
                                { mode: 'month', icon: Grid, label: 'Month' },
                                { mode: 'week', icon: List, label: 'Week' },
                                { mode: 'day', icon: Calendar, label: 'Day' }
                            ].map(({ mode, icon: Icon, label }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode as any)}
                                    className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${viewMode === mode
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="min-w-full px-4 sm:px-0">
                            <div className="grid grid-cols-7 gap-px sm:gap-1 bg-gray-200 sm:bg-transparent rounded-lg overflow-hidden sm:overflow-visible">
                                {/* Day Headers */}
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="bg-white sm:bg-transparent p-2 sm:p-3 text-center text-gray-500 font-medium text-xs sm:text-sm">
                                        <span className="hidden sm:inline">{day}</span>
                                        <span className="sm:hidden">{day.charAt(0)}</span>
                                    </div>
                                ))}

                                {/* Empty cells for days before month starts */}
                                {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                                    <div key={`empty-${i}`} className="bg-white sm:bg-transparent h-16 sm:h-24 lg:h-32 p-1 sm:p-2" />
                                ))}

                                {/* Calendar days */}
                                {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                                    const day = i + 1;
                                    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                    const dayPosts = getPostsForDate(day);

                                    return (
                                        <div
                                            key={day}
                                            className="bg-white sm:bg-transparent h-16 sm:h-24 lg:h-32 p-1 sm:p-2 sm:border sm:border-gray-100 sm:rounded-lg hover:bg-gray-50 transition-colors relative"
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, dateStr)}
                                            onMouseEnter={() => setHoveredDate(dateStr)}
                                            onMouseLeave={() => setHoveredDate(null)}
                                        >
                                            <div className="font-medium text-gray-900 mb-1 text-xs sm:text-sm">{day}</div>
                                            <div className="space-y-0.5 sm:space-y-1">
                                                {dayPosts.slice(0, window.innerWidth < 640 ? 1 : 2).map(post => (
                                                    <div
                                                        key={post.id}
                                                        draggable
                                                        onDragStart={() => handleDragStart(post)}
                                                        className={`text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded text-white truncate cursor-move relative group ${getPostTypeColor(post.type)} hover:opacity-80 transition-opacity`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs">{post.time}</span>
                                                            <div className="hidden sm:flex space-x-1 opacity-0 group-hover:opacity-100">
                                                                <button className="hover:bg-white hover:bg-opacity-20 rounded p-0.5">
                                                                    <Eye className="w-3 h-3" />
                                                                </button>
                                                                <button className="hover:bg-white hover:bg-opacity-20 rounded p-0.5">
                                                                    <Edit className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="truncate text-xs hidden sm:block">{post.content}</div>

                                                        {hoveredDate === dateStr && window.innerWidth >= 640 && (
                                                            <PostPreview post={post} />
                                                        )}
                                                    </div>
                                                ))}
                                                {dayPosts.length > (window.innerWidth < 640 ? 1 : 2) && (
                                                    <div className="text-xs text-gray-500 px-1 sm:px-2">
                                                        +{dayPosts.length - (window.innerWidth < 640 ? 1 : 2)} more
                                                    </div>
                                                )}
                                            </div>

                                            {dayPosts.length === 0 && (
                                                <button
                                                    onClick={() => setShowCreatePost(true)}
                                                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                                >
                                                    <Plus className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Posts */}
            <div className="fixed bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Posts</h3>
                <div className="space-y-4">
                    {scheduledPosts
                        .filter(post => post.status === 'scheduled')
                        .slice(0, 5)
                        .map(post => (
                            <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors space-y-3 sm:space-y-0">
                                <div className="flex items-center space-x-4 min-w-0 flex-1">
                                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getPostTypeColor(post.type)}`} />
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-gray-900 truncate">{post.content}</p>
                                        <p className="text-sm text-gray-600">{post.date} at {post.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end space-x-3">
                                    <div className="flex flex-wrap gap-1">
                                        {post.platforms.map(platform => (
                                            <span key={platform} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                {platform}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex space-x-2 flex-shrink-0">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {showCreatePost && <CreatePostModal />}
            {showSocialConnections && <SocialConnectionsModal />}
        </div>
    );
};

export default PresenceMarketing;