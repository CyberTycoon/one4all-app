'use client'

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, QrCode, MapPin, MessageSquare, Check } from 'lucide-react';
import { AppContext } from '../../context/AppContext';

const ServiceSelection: React.FC = () => {
    const navigate = useRouter();
    const { selectedServiceType, setSelectedServiceType } = useContext(AppContext);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const services = [
        {
            id: 'presence',
            name: 'Presence Marketing',
            description: 'Automated social media posting and content management',
            price: '$199/month',
            icon: Calendar,
            features: [
                'Scheduled social media posts',
                'Content calendar management',
                'Metricool integration',
                'AI-powered caption writing'
            ]
        },
        {
            id: 'qr',
            name: 'QR Code Placement',
            description: 'Place QR codes in short-term rentals to attract guests',
            price: 'Pay per placement',
            icon: QrCode,
            features: [
                'Competitive bidding system',
                'Target specific neighborhoods',
                'Real-time placement tracking',
                'Performance analytics'
            ]
        },
        {
            id: 'itinerary',
            name: 'Itinerary Inclusion',
            description: 'Get featured in curated guest experience bundles',
            price: 'Free (discount-based)',
            icon: MapPin,
            features: [
                'Curated experience packages',
                'Flexible discount settings',
                'Guest booking integration',
                'Revenue tracking'
            ]
        },
        {
            id: 'messaging',
            name: 'Messaging Center',
            description: 'SMS, email campaigns, and customer communications',
            price: '$99/month + usage',
            icon: MessageSquare,
            features: [
                'SMS & email campaigns',
                'Contact management',
                'Automated workflows',
                'Performance analytics'
            ]
        }
    ];

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const handleContinue = () => {
        if (selectedServices.length === 0) return;

        setSelectedServiceType(selectedServices);
        console.log('Selected Services:', selectedServices);
        if (selectedServices.length == 0) {
            alert('Please Select services')
            navigate.push('/onboarding')
        }
        navigate.push('/onboarding/register');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        {/* Step 1 - Active */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold shadow-lg">
                                1
                            </div>
                            <span className="ml-2 text-purple-600 font-medium">Choose Services</span>
                        </div>

                        {/* Connector */}
                        <div className="w-16 h-0.5 bg-gray-300"></div>

                        {/* Step 2 - Inactive */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-semibold">
                                2
                            </div>
                            <span className="ml-2 text-gray-500 font-medium">Account Setup</span>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Choose Your Marketing Services
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Select the services that best fit your restaurant's growth goals.
                        You can always add or modify services later.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {services.map((service) => {
                        const isSelected = selectedServices.includes(service.id);
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.id}
                                onClick={() => toggleService(service.id)}
                                className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${isSelected
                                    ? 'ring-2 ring-purple-500 shadow-xl'
                                    : 'shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {isSelected && (
                                    <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1.5">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}

                                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                                    <Icon className="w-6 h-6 text-purple-600" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {service.name}
                                </h3>
                                <p className="text-gray-600 mb-3 text-sm">{service.description}</p>
                                <p className="text-base font-bold text-purple-600 mb-4">
                                    {service.price}
                                </p>

                                <ul className="space-y-1.5">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-start text-gray-700 text-xs">
                                            <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <button
                        onClick={handleContinue}
                        disabled={selectedServices.length === 0}
                        className={`px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${selectedServices.length > 0
                            ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Continue to Setup ({selectedServices.length} selected)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceSelection;