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
import PlatformConnections from '@/app/components/platformconnections';




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


const SocialConnections: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeDialog = () => setIsOpen(false);
    const openDialog = () => setIsOpen(true);
    const [brandName, setBrandName] = useState('');
    const [brandID, setBrandID] = useState('');
    const [openBrands, setOpenBrands] = useState(false);
    const openBrandsDialog = () => setOpenBrands(true);
    const closeBrandsDialog = () => setOpenBrands(false);

    const createBrand = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await fetch('https://mktmem-backend.onrender.com/api/users/brands/create/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to create brand: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setBrandID(data.brand_id);
            console.log('Brand created successfully!');
            return data;

        } catch (error) {
            console.error('Brand creation error:', error);
            throw error;
        }
    }

    const updateBrand = async (brand_id: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await fetch(`https://mktmem-backend.onrender.com/api/users/brands/${brand_id}/update/?newName=${brandName.trim()}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to update brand: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log("response:", response.status);
            console.log('Brand updated successfully!');
            setBrandName('');
            setBrandID('');
            getBrands();
            return data;

        } catch (error) {
            console.error('Brand update error:', error);
            throw error;
        }
    };

    // Enhanced delete brand function with better error handling
    const deleteBrand = async (brand_id: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await fetch(`https://mktmem-backend.onrender.com/api/users/brands/${brand_id}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Handle specific response statuses with detailed error messages
            if (response.status === 404) {
                console.warn(`Brand ${brand_id} not found - may have already been deleted`);
                // Still return success since the goal (brand not existing) is achieved
                return { success: true, message: 'Brand was already deleted' };
            }

            if (response.status === 403) {
                throw new Error('You do not have permission to delete this brand.');
            }

            if (response.status === 401) {
                throw new Error('Authentication failed. Please log in again.');
            }

            if (response.status >= 500) {
                throw new Error('Server error occurred while deleting the brand. Please try again later.');
            }

            if (!response.ok) {
                // Try to parse error message from response
                let errorMessage = `Failed to delete brand: ${response.status} ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    if (errorData.message || errorData.error) {
                        errorMessage = errorData.message || errorData.error;
                    }
                } catch (parseError) {
                    // If we can't parse the error response, use the default message
                }
                throw new Error(errorMessage);
            }

            console.log('Brand deleted successfully from backend!');
            return { success: true, message: 'Brand deleted successfully' };

        } catch (error) {
            console.error('Brand deletion error:', error);
            throw error;
        }
    };

    const [deletingBrands, setDeletingBrands] = useState<Set<string>>(new Set());

    // Enhanced delete handler with better UX and error handling
    const handleDeleteBrand = async (brand: { name: string; brand_id: string }) => {
        // Prevent deletion if already in progress
        if (deletingBrands.has(brand.brand_id)) {
            console.log('Brand deletion already in progress');
            return;
        }

        // Confirmation dialog
        if (!window.confirm(`Are you sure you want to delete the brand "${brand.name}"?\n\nThis action cannot be undone and will remove all associated data.`)) {
            return;
        }

        // Add brand to deleting set immediately
        setDeletingBrands(prev => new Set(prev).add(brand.brand_id));

        try {
            // Call delete API
            const result = await deleteBrand(brand.brand_id);

            // Always refresh brands list from server to ensure consistency
            await getBrands();

            // Handle current brand replacement if necessary
            if (currentBrand?.brand_id === brand.brand_id) {
                // Get updated brands list
                const updatedBrands = brands.filter(b => b.brand_id !== brand.brand_id);

                if (updatedBrands.length > 0) {
                    // Set the first available brand as current
                    const newCurrentBrand = updatedBrands[0];
                    setCurrentBrand(newCurrentBrand);
                    console.log(`Switched to brand: ${newCurrentBrand.name}`);
                } else {
                    // No brands left
                    setCurrentBrand(null);
                    console.log('No brands remaining');
                }
            }

            // Show success message
            console.log(`Brand "${brand.name}" deleted successfully`);

            // Optional: Show a toast notification instead of alert for better UX
            // You can replace this with your preferred notification system
            if (window.confirm(`Brand "${brand.name}" has been deleted successfully!\n\nClick OK to continue.`)) {
                // User acknowledged the deletion
            }

        } catch (error: any) {
            console.error('Failed to delete brand:', error);

            // Refresh brands list even on error to ensure UI consistency
            try {
                await getBrands();
            } catch (refreshError) {
                console.error('Failed to refresh brands after delete error:', refreshError);
            }

            // Show user-friendly error message
            const errorMessage = error.message || 'Failed to delete brand. Please try again.';
            alert(`Error deleting brand: ${errorMessage}`);

        } finally {
            // Always remove brand from deleting set
            setDeletingBrands(prev => {
                const newSet = new Set(prev);
                newSet.delete(brand.brand_id);
                return newSet;
            });
        }
    };

    const [creating, setCreating] = useState(false);
    const [brands, setBrands] = useState<Array<{ name: string; brand_id: string }>>([]);
    const [currentBrand, setCurrentBrand] = useState<{ name: string; brand_id: string } | null>(null);
    const [isLoadingBrands, setIsLoadingBrands] = useState(true);
    const [brandsError, setBrandsError] = useState<string | null>(null);

    // Calculate stats based on platforms from PlatformConnections
    const [connectedPlatforms, setConnectedPlatforms] = useState([]);
    const [totalFollowers, setTotalFollowers] = useState(0);

    // Enhanced getBrands function with better error handling
    const getBrands = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await fetch('https://mktmem-backend.onrender.com/api/users/brands/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                throw new Error('Authentication failed. Please log in again.');
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch brands: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Brands fetched successfully!', data);

            // Ensure we have a brands array
            const fetchedBrands = data.brands || [];
            setBrands(fetchedBrands);

            return fetchedBrands;

        } catch (error) {
            console.error('Error fetching brands:', error);
            throw error;
        }
    };

    // Enhanced initialization with better brand selection logic
    useEffect(() => {
        const init = async () => {
            setIsLoadingBrands(true);
            setBrandsError(null);

            try {
                const fetchedBrands = await getBrands();

                // Handle current brand selection logic
                let brandToUse = null;

                // Check if stored current brand still exists
                if (currentBrand) {
                    const stillExists = fetchedBrands.some(
                        (brand: { brand_id: string }) => brand.brand_id === currentBrand.brand_id
                    );

                    if (stillExists) {
                        brandToUse = currentBrand;
                    } else {
                        console.warn('Current brand no longer exists, selecting new brand');
                    }
                }

                // If no valid current brand, select the first available one
                if (!brandToUse && fetchedBrands.length > 0) {
                    brandToUse = fetchedBrands[0];
                    console.log(`Auto-selected brand: ${brandToUse.name}`);
                }

                setCurrentBrand(brandToUse);

            } catch (error: any) {
                console.error("Initialization error:", error);
                setBrandsError(error.message);
            } finally {
                setIsLoadingBrands(false);
            }
        };

        init();
    }, []); // Remove currentBrand from dependencies to prevent infinite loops

    const LoadingSpinner = () => (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        </div>
    );

    // Show loading spinner only while brands are being fetched
    if (isLoadingBrands) {
        return <LoadingSpinner />;
    }

    // Show error state if brands failed to load
    if (brandsError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-2">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
                    <p className="text-gray-600 mb-4">{brandsError}</p>
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
        <div className="w-full max-w-none space-y-6 md:space-y-8">
            {/* Current Brand Display */}
            {currentBrand && (
                <div className="mx-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-blue-600 font-medium">Currently Managing</p>
                                <h3 className="text-lg md:text-xl font-bold text-blue-900">{currentBrand.name}</h3>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-blue-100 text-green-800 animate-pulse text-xs font-medium rounded-full">
                                Active Brand
                            </span>
                            <button
                                onClick={openBrandsDialog}
                                className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                                <span>Switch Brand</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="px-2 flex flex-col md:flex-row space-y-3 md:space-x-auto w-full justify-between items-center">
                <div className="">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Social Media Connections</h1>
                </div>
                <div className="flex-end items-center">
                    <div className="flex justify-end items-center space-x-2 md:space-x-3">
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                openBrandsDialog();
                            }}
                            className="px-3 md:px-4 flex items-center py-2 bg-gradient-to-tr from-blue-500 to-blue-600 text-white border border-gray-300 rounded-md hover:bg-blue-700 transition"
                        >
                            <Landmark className="w-4 md:w-5 h-4 md:h-5 mr-2 inline-block" />
                            <p className='text-xs md:text-lg md:font-bold'>View Brands</p>
                        </button>
                        <button
                            onClick={() => {
                                openDialog();
                            }}
                            className="px-3 md:px-4 flex items-center py-2 bg-gradient-to-tr from-blue-500 to-blue-600 text-white border border-gray-300 rounded-md hover:bg-blue-700 transition"
                        >
                            <FeatherIcon className="w-4 md:w-5 h-4 md:h-5 mr-2 inline-block" />
                            <p className='text-xs md:text-lg md:font-bold'>Create Brand</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center px-2 md:text-lg md:font-semibold">
                <h1 className="text-gray-600 mt-2 text-sm md:text-base">Connect your social accounts to schedule posts across all platforms</h1>
            </div>

            {/* Enhanced Brands Dialog */}
            {openBrands && (
                <div
                    onClick={closeBrandsDialog}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-lg md:rounded-xl w-full max-w-md shadow-2xl border border-gray-200"
                    >
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Select Your Brand</h2>
                            <p className="text-sm text-gray-600 mt-1">Choose which brand you want to manage</p>
                        </div>

                        <div className="max-h-96 overflow-y-auto p-6">
                            {brands && brands.length > 0 ? (
                                <div className="space-y-3">
                                    {brands.map((brand) => (
                                        <div
                                            key={brand.brand_id}
                                            className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${currentBrand?.brand_id === brand.brand_id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                } ${deletingBrands.has(brand.brand_id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => {
                                                if (!deletingBrands.has(brand.brand_id)) {
                                                    setCurrentBrand(brand);
                                                    closeBrandsDialog();
                                                }
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <Building2 className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                                                        <p className="text-sm text-gray-500">Brand ID: {brand.brand_id}</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        await handleDeleteBrand(brand);
                                                    }}
                                                    disabled={deletingBrands.has(brand.brand_id)}
                                                    className={`p-2 rounded-lg transition-colors ${deletingBrands.has(brand.brand_id)
                                                        ? 'text-gray-400 cursor-not-allowed'
                                                        : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                                                        }`}
                                                    title={deletingBrands.has(brand.brand_id) ? 'Deleting...' : 'Delete brand'}
                                                >
                                                    {deletingBrands.has(brand.brand_id) ? (
                                                        <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-600"></div>
                                                    ) : (
                                                        <Trash2 className='w-5 h-5' />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">No brands available</p>
                                    <button
                                        onClick={() => {
                                            closeBrandsDialog();
                                            openDialog();
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Create Your First Brand
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={closeBrandsDialog}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            {!currentBrand && brands.length > 0 && (
                                <p className="text-sm text-gray-500 py-2">Select a brand to continue</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Create Brand Dialog */}
            {isOpen && (
                <>
                    <div
                        onClick={closeDialog}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    />
                    <div
                        className="fixed z-50 top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Create A Brand</h2>
                            <p className="text-sm text-gray-500">
                                Create a new brand to connect with your social media accounts.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <div>
                                <label htmlFor="brand-name" className="block text-sm font-medium mb-1">
                                    Brand Name
                                </label>
                                <input
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    id="brand-name"
                                    placeholder="Enter brand name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={closeDialog}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    setCreating(true);

                                    try {
                                        const created = await createBrand(e);
                                        await updateBrand(created.brand_id);
                                        closeDialog();
                                    } catch (error) {
                                        console.error('Brand creation or update failed:', error);
                                    } finally {
                                        setCreating(false);
                                    }
                                }}
                                type="submit"
                                className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
                            >
                                {creating ? 'Creating...' : 'Create Brand'}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Overview Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-2">
                <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Link className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-lg md:text-2xl font-bold text-gray-900">{connectedPlatforms.length}</p>
                            <p className="text-gray-600 text-xs md:text-sm truncate">Connected Accounts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-lg md:text-2xl font-bold text-gray-900">{totalFollowers.toLocaleString()}</p>
                            <p className="text-gray-600 text-xs md:text-sm truncate">Total Followers</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-lg md:text-2xl font-bold text-gray-900">24</p>
                            <p className="text-gray-600 text-xs md:text-sm truncate">Scheduled Posts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-lg md:text-2xl font-bold text-gray-900">4.2%</p>
                            <p className="text-gray-600 text-xs md:text-sm truncate">Avg Engagement</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Connections */}
            <PlatformConnections currentBrand={currentBrand} />

            {/* Integration Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-200 mx-2">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">🚀 Why Connect Your Social Accounts?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Unified Scheduling</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Schedule posts across all platforms simultaneously</li>
                            <li>• Optimize posting times for each platform automatically</li>
                            <li>• Maintain consistent brand messaging everywhere</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Advanced Analytics</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Track performance across all connected platforms</li>
                            <li>• Identify your best-performing content types</li>
                            <li>• Get AI-powered recommendations for improvement</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialConnections;