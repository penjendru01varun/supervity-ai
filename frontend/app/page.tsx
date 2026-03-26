'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AnimatedBackground from '@/components/animations/AnimatedBackground';
import HeroSection from '@/components/sections/HeroSection';
import InputSection from '@/components/sections/InputSection';
import AnalysisSection from '@/components/sections/AnalysisSection';
import OutputSection from '@/components/sections/OutputSection';

export default function RoadSafetyAgent() {
  const [step, setStep] = useState<'input' | 'analysis' | 'output'>('input');
  const [blueprint, setBlueprint] = useState<any>(null);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = (data: any) => {
    setBlueprint(data);
    setStep('analysis');
    // Smooth scroll to analysis section
    setTimeout(() => {
        document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGenerate = (data: any) => {
    setResult(data);
    setStep('output');
    // Smooth scroll to output section
    setTimeout(() => {
        document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setStep('input');
    setBlueprint(null);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen selection:bg-primary-500 selection:text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <AnimatedBackground />
      
      <HeroSection />

      <div className="relative z-10 transition-all duration-500">
        {step === 'input' && (
          <InputSection onAnalyze={handleAnalyze} />
        )}

        {(step === 'analysis' || step === 'output') && blueprint && (
          <AnalysisSection 
             blueprint={blueprint} 
             onGenerate={handleGenerate} 
             onCancel={handleReset} 
          />
        )}

        {step === 'output' && result && (
          <OutputSection result={result} onReset={handleReset} />
        )}
      </div>

      <footer className="py-12 border-t border-gray-100 bg-white/50 backdrop-blur-sm relative z-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <span className="text-2xl font-black gradient-text">RoadSafety.AI</span>
               <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-bold">V1.0</span>
            </div>
            <p className="text-gray-400 text-sm">Built with Next.js 15 + FastAPI Agents | © 2026 Road Safety Agent</p>
         </div>
      </footer>
    </main>
  );
}
