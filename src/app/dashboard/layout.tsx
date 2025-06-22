'use client'

import React, { useContext, useMemo, useEffect, useCallback } from 'react';
import {
    Home, Calendar, QrCode, MapPin, CreditCard, Settings, ChefHat,
    Link as LinkIcon, MessageSquare
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
        { name: 'Content Calendar', href: '/dashboard/presence', icon: Calendar },
        { name: 'Social Accounts', href: '/dashboard/social', icon: LinkIcon },
        { name: 'QR Placements', href: '/dashboard/qr', icon: QrCode },
        { name: 'Itineraries', href: '/dashboard/itinerary', icon: MapPin },
        { name: 'Messaging', href: '/dashboard/messaging', icon: MessageSquare },
        { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ], []);

    // Display loader while user data is being validated or fetched
    if (!loggedUser || !userDetails) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500" />
            </div>
        );
    }

    return (

        <html>
            <body>
                <div className="min-h-screen bg-gray-50">
                    {/* Header */}
                    <header className="bg-white shadow-sm border-b border-gray-200 py-2 md:pt-1 sticky top-0 z-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <Link href="/" className="text-xl font-bold text-purple-600">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-purple-600 p-2 rounded-lg">
                                            <ChefHat className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-bold text-gray-900">{businessName}</h1>
                                            <p className="text-xs text-gray-500 hidden md:flex">Restaurant Growth Platform</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{displayName}</p>
                                        <p className="text-xs text-gray-500 truncate max-w-[100px] md:max-w-none">
                                            {loggedUser.email}
                                        </p>

                                    </div>
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-purple-700">{displayName.charAt(0)}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 bg-purple-600 rounded-md text-sm font-medium text-white hover:bg-purple-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="flex sticky inset-0">
                        {/* Sidebar */}
                        <nav className="w-20 md:w-64 bg-white shadow-sm h-screen sticky top-0 pt-1">
                            <div className="md:p-6 px-2">
                                <ul className="space-y-2">
                                    {navigation.map((item) => {
                                        const isActive = location === item.href;
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center space-x-3 px-1 md:px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                        }`}
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="hidden md:flex">{item.name}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </nav>

                        {/* Main Content */}
                        <main className="flex-1 p-4">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default Layout;
