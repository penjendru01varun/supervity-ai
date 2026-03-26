'use client';

import { motion } from 'framer-motion';
import { Shield, Activity, Globe, Zap, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const stats = [
    { icon: Shield, value: '1.5L+', label: 'Annual Road Deaths', color: 'text-red-500' },
    { icon: Activity, value: '4.5L+', label: 'Annual Injuries', color: 'text-orange-500' },
    { icon: Globe, value: '150+', label: 'Countries Affected', color: 'text-blue-500' },
    { icon: Zap, value: '80%', label: 'Preventable', color: 'text-green-500' },
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-10">
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-semibold text-primary-600 mb-6 border border-white/20">
            🚦 AI-Powered Road Safety Intelligence
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight"
        >
          <span className="gradient-text">Save Lives</span>
          <br />
          <span className="text-gray-900">with AI Intelligence</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Accept road incident descriptions or reports, analyze them instantly, and generate
          comprehensive safety materials to empower your community.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="flex gap-4 justify-center mb-16"
        >
           <button 
             onClick={() => document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all hover:scale-105 active:scale-95"
           >
             Get Started Now
           </button>
           <button className="px-8 py-4 glass text-gray-900 rounded-full font-bold hover:bg-white/50 transition-all border border-white/20">
             Watch Demo
           </button>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1 }}
           className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-white/20 hover:scale-105 transition-transform">
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
              <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </div>
  );
}
