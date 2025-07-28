import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!hero || !title || !subtitle || !cta) return;

    // Initial setup
    gsap.set([title, subtitle, cta], { opacity: 0, y: 50 });

    // Animation timeline
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7")
    .to(cta, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7");

    // Floating animation for sparkles
    gsap.to(".floating-sparkle", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });

  }, []);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-purple-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 floating-sparkle">
        <Sparkles className="w-8 h-8 text-blue-400/60" />
      </div>
      <div className="absolute top-40 right-32 floating-sparkle">
        <Sparkles className="w-6 h-6 text-purple-400/60" />
      </div>
      <div className="absolute bottom-32 left-32 floating-sparkle">
        <Sparkles className="w-10 h-10 text-gold-400/60" />
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
        >
          <span className="block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Welcome to
          </span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-gold-400 bg-clip-text text-transparent">
            AscendPay
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          The Smarter Way to Pay, Get Paid, and Grow Financially
        </p>
        
        <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;