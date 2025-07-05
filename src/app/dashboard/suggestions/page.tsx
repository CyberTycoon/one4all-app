'use client'

import React, { Suspense, useState, useEffect } from 'react';
import {
    Zap,
    Brain,
    Clock,
    MapPin,
    TrendingUp,
    Eye,
    Calendar,
    Users,
    Hash,
    Image,
    Video,
    MessageSquare,
    ThumbsUp,
    Share2,
    ArrowRight,
    Sparkles,
    Target,
    Sun,
    CloudRain,
    Flame,
    Star,
    ChevronDown,
    ChevronUp,
    Copy,
    Edit3,
    Send,
    Search,
    Filter,
    Play,
    FileText,
    Grid3X3
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const AISuggestions: React.FC = () => {
    const navigate = useRouter();
    const { useContext } = React;
    const [isLoading, setIsLoading] = useState(false);
    const [searchPrompt, setSearchPrompt] = useState('');
    const [selectedFormat, setSelectedFormat] = useState('all');
    const [selectedIntent, setSelectedIntent] = useState('all');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);


    const suggestions = [
        {
            id: 1,
            format: 'carousel',
            intent: 'promo',
            platform: 'Instagram',
            contentType: 'image',
            title: 'Weekly Specials Showcase',
            caption: "🍽️ This week's chef specials are here! From our signature truffle pasta to the new seasonal burger, every dish tells a story of fresh, local ingredients. Which one will you try first?",
            hashtags: ['#WeeklySpecials', '#ChefSpecial', '#LocalEats', '#FreshIngredients', '#Foodie'],
            cta: 'Book your table now and experience the difference!',
            bestTime: 'Today, 6:30 PM',
            expectedEngagement: '+45% reach',
            confidence: 92,
            label: 'Promotional',
            labelColor: 'bg-orange-100 text-orange-700 border-orange-200',
            insights: [
                { type: 'trending', text: 'Menu showcases trending +180%', icon: TrendingUp },
                { type: 'timing', text: 'Perfect for weekend planning', icon: Clock },
                { type: 'audience', text: 'Your audience loves food photography', icon: Users }
            ]
        },
        {
            id: 2,
            format: 'reel',
            intent: 'engagement',
            platform: 'TikTok',
            contentType: 'video',
            title: 'Behind-the-Scenes Kitchen Magic',
            caption: "✨ Ever wondered what goes into making our signature sauce? Here's a peek behind the curtain! The secret is in the technique, not just the ingredients. What's your favorite cooking hack?",
            hashtags: ['#BehindTheScenes', '#KitchenMagic', '#ChefLife', '#CookingTips', '#FoodTok'],
            cta: 'Drop a ❤️ if you want more kitchen secrets!',
            bestTime: 'Tomorrow, 7:15 PM',
            expectedEngagement: '+127% views',
            confidence: 95,
            label: 'Viral',
            labelColor: 'bg-red-100 text-red-700 border-red-200',
            insights: [
                { type: 'trending', text: 'Behind-the-scenes +65% engagement', icon: Sparkles },
                { type: 'sound', text: 'Trending sound used in 2.3M+ videos', icon: Flame },
                { type: 'format', text: 'Food reveals performing 3x better', icon: Star }
            ]
        },
        {
            id: 3,
            format: 'text-only',
            intent: 'educational',
            platform: 'Facebook',
            contentType: 'text',
            title: 'Food Sustainability Tips',
            caption: "🌱 Did you know? We source 85% of our ingredients from local farms within 50 miles. Supporting local farmers not only ensures fresher ingredients but also reduces our carbon footprint. Here are 3 simple ways you can support sustainable dining: 1) Choose seasonal menus 2) Ask about ingredient origins 3) Support restaurants that prioritize local sourcing",
            hashtags: ['#Sustainability', '#LocalFarming', '#GreenDining', '#EcoFriendly', '#FarmToTable'],
            cta: 'Share your sustainable dining tips in the comments!',
            bestTime: 'Thursday, 12:30 PM',
            expectedEngagement: '+52% reach',
            confidence: 87,
            label: 'Educational',
            labelColor: 'bg-green-100 text-green-700 border-green-200',
            insights: [
                { type: 'trending', text: 'Sustainability content +89% engagement', icon: TrendingUp },
                { type: 'audience', text: 'Your audience values eco-conscious choices', icon: Users },
                { type: 'timing', text: 'Lunch decision time for office workers', icon: Clock }
            ]
        },
        {
            id: 4,
            format: 'carousel',
            intent: 'engagement',
            platform: 'Instagram',
            contentType: 'image',
            title: 'Customer Spotlight Series',
            caption: "🌟 Meet Sarah, our loyal customer who's been dining with us for 5 years! Her favorite dish? Our signature truffle pasta. 'Every bite feels like a celebration,' she says. We love hearing your stories!",
            hashtags: ['#CustomerSpotlight', '#LoyalCustomers', '#TrufflePasta', '#RestaurantLove', '#Community'],
            cta: 'Tag us in your dining photos for a chance to be featured!',
            bestTime: 'Friday, 2:00 PM',
            expectedEngagement: '+73% saves',
            confidence: 91,
            label: 'Time-sensitive',
            labelColor: 'bg-blue-100 text-blue-700 border-blue-200',
            insights: [
                { type: 'social-proof', text: 'Customer stories drive 89% more trust', icon: ThumbsUp },
                { type: 'format', text: 'Carousels get 3x more saves', icon: Star },
                { type: 'audience', text: 'Your followers love community content', icon: Users }
            ]
        },
        {
            id: 5,
            format: 'reel',
            intent: 'promo',
            platform: 'TikTok',
            contentType: 'video',
            title: 'New Menu Item Reveal',
            caption: "🔥 NEW on our menu: The Spicy Honey Glazed Chicken! Watch as we drizzle that golden honey glaze... the sound alone will make you hungry! Limited time only - get it while it's hot!",
            hashtags: ['#NewMenu', '#SpicyHoney', '#ChickenLover', '#FoodReveal', '#LimitedTime'],
            cta: 'Order now before we run out! Link in bio 🔗',
            bestTime: 'Today, 5:00 PM',
            expectedEngagement: '+95% views',
            confidence: 88,
            label: 'Promotional',
            labelColor: 'bg-orange-100 text-orange-700 border-orange-200',
            insights: [
                { type: 'trending', text: 'Food reveals trending +120%', icon: Flame },
                { type: 'urgency', text: 'Limited time offers drive FOMO', icon: Clock },
                { type: 'format', text: 'ASMR food content performing well', icon: Star }
            ]
        },
        {
            id: 6,
            format: 'text-only',
            intent: 'engagement',
            platform: 'Facebook',
            contentType: 'text',
            title: 'Weekend Poll',
            caption: "🤔 Weekend plans? We're curious! What's your go-to weekend meal? A) Brunch with friends B) Cozy dinner at home C) Trying a new restaurant D) Cooking something special Drop your choice in the comments and tell us why!",
            hashtags: ['#WeekendPlans', '#WeekendVibes', '#FoodPoll', '#Community', '#WeekendEats'],
            cta: 'Vote in the comments and share your weekend food traditions!',
            bestTime: 'Saturday, 10:00 AM',
            expectedEngagement: '+68% comments',
            confidence: 85,
            label: 'Engagement',
            labelColor: 'bg-purple-100 text-purple-700 border-purple-200',
            insights: [
                { type: 'engagement', text: 'Polls drive 3x more comments', icon: MessageSquare },
                { type: 'timing', text: 'Weekend planning peak time', icon: Calendar },
                { type: 'audience', text: 'Your audience loves interactive content', icon: Users }
            ]
        }
    ];

    const quickStats = [
        {
            name: 'Suggestions Generated',
            value: '47',
            subtitle: 'This week',
            icon: Brain,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            name: 'Avg. Confidence Score',
            value: '89%',
            subtitle: 'AI accuracy',
            icon: Target,
            color: 'bg-green-100 text-green-600'
        },
        {
            name: 'Implemented Today',
            value: '3',
            subtitle: 'Auto-scheduled',
            icon: Zap,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    const formats = [
        { id: 'all', name: 'All Formats', icon: Grid3X3 },
        { id: 'carousel', name: 'Carousel', icon: Grid3X3 },
        { id: 'reel', name: 'Reel', icon: Play },
        { id: 'text-only', name: 'Text Only', icon: FileText }
    ];

    const intents = [
        { id: 'all', name: 'All Intents', icon: Target },
        { id: 'promo', name: 'Promotional', icon: TrendingUp },
        { id: 'educational', name: 'Educational', icon: Brain },
        { id: 'engagement', name: 'Engagement', icon: MessageSquare }
    ];

    const filteredSuggestions = suggestions.filter(suggestion => {
        const formatMatch = selectedFormat === 'all' || suggestion.format === selectedFormat;
        const intentMatch = selectedIntent === 'all' || suggestion.intent === selectedIntent;
        const promptMatch = searchPrompt === '' ||
            suggestion.title.toLowerCase().includes(searchPrompt.toLowerCase()) ||
            suggestion.caption.toLowerCase().includes(searchPrompt.toLowerCase());
        return formatMatch && intentMatch && promptMatch;
    });

    const handleUseThis = (suggestion: any) => {
        // Route to Create Post with pre-filled data
        navigate.push('/dashboard/create');
    };

    const displayName = 'Sighlars';

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
            </div>
        );
    }

    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600">loading</div>
            </div>
        }>
            <div className="space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                            <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-bold">AI Suggestions</h1>
                            <p className="text-blue-100 text-sm sm:text-base">Personalized content recommendations powered by predictive models</p>
                        </div>
                    </div>
                </div>

                {/* Prompt-based UI */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">What type of content are you looking for?</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    type="text"
                                    placeholder="e.g., What's trending in fitness? Seasonal content ideas..."
                                    value={searchPrompt}
                                    onChange={(e) => setSearchPrompt(e.target.value)}
                                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 sm:flex-none">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                                <select
                                    value={selectedFormat}
                                    onChange={(e) => setSelectedFormat(e.target.value)}
                                    className="w-full sm:w-auto px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                >
                                    {formats.map(format => (
                                        <option key={format.id} value={format.id}>{format.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 sm:flex-none">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Intent</label>
                                <select
                                    value={selectedIntent}
                                    onChange={(e) => setSelectedIntent(e.target.value)}
                                    className="w-full sm:w-auto px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                >
                                    {intents.map(intent => (
                                        <option key={intent.id} value={intent.id}>{intent.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {quickStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.name} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <p className="text-gray-600 text-sm">{stat.name}</p>
                                <p className="text-gray-500 text-xs mt-1">{stat.subtitle}</p>
                            </div>
                        );
                    })}
                </div>

                {/* AI Suggestions Gallery */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Content Suggestions</h2>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto">
                            Generate New Batch
                        </button>
                    </div>

                    {/* Card-based Gallery Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={suggestion.id}
                                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer ${hoveredCard === index ? 'shadow-lg transform scale-105' : 'hover:shadow-md'
                                    }`}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Card Header */}
                                <div className="p-3 sm:p-4 border-b border-gray-100">
                                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-6 h-6 sm:w-8 sm:h-8 ${suggestion.platform === 'Instagram' ? 'bg-pink-100' : suggestion.platform === 'TikTok' ? 'bg-gray-100' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                                                {suggestion.contentType === 'image' && <Image className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />}
                                                {suggestion.contentType === 'video' && <Video className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />}
                                                {suggestion.contentType === 'text' && <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />}
                                            </div>
                                            <span className="text-xs sm:text-sm font-medium text-gray-600">{suggestion.platform}</span>
                                        </div>
                                        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${suggestion.labelColor}`}>
                                            {suggestion.label}
                                        </span>
                                    </div>
                                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{suggestion.title}</h3>
                                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                                        <span className="truncate">{suggestion.bestTime}</span>
                                        <span className="font-medium text-green-600">{suggestion.confidence}%</span>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-3 sm:p-4">
                                    <div className="mb-3 sm:mb-4">
                                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Caption</h4>
                                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">{suggestion.caption}</p>
                                    </div>

                                    <div className="mb-3 sm:mb-4">
                                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Hashtags</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {suggestion.hashtags.slice(0, 2).map((tag, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                            {suggestion.hashtags.length > 2 && (
                                                <span className="text-xs text-gray-500">+{suggestion.hashtags.length - 2} more</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3 sm:mb-4">
                                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">CTA</h4>
                                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{suggestion.cta}</p>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => handleUseThis(suggestion)}
                                        className="w-full bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2"
                                    >
                                        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>Use This</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Load More */}
                <div className="text-center pt-4">
                    <button className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors w-full sm:w-auto">
                        Load More Suggestions
                    </button>
                </div>
            </div>
        </Suspense>
    );
};

export default AISuggestions;