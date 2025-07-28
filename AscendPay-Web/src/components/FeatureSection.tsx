import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Wifi, Brain, CreditCard, Zap, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Shield,
      title: "Real-time Fraud Detection",
      description: "AI monitors and protects every transaction with advanced machine learning algorithms.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Wifi,
      title: "Offline Access",
      description: "Use USSD or voice commands to pay without data connection, perfect for any situation.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "Smart Budgeting & Alerts",
      description: "Get personalized insights, saving nudges, and bill reminders powered by AI.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: CreditCard,
      title: "Alternative Credit Scoring",
      description: "Unlock microloans based on your daily spending patterns and financial behavior.",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Send and receive money locally and globally in seconds with zero friction.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Building,
      title: "Microbusiness Tools",
      description: "Invoice clients, track expenses, and get paid — all in one integrated platform.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const featuresContainer = featuresRef.current;

    if (!section || !featuresContainer) return;

    // Animate section title
    gsap.fromTo(".section-title", 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        }
      }
    );

    // Animate feature cards
    gsap.fromTo(".feature-card",
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresContainer,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax effect for feature cards
    gsap.to(".feature-card", {
      y: -50,
      scrollTrigger: {
        trigger: featuresContainer,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="section-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-gold-400 bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="section-title text-xl text-gray-300 max-w-3xl mx-auto">
            AscendPay is a next-generation digital banking platform built for Africa and beyond. Powered by AI, AscendPay makes managing your money simpler, safer, and more inclusive.
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="feature-card group p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;