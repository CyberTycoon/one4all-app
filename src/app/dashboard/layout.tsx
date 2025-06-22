'use client'

import React, { useContext, useMemo, useEffect, useCallback, useState } from 'react';
import {
    Home, Calendar, QrCode, MapPin, CreditCard, Settings, ChefHat,
    Link as LinkIcon, MessageSquare,
    PenTool,
    Zap,
    TrendingUp,
    Eye,
    Users,
    Menu,
    X,
    Network
} from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = usePathname()
    const navigate = useRouter();
    const { loggedUser, userDetails, setLoggedUser } = useContext(AppContext);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loggedUser) {
            navigate.push('/onboarding/login');
        }
    }, [loggedUser, navigate]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setLoggedUser(null);
        navigate.push('/onboarding/login');
    }, [setLoggedUser, navigate]);

    const displayName = useMemo(() => loggedUser?.username || 'User', [loggedUser]);
    const businessName = useMemo(() => userDetails?.business_name || 'Business', [userDetails]);

    const navigation = useMemo(() => [
        { name: 'Overview', href: '/dashboard', icon: Home },

        // Content Creation & Scheduling
        { name: 'AI Suggestions', href: '/dashboard/suggestions', icon: Zap },
        { name: 'Content Calendar', href: '/dashboard/calendar', icon: Calendar },
        { name: 'Create Post', href: '/dashboard/create', icon: PenTool },

        // Growth Intelligence
        { name: 'Campaigns', href: '/dashboard/campaigns', icon: TrendingUp },
        { name: 'Competitor Watch', href: '/dashboard/competitors', icon: Eye },

        // Engagement & Audience
        { name: 'Smart Messaging', href: '/dashboard/messaging', icon: MessageSquare },
        { name: 'Audience Insights', href: '/dashboard/audience', icon: Users },

        // Connections & Settings
        { name: 'Social Accounts', href: '/dashboard/social', icon: LinkIcon },
        { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ], []);

    const toggleMobileSidebar = useCallback(() => {
        setIsMobileSidebarOpen(prev => !prev);
    }, []);

    const closeMobileSidebar = useCallback(() => {
        setIsMobileSidebarOpen(false);
    }, []);

    // Close mobile sidebar when route changes
    useEffect(() => {
        closeMobileSidebar();
    }, [location, closeMobileSidebar]);

    // Display loader while user data is being validated or fetched
    if (!loggedUser || !userDetails) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 py-2 md:pt-1 fixed top-0 z-20 w-full">
                <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="text-xl font-bold text-purple-600 flex-shrink-0">
                            <div className="flex items-center space-x-3">
                                <div className="bg-purple-600 p-2 rounded-lg">
                                    <ChefHat className="w-6 h-6 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <h1 className="text-lg font-bold text-gray-900 truncate">{businessName}</h1>
                                    <p className="text-xs text-gray-500 hidden md:flex truncate">Restaurant Growth Platform</p>
                                </div>
                            </div>
                        </Link>
                        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                            <div className="text-right min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                                <p className="text-xs text-gray-500 truncate max-w-[80px] md:max-w-[150px]">
                                    {loggedUser.email}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-purple-700">{displayName.charAt(0)}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 bg-purple-600 rounded-md text-xs md:text-sm font-medium text-white hover:bg-purple-700 flex-shrink-0"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex w-full max-w-full relative">
                {/* Mobile Overlay */}
                {isMobileSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-transparent z-40 md:hidden"
                        onClick={closeMobileSidebar}
                    />
                )}

                {/* Sidebar */}
                <nav className={`
                    fixed left-0 top-[73px] bg-white shadow-sm h-[calc(100vh-73px)] z-10 flex-shrink-0
                    transition-all duration-300 ease-in-out
                    ${isMobileSidebarOpen ? 'w-64' : 'w-16'} md:w-64
                `}>
                    <div className="p-2 md:p-6 w-full h-full flex flex-col">
                        {/* Toggle button - always visible on mobile */}
                        <div className="md:hidden mb-4 flex justify-between items-center px-2">
                            <button
                                onClick={toggleMobileSidebar}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileSidebarOpen ? (
                                    <X className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <Menu className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                            {isMobileSidebarOpen && (
                                <div className="flex items-center space-x-2">
                                    <div className="bg-purple-600 p-1 rounded">
                                        <Network className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 truncate">
                                        {businessName}
                                    </span>
                                </div>
                            )}
                        </div>

                        <ul className="space-y-2 flex-1">
                            {navigation.map((item) => {
                                const isActive = location === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center space-x-3 px-1 md:px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${isActive
                                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                            <span className={`truncate ${isMobileSidebarOpen ? 'block' : 'hidden md:block'}`}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 min-w-0 w-full max-w-full p-4 overflow-x-hidden ml-16 md:ml-64 mt-[73px]">
                    <div className="w-full max-w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;