import React, { useState, useEffect } from 'react';
import { Menu, X, Home, CreditCard, Shield, Smartphone, Download } from 'lucide-react';

const FloatingSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'security', 'download'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'features', label: 'Features', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'download', label: 'Download', icon: Download },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Logo */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AscendPay
            </h2>
            <p className="text-gray-400 text-sm mt-2">Banking, Reimagined</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-4">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: isOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none',
                      }}
                    >
                      <IconComponent 
                        className={`w-5 h-5 transition-colors duration-300 ${
                          activeSection === item.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                        }`} 
                      />
                      <span 
                        className={`transition-colors duration-300 ${
                          activeSection === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="pb-6 text-center">
            <p className="text-xs text-gray-500">© 2025 AscendPay</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default FloatingSidebar;