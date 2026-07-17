import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PIZZAS_TOMATE, PIZZAS_CREME, TEX_MEX, SALADES } from "../data/menu";
import { Flame, Star, Leaf, Plus } from "lucide-react";
import type { CartItem } from "./CartDrawer";

// Map pizza names to artifact images for fallback
const IMG_MAP: Record<string, string> = {
  "Marguerita": "/pizza_marguerita_1784301955149.jpg",
  "Reine": "/pizza_reine_1784301967839.jpg",
  "Campione": "/pizza_campione_1784301979400.jpg",
  "4 Fromages": "/pizza_4fromages_1784301991850.jpg",
  "Calzone": "/pizza_calzone_1784302001999.jpg",
  "Neptune": "/pizza_neptune_1784302013597.jpg",
  "Barbecue": "/pizza_barbecue_1784302023122.jpg",
  "Orientale": "/pizza_orientale_1784302033197.jpg",
  "Pépé Originale": "/pizza_pepe_originale_1784302051691.jpg",
  "La Tunisienne": "/pizza_la_tunisienne_1784302062813.jpg",
  "Hawaïenne": "/pizza_hawaienne_1784302074344.jpg",
  "Fruit de Mer": "/pizza_fruit_de_mer_1784302086946.jpg",
  "4 Saisons": "/pizza_4saisons_1784302096444.jpg",
};
const getImg = (n: string) => IMG_MAP[n] || "/pizza_marguerita_1784301955149.jpg";

function PizzaCard({ pizza, onAddToCart }: { pizza: any, onAddToCart: (item: any) => void }) {
  const [size, setSize] = useState<0|1|2>(1);
  const sizeNames = ["Junior", "Senior", "Familiale"];
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden"
    >
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-4 group-hover:scale-[1.02] transition-transform duration-500">
        <Image src={getImg(pizza.name)} alt={pizza.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        {pizza.tags?.includes("Chef") && (
          <div className="absolute top-3 left-3 bg-dark/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-gold fill-gold" /> Recommandé
          </div>
        )}
        {pizza.tags?.includes("Epicé") && (
          <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full flex items-center gap-1">
            <Flame className="w-3 h-3" /> Epicé
          </div>
        )}
        {pizza.tags?.includes("Végétarien") && (
          <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full flex items-center gap-1">
            <Leaf className="w-3 h-3" /> Végé
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-black text-xl text-dark group-hover:text-primary transition-colors">{pizza.name}</h3>
        </div>
        <p className="text-sm text-text-muted mb-6 flex-1">{pizza.desc}</p>
        
        <div className="bg-gray-50 rounded-xl p-1 flex mb-4 relative z-10 border border-gray-100">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setSize(i as 0|1|2)}
              className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${size === i ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-dark"}`}
            >
              {sizeNames[i]}
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <AnimatePresence mode="popLayout">
              <motion.span 
                key={size}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-display font-black text-2xl text-dark"
              >
                {pizza.p[size].toFixed(3).replace(/\.000$/, "")}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs font-bold text-gray-400 ml-1">dt</span>
          </div>
          <button 
            onClick={() => onAddToCart({ name: pizza.name, price: pizza.p[size], size: sizeNames[size], quantity: 1, id: `${pizza.name}-${sizeNames[size]}` })}
            className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuSection({ onAddToCart }: { onAddToCart: (item: Omit<CartItem, "id">) => void }) {
  const [filter, setFilter] = useState("Tous");
  
  const filters = ["Tous", "Recommandé", "Viande", "Végétarien", "Poisson"];
  
  const allPizzas = [...PIZZAS_TOMATE.map(p => ({...p, type: 'tomate'})), ...PIZZAS_CREME.map(p => ({...p, type: 'creme'}))];
  
  const filteredPizzas = allPizzas.filter(p => {
    if (filter === "Tous") return true;
    if (filter === "Recommandé") return p.tags?.includes("Chef");
    return p.tags?.includes(filter);
  });

  return (
    <section id="menu" className="py-24 bg-bg-alt relative">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black text-dark mb-4">Notre <span className="text-primary">Menu</span></h2>
          <p className="text-text-muted text-lg">Sélectionnez vos envies. Nos pizzas sont préparées à la commande avec une pâte fraîche artisanale.</p>
        </div>

        {/* Smart Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === f ? "bg-dark text-white shadow-md scale-105" : "bg-white text-text-muted border border-gray-200 hover:border-gray-300 hover:text-dark"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Pizza Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          <AnimatePresence>
            {filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.name} pizza={pizza} onAddToCart={onAddToCart} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tex Mex */}
        <div className="mt-32">
          <h2 className="text-3xl font-display font-black text-dark mb-8 flex items-center gap-3">
            <Flame className="w-8 h-8 text-primary" /> TEX-MEX & FRITES
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TEX_MEX.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-premium transition-all flex flex-col justify-between group">
                <div>
                  <h4 className="font-display font-bold text-xl text-dark mb-1 group-hover:text-primary transition-colors">{t.name}</h4>
                  <p className="text-xs text-text-muted mb-4">{t.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                  <span className="text-2xl font-black text-dark">{t.p.toFixed(3).replace(/\.000$/, "")} <span className="text-xs font-bold text-gray-400">dt</span></span>
                  <button onClick={() => onAddToCart({ name: t.name, price: t.p, quantity: 1 })} className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
