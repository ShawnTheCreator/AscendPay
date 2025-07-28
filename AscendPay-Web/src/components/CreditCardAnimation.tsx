import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CreditCardAnimation = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const pouchRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const pouch = pouchRef.current;
    const container = containerRef.current;

    if (!card || !pouch || !container) return;

    // Initial setup
    gsap.set(card, {
      y: -200,
      rotation: -15,
      scale: 0.8,
      opacity: 0
    });

    gsap.set(pouch, {
      y: 50,
      opacity: 0,
      scale: 0.9
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          // Add glow effect based on progress
          const progress = self.progress;
          const glowIntensity = progress * 20;
          if (card) {
            card.style.filter = `brightness(${1 + progress * 0.3}) drop-shadow(0 0 ${glowIntensity}px rgba(0, 210, 255, 0.8))`;
          }
        }
      }
    });

    // Animate card appearance and drop
    tl.to(card, {
      opacity: 1,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    })
    .to(pouch, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    }, 0.1)
    .to(card, {
      y: 250,
      rotation: 5,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.inOut"
    })
    .to(card, {
      y: 280,
      rotation: 0,
      scale: 0.8,
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out"
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-purple-900/10 to-transparent"></div>
      
      {/* Credit Card */}
      <div 
        ref={cardRef}
        className="absolute z-10 w-80 h-48 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-600 overflow-hidden"
      >
        {/* Card design */}
        <div className="relative h-full p-6">
          {/* Chip */}
          <div className="w-12 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-md mb-4"></div>
          
          {/* Card number */}
          <div className="space-y-2 mb-4">
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex space-x-1">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="w-2 h-3 bg-white/60 rounded-sm"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Cardholder info */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-gray-400 mb-1">CARDHOLDER</div>
              <div className="text-sm text-white font-medium">ASCENDPAY USER</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">EXPIRES</div>
              <div className="text-sm text-white font-medium">12/28</div>
            </div>
          </div>
          
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-600/20 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
        </div>
      </div>

      {/* Digital Pouch/Wallet */}
      <div 
        ref={pouchRef}
        className="absolute bottom-20 z-5 w-96 h-32 bg-gradient-to-r from-blue-900/80 to-purple-900/80 rounded-3xl backdrop-blur-sm border border-blue-500/30 shadow-2xl"
      >
        <div className="relative h-full overflow-hidden rounded-3xl">
          {/* Pouch opening */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-4 bg-gradient-to-t from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
          
          {/* Security indicators */}
          <div className="absolute bottom-4 left-6 flex space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">Secure</span>
          </div>
          
          {/* Logo */}
          <div className="absolute bottom-4 right-6">
            <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AscendPay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardAnimation;