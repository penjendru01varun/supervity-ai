'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  MapPin, 
  Calendar, 
  Car, 
  AlertTriangle, 
  CheckCircle, 
  FileCheck,
  ChevronRight,
  ShieldCheck,
  History,
  XCircle,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AnalysisSectionProps {
  blueprint: any;
  onGenerate: (result: any) => void;
  onCancel: () => void;
}

export default function AnalysisSection({ blueprint, onGenerate, onCancel }: AnalysisSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  
  const incident = blueprint.incident;
  const research = blueprint.research;
  const audit = blueprint.audit_trail;

  const handleApprove = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json_stringify(blueprint),
      });

      if (!response.ok) throw new Error('Generation failed');
      
      const result = await response.json();
      toast.success('Reports generated successfully!');
      onGenerate(result);
    } catch (error) {
      toast.error('Could not generate reports. Please try again.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Safe stringify helper (manually defined for safety)
  function json_stringify(obj: any) {
    return JSON.stringify(obj);
  }

  return (
    <section id="analysis-section" className="py-24 px-4 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Blueprint Review */}
        <div className="lg:col-span-2 space-y-8">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass rounded-3xl p-10 border border-white/20 shadow-xl"
           >
              <div className="flex justify-between items-start mb-10">
                 <div>
                   <h2 className="text-3xl font-black text-gray-900 mb-2">Analysis Workbench</h2>
                   <p className="text-gray-500">Review incident extraction and research data before final report generation.</p>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={onCancel} className="p-3 rounded-full hover:bg-red-50 text-red-400 border border-red-100 transition-colors">
                       <XCircle className="w-6 h-6" />
                    </button>
                    <button onClick={handleApprove} disabled={isGenerating} className="px-6 py-3 bg-green-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 hover:bg-green-700 disabled:opacity-50">
                       {isGenerating ? 'Generating...' : 'Approve & Create All Files'}
                       <FileCheck className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              {/* Severity Gauge (Simulated) */}
              <div className="mb-12 relative h-4 bg-gray-100 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${incident.severity_score}%` }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className={`h-full ${incident.severity_score > 70 ? 'bg-red-500' : 'bg-orange-500'}`}
                 />
                 <div className="absolute top-6 right-0 font-black text-2xl text-gray-900">
                    Severity: {incident.severity_score}%
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {/* Incident Details Card */}
                 <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-xl font-black text-gray-800 border-b border-gray-100 pb-2">
                       <MapPin className="w-5 h-5 text-primary-500" />
                       Extracted Details
                    </h3>
                    <div className="space-y-4">
                       <div className="flex justify-between border-b border-gray-50 pb-2">
                          <span className="text-gray-500">Location:</span>
                          <span className="font-bold text-gray-900 text-right">{incident.location.address}</span>
                       </div>
                       <div className="flex justify-between border-b border-gray-50 pb-2">
                          <span className="text-gray-500">Category:</span>
                          <span className="font-bold text-gray-900">{incident.location.road_type}</span>
                       </div>
                       <div className="flex justify-between border-b border-gray-50 pb-2">
                          <span className="text-gray-500">Time:</span>
                          <span className="font-bold text-gray-900">{incident.datetime.date} | {incident.datetime.time}</span>
                       </div>
                    </div>
                 </div>

                 {/* Contributing Factors */}
                 <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-xl font-black text-gray-800 border-b border-gray-100 pb-2">
                       <AlertTriangle className="w-5 h-5 text-orange-500" />
                       Contributing Factors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {incident.cause_keywords.map((cause: string) => (
                          <span key={cause} className="px-4 py-2 rounded-xl bg-orange-50 text-orange-600 font-bold border border-orange-100 uppercase text-xs">
                             {cause.replace('_', ' ')}
                          </span>
                       ))}
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Research & Prevention */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="glass rounded-3xl p-10 border border-white/20 shadow-xl"
           >
              <h3 className="flex items-center gap-2 text-2xl font-black text-gray-800 mb-8">
                 <ShieldCheck className="w-6 h-6 text-green-500" />
                 Safety Intelligence
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-4">
                    <h4 className="font-black text-gray-500 uppercase text-xs tracking-wider">Prevention Recommendations</h4>
                    <ul className="space-y-3">
                       {research.prevention_tips.map((tip: string, i: number) => (
                          <li key={i} className="flex gap-3 text-gray-700 bg-white/50 p-4 rounded-2xl border border-white/50">
                             <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                             {tip}
                          </li>
                       ))}
                    </ul>
                 </div>

                 <div className="space-y-4">
                    <h4 className="font-black text-gray-500 uppercase text-xs tracking-wider">Regional Statistical Context</h4>
                    <div className="space-y-4">
                        <div className="bg-white/50 p-6 rounded-2xl border border-white/50 space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-sm font-bold text-gray-400">Annual Accidents</span>
                              <span className="text-2xl font-black text-primary-600">{research.statistics.annual_accidents}</span>
                           </div>
                           <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1 }} className="h-full bg-primary-500" />
                           </div>
                           <p className="text-xs text-gray-500 flex items-center gap-1"><History className="w-3 h-3" /> Historical trend for {research.statistics.region}</p>
                        </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Sidebar: Audit Trail & Agents Status */}
        <div className="space-y-8">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass rounded-3xl p-8 border border-white/20 shadow-xl"
           >
              <button 
                 onClick={() => setShowAudit(!showAudit)} 
                 className="w-full flex justify-between items-center text-xl font-black text-gray-800 mb-6 group"
              >
                 <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary-500" /> Real-time Audit Trail</span>
                 <ChevronDown className={`w-5 h-5 transition-transform ${showAudit ? 'rotate-180' : ''}`} />
              </button>

              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                 {audit.map((entry: any, i: number) => (
                    <div key={i} className="relative pl-8 border-l-2 border-primary-100 pb-2">
                       <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-sm" />
                       <p className="text-xs font-black text-primary-600 uppercase mb-1">{entry.agent}</p>
                       <p className="text-sm font-bold text-gray-900 mb-1">{entry.action}</p>
                       <p className="text-[10px] text-gray-400 font-mono">{new Date(entry.timestamp).toLocaleTimeString()}</p>
                       {showAudit && entry.data && (
                          <motion.pre 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 p-3 bg-black/5 rounded-xl text-[10px] overflow-x-auto text-gray-500 border border-black/5"
                          >
                             {JSON.stringify(entry.data, null, 2)}
                          </motion.pre>
                       )}
                    </div>
                 ))}
                 <div className="flex items-center gap-2 p-4 rounded-2xl bg-primary-50 text-primary-600">
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    <span className="text-xs font-bold">Waiting for Human Approval...</span>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="glass rounded-3xl p-8 border border-white/20 shadow-xl bg-primary-600"
           >
              <h4 className="text-white font-black text-lg mb-4">Authority Contacts</h4>
              <div className="space-y-3">
                 {Object.entries(research.authorities).map(([key, val]: any) => (
                    <div key={key} className="flex justify-between items-center p-3 rounded-xl bg-white/10 text-white border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                       <span className="text-xs font-bold uppercase opacity-70">{key.replace('_', ' ')}</span>
                       <span className="font-black flex items-center gap-1">
                          {val}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                       </span>
                    </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
