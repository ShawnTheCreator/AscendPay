import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingSidebar from './components/FloatingSidebar';
import HeroSection from './components/HeroSection';
import CreditCardAnimation from './components/CreditCardAnimation';
import FeatureSection from './components/FeatureSection';
import SecuritySection from './components/SecuritySection';
import DownloadSection from './components/DownloadSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll
    const lenis = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    };
    
    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-4 h-4 bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200';
    document.body.appendChild(cursor);
    
    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 8 + 'px';
      cursor.style.top = e.clientY - 8 + 'px';
    };
    
    document.addEventListener('mousemove', updateCursor);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <FloatingSidebar />
      
      <main>
        <HeroSection />
        <CreditCardAnimation />
        <FeatureSection />
        <SecuritySection />
        <DownloadSection />
      </main>
      
      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AscendPay
            </h3>
            <p className="text-gray-400 text-sm mt-2">Banking, Reimagined</p>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-8 mb-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Support</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>
          
          <p className="text-xs text-gray-500">
            © 2025 AscendPay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;