'use client';

import { motion } from 'framer-motion';
import { 
  FileDown, 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  Download,
  FileText,
  Image as ImageIcon,
  Presentation,
  History,
  Layout,
  Cloud,
  Mail,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

interface OutputSectionProps {
  result: any;
  onReset: () => void;
}

export default function OutputSection({ result, onReset }: OutputSectionProps) {
  const { files, links } = result;
  
  const handleDownload = (filename: string) => {
    window.open(`http://localhost:8000/outputs/${filename}`, '_blank');
    toast.success(`Downloading ${filename}...`);
  };

  const outputs = [
    { title: 'Incident Report', icon: FileText, desc: 'Professional PDF analysis', filename: files[0], color: 'bg-red-50 text-red-600 border-red-100' },
    { title: 'Safety Poster', icon: ImageIcon, desc: 'Community awareness PNG', filename: files[1], color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { title: 'Safety Guide', icon: FileText, desc: 'Comprehensive DOCX manual', filename: files[2], color: 'bg-green-50 text-green-600 border-green-100' },
    { title: 'Presentation', icon: Presentation, desc: 'Community briefing PPTX', filename: files[3], color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { title: 'Incident Timeline', icon: History, desc: 'Sequence visualization PNG', filename: files[4], color: 'bg-purple-50 text-purple-600 border-purple-100' },
  ];

  return (
    <section id="output-section" className="py-24 px-4 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-16">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="text-center space-y-4"
         >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold border border-green-500/20 mb-4 animate-pulse">
               <CheckCircle2 className="w-5 h-5" />
               Artifacts Successfully Generated
            </div>
            <h2 className="text-5xl font-black mb-4">Your Road Safety Kit is Ready</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
               The AI has generated 5 specialized safety materials. You can download them individually or access them via OneDrive.
            </p>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {outputs.map((out, i) => (
              <motion.div
                key={out.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col gap-6 p-8 rounded-3xl border ${out.color.split(' ')[2]} backdrop-blur-xl group cursor-pointer hover:scale-105 transition-all`}
              >
                 <div className={`w-14 h-14 rounded-2xl ${out.color.split(' ')[0]} flex items-center justify-center p-3`}>
                    <out.icon className="w-full h-full" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black mb-1 group-hover:text-primary-400 transition-colors">{out.title}</h3>
                    <p className="text-xs opacity-60 font-medium">{out.desc}</p>
                 </div>
                 <div className="mt-auto pt-6 flex gap-3">
                    <button 
                       onClick={() => handleDownload(out.filename)}
                       className="flex-1 py-3 px-4 bg-white/10 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                    >
                       <Download className="w-4 h-4" />
                       Download
                    </button>
                    <button 
                       className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                    >
                       <Share2 className="w-4 h-4" />
                    </button>
                 </div>
              </motion.div>
            ))}
         </div>

         {/* Distribution Status */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="p-12 glass rounded-[40px] border border-white/10 bg-white/5"
         >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
               <div className="space-y-4">
                  <h3 className="text-3xl font-black">Managed Distribution</h3>
                  <p className="text-gray-400">Our agents have automatically shared these reports to your pre-configured channels.</p>
                  <div className="flex gap-4 pt-4">
                     <button onClick={onReset} className="px-6 py-3 bg-white text-gray-900 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-gray-200 transition-all">
                        Reset Agent
                        <Layout className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Cloud, label: 'OneDrive Business', status: 'Sync Complete', link: links[0] || '#' },
                    { icon: Mail, label: 'Outlook Express', status: 'Email Sent to PCR', link: '#' },
                    { icon: Users, label: 'Teams Community', status: 'Posted to Awareness', link: '#' },
                    { icon: ExternalLink, label: 'Web Dashboard', status: 'Deployment Active', link: '#' },
                  ].map((dist, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                       <div className="w-12 h-12 rounded-2xl bg-primary-600/20 flex items-center justify-center p-3 text-primary-400">
                          <dist.icon className="w-full h-full" />
                       </div>
                       <div className="flex-1">
                          <h4 className="font-bold text-lg group-hover:text-primary-400 transition-colors">{dist.label}</h4>
                          <p className="text-xs text-green-400 font-bold flex items-center gap-1">
                             <CheckCircle2 className="w-3 h-3" />
                             {dist.status}
                          </p>
                       </div>
                       <a 
                         href={dist.link} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="p-3 hover:bg-white/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                       >
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                       </a>
                    </div>
                  ))}
               </div>
            </div>
         </motion.div>
      </div>
    </section>
  );
}
