import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Download, Apple, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DownloadSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;

    if (!section || !phone) return;

    // Animate phone mockup
    gsap.fromTo(phone,
      { opacity: 0, y: 100, rotation: -10 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate download buttons
    gsap.fromTo(".download-btn",
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Float animation for phone
    gsap.to(phone, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, []);

  return (
    <section id="download" ref={sectionRef} className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-gold-400 bg-clip-text text-transparent">
              Download the App
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Ready to experience financial freedom? Get AscendPay on your device and start your journey towards smarter banking today.
            </p>
            
            <div className="space-y-6">
              {/* iOS Download */}
              <button className="download-btn group w-full md:w-auto flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl border border-gray-600 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Apple className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-400">Download on the</div>
                  <div className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">App Store</div>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 ml-auto" />
              </button>
              
              {/* Android Download */}
              <button className="download-btn group w-full md:w-auto flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl border border-gray-600 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Play className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-400">Get it on</div>
                  <div className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300">Google Play</div>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors duration-300 ml-auto" />
              </button>
            </div>
            
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
              <p className="text-center text-lg text-blue-300 font-medium">
                Let's build a financially inclusive future.
              </p>
              <p className="text-center text-sm text-gray-400 mt-2">
                AscendPay — Banking, Reimagined
              </p>
            </div>
          </div>
          
          {/* Right side - Phone mockup */}
          <div className="relative flex justify-center">
            <div ref={phoneRef} className="relative">
              {/* Phone frame */}
              <div className="w-80 h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-4 shadow-2xl border-4 border-gray-700 relative overflow-hidden">
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-b from-blue-900 via-purple-900 to-black rounded-[2.5rem] relative overflow-hidden">
                  {/* Status bar */}
                  <div className="flex justify-between items-center p-4 text-white text-sm">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App content */}
                  <div className="px-6 py-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">AscendPay</h3>
                    <p className="text-sm text-gray-300 mb-8">Banking, Reimagined</p>
                    
                    {/* Mock transaction cards */}
                    <div className="space-y-3">
                      <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <div className="text-sm text-white font-medium">Transfer to John</div>
                            <div className="text-xs text-gray-400">Today 2:30 PM</div>
                          </div>
                          <div className="text-green-400 font-semibold">+$250</div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <div className="text-sm text-white font-medium">Coffee Shop</div>
                            <div className="text-xs text-gray-400">Yesterday 8:15 AM</div>
                          </div>
                          <div className="text-red-400 font-semibold">-$4.50</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full"></div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-purple-600/20 rounded-[3rem] filter blur-xl -z-10 scale-110"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;