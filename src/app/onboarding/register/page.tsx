'use client';

import { useContext, useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Building, MapPin, Phone, Utensils } from 'lucide-react';
import { AppContext } from '../../../context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function RegistrationPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { selectedServiceType } = useContext(AppContext);
    const navigate = useRouter();

    interface FormDataType {
        username: string;
        email: string;
        password: string;
        password2: string;
        business_name: string;
        business_type: string;
        business_address: string;
        phone_number: string;
        first_name: string;
        last_name: string;
        service_types: string[];
    }

    const [formData, setFormData] = useState<FormDataType>({
        username: '',
        email: '',
        password: '',
        password2: '',
        business_name: '',
        business_type: 'restaurant',
        business_address: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        service_types: selectedServiceType, // Initialize with default service type
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData((prev: FormDataType) => ({
            ...prev,
            [name]: value
        }));
    };

    // Form validation
    const validateForm = (): string | null => {
        if (!formData.username || formData.username.length < 3) {
            return 'Username must be at least 3 characters long';
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            return 'Please enter a valid email address';
        }
        if (!formData.password || formData.password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (formData.password !== formData.password2) {
            return 'Passwords do not match';
        }
        if (!formData.first_name || !formData.last_name) {
            return 'First name and last name are required';
        }
        if (!formData.business_name) {
            return 'Business name is required';
        }
        if (!formData.business_address) {
            return 'Business address is required';
        }
        if (!formData.phone_number) {
            return 'Phone number is required';
        }
        return null;
    };

    interface ApiResponse {
        message?: string;
        errors?: Record<string, string[]>;
    }

    useEffect(() => {
        console.log("Received services:", selectedServiceType);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');

        // Validate form
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        console.log("sending....", formData);

        try {
            const response: Response = await fetch("https://mktmem-backend.onrender.com/api/users/register/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data: ApiResponse = await response.json();

            if (!response.ok) {
                // Handle different types of errors
                if (data.errors) {
                    // Handle field-specific errors
                    const errorMessages = Object.entries(data.errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                    throw new Error(errorMessages);
                } else {
                    throw new Error(data.message || `Registration failed with status ${response.status}`);
                }
            }

            console.log('Registration successful:');
            // Handle successful registration (e.g., redirect to login or dashboard)
            alert('Registration successful!');
            navigate.push('/onboarding/login');
            setFormData({
                username: '',
                email: '',
                password: '',
                password2: '',
                business_name: '',
                business_type: 'restaurant',
                business_address: '',
                phone_number: '',
                first_name: '',
                last_name: '',
                service_types: selectedServiceType,
            });

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            console.error("Registration error: ", errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center space-x-4">
                        {/* Step 1 - Completed */}
                        <Link href="/onboarding" className="flex items-center">
                            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold shadow-lg">
                                ✓
                            </div>
                            <span className="ml-2 text-green-600 font-medium">Choose Services</span>
                        </Link>

                        {/* Connector */}
                        <div className="w-16 h-0.5 bg-purple-500"></div>

                        {/* Step 2 - Active */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold shadow-lg">
                                2
                            </div>
                            <span className="ml-2 text-purple-600 font-medium">Account Setup</span>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-500 rounded-full mb-3">
                        <Lock className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Our Platform</h1>
                    <p className="text-gray-600">Create your account and start growing your business</p>
                </div>

                {/* Registration Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Display */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Registration Error
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <pre className="whitespace-pre-wrap">{error}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Personal Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <User className="w-4 h-4 text-purple-500" />
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">First Name *</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="John"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Last Name *</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Username *</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        minLength={3}
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="business_owner"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="owner@business.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Password *</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            minLength={8}
                                            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Confirm Password *</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type={showPassword2 ? "text" : "password"}
                                            name="password2"
                                            value={formData.password2}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword2(!showPassword2)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Information Section */}
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Building className="w-4 h-4 text-blue-500" />
                                Business Information
                            </h2>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Business Name *</label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="business_name"
                                        value={formData.business_name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="My Business"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Business Type *</label>
                                <select
                                    name="business_type"
                                    value={formData.business_type}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                >
                                    <option value="restaurant">Food & Beverage</option>
                                    <option value="retail_ecommerce">Retail & E-commerce</option>
                                    <option value="health_wellness">Health & Wellness</option>
                                    <option value="beauty_personal_care">Beauty & Personal Care</option>
                                    <option value="hospitality_travel">Hospitality & Travel</option>
                                    <option value="education_training">Education & Training</option>
                                    <option value="finance_insurance">Finance & Insurance</option>
                                    <option value="real_estate">Real Estate & Property</option>
                                    <option value="automotive">Automotive & Transportation</option>
                                    <option value="construction_engineering">Construction & Engineering</option>
                                    <option value="logistics_supply_chain">Logistics & Supply Chain</option>
                                    <option value="fashion_apparel">Fashion & Apparel</option>
                                    <option value="creative_media">Creative & Media</option>
                                    <option value="professional_services">Professional Services</option>
                                    <option value="technology">Technology & SaaS</option>
                                    <option value="agriculture">Agriculture & Agro-processing</option>
                                    <option value="events_entertainment">Events & Entertainment</option>
                                    <option value="legal_law_firm">Legal & Law</option>
                                    <option value="non_profit">Non-profits & NGOs</option>
                                    <option value="home_services">Home & Local Services</option>
                                    <option value="telecom_internet">Telecom & Internet</option>
                                    <option value="energy_utilities">Energy & Utilities</option>

                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Business Address *</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="business_address"
                                        value={formData.business_address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="123 Main St, Memphis, TN"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="901-555-0123"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? 'Creating Account...' : 'Create My Account'}
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="text-center pt-3">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="#" className="text-purple-500 hover:text-purple-600 font-medium">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
