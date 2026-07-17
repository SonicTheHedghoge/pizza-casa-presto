import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Star, Zap } from "lucide-react";

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 30, y: y * -30 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-dark pt-12 pb-20 md:py-0">
      {/* Dynamic Floating Emojis replaced with abstract blurred shapes for a premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-accent-green/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      {/* Marquee Text Background (Subtle) */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden z-0 opacity-[0.03]">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-left 40s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <h1 key={`a${i}`} className="text-[14rem] font-display font-black uppercase text-white leading-none mx-6 shrink-0">
              CASA PRESTO
            </h1>
          ))}
        </div>
        <div className="flex whitespace-nowrap mt-4" style={{ animation: "marquee-right 45s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <h1 key={`b${i}`} className="text-[14rem] font-display font-black uppercase text-transparent stroke-white leading-none mx-6 shrink-0" style={{ WebkitTextStroke: "2px white" }}>
              FEU DE BOIS
            </h1>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-dark border border-white/10 text-white font-display font-bold text-xs uppercase px-4 py-2 rounded-full tracking-widest mb-8 flex items-center gap-2 shadow-premium"
          >
            <Flame className="w-4 h-4 text-primary" />
            La Meilleure Pizza de Djerba
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-display font-black text-white tracking-tight leading-[1.05]">
            Une Texture <br />
            <span className="text-primary relative inline-block">
              Légendaire.
              <svg className="absolute -bottom-2 left-0 w-full text-primary" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 15.5C45.5 5.5 152.5 -4 298 15.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p className="mt-8 text-white/70 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
            Découvrez nos recettes artisanales cuites à la perfection et livrées gratuitement chez vous en scooter électrique écolo.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md lg:max-w-none">
            <a href="#menu" className="btn-primary w-full sm:w-auto px-10 py-4.5 text-sm shadow-glow flex justify-center items-center gap-2 group">
              Commander Maintenant
              <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#delivery" className="btn-outline border-white/20 text-white hover:border-primary w-full sm:w-auto px-10 py-4.5 text-sm flex justify-center">
              Concept Écologique
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-gray-200 overflow-hidden relative">
                  <Image src={`/media__1783927186032.png`} alt="Client" fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-white/80 text-xs font-bold mt-1">4.8/5 (200+ Avis)</span>
            </div>
          </div>
        </motion.div>
        
        {/* Right Interactive Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative flex justify-center lg:justify-end items-center h-full"
        >
          {/* Glass Badges */}
          <div className="absolute top-10 right-10 glass-dark px-4 py-3 rounded-2xl z-20 flex items-center gap-3 shadow-premium animate-float" style={{ animationDelay: '0.5s' }}>
             <div className="bg-primary/20 p-2 rounded-full"><Flame className="w-5 h-5 text-primary" /></div>
             <div>
               <p className="text-white text-xs font-bold uppercase tracking-wider">Four à Bois</p>
               <p className="text-white/60 text-[10px]">Cuisson authentique</p>
             </div>
          </div>

          <div className="absolute bottom-10 left-0 glass-dark px-4 py-3 rounded-2xl z-20 flex items-center gap-3 shadow-premium animate-float" style={{ animationDelay: '1.5s' }}>
             <div className="bg-accent-green/20 p-2 rounded-full"><Zap className="w-5 h-5 text-accent-green" /></div>
             <div>
               <p className="text-white text-xs font-bold uppercase tracking-wider">Livraison Éco</p>
               <p className="text-white/60 text-[10px]">Silencieuse & rapide</p>
             </div>
          </div>

          <div 
            className="relative w-[min(90vw,600px)] aspect-square cursor-pointer transition-transform duration-200 ease-out z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] scale-75 animate-pulse"></div>
            <Image 
              src="/hero-pizza.png" 
              alt="Casa Presto Hero Pizza" 
              fill 
              className="object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.5)] animate-float" 
              priority 
              sizes="(max-width:1024px) 90vw, 600px" 
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
