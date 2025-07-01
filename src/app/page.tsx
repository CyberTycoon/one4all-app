'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Clock, Shield, ArrowRight, Play, Sparkles, Rocket, Award, Users, CheckCircle, Network, BarChart3, Globe, Lightbulb, X, Menu, Star, Lock, Heart, Smile, TrendingUp, Brain, Target, Zap, Activity, Clock3
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// 3D Floating Icon (Globe/Node) and Network Animation Components
const ThreeDFloatingIcon = dynamic(() => import('./components/ThreeDFloatingIcon'), { ssr: false });
const ThreeDNetwork = dynamic(() => import('./components/ThreeDNetwork'), { ssr: false });

const One4AllHomepage = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());
  const [preloadedImages, setPreloadedImages] = useState<{ [src: string]: string }>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const heroImages = [
    "/hero-1.jpg",
    "/hero-2.jpg",
    "/hero-3.jpg"
  ];

  const featureImages = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=400&h=300&fit=crop&crop=center",
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

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [handleScroll]);

  // Hero image cycling - simplified without image loading dependency
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Intersection observer for animations
  useEffect(() => {
    if (observerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            // Stop observing once visible
            observerRef.current?.unobserve(entry.target);
            elementsRef.current.delete(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    // Observe all elements with data-animate
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
      elementsRef.current.add(el);
    });

    return () => {
      observerRef.current?.disconnect();
      elementsRef.current.clear();
    };
  }, []);

  // Preload images on mount
  useEffect(() => {
    const allImages = [...heroImages, ...featureImages, '/sad.jpg', '/happy.jpg'];
    let loaded: { [src: string]: string } = {};
    let count = 0;
    allImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loaded[src] = src;
        count++;
        if (count === allImages.length) {
          setPreloadedImages(loaded);
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded[src] = src; // fallback to src
        count++;
        if (count === allImages.length) {
          setPreloadedImages(loaded);
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Update StableImage to use preloaded images
  const StableImage = React.memo(({ src, alt, className }: { src: string; alt: string; className: string }) => {
    const loadedSrc = preloadedImages[src];
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ background: '#f3f4f6' }}>
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse z-10">
            <span className="text-gray-300">Loading...</span>
          </div>
        )}
        {loadedSrc && (
          <img
            src={loadedSrc}
            alt={alt}
            className="w-full h-full object-cover responsive-img"
            loading="eager"
            decoding="async"
            style={{ opacity: imagesLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
          />
        )}
      </div>
    );
  });

  // Calculate header transform based on scroll
  const headerOpacity = Math.max(0.9, 1 - scrollY * 0.00001);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden font-sans relative">
      {/* Enhanced Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Primary Grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Secondary Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />

        {/* Radial Gradients */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 50% 10%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
            `
          }}
        />

        {/* Animated Dots */}
        <div className="absolute inset-0 opacity-[0.06]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation with Stylish Blue Border */}
      <nav
        className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out"
        style={{
          width: `calc(100% - ${scrollY > 100 ? '4rem' : '1rem'})`,
          maxWidth: '1200px',
          opacity: headerOpacity
        }}
      >
        <div className="relative">
          {/* Blue Border Ring */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-75"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-2xl animate-pulse"></div>

          {/* Main Nav Content */}
          <div className="relative bg-white/90 backdrop-blur-xl border border-blue-200/50 shadow-2xl rounded-2xl px-6 py-3 w-full">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  One4All
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
                <a href="#how-it-works" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</a>
                <a href="#pricing" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
                <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-sm">
                  Start Free Trial
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer text-gray-700 focus:outline-none">
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-gray-200/50 space-y-3">
                <a href="#features" className="block text-sm text-gray-600 hover:text-blue-600 font-medium py-1">Features</a>
                <a href="#how-it-works" className="block text-sm text-gray-600 hover:text-blue-600 font-medium py-1">How It Works</a>
                <a href="#pricing" className="block text-sm text-gray-600 hover:text-blue-600 font-medium py-1">Pricing</a>
                <button className="cursor-pointer block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium text-sm text-center">
                  Start Free Trial
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Content */}
            <div
              className={`text-center lg:text-left transition-all duration-1000 ease-out ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              data-animate
              id="hero"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1.5 mb-4 border border-blue-200">
                <Sparkles className="w-3 h-3" />
                <span className="text-xs font-medium">AI-Powered Content Revolution</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-gray-900">
                Stop Posting in the Dark.
                <span className="text-blue-600 block">Let AI Predict What Converts.</span>
              </h1>

              <p className="text-base text-gray-600 mb-6 max-w-xl leading-relaxed">
                One4All uses AI to generate scroll-stopping content, schedule it at peak times, analyze your engagement, auto-launch counter-campaigns, and follow up with leads — all from one dashboard.
                <strong className="text-gray-900 block mt-2 font-medium text-sm">Win the feed. Outsmart competitors. Grow on autopilot.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center mb-8">
                <button className="group cursor-pointer bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2 three-d-btn">
                  <span>Start Your Transformation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-all">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  <span className="text-sm font-medium">Watch Demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-gray-600">
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-medium">No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium">Setup in 5 Minutes</span>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-full h-80 md:h-96 three-d-canvas">
                <ThreeDFloatingIcon />
              </div>
              {/* Image indicators remain below */}
              <div className="h-2 w-full rounded-b-lg bg-blue-700">

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-8 transition-all duration-1000 ease-out ${isVisible.problem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            data-animate
            id="problem"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
              Tired of Content That Falls Flat?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Every minute you spend creating content that doesn't convert is a minute your competitors get ahead.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative">
              <StableImage
                src="/sad.jpg"
                alt="Frustrated business owner"
                className="w-full h-64 rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent rounded-2xl"></div>
            </div>

            <div className="space-y-3">
              {painPoints.map((pain, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-red-100 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 font-medium">{pain}</p>
                </div>
              ))}

              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-red-700">The Real Cost</span>
                </div>
                <p className="text-sm text-red-700">
                  While you're stuck in the content creation hamster wheel, your business growth stagnates and your dreams feel further away than ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-8 transition-all duration-1000 ease-out ${isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            data-animate
            id="solution"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
              Imagine If Content Creation Was
              <span className="text-green-600"> This Simple</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Picture waking up to viral content, engaged audiences, and growing revenue – all while you slept.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              {transformations.map((transformation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-green-50 border border-green-100 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700 font-medium">{transformation}</p>
                </div>
              ))}

              <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Smile className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">Your New Reality</span>
                </div>
                <p className="text-sm text-green-700">
                  Finally have the time and energy to focus on what you love – building your business and living your life.
                </p>
              </div>
            </div>

            <div className="relative">
              <StableImage
                src="/happy.jpg"
                alt="Successful business owner"
                className="w-full h-64 rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-white/30 backdrop-blur-xs rounded-lg p-3 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600 mb-1">This Could Be You</div>
                    <div className="text-xs text-gray-600">Living the business owner's dream</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ease-out ${isVisible.howitworks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            data-animate
            id="howitworks"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
              How One4All Works Its Magic
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your content strategy from guesswork to guaranteed results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
                icon: Zap,
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
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="relative mb-4 aspect-[4/3]">
                    <StableImage
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full rounded-xl"
                    />
                    <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${step.color === 'blue' ? 'bg-blue-600' :
                      step.color === 'red' ? 'bg-red-600' : 'bg-purple-600'
                      }`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-3 -left-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-gray-100">
                      <span className="text-sm font-semibold text-gray-700">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ease-out ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            data-animate
            id="features"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
              Your Unfair Advantage
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              While others guess, you'll know exactly what works. Every feature designed to give you the edge.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="three-d-canvas">
              <ThreeDNetwork />
            </div>
            <div className="space-y-6">
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
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-8 transition-all duration-1000 ${isVisible.results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="results"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
              Results That Speak for Themselves
            </h2>
            <p className="text-base text-gray-600">
              These aren't just numbers – they represent real transformation and growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: "387%", label: "Average ROI Increase", icon: TrendingUp, color: "green" },
              { metric: "2.3x", label: "Revenue Growth", icon: Award, color: "blue" },
              { metric: "94%", label: "Prediction Accuracy", icon: Target, color: "purple" },
              { metric: "15hrs", label: "Weekly Time Saved", icon: Clock3, color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${stat.color === 'green' ? 'bg-green-600' :
                  stat.color === 'blue' ? 'bg-blue-600' :
                    stat.color === 'purple' ? 'bg-purple-600' : 'bg-orange-600'
                  }`}>
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