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
    Send
} from 'lucide-react';
import { AppContext } from '../../../context/AppContext';
import { useRouter } from 'next/navigation';

const AISuggestions: React.FC = () => {
    const navigate = useRouter();
    const { useContext } = React;
    const { loggedUser } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedCards, setExpandedCards] = useState<number[]>([]);

    useEffect(() => {
        const delayAndCheckUser = async () => {
            await new Promise((res) => setTimeout(res, 500));
            if (loggedUser === null) {
                navigate.push('/onboarding/login');
            } else {
                setIsLoading(false);
            }
        };
        delayAndCheckUser();
    }, [loggedUser, navigate]);

    const toggleExpanded = (index: number) => {
        setExpandedCards(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const suggestions = [
        {
            id: 1,
            type: 'content',
            platform: 'Instagram',
            contentType: 'image',
            title: 'Post your new seasonal burger at golden hour',
            content: `Showcase your Autumn Harvest Burger with warm lighting and fall colors. Caption: "Fall flavors are here! 🍂 Our new Autumn Harvest Burger brings together roasted butternut squash, caramelized onions, and our signature herb aioli. What's your favorite fall flavor?`,
            bestTime: 'Today, 6:30 PM',
            expectedEngagement: '+45% reach',
            confidence: 92,
            insights: [
                { type: 'trending', text: 'Fall seasonal foods trending +180%', icon: TrendingUp },
                { type: 'weather', text: 'Perfect lighting conditions forecasted', icon: Sun },
                { type: 'audience', text: 'Your audience 67% more active at 6:30 PM', icon: Users }
            ],
            hashtags: ['#FallFlavors', '#SeasonalEats', '#AutumnBurger', '#LocalRestaurant', '#FreshIngredients'],
            estimatedMetrics: {
                likes: '120-180',
                comments: '15-25',
                shares: '8-15',
                saves: '25-40'
            }
        },
        {
            id: 2,
            type: 'story',
            platform: 'Instagram',
            contentType: 'video',
            title: 'Behind-the-scenes: Chef preparing signature sauce',
            content: 'Quick 15-second video of your chef mixing the secret sauce ingredients. Add text overlay: "The magic happens here ✨" with upbeat background music.',
            bestTime: 'Tomorrow, 11:45 AM',
            expectedEngagement: '+38% story views',
            confidence: 88,
            insights: [
                { type: 'competitor', text: 'Competitors not showing kitchen processes', icon: Eye },
                { type: 'trending', text: 'Behind-the-scenes content +65% engagement', icon: Sparkles },
                { type: 'timing', text: 'Pre-lunch timing optimal for food content', icon: Clock }
            ],
            hashtags: ['#BehindTheScenes', '#ChefLife', '#SecretSauce', '#Foodie'],
            estimatedMetrics: {
                views: '800-1200',
                replies: '20-35',
                screenshots: '40-60'
            }
        },
        {
            id: 3,
            type: 'reel',
            platform: 'TikTok',
            contentType: 'video',
            title: 'Trending sound + food reveal transition',
            content: 'Use the trending "Wait for it..." sound with a dramatic reveal of your signature dish. Start with ingredients, quick cut to cooking process, end with the final plated dish.',
            bestTime: 'Tomorrow, 7:15 PM',
            expectedEngagement: '+127% views potential',
            confidence: 95,
            insights: [
                { type: 'trending', text: 'Sound used in 2.3M+ videos this week', icon: Flame },
                { type: 'timing', text: 'Peak TikTok usage time for your area', icon: Target },
                { type: 'format', text: 'Food reveals performing 3x better', icon: Star }
            ],
            hashtags: ['#FoodReveal', '#RestaurantLife', '#Satisfying', '#FoodPrep', '#LocalEats'],
            estimatedMetrics: {
                views: '2.5K-8.5K',
                likes: '180-420',
                comments: '25-60',
                shares: '40-85'
            }
        },
        {
            id: 4,
            type: 'post',
            platform: 'Facebook',
            contentType: 'image',
            title: 'Customer testimonial with food photo',
            content: 'Share Sarah M.\'s 5-star review with a photo of the dish she loved: "Best pasta in town! The truffle cream sauce is absolutely divine. My family and I will definitely be back!" Include a warm, inviting photo of your truffle pasta.',
            bestTime: 'Thursday, 12:30 PM',
            expectedEngagement: '+52% reach',
            confidence: 87,
            insights: [
                { type: 'social-proof', text: 'Customer testimonials drive 89% more trust', icon: ThumbsUp },
                { type: 'timing', text: 'Lunch decision time for office workers', icon: Clock },
                { type: 'audience', text: 'Your Facebook audience prefers testimonials', icon: Users }
            ],
            hashtags: ['#CustomerLove', '#TrufflePasta', '#5StarReview', '#HappyCustomers'],
            estimatedMetrics: {
                likes: '85-140',
                comments: '12-28',
                shares: '15-35'
            }
        },
        {
            id: 5,
            type: 'carousel',
            platform: 'Instagram',
            contentType: 'image',
            title: 'Weekly menu highlights carousel',
            content: 'Create a 5-slide carousel showcasing this week\'s specials: 1) Cover slide with "This Week\'s Specials", 2-5) Each special dish with description and price. Use consistent branding and appetizing photography.',
            bestTime: 'Monday, 9:00 AM',
            expectedEngagement: '+73% saves',
            confidence: 91,
            insights: [
                { type: 'timing', text: 'Monday menu planning peak time', icon: Calendar },
                { type: 'format', text: 'Carousels get 3x more saves than single posts', icon: Star },
                { type: 'audience', text: 'Your followers save menu posts for reference', icon: Users }
            ],
            hashtags: ['#WeeklySpecials', '#MenuHighlights', '#FreshMenu', '#BookNow'],
            estimatedMetrics: {
                likes: '95-165',
                comments: '18-35',
                saves: '45-80',
                carousel_swipes: '280-450'
            }
        }
    ];

    const quickStats = [
        {
            name: 'Suggestions Generated',
            value: '47',
            subtitle: 'This week',
            icon: Brain,
            color: 'bg-purple-100 text-purple-600'
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
            color: 'bg-blue-100 text-blue-600'
        }
    ];

    const displayName = loggedUser?.business_name || 'User';

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
            <div className="space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                            <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-bold">AI Suggestions</h1>
                            <p className="text-purple-100 text-sm sm:text-base">Personalized content recommendations powered by predictive models</p>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                        <p className="text-xs sm:text-sm text-purple-100 mb-2">🎯 Today's Focus</p>
                        <p className="text-white font-medium text-sm sm:text-base">Fall seasonal content is trending 180% higher. Weather conditions are perfect for golden hour photography.</p>
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

                {/* AI Suggestions */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Today's Recommendations</h2>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors w-full sm:w-auto">
                            Generate New Batch
                        </button>
                    </div>

                    {suggestions.map((suggestion, index) => {
                        const isExpanded = expandedCards.includes(index);
                        const platformColor = suggestion.platform === 'Instagram' ? 'text-pink-600' :
                            suggestion.platform === 'TikTok' ? 'text-black' : 'text-blue-600';
                        const platformBg = suggestion.platform === 'Instagram' ? 'bg-pink-100' :
                            suggestion.platform === 'TikTok' ? 'bg-gray-100' : 'bg-blue-100';

                        return (
                            <div key={suggestion.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Header */}
                                <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0 mb-4">
                                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${platformBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                {suggestion.contentType === 'image' && <Image className={`w-4 h-4 sm:w-5 sm:h-5 ${platformColor}`} />}
                                                {suggestion.contentType === 'video' && <Video className={`w-4 h-4 sm:w-5 sm:h-5 ${platformColor}`} />}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center space-x-2 flex-wrap">
                                                    <span className={`text-sm font-medium ${platformColor}`}>{suggestion.platform}</span>
                                                    <span className="text-gray-400 hidden sm:inline">•</span>
                                                    <span className="text-sm text-gray-600 capitalize">{suggestion.type}</span>
                                                </div>
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-1 line-clamp-2">{suggestion.title}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end space-x-3 flex-shrink-0">
                                            <div className="text-center sm:text-right">
                                                <div className="text-xs sm:text-sm text-gray-600">Confidence</div>
                                                <div className="text-base sm:text-lg font-bold text-green-600">{suggestion.confidence}%</div>
                                            </div>
                                            <button
                                                onClick={() => toggleExpanded(index)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                                            >
                                                {isExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{suggestion.bestTime}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{suggestion.expectedEngagement}</span>
                                        </div>
                                    </div>

                                    {/* Insights Preview */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {suggestion.insights.slice(0, isExpanded ? suggestion.insights.length : 1).map((insight, idx) => {
                                            const Icon = insight.icon;
                                            return (
                                                <div key={idx} className="flex items-center space-x-2 bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs">
                                                    <Icon className="w-3 h-3 text-gray-500 flex-shrink-0" />
                                                    <span className="text-gray-700 truncate">{insight.text}</span>
                                                </div>
                                            );
                                        })}
                                        {!isExpanded && suggestion.insights.length > 1 && (
                                            <div className="bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs text-gray-600">
                                                +{suggestion.insights.length - 1} more
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100 pt-4 sm:pt-6">
                                        {/* Content Preview */}
                                        <div className="mb-4 sm:mb-6">
                                            <h4 className="text-sm font-medium text-gray-900 mb-3">Suggested Content</h4>
                                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                                <p className="text-gray-700 text-sm leading-relaxed">{suggestion.content}</p>
                                            </div>
                                        </div>

                                        {/* All Insights */}
                                        <div className="mb-4 sm:mb-6">
                                            <h4 className="text-sm font-medium text-gray-900 mb-3">Why this recommendation?</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {suggestion.insights.map((insight, idx) => {
                                                    const Icon = insight.icon;
                                                    return (
                                                        <div key={idx} className="flex items-start space-x-3 bg-blue-50 p-3 rounded-lg">
                                                            <Icon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-sm text-blue-900 leading-relaxed">{insight.text}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Hashtags */}
                                        <div className="mb-4 sm:mb-6">
                                            <h4 className="text-sm font-medium text-gray-900 mb-3">Suggested Hashtags</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {suggestion.hashtags.map((tag, idx) => (
                                                    <span key={idx} className="bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Expected Metrics */}
                                        <div className="mb-4 sm:mb-6">
                                            <h4 className="text-sm font-medium text-gray-900 mb-3">Expected Performance</h4>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                                {Object.entries(suggestion.estimatedMetrics).map(([key, value]) => (
                                                    <div key={key} className="text-center bg-gray-50 rounded-lg p-3">
                                                        <div className="text-base sm:text-lg font-semibold text-gray-900">{value}</div>
                                                        <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                                                <Send className="w-4 h-4" />
                                                <span>Schedule Post</span>
                                            </button>
                                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                                                <Edit3 className="w-4 h-4" />
                                                <span>Customize</span>
                                            </button>
                                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                                                <Copy className="w-4 h-4" />
                                                <span>Copy Content</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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