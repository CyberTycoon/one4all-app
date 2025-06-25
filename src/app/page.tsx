
'use client'
import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Clock, Shield, ArrowRight, Play, Sparkles, Rocket, Award, Users, CheckCircle, Network, BarChart3, Globe, Lightbulb, NetworkIcon, X, Menu, Star, Lock, Heart, Smile, TrendingUp, Brain, Target,
  TargetIcon,
  LucideTarget,
  TrendingUpIcon,
  Clock1
} from 'lucide-react';
import Link from 'next/link';

const One4AllHomepage = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/viral.jpg", // Social media dashboard
    "/hero-1.jpg", // Analytics charts
    "/hero-3.jpg", // Data visualization
  ];

  const featureImages = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center", // Team meeting
    "/hero-2.jpg", // Growth chart
    "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=400&h=300&fit=crop&crop=center", // Automation
  ];

  const painPoints = [
    "Juggling 7 different apps just to post on all your social platforms",
    "Posting at random times and wondering why engagement is dying",
    "Watching competitors dominate while your posts get buried",
    "Spending hours creating content that barely gets seen",
    "Losing potential customers because you can't keep track of leads"
  ];

  const transformations = [
    "Manage ALL your social accounts from ONE powerful dashboard",
    "Post at AI-calculated peak times when your audience is most active",
    "Spy on competitors and instantly counter their successful campaigns",
    "Transform daily photos/videos into viral posts with AI magic",
    "Never lose a lead again with automated personalized follow-ups"
  ];
  // Cycle through hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const NetworkAnimation = () => (
    <div className="relative w-full h-80 overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Central Hub */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <NetworkIcon className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-700 whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-md">
              One4All AI
            </div>
          </div>

          {/* Floating Metrics */}
          <div className="absolute top-6 right-6 space-y-3">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold shadow-md animate-bounce">
              +387% ROI
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold shadow-md animate-bounce" style={{ animationDelay: '0.5s' }}>
              15hrs Saved
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold shadow-md animate-bounce" style={{ animationDelay: '1s' }}>
              94% Accuracy
            </div>
          </div>

          {/* Platform Icons */}
          <div className="absolute inset-0">
            {['Instagram', 'TikTok', 'LinkedIn', 'Twitter', 'Facebook', 'YouTube'].map((platform, i) => (
              <div
                key={platform}
                className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse"
                style={{
                  left: `${20 + (i * 60) % 300}px`,
                  top: `${50 + (i * 80) % 200}px`,
                  animationDelay: `${i * 0.3}s`
                }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Network className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                One4All
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</a>
              <Link href='/onboarding' className="cursor-pointer bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer text-gray-700 focus:outline-none">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 space-y-4 shadow-lg">
            <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium py-2">Features</a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600 font-medium py-2">How It Works</a>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600 font-medium py-2">Pricing</a>
            <Link href='/onboarding' className="cursor-pointer w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold">
              Start Free Trial
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-6 border border-blue-200">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">AI-Powered Content Revolution</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Stop Creating Content That
                <span className="text-blue-600 block">Gets Ignored</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                While your competitors struggle with guesswork, you'll dominate with AI that predicts what goes viral.
                <strong className="text-gray-900"> Transform your content strategy in 24 hours.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                <Link href='/onboarding' className="group cursor-pointer bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2">
                  <span>Start Your Transformation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="group cursor-pointer flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-all">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                  <span className="text-lg font-medium">Watch Demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium">No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Setup in 5 Minutes</span>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={heroImages[currentImageIndex]}
                  alt="One4All Dashboard"
                  className="w-full h-120 object-contain transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-gray-800">AI Analysis Running</span>
                      </div>
                      <div className="text-sm font-bold text-green-600">+387% Performance</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {heroImages.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Tired of Content That Falls Flat?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every minute you spend creating content that doesn't convert is a minute your competitors get ahead.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img
                src="/sad.jpg"
                alt="Frustrated business owner"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent rounded-2xl"></div>
            </div>

            <div className="space-y-4">
              {painPoints.map((pain, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-red-200 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">{pain}</p>
                </div>
              ))}

              <div className="mt-6 p-6 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-red-700">The Real Cost</span>
                </div>
                <p className="text-red-700">
                  While you're stuck in the content creation hamster wheel, your business growth stagnates and your dreams feel further away than ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Imagine If Content Creation Was
              <span className="text-green-600"> This Simple</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Picture waking up to viral content, engaged audiences, and growing revenue – all while you slept.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {transformations.map((transformation, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-green-50 border border-green-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">{transformation}</p>
                </div>
              ))}

              <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Smile className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-700">Your New Reality</span>
                </div>
                <p className="text-green-700">
                  Finally have the time and energy to focus on what you love – building your business and living your life.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/happy.jpg"
                alt="Successful business owner"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">This Could Be You</div>
                    <div className="text-sm text-gray-600">Living the business owner's dream</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              How One4All Works Its Magic
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your content strategy from guesswork to guaranteed results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "AI Analyzes Your Market",
                description: "Our advanced AI studies millions of data points to understand your audience, competitors, and trending topics in your niche.",
                image: featureImages[0],
                icon: Brain,
                color: "blue"
              },
              {
                step: "02",
                title: "Predicts Viral Content",
                description: "Generate content that's scientifically designed to go viral, with optimal timing and platform-specific optimization.",
                image: featureImages[1],
                icon: TargetIcon,
                color: "red"
              },
              {
                step: "03",
                title: "Scales Your Success",
                description: "Automatically schedule, optimize, and scale your content across all platforms while you focus on growing your business.",
                image: featureImages[2],
                icon: Rocket,
                color: "purple"
              }
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
                  <div className="relative mb-6">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className={`absolute -top-4 -right-4 w-12 h-12 bg-${step.color}-600 rounded-full flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border border-gray-200">
                      <span className="text-lg font-bold text-gray-700">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Your Unfair Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While others guess, you'll know exactly what works. Every feature designed to give you the edge.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <NetworkAnimation />
            </div>
            <div className="space-y-8">
              {[
                {
                  icon: Brain,
                  title: "AI Foresight Engine",
                  description: "Know what will go viral before anyone else does. Our AI analyzes patterns across millions of posts to predict success with 94% accuracy."
                },
                {
                  icon: Target,
                  title: "Competitor Intelligence",
                  description: "Turn your rivals' moves into your victories. Get real-time insights on what's working in your industry and create better content instantly."
                },
                {
                  icon: Rocket,
                  title: "Automated Growth",
                  description: "Scale without the stress. Automated content creation, scheduling, and optimization across all platforms while you sleep."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Results That Speak for Themselves
            </h2>
            <p className="text-xl text-gray-600">
              These aren't just numbers – they represent real transformation and growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: "387%", label: "Average ROI Increase", icon: TrendingUpIcon, color: "green" },
              { metric: "2.3x", label: "Revenue Growth", icon: Award, color: "blue" },
              { metric: "94%", label: "Prediction Accuracy", icon: LucideTarget, color: "purple" },
              { metric: "15hrs", label: "Weekly Time Saved", icon: Clock1, color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className={`w-16 h-16 bg-${stat.color}-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.metric}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Your Competitors Won't Wait
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Every day you delay is another day they gain ground. Start your transformation today and become the leader in your industry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href='/onboarding' className="group bg-white cursor-pointer text-blue-600 px-10 py-4 rounded-lg text-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2">
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Setup in 5 Minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span className="font-medium">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Network className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">One4All</span>
            </div>
            <div className="flex space-x-8 text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors font-medium">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors font-medium">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors font-medium">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            © 2025 One4All. All rights reserved. Transform your business. Dominate your market.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default One4AllHomepage;