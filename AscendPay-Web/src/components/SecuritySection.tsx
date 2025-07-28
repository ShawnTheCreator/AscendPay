import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Eye, Fingerprint } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SecuritySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate security icons
    gsap.fromTo(".security-icon",
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(2.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate text content
    gsap.fromTo(".security-content",
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          scrub: 1
        }
      }
    );

    // Pulse effect for shield
    gsap.to(".main-shield", {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, []);

  return (
    <section id="security" ref={sectionRef} className="py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Security visualization */}
          <div className="relative">
            <div className="relative w-96 h-96 mx-auto">
              {/* Central shield */}
              <div className="main-shield absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
              
              {/* Orbiting security elements */}
              <div className="security-icon absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              
              <div className="security-icon absolute top-1/2 right-8 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              
              <div className="security-icon absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Fingerprint className="w-8 h-8 text-white" />
              </div>
              
              <div className="security-icon absolute top-1/2 left-8 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              {/* Connection lines */}
              <div className="absolute inset-0 bg-gradient-conic from-blue-500/20 via-transparent to-purple-500/20 rounded-full animate-spin-slow"></div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="security-content">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Built for Real Life
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              No matter where you are — from big cities to rural villages — AscendPay helps you take control of your money with bank-grade security and AI-powered protection.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">256-bit Encryption</h3>
                  <p className="text-gray-400">Military-grade security for all transactions</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">24/7 Monitoring</h3>
                  <p className="text-gray-400">Real-time fraud detection and prevention</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Fingerprint className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Biometric Authentication</h3>
                  <p className="text-gray-400">Your fingerprint is your password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;