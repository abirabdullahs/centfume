import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col lg:flex-row items-center overflow-hidden bg-brand-black px-12 lg:px-0">
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-slate-800/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[100px]" />
      </div>

      {/* Left Content */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-24 pt-32 lg:pt-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 w-fit"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-medium">Autumn / Winter 2026</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-8xl lg:text-9xl font-extralight leading-[1] mb-10 tracking-tight"
        >
          <span className="block">Ethereal</span>
          <span className="block italic font-serif text-slate-200">Midnight</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-slate-400 text-lg font-light leading-relaxed mb-12 max-w-md"
        >
          An olfactory journey through damp forests and crisp starlight. Notes of black pepper, aged cedar, and wild violet.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="flex items-center gap-10"
        >
          <Button className="px-12 py-7 bg-white text-black text-[11px] font-bold uppercase tracking-[0.3em] rounded-none hover:bg-slate-200 transition-all shadow-2xl">
            Experience the Scent
          </Button>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Bottled in France</span>
            <span className="text-xl font-light font-mono text-white/90">$240.00</span>
          </div>
        </motion.div>
      </div>

      {/* Right Visual (Interactive Bottle Representation) */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full max-w-[400px] aspect-[3/4.5]"
        >
          {/* Glow Effect */}
          <div className="absolute inset-x-0 -bottom-10 h-24 bg-white/20 blur-[80px] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[3rem] blur-2xl opacity-20" />
          
          <div className="relative w-full h-full border border-white/10 rounded-3xl bg-zinc-900/30 backdrop-blur-3xl flex flex-col items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden group">
            {/* Bottle Mockup Parts */}
            <div className="w-24 h-6 bg-zinc-800 rounded-t-md mb-1 border-x border-t border-white/5" />
            <div className="w-32 h-20 bg-gradient-to-b from-zinc-700/50 to-zinc-900/50 rounded-lg shadow-inner mb-2 border border-white/10 flex items-center justify-center">
               <div className="w-12 h-12 border border-white/10 rounded-full opacity-20" />
            </div>
            
            <div className="w-56 lg:w-64 h-[280px] lg:h-[320px] bg-zinc-800/40 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent" />
               <div className="z-10 p-6 border border-white/10 bg-black/60 backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-[0.5em] font-light text-white/80">Centfume</p>
               </div>
               
               {/* Liquid Glow */}
               <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-brand-gold/10 blur-3xl" />
            </div>
            
            <div className="mt-10 text-[10px] tracking-[0.8em] text-white/20 uppercase font-light">Eau De Parfum</div>
            
            {/* Scroll/Mouse Indicator */}
            <div className="absolute bottom-6 right-6 w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
