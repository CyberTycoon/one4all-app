'use client'
import { useContext, useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppContext } from '../../../context/AppContext';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useRouter();

    interface FormDataType {
        password: string;
        username: string;
    }

    interface ApiResponse {
        errors?: Record<string, string[]>;
        message?: string;
        token?: any;
        user?: {
            id: number;
            username: string;
            business_name: string;
            business_type: string;
            // Add other user properties as needed
        };
    }

    const { setLoggedUser } = useContext(AppContext);
    const validateForm = (): string | null => {
        if (!formData.username || formData.username.length < 3) {
            return 'username must be at least 3 characters long';
        }
        if (!formData.password || formData.password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        return null;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData((prev: FormDataType) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError('');

        // Validate form
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        console.log("Attempting login...");

        try {
            const response: Response = await fetch("https://mktmem-backend.onrender.com/api/users/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data: ApiResponse = await response.json();

            if (!response.ok) {
                // Handle different types of errors
                if (data.errors) {
                    // Handle field-specific errors
                    const errorMessages = Object.entries(data.errors)
                        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                        .join('\n');
                    throw new Error(errorMessages);
                } else {
                    throw new Error(data.message || `Login failed with status ${response.status}`);
                }
            }

            // Validate response data
            if (!data.token) {
                throw new Error('Authentication token not received');
            }

            if (!data.user) {
                throw new Error('User data not found in response');
            }

            // Store authentication data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Update context - this will trigger the useEffect to fetch userDetails
            setLoggedUser(data.user);

            console.log('Login successful!');

            // Clear form data
            setFormData({
                username: '',
                password: '',
            });

            setMessage('Login successful! Redirecting to dashboard...');

            // Navigate to dashboard

            navigate.push('/dashboard');


        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during login';
            console.error("Login error:", errorMessage);
            setError(errorMessage);

            // Clear any potentially invalid stored data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setIsLoading(false);
        }
    }

    const [message, setMessage] = useState<string>('');


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Login</h1>
                    <p className="text-gray-600 text-lg">Log in to your account to continue</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Display */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Login Error
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <pre className="whitespace-pre-wrap">{error}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {message && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800">
                                            Success
                                        </h3>
                                        <div className="mt-2 text-sm text-green-700">
                                            <pre className="whitespace-pre-wrap">{message}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Personal Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <User className="w-5 h-5 text-purple-500" />
                                User Information
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address/ Username *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="owner@business.com/owner123"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Password *</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            minLength={8}
                                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isLoading ? 'Logging In...' : 'Log In'}
                                    </button>
                                </div>

                                {/* Footer */}
                                <div className="text-center pt-4">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{' '}
                                        <a href="/onboarding" className="text-purple-500 hover:text-purple-600 font-medium">
                                            Sign up here
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}