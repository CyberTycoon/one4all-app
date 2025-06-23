'use client'
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Brain, Zap, Target, TrendingUp, Eye, Clock, Shield, ArrowRight, Play, Sparkles, Rocket, Award, Users, CheckCircle, Network, BarChart3, Globe, Lightbulb, NetworkIcon, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { AppContext } from '@/context/AppContext';
import { useRouter } from "next/navigation";

const One4AllHomepage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  type NetworkNode = { id: number; x: number; y: number; delay: number; platform: string };
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  type Connection = { from: number; to: number; id: number };
  const [activeConnections, setActiveConnections] = useState<Connection[]>([]);
  const [isOpen, setIsOpen] = useState(false)
  const { userDetails } = useContext(AppContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { setLoggedUser } = useContext(AppContext)
  const navigate = useRouter();

  useEffect(() => {
    if (userDetails !== null) {
      setIsLoggedIn(true)
    }
  }, [userDetails])



  const testimonials = [
    {
      quote: "One4All didn't just increase our sales—it gave me back my nights and weekends. My family finally has me present again.",
      author: "Sarah Chen",
      role: "E-commerce Founder",
      metric: "387% ROI increase"
    },
    {
      quote: "We went from struggling to keep up with competitors to leading our industry. One4All made us the company others try to copy.",
      author: "Marcus Rodriguez",
      role: "Marketing Director",
      metric: "2.3x revenue growth"
    },
    {
      quote: "The moment I stopped worrying about 'what to post when' was the moment my business truly began to scale.",
      author: "Emma Thompson",
      role: "Agency Owner",
      metric: "150+ clients served"
    }
  ];

  const painPoints = [
    "Staying up late creating content that flops",
    "Watching competitors steal your customers",
    "Burning ad budget on guesswork",
    "Missing the perfect moment to post",
    "Feeling overwhelmed by platform changes"
  ];

  const transformations = [
    "Sleep peacefully knowing your content works",
    "Watch competitors scramble to copy you",
    "See every dollar multiply into more revenue",
    "Hit viral moments with perfect timing",
    "Stay ahead of every algorithm change"
  ];

  // Initialize network nodes
  useEffect(() => {
    const nodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      delay: Math.random() * 2000,
      platform: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Twitter', 'Facebook'][Math.floor(Math.random() * 6)]
    }));
    setNetworkNodes(nodes);
  }, []);

  // Animate connections
  useEffect(() => {
    const interval = setInterval(() => {
      const newConnections = [];
      for (let i = 0; i < 3; i++) {
        const from = Math.floor(Math.random() * networkNodes.length);
        const to = Math.floor(Math.random() * networkNodes.length);
        if (from !== to) {
          newConnections.push({ from, to, id: Date.now() + i });
        }
      }
      setActiveConnections(newConnections);
    }, 2000);

    return () => clearInterval(interval);
  }, [networkNodes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
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

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedUser(null);
    navigate.push('/onboarding/login');
  }, [setLoggedUser, navigate]);



  const NetworkAnimation = () => (
    <div className="relative w-full h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-sm border border-blue-200/30">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central Hub */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <NetworkIcon className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-blue-700 whitespace-nowrap">
            One4All AI
          </div>
        </div>

        {/* Network Nodes */}
        {networkNodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              animationDelay: `${node.delay}ms`,
              animationDuration: '3s'
            }}
          >
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        ))}

        {/* Animated Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {activeConnections.map((connection) => {
            const fromNode = networkNodes[connection.from];
            const toNode = networkNodes[connection.to];
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={connection.id}
                x1={fromNode.x + 16}
                y1={fromNode.y + 16}
                x2={toNode.x + 16}
                y2={toNode.y + 16}
                stroke="url(#gradient)"
                strokeWidth="2"
                className="animate-pulse"
              />
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Growth Indicators */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="bg-green-500/20 text-green-700 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
            +387% ROI
          </div>
          <div className="bg-blue-500/20 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold animate-pulse" style={{ animationDelay: '0.5s' }}>
            2.3x Growth
          </div>
          <div className="bg-purple-500/20 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold animate-pulse" style={{ animationDelay: '1s' }}>
            15hrs Saved
          </div>
        </div>
      </div>
    </div>
  );

  const ContentPreview = () => {
    const [activePost, setActivePost] = useState(0);
    const posts = [
      { platform: 'Instagram', engagement: '94%', reach: '2.3M' },
      { platform: 'TikTok', engagement: '87%', reach: '1.8M' },
      { platform: 'LinkedIn', engagement: '91%', reach: '890K' }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setActivePost(prev => (prev + 1) % posts.length);
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="bg-gradient-to-br from-white/60 to-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-800">AI-Generated Content</h4>
          <div className="flex space-x-1">
            {posts.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === activePost ? 'bg-blue-500' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-white/80 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">{posts[activePost].platform}</span>
            </div>
            <div className="text-xs text-gray-600 mb-2">Predicted to go viral in 2.3 hours</div>
            <div className="flex space-x-4 text-xs">
              <span className="text-green-600 font-semibold">Engagement: {posts[activePost].engagement}</span>
              <span className="text-blue-600 font-semibold">Reach: {posts[activePost].reach}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-blue-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Network className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                One4All
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#results" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Results</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
              <Link
                href="/onboarding/login"
                className={`${isLoggedIn ? "hidden" : "flex"} bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium`}
              >
                Login
              </Link>

              <Link
                href="/onboarding"
                className={` ${isLoggedIn ? "hidden" : "flex"} bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium`}
              >
                Start Free Trial
              </Link>
              <Link
                href="/dashboard"
                className={` ${!isLoggedIn ? "hidden" : "flex"} bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className={`${!isLoggedIn ? "hidden" : "flex"} bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium`}
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-blue-200/30 px-4 pb-4 space-y-4 shadow-md">
            <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium mt-4">Features</a>
            <a href="#results" className="block text-gray-700 hover:text-blue-600 font-medium">Results</a>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
            <Link
              href="/onboarding/login"
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
            >
              Login
            </Link>
            <Link
              href="/onboarding"
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
            >
              Start Free Trial
            </Link>
            <Link
              href="/dashboard"
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className={`${!isLoggedIn ? "hidden" : "flex"} block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all font-medium`}
            >
              Dashboard
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 mb-8 border border-blue-200/50">
                <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">AI Co-Pilot for High-Converting Content</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Stop <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Guessing</span>
                <br />
                Start <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dominating</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                While you're stuck creating content that might work, your competitors are stealing your customers.
                <span className="text-blue-600 font-semibold"> One4All gives you the unfair advantage</span> —
                AI that predicts what will go viral before you even post it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                <Link href='/onboarding' className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center space-x-2">
                  <span>Transform My Business</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-all">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                  <span className="text-lg font-medium">See It In Action</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 text-gray-500 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white shadow-sm"></div>
                    ))}
                  </div>
                  <span>2,847+ businesses transformed</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  ))}
                  <span className="ml-2">4.9/5 average rating</span>
                </div>
              </div>
            </div>

            {/* Right Side - Network Animation */}
            <div className="relative">
              <NetworkAnimation />

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-green-200/50">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700">Revenue +387%</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 animate-bounce" style={{ animationDelay: '1s' }}>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-blue-200/50">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-700">15hrs Saved Weekly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Visual */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white/50 to-blue-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              See <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">One4All</span> in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how One4All transforms your business into a content powerhouse that competitors can't ignore.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ContentPreview />

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Analyzes Your Market</h3>
                  <p className="text-gray-600">Our AI studies 10M+ data points to understand what makes your audience tick and what your competitors are missing.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Creates Viral-Ready Content</h3>
                  <p className="text-gray-600">Generate content that's scientifically designed to go viral, timed perfectly for maximum engagement.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Scales Your Success</h3>
                  <p className="text-gray-600">Automatically optimizes, schedules, and scales your content across all platforms while you focus on growing your business.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points to Transformation */}
      <section id="transformation" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50/50 to-green-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              From <span className="text-red-500">Frustration</span> to <span className="text-green-500">Freedom</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop living in content creation hell. Your competitors are gaining ground while you're stuck in the endless cycle of guess-and-post.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Before */}
            <div id="before" className={`space-y-6 transition-all duration-1000 ${isVisible.before ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-red-500 mb-4">Your Current Reality</h3>
                <p className="text-gray-600 mb-6">Sound familiar? You're not alone in this struggle.</p>
              </div>

              {painPoints.map((pain, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-red-50 border border-red-200/50">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">{pain}</p>
                </div>
              ))}
            </div>

            {/* After */}
            <div id="after" className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible.after ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-green-500 mb-4">Your New Reality</h3>
                <p className="text-gray-600 mb-6">This is your life with One4All working for you 24/7.</p>
              </div>

              {transformations.map((transformation, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-green-50 border border-green-200/50">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{transformation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Unfair Advantage</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While others play catch-up, you'll be three steps ahead with AI that thinks like a marketing genius.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Foresight Engine",
                description: "Know what will go viral before anyone else does",
                details: "Analyzes 10M+ data points to predict content performance with 94% accuracy",
                color: "from-blue-500 to-purple-600"
              },
              {
                icon: Target,
                title: "Competitor Crusher",
                description: "Turn your rivals' moves into your victories",
                details: "Real-time competitor tracking + instant counter-campaign generation",
                color: "from-red-500 to-pink-600"
              },
              {
                icon: Rocket,
                title: "Growth Multiplier",
                description: "Scale without the stress or sleepless nights",
                details: "Automated content creation, scheduling, and optimization across all platforms",
                color: "from-cyan-500 to-blue-600"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-blue-200/30 hover:border-blue-300/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:animate-pulse shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 text-lg">{feature.description}</p>
                  <p className="text-sm text-gray-500">{feature.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white/50 to-purple-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Results That <span className="text-green-500">Speak Volumes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it. These numbers represent real businesses, real growth, real transformation.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { metric: "387%", label: "Average ROI Increase", icon: TrendingUp, color: "from-green-500 to-emerald-600" },
              { metric: "2.3x", label: "Revenue Growth", icon: Award, color: "from-blue-500 to-cyan-600" },
              { metric: "94%", label: "Prediction Accuracy", icon: Target, color: "from-purple-500 to-pink-600" },
              { metric: "15hrs", label: "Weekly Time Saved", icon: Clock, color: "from-orange-500 to-red-600" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.metric}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>


          {/* Testimonial Carousel */}
          <div className="relative bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-6 leading-relaxed text-black">
                "{testimonials[currentTestimonial].quote}"
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full"></div>
                <div className="text-left">
                  <div className="font-semibold">{testimonials[currentTestimonial].author}</div>
                  <div className=" text-sm">{testimonials[currentTestimonial].role}</div>
                </div>
                <div className="hidden sm:block text-cyan-400 font-semibold text-lg">
                  {testimonials[currentTestimonial].metric}
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Your Competitors Won't Wait
              </h2>
              <p className="text-xl  mb-8 max-w-2xl mx-auto">
                Every day you delay is another day they gain ground. Start your transformation today
                and watch them scramble to keep up with you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link href='/onboarding' className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-10 py-4 rounded-full text-xl font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 flex items-center space-x-2">
                  <span>Start Free 14-Day Trial</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm ">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>Setup in under 5 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span>24/7 expert support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                One4All
              </span>
            </div>
            <div className="flex space-x-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
            © 2025 One4All. All rights reserved. Transform your business. Dominate your market.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default One4AllHomepage;