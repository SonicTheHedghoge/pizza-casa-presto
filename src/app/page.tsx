"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Types ─── */
interface CartItem {
  id: string; // name + size (if applicable)
  name: string;
  price: number;
  size?: string;
  quantity: number;
}

/* ─── Scroll Reveal Hook ─── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── DATA ─── */
const PIZZAS_TOMATE = [
  { name: "Marguerita", desc: "Sauce tomate, Mozzarella 100% lait, origan frais", p: [8, 12, 20] },
  { name: "Reine", desc: "Sauce tomate, Mozzarella, jambon, champignons de Paris", p: [9, 16, 28] },
  { name: "Campione", desc: "Sauce tomate, Mozzarella, viande hachée assaisonnée, champignons", p: [9, 16, 28] },
  { name: "4 Fromages", desc: "Sauce tomate, Mozzarella, brie crémeux, chèvre, bleu de caractère", p: [9, 16, 28] },
  { name: "Calzone", desc: "Sauce tomate, Mozzarella, jambon, œuf (en chausson)", p: [9, 16, 28] },
  { name: "Neptune", desc: "Sauce tomate, Mozzarella, thon émietté, œuf, poivrons doux, olives noires", p: [9, 16, 28] },
  { name: "Barbecue", desc: "Sauce barbecue fumée, Mozzarella, oignons caramélisés, poulet grillé, tomates fraîches, viande hachée", p: [9, 16, 28] },
  { name: "Orientale", desc: "Sauce tomate, Mozzarella, merguez parfumées, poivrons grillés, oignons, œuf", p: [9, 16, 28] },
  { name: "Pépé Originale", desc: "Sauce tomate, Mozzarella, généreuses tranches de pepperoni croustillantes", p: [9, 16, 28] },
  { name: "La Tunisienne", desc: "Sauce tomate, Mozzarella, thon, champignons, poivrons, aubergines marinées, oignons, œufs, piment vert fort, persillade", p: [10, 18, 31] },
  { name: "Hawaïenne", desc: "Sauce tomate, Mozzarella, jambon, morceaux d'ananas juteux", p: [10, 18, 31] },
  { name: "Fruit de Mer", desc: "Sauce tomate, Mozzarella, calamars, crevettes, moules, filet de citron, ail rôti, persil frais", p: [10, 18, 31] },
  { name: "4 Saisons", desc: "Sauce tomate, Mozzarella, jambon, champignons, poivrons, cœurs d'artichauts, olives", p: [10, 18, 31] },
  { name: "La Casa", desc: "Sauce tomate, Mozzarella, viande hachée, merguez, poulet émincé", p: [10, 18, 31] },
  { name: "Pépé Del Casa", desc: "Sauce tomate, Mozzarella, poulet, tomates cerises, pepperoni, gouda, emmental fondu", p: [10, 18, 31] },
  { name: "Chicken", desc: "Sauce tomate, Mozzarella, poulet émincé, tomates cerises, poivrons, copeaux de parmesan", p: [10, 18, 31] },
];

const PIZZAS_CREME = [
  { name: "Venezia", desc: "Crème fraîche, Mozzarella, saumon fumé d'Écosse, filet de citron frais", p: [10.5, 18, 32] },
  { name: "Rimini", desc: "Crème fraîche, Mozzarella, poulet émincé, champignons de Paris, tranches de pomme de terre", p: [10.5, 18, 32] },
  { name: "Chèvre Miel", desc: "Crème fraîche, double Mozzarella, fromage de chèvre fondant, filet de miel pur, œuf", p: [10.5, 18, 32] },
  { name: "Boursin", desc: "Crème fraîche, Mozzarella, viande hachée assaisonnée, fromage Boursin ail & fines herbes, oignons, œuf", p: [10.5, 18, 32] },
];

const TEX_MEX = [
  { name: "Chicken Wings", desc: "8 Pièces croustillantes servies avec frites ou potatoes", p: 7.9 },
  { name: "Calamars Frits", desc: "8 Pièces dorées servies avec frites ou potatoes", p: 7.9 },
  { name: "Nuggets", desc: "8 Pièces de blanc de poulet croustillantes avec frites ou potatoes", p: 7.9 },
];

const TEX_MEX_SIDES = [
  { name: "Frites Maison", desc: "Portion de frites dorées", p: 4.0 },
  { name: "Frites Cheddar", desc: "Frites croustillantes avec cheddar fondu", p: 5.0 },
];

const ZAPWICH = [
  { name: "Zapwich Original", desc: "Pain à pizza farci de fromage fondant et viandes au choix (Viande Hachée, Merguez, Poulet, Saumon) ou 4 Fromages, avec frites", p: 8.5 },
];

const SALADES = [
  { name: "Exotique", desc: "Salade verte, tomates fraîches, maïs doux, crevettes marinées", p: 6.5 },
  { name: "Antillais", desc: "Salade verte, tomates fraîches, jambon, ananas, maïs", p: 6.5 },
  { name: "Chef", desc: "Salade verte, tomates fraîches, gruyère, jambon, cornichons, maïs", p: 6.5 },
  { name: "Italienne", desc: "Salade verte, tomates fraîches, poivrons doux, olives, anchois salés, gruyère", p: 6.5 },
  { name: "Niçoise", desc: "Salade verte, tomates fraîches, pommes de terre, thon, olives, œuf dur", p: 6.5 },
  { name: "Royale", desc: "Salade verte, tomates fraîches, filet de poulet, croûtons, chèvre chaud fondant", p: 6.5 },
  { name: "Norvégienne", desc: "Salade verte, tomates fraîches, saumon fumé, crème fraîche citronnée", p: 6.5 },
  { name: "Grecque au Surimi", desc: "Salade verte, tomates, concombre, surimi, poivrons, oignons, feta, origan, citron", p: 9.9 },
];

const FORMULES = [
  { name: "Menu Midi", desc: "1 Pizza Junior au choix + 1 Boisson fraîche + 1 Dessert Grec", p: 10.5, type: "Midi" },
  { name: "Kid Box", desc: "4 Nuggets + Frites + 1 Boisson + 1 Surprise", p: 6.9, type: "Kid" },
];

const DESSERTS = [
  { name: "Tiramisu Maison", desc: "Café ou Chocolat", p: 4.9 },
  { name: "Mousse au Chocolat", desc: "Onctueuse", p: 4.9 },
  { name: "Dessert Grec", desc: "Saveurs méditerranéennes", p: 4.9 },
];

const BOISSONS = [
  { name: "Sodas", desc: "Canette 33cl au choix", p: 2.0 },
  { name: "Eau Gazeuse 0.5l", desc: "Fraîche et pétillante", p: 1.5 },
  { name: "Eau Minérale 0.5l", desc: "Pure et désaltérante", p: 1.0 },
];

const REVIEWS = [
  { name: "Safeeyah (Local Guide)", text: "Hier soir, nous avons pris des pizzas chez Casa Presto. C'est sans doute la meilleure pizza de Djerba ! Le service était excellent et la pizza était délicieuse ! Le cadre sur place est confortable, propre et le personnel est très amical." },
  { name: "Jamel Henchiri", text: "Très bonne pizza, genre Pizza Hut, service parfait. Menu pas cher du tout. La livraison est super rapide sur leurs scooters électriques, c'est le top !" },
  { name: "Mohamed Hedi Maïza", text: "Très bonnes pizzas. J'ai goûté la Barbecue. Elle était excellente et le service est vraiment rapide et agréable. Je recommande fortement." },
];

const DROP_TAGS = [
  { text: "PÂTE ARTISANALE", rotate: "-8deg", delay: "0s" },
  { text: "SAUCE TOMATE MAISON", rotate: "12deg", delay: "0.15s" },
  { text: "MOZZARELLA 100% LAIT", rotate: "-3deg", delay: "0.3s" },
  { text: "LIVRAISON ÉCOLOGIQUE", rotate: "6deg", delay: "0.45s" },
  { text: "CUISSON INTENSE", rotate: "-10deg", delay: "0.6s" },
  { text: "INGRÉDIENTS FRAIS", rotate: "15deg", delay: "0.75s" },
];

/* ─── COMPONENTS ─── */

function Topbar() {
  return (
    <div className="bg-primary text-white text-center py-2.5 text-sm font-display font-medium tracking-wide z-40 relative">
      LIVRAISON GRATUITE SUR TOUTE L&apos;ÎLE DE DJERBA 🛵 75 655 169
    </div>
  );
}

function Navbar({ onOpenCart, cartCount }: { onOpenCart: () => void; cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`sticky top-0 z-45 transition-all duration-300 ${scrolled ? "bg-bg/95 backdrop-blur-md shadow-lg" : "bg-bg"}`}>
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[80px]">
        <a href="#" className="font-display text-[32px] font-extrabold text-primary italic flex items-center gap-2 tracking-tighter">
          <span className="text-3xl">🍕</span>
          CASA PRESTO
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Notre Carte", href: "#menu" },
            { label: "Concept Éco", href: "#delivery" },
            { label: "Avis Clients", href: "#reviews" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="group relative text-sm font-bold text-dark uppercase tracking-wider">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">{l.label}</span>
              <span className="absolute inset-0 block text-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:75655169" className="font-display font-black text-xl hover:text-primary transition-colors flex items-center gap-2">
            <span>📞</span> 75 655 169
          </a>
          <button onClick={onOpenCart} className="relative btn-primary px-6 py-3.5 text-xs shadow-md shadow-primary/30 flex items-center gap-2">
            <span>🛒 Panier</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 border-2 border-white text-white font-black text-[10px] w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={onOpenCart} className="relative p-2 text-dark" aria-label="Cart">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="w-8 h-8 flex flex-col justify-center gap-1.5" aria-label="Menu">
            <span className={`block h-0.5 w-full bg-dark transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-full bg-primary transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-full bg-dark transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-bg border-t border-bg-alt px-6 pb-8 space-y-4 pt-4 shadow-inner">
          {["Notre Carte", "Concept Éco", "Avis Clients"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace("notre carte", "menu").replace("concept éco", "delivery").replace("avis clients", "reviews")}`}
              onClick={() => setOpen(false)}
              className="block font-display font-bold text-lg text-dark uppercase hover:text-primary transition-colors"
            >
              {l}
            </a>
          ))}
          <a href="tel:75655169" className="block text-xl font-bold text-primary pt-2">📞 Appeler: 75 655 169</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 25, y: y * -25 }); // Max 25 degrees tilt
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-bg pt-12 pb-20 md:py-0">
      {/* Dynamic Floating Emojis */}
      <div className="absolute text-5xl opacity-40 pointer-events-none select-none top-10 left-[8%] animate-drift-slow">🍃</div>
      <div className="absolute text-6xl opacity-30 pointer-events-none select-none top-[25%] right-[10%] animate-drift-fast">🍅</div>
      <div className="absolute text-5xl opacity-35 pointer-events-none select-none bottom-[20%] left-[12%] animate-drift-fast">🍄</div>
      <div className="absolute text-6xl opacity-40 pointer-events-none select-none bottom-[15%] right-[6%] animate-drift-slow">🌶️</div>
      <div className="absolute text-4xl opacity-25 pointer-events-none select-none top-[55%] left-[4%] animate-drift-slow">🧅</div>
      <div className="absolute text-5xl opacity-35 pointer-events-none select-none top-[15%] right-[22%] animate-drift-fast">🫒</div>

      {/* Background Text Marquee */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden z-0 opacity-5">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-left 30s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <h1 key={`a${i}`} className="text-[12rem] font-display font-black uppercase text-primary leading-none mx-6 shrink-0">
              CASA PRESTO DJERBA PIZZERIA
            </h1>
          ))}
        </div>
        <div className="flex whitespace-nowrap mt-4" style={{ animation: "marquee-right 35s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <h1 key={`b${i}`} className="text-[12rem] font-display font-black uppercase text-stroke-primary leading-none mx-6 shrink-0">
              PIZZA ARTISANALE AU FEU DE BOIS
            </h1>
          ))}
        </div>
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full flex flex-col items-center justify-center text-center">
        <span className="bg-primary/10 text-primary font-display font-bold text-xs uppercase px-4 py-2 rounded-full tracking-widest mb-6">
          La Meilleure Pizza de Djerba 🔥
        </span>
        
        {/* Giant Interactive Image */}
        <div 
          className="relative w-[min(85vw,620px)] aspect-square cursor-pointer transition-transform duration-300 ease-out"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)`,
          }}
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] scale-75 animate-pulse"></div>
          <Image 
            src="/hero-pizza.png" 
            alt="Casa Presto Hero Pizza" 
            fill 
            className="object-contain drop-shadow-[0_35px_35px_rgba(243,112,33,0.35)] animate-float" 
            priority 
            sizes="(max-width:768px) 85vw, 620px" 
          />
        </div>

        <h2 className="text-4xl md:text-6xl font-display font-black text-dark tracking-tight max-w-3xl mt-8 leading-tight">
          Une Texture <span className="text-primary">Légendaire</span>, Une Livraison <span className="text-accent-green">Verte</span>.
        </h2>
        
        <p className="mt-4 text-text-muted text-lg max-w-xl">
          Découvrez nos recettes artisanales cuites à la perfection et livrées gratuitement chez vous en scooter électrique écolo.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <a href="#menu" className="btn-primary px-10 py-4.5 text-sm w-full sm:w-auto shadow-lg shadow-primary/30">
            Explorer le Menu
          </a>
          <a href="#delivery" className="btn-outline px-10 py-4.5 text-sm w-full sm:w-auto">
            Concept Écologique
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Pizza Card Component (Dynamic Size Selector & Pricing & Add-to-Cart) ─── */
function PizzaCard({ pizza, onAddToCart }: { pizza: { name: string, desc: string, p: number[] }; onAddToCart: (item: Omit<CartItem, "quantity">) => void }) {
  const [size, setSize] = useState<0 | 1 | 2>(1); // Default to Senior
  
  const sizeNames = ["Junior", "Senior", "Familiale"];
  
  const handleWhatsApp = () => {
    const text = `Bonjour Casa Presto, je voudrais commander une Pizza *${pizza.name}* (${sizeNames[size]}) s'il vous plaît ! 🍕`;
    const url = `https://wa.me/21628201445?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleAdd = () => {
    onAddToCart({
      id: `pizza-${pizza.name.toLowerCase().replace(/\s+/g, "-")}-${sizeNames[size].toLowerCase()}`,
      name: `Pizza ${pizza.name}`,
      price: pizza.p[size],
      size: sizeNames[size],
    });
  };

  // Find matching local image
  const getImage = (name: string) => {
    const n = name.toLowerCase();
    
    // Exact generated matches in public/menu/
    if (n.includes("marguerita") || n.includes("margherita")) return "/menu/pizza-marguerita.jpg";
    if (n.includes("reine")) return "/menu/pizza-reine.jpg";
    if (n.includes("campione")) return "/menu/pizza-campione.jpg";
    if (n.includes("4 fromages")) return "/menu/pizza-4fromages.jpg";
    if (n.includes("calzone")) return "/menu/pizza-calzone.jpg";
    if (n.includes("neptune")) return "/menu/pizza-neptune.jpg";
    if (n.includes("barbecue")) return "/menu/pizza-barbecue.jpg";
    if (n.includes("orientale")) return "/menu/pizza-orientale.jpg";
    if (n.includes("pépé originale") || n.includes("pepe originale")) return "/menu/pizza-pepe-originale.jpg";
    if (n.includes("tunisienne")) return "/menu/pizza-la-tunisienne.jpg";
    if (n.includes("hawaïenne") || n.includes("hawaienne")) return "/menu/pizza-hawaienne.jpg";
    if (n.includes("fruit de mer")) return "/menu/pizza-fruit-de-mer.jpg";
    if (n.includes("4 saisons")) return "/menu/pizza-4saisons.jpg";

    // Fallbacks for remaining base tomate (quota exceeded)
    if (n.includes("casa")) return "/menu/pizza-campione.jpg"; 
    if (n.includes("chicken")) return "/menu/pizza-barbecue.jpg"; 

    // Fallbacks for base creme (quota exceeded)
    if (n.includes("venezia")) return "/menu/pizza-fruit-de-mer.jpg"; 
    if (n.includes("rimini")) return "/menu/pizza-campione.jpg";
    if (n.includes("chèvre miel") || n.includes("chevre miel")) return "/menu/pizza-4fromages.jpg";
    if (n.includes("boursin")) return "/menu/pizza-campione.jpg";

    return "/pizza-slice.png";
  };

  return (
    <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between group">
      <div>
        <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-6 bg-dark/5">
          <Image 
            src={getImage(pizza.name)} 
            alt={pizza.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
            sizes="(max-width: 768px) 100vw, 30vw" 
          />
          <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
            Fait Main
          </div>
        </div>
        <h4 className="text-2xl font-display font-bold text-dark mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
          <span>{pizza.name}</span>
          {pizza.p[2] >= 31 && <span className="text-[10px] bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shrink-0">Spécial</span>}
        </h4>
        <p className="text-sm text-text-muted mb-6 leading-relaxed min-h-[44px]">{pizza.desc}</p>
      </div>
      
      <div>
        {/* Modern Size Selector (Interactive Pill Tabs) */}
        <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1.5 rounded-2xl mb-6 text-xs font-bold text-text-muted border border-gray-100">
          {sizeNames.map((name, idx) => (
            <button
              key={name}
              onClick={() => setSize(idx as 0 | 1 | 2)}
              className={`py-2 rounded-xl transition-all uppercase tracking-wider text-[10px] ${
                size === idx 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "hover:text-dark hover:bg-gray-100/50"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div>
            <div className="text-xs text-text-muted font-semibold uppercase tracking-wider">Prix</div>
            <div className="text-3xl font-black text-dark tracking-tighter">
              {pizza.p[size].toFixed(3).replace(/\.000$/, "")}
              <span className="text-sm font-bold text-gray-400 ml-1">dt</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleWhatsApp} 
              className="bg-green-50 hover:bg-green-500 hover:text-white text-green-600 px-3 py-3.5 rounded-2xl text-sm transition-all"
              title="WhatsApp rapide"
            >
              💬
            </button>
            <button 
              onClick={handleAdd} 
              className="btn-primary px-5 py-3.5 text-[11px] font-bold shadow-md shadow-primary/10 flex items-center gap-1 group-hover:shadow-primary/30"
            >
              <span>+ Ajouter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuList({ onAddToCart }: { onAddToCart: (item: Omit<CartItem, "quantity">) => void }) {
  const [activeTab, setActiveTab] = useState<'all' | 'tomate' | 'creme' | 'texmex' | 'salades' | 'deals'>('all');
  const { ref, visible } = useReveal();

  const handleWhatsAppCustom = (itemName: string, details?: string) => {
    const text = `Bonjour Casa Presto, je voudrais commander *${itemName}* ${details ? `(${details})` : ""} s'il vous plaît ! 🍕`;
    const url = `https://wa.me/21628201445?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleAddCustom = (name: string, price: number) => {
    onAddToCart({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      price,
    });
  };

  const TABS = [
    { id: 'all', label: 'Tout' },
    { id: 'tomate', label: 'Sauce Tomate' },
    { id: 'creme', label: 'Base Crème' },
    { id: 'texmex', label: 'Tex-Mex & Zapwich' },
    { id: 'salades', label: 'Salades' },
    { id: 'deals', label: 'Deals & Boissons' },
  ] as const;

  return (
    <section id="menu" className="py-24 bg-bg-alt relative border-t border-gray-50" ref={ref}>
      {/* Modern Grid Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none select-none" 
        style={{ 
          backgroundImage: "radial-gradient(var(--color-primary-light) 0.5px, transparent 0.5px)", 
          backgroundSize: "24px 24px", 
          opacity: 0.08 
        }}
      ></div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-primary font-display font-bold text-xs uppercase tracking-widest">Le Goût Unique</span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-dark tracking-tight mt-2">
            Découvrez Notre Carte
          </h2>
          <p className="font-hand text-3xl md:text-4xl text-primary mt-3">Prêt à être dégusté chaud</p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-3xl mx-auto bg-white p-2 rounded-[24px] shadow-lg border border-gray-50">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/25" 
                  : "text-text-muted hover:text-dark hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="space-y-24">
          {/* pizzas base tomate */}
          {(activeTab === 'all' || activeTab === 'tomate') && (
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-3xl font-display font-black text-dark flex items-center gap-3">
                    <span className="text-2xl">🍅</span> PIZZAS BASE TOMATE
                  </h3>
                  <p className="text-sm text-text-muted mt-1">Sauce tomate cuisinée maison avec Mozzarella 100% lait</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary font-bold px-4 py-2 rounded-full uppercase tracking-wider mt-4 md:mt-0 shrink-0">
                  Cuites à la perfection
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PIZZAS_TOMATE.map((p, i) => <PizzaCard key={i} pizza={p} onAddToCart={onAddToCart} />)}
              </div>
            </div>
          )}

          {/* pizzas base creme */}
          {(activeTab === 'all' || activeTab === 'creme') && (
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-3xl font-display font-black text-dark flex items-center gap-3">
                    <span className="text-2xl">🥛</span> PIZZAS BASE CRÈME
                  </h3>
                  <p className="text-sm text-text-muted mt-1">Crème fraîche onctueuse et gourmande</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary font-bold px-4 py-2 rounded-full uppercase tracking-wider mt-4 md:mt-0 shrink-0">
                  Double Mozza
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PIZZAS_CREME.map((p, i) => <PizzaCard key={i} pizza={p} onAddToCart={onAddToCart} />)}
              </div>
            </div>
          )}

          {/* tex mex & zapwich */}
          {(activeTab === 'all' || activeTab === 'texmex') && (
            <div>
              <div className="mb-14">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-3xl font-display font-black text-dark flex items-center gap-3">
                      <span className="text-2xl">🍗</span> TEX-MEX &amp; FRITES
                    </h3>
                    <p className="text-sm text-text-muted mt-1">Servis avec une portion de frites ou potatoes</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {TEX_MEX.map((t, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-500/10 transition-all flex flex-col justify-between group">
                      <div>
                        <h4 className="font-display font-bold text-xl text-dark mb-1 group-hover:text-red-500 transition-colors">{t.name}</h4>
                        <p className="text-xs text-text-muted mb-4">{t.desc}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                        <span className="text-2xl font-black text-dark">{t.p.toFixed(3).replace(/\.000$/, "")} <span className="text-xs font-bold text-gray-400">dt</span></span>
                        <div className="flex gap-2">
                          <button onClick={() => handleWhatsAppCustom(t.name)} className="bg-green-50 text-green-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-green-500 hover:text-white transition-colors">
                            💬
                          </button>
                          <button onClick={() => handleAddCustom(t.name, t.p)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 text-xs font-bold px-4 py-2 rounded-xl transition-all">
                            + Panier
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  {TEX_MEX_SIDES.map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div>
                        <span className="font-bold text-dark text-lg">{s.name}</span>
                        <p className="text-xs text-text-muted mt-0.5">{s.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-black text-dark text-xl">{s.p.toFixed(3).replace(/\.000$/, "")} dt</span>
                        <button onClick={() => handleAddCustom(s.name, s.p)} className="bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-bold px-4 py-2.5 rounded-xl transition-colors">+ Panier</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-3xl font-display font-black text-dark flex items-center gap-3">
                      <span className="text-2xl">🥪</span> LES ZAPWICHS
                    </h3>
                    <p className="text-sm text-text-muted mt-1">Le concept sandwich revisité façon Casa Presto</p>
                  </div>
                </div>
                {ZAPWICH.map((z, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
                    <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform"></div>
                    <div className="relative z-10 flex-1">
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">Spécialité</span>
                      <h4 className="font-display font-black text-dark text-2xl mb-2">{z.name}</h4>
                      <p className="text-sm text-text-muted max-w-xl">{z.desc}</p>
                    </div>
                    <div className="relative z-10 flex items-center gap-6 shrink-0 mt-4 md:mt-0">
                      <div className="text-4xl font-black text-dark">{z.p.toFixed(3).replace(/\.000$/, "")} <span className="text-lg font-bold text-gray-400">dt</span></div>
                      <div className="flex gap-2">
                        <button onClick={() => handleWhatsAppCustom(z.name)} className="bg-green-50 text-green-600 px-4 py-3 rounded-2xl hover:bg-green-500 hover:text-white transition-colors">
                          💬
                        </button>
                        <button onClick={() => handleAddCustom(z.name, z.p)} className="btn-primary px-8 py-4 text-xs shadow-lg shadow-primary/20">
                          + Ajouter au Panier
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* salades */}
          {(activeTab === 'all' || activeTab === 'salades') && (
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-3xl font-display font-black text-dark flex items-center gap-3">
                    <span className="text-2xl">🥗</span> SALADES FRAÎCHES
                  </h3>
                  <p className="text-sm text-text-muted mt-1">Ingrédients sains et croustillants préparés à la commande</p>
                </div>
                <span className="text-xs bg-accent-green/10 text-accent-green font-bold px-4 py-2 rounded-full uppercase tracking-wider mt-4 md:mt-0 shrink-0">
                  Pain Offert
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {SALADES.map((s, i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-500/10 transition-all flex flex-col justify-between group">
                    <div>
                      <h4 className="font-display font-bold text-xl text-dark mb-1 group-hover:text-accent-green transition-colors flex justify-between items-center">
                        <span>{s.name}</span>
                        {s.name === "Grecque au Surimi" && <span className="text-[9px] bg-green-100 text-green-600 px-2 py-0.5 rounded font-bold uppercase shrink-0">Premium</span>}
                      </h4>
                      <p className="text-xs text-text-muted leading-relaxed mb-6">{s.desc}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                      <span className="text-2xl font-black text-dark">{s.p.toFixed(3).replace(/\.000$/, "")} <span className="text-xs font-bold text-gray-400">dt</span></span>
                      <div className="flex gap-2">
                        <button onClick={() => handleWhatsAppCustom(`Salade ${s.name}`)} className="bg-green-50 text-green-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-green-500 hover:text-white transition-colors">
                          💬
                        </button>
                        <button onClick={() => handleAddCustom(`Salade ${s.name}`, s.p)} className="bg-green-50 hover:bg-accent-green hover:text-white text-accent-green text-xs font-bold px-4 py-2 rounded-xl transition-all">
                          + Panier
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* deals, desserts, boissons */}
          {(activeTab === 'all' || activeTab === 'deals') && (
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-3xl font-display font-black text-dark flex items-center gap-3">
                    <span className="text-2xl">🔥</span> FORMULES DEALS &amp; ACCOMPAGNEMENTS
                  </h3>
                  <p className="text-sm text-text-muted mt-1">Le meilleur rapport qualité-prix pour votre repas</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {FORMULES.map((f, i) => (
                  <div key={i} className="bg-white rounded-[32px] p-8 shadow-sm border-2 border-primary/20 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                      {f.type === "Midi" ? "Formule Midi" : "Kids"}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-dark text-2xl mb-2">{f.name}</h4>
                      <p className="text-sm text-text-muted leading-relaxed mb-8">{f.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="text-3xl font-black text-dark">
                        {f.p.toFixed(3).replace(/\.000$/, "")} <span className="text-lg font-bold text-gray-400">dt</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleWhatsAppCustom(f.name)} className="bg-green-50 text-green-600 px-4 py-3 rounded-2xl hover:bg-green-500 hover:text-white transition-colors">
                          💬
                        </button>
                        <button onClick={() => handleAddCustom(f.name, f.p)} className="btn-primary px-6 py-3.5 text-xs shadow-md shadow-primary/20">
                          + Ajouter au Panier
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Desserts */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                  <h4 className="font-display font-black text-dark text-2xl mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                    🍰 Desserts
                  </h4>
                  <div className="space-y-4">
                    {DESSERTS.map((d, i) => (
                      <div key={i} className="flex justify-between items-center group">
                        <div>
                          <div className="font-bold text-dark text-lg group-hover:text-primary transition-colors">{d.name}</div>
                          <p className="text-xs text-text-muted">{d.desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-dark">{d.p.toFixed(3).replace(/\.000$/, "")} dt</span>
                          <button onClick={() => handleAddCustom(d.name, d.p)} className="bg-primary/10 hover:bg-primary hover:text-white text-primary text-[10px] font-bold px-3 py-2 rounded-xl transition-all">+ Panier</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Boissons */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                  <h4 className="font-display font-black text-dark text-2xl mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                    🥤 Boissons
                  </h4>
                  <div className="space-y-4">
                    {BOISSONS.map((b, i) => (
                      <div key={i} className="flex justify-between items-center group">
                        <div>
                          <div className="font-bold text-dark text-lg group-hover:text-primary transition-colors">{b.name}</div>
                          <p className="text-xs text-text-muted">{b.desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-dark">{b.p.toFixed(3).replace(/\.000$/, "")} dt</span>
                          <button onClick={() => handleAddCustom(b.name, b.p)} className="bg-primary/10 hover:bg-primary hover:text-white text-primary text-[10px] font-bold px-3 py-2 rounded-xl transition-all">+ Panier</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DropTagsSection() {
  const { ref, visible } = useReveal(0.4);
  return (
    <section className="py-24 bg-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-15">
        <Image src="/pizza-bbq.png" alt="Bg" fill className="object-cover blur-sm" />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 flex flex-col items-center">
        <h2 className="text-center text-4xl md:text-6xl font-display font-black text-white mb-16 uppercase">
          L&apos;artisanat <span className="text-primary block mt-2">Djerbien</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl">
          {DROP_TAGS.map((tag, i) => (
            <div
              key={i}
              className="bg-primary text-white font-display font-bold text-sm md:text-lg px-6 py-3 rounded-full shadow-lg"
              style={{
                transform: visible ? `rotate(${tag.rotate}) translateY(0)` : `rotate(0deg) translateY(-100px)`,
                opacity: visible ? 1 : 0,
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${tag.delay}`,
              }}
            >
              {tag.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliverySection() {
  const { ref, visible } = useReveal();
  return (
    <section id="delivery" className="py-24 bg-white relative" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-accent-green font-display font-bold text-xs uppercase tracking-widest">Concept Unique</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-dark leading-tight mt-2">
              Livraison Rapide, <br/><span className="text-accent-green">100% Écologique.</span>
            </h2>
            <p className="mt-6 text-text-muted text-lg leading-relaxed">
              À Casa Presto, on pense aussi à notre belle île de Djerba. C&apos;est pourquoi nous assurons la <strong>livraison gratuite</strong> de vos pizzas chaudes sur nos scooters électriques <em>Novago</em>, silencieux, rapides et 100% respectueux de l&apos;environnement.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-4 text-dark font-semibold">
                <span className="w-8 h-8 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green text-xl">🌱</span>
                Zéro pollution atmosphérique
              </li>
              <li className="flex items-center gap-4 text-dark font-semibold">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">🛵</span>
                Livraison rapide et silencieuse
              </li>
              <li className="flex items-center gap-4 text-dark font-semibold">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl">💸</span>
                Service de livraison 100% gratuit
              </li>
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center">
              <div>
                <div className="text-xs text-text-muted font-bold uppercase tracking-wider">Téléphone Fixe</div>
                <a href="tel:75655169" className="text-2xl font-display font-black text-primary hover:underline">75 655 169</a>
              </div>
              <div>
                <div className="text-xs text-text-muted font-bold uppercase tracking-wider">Téléphone Mobile</div>
                <a href="tel:28201445" className="text-2xl font-display font-black text-primary hover:underline">28 201 445</a>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className={`relative aspect-[4/3] md:aspect-square w-full rounded-[40px] overflow-hidden shadow-2xl transition-all duration-1000 ${visible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-95 -rotate-2"}`}>
              <Image 
                src="/delivery-scooter.jpg" 
                alt="Scooter électrique Novago Casa Presto" 
                fill 
                className="object-cover" 
                sizes="(max-width:1024px) 100vw, 50vw" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="bg-accent-green px-3.5 py-1.5 text-[10px] font-bold rounded-full uppercase tracking-wider inline-block mb-3">
                  Green Delivery Novago
                </div>
                <h4 className="text-2xl font-display font-black">Livraison partout à Djerba</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="reviews" className="py-24 bg-bg-alt relative border-t border-gray-50" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-display font-bold text-xs uppercase tracking-widest">Avis Clients</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-dark tracking-tight mt-2">
            Ce Qu&apos;ils En Disent
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-55 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <p className="text-sm text-text-muted italic leading-relaxed mb-6">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-dark text-sm">{r.name}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Avis Google</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-dark">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <Image src="/pizza-bbq.png" alt="Appétissant" fill className="object-cover" />
      </div>
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <span className="bg-primary/20 text-primary font-display font-bold text-xs uppercase px-4 py-2 rounded-full tracking-widest mb-6 inline-block">
          Livraison Gratuite
        </span>
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-tight">
          C&apos;est le moment <br /><span className="text-primary">de craquer.</span>
        </h2>
        <a href="#menu" className="btn-primary inline-flex px-12 py-5 text-sm mt-10 shadow-lg shadow-primary/25">
          Commander Maintenant
        </a>
      </div>
      {/* Bottom marquee */}
      <div className="absolute bottom-0 w-full bg-primary py-3 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-left 15s linear infinite" }}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white font-display font-bold text-sm uppercase mx-6 shrink-0 tracking-widest">
              LIVRAISON GRATUITE ☎ 75 655 169 • 28 201 445 • ECO-DELIVERY DJERBA
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-16">
          <div>
            <div className="font-display text-3xl font-black text-primary italic mb-6">Casa Presto</div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              La meilleure pizzeria de Djerba. Ingrédients frais, pâte faite maison et livraison silencieuse écologique.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Notre Carte</h4>
            <div className="flex flex-col gap-3 text-white/60 text-sm">
              <a href="#menu" className="hover:text-primary transition-colors">Pizzas Sauce Tomate</a>
              <a href="#menu" className="hover:text-primary transition-colors">Pizzas Base Crème</a>
              <a href="#menu" className="hover:text-primary transition-colors">Tex-Mex &amp; Sandwichs</a>
              <a href="#menu" className="hover:text-primary transition-colors">Salades &amp; Boissons</a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Nous Trouver &amp; Contacter</h4>
            <div className="flex flex-col gap-3 text-white/60 text-sm">
              <p>📍 VVH7+H3H, Houmt Souk, Djerba</p>
              <p>📞 Fixe: 75 655 169</p>
              <p>📱 WhatsApp: 28 201 445</p>
              <p>⏰ Ouvert de 11h-14h30 et 17h-22h30 (Mardi au Dimanche)</p>
            </div>
          </div>
        </div>
        <div className="pt-8 text-center text-white/40 text-xs tracking-wider uppercase">
          © {new Date().getFullYear()} Pizza Casa Presto Djerba. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

/* ─── GOATED CART DRAWER COMPONENT ─── */
function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onClearCart,
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onClearCart: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", notes: "", paymentMethod: "cod" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNextStep = () => {
    if (cart.length === 0) return;
    setStep(2);
  };

  const handleWhatsAppBackup = () => {
    // Generate text for WhatsApp
    const orderItems = cart.map((i) => ` - ${i.quantity}x ${i.name} ${i.size ? `(${i.size})` : ""} - ${(i.price * i.quantity).toFixed(3)} dt`).join("\n");
    const text = `*NOUVELLE COMMANDE - CASA PRESTO* 🍕\n\n*Client:* ${customer.name}\n*Téléphone:* ${customer.phone}\n*Adresse:* ${customer.address}\n${customer.notes ? `*Notes:* ${customer.notes}\n` : ""}*Paiement:* ${customer.paymentMethod === "cod" ? "Espèces" : "Carte"}\n\n*Articles:*\n${orderItems}\n\n*Total:* *${subtotal.toFixed(3)} dt*`;
    const url = `https://wa.me/21628201445?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      setError("Veuillez remplir tous les champs obligatoires (*)");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          customerInfo: customer,
          orderTotal: subtotal,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Une erreur est survenue");
      }

      setStep(3);
      onClearCart();
    } catch (err: any) {
      setError(err.message || "Erreur de connexion avec le serveur");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity"></div>
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-left border-l border-gray-100">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-display font-black text-2xl text-dark flex items-center gap-2">
            <span>🛒</span> Mon Panier
          </h3>
          <button onClick={onClose} className="text-text-muted hover:text-dark text-xl p-1">✕</button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {step === 1 && (
            <div>
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-6xl block mb-4">🍕</span>
                  <div className="font-bold text-dark text-lg">Votre panier est vide</div>
                  <p className="text-xs text-text-muted mt-2">Ajoutez des pizzas et des accompagnements gourmands pour commander !</p>
                  <button onClick={onClose} className="btn-primary mt-6 px-6 py-3 text-xs">Découvrir la carte</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                      <div className="flex-1 pr-4">
                        <div className="font-bold text-dark text-sm flex items-center flex-wrap gap-1.5">
                          <span>{item.name}</span>
                          {item.size && (
                            <span className="text-[9px] bg-primary text-white px-2 py-0.5 rounded font-black uppercase">
                              {item.size}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-primary font-bold mt-1">
                          {item.price.toFixed(3).replace(/\.000$/, "")} dt
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-white border border-gray-250 flex items-center justify-center font-bold hover:bg-gray-100 transition-colors">-</button>
                        <span className="font-black text-sm text-dark w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-white border border-gray-250 flex items-center justify-center font-bold hover:bg-gray-100 transition-colors">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h4 className="font-display font-bold text-dark text-lg border-b pb-2">📦 Détails de Livraison</h4>
              
              {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl font-medium">{error}</div>}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Nom Complet *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jamel Henchiri"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Numéro de Téléphone *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: 28 201 445"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Adresse de livraison *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ex: Houmt Souk, en face de l'hôtel X..."
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Notes / Instructions (Optionnel)</label>
                <input
                  type="text"
                  placeholder="Ex: Sauce piquante à part, sans oignons..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Mode de Paiement</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, paymentMethod: "cod" })}
                    className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      customer.paymentMethod === "cod"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 bg-white text-text-muted hover:bg-gray-50"
                    }`}
                  >
                    💵 Espèces
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, paymentMethod: "card" })}
                    className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      customer.paymentMethod === "card"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 bg-white text-text-muted hover:bg-gray-50"
                    }`}
                  >
                    💳 Carte / En ligne
                  </button>
                </div>
              </div>
              
              <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-xs font-bold uppercase tracking-wider mt-4">
                {loading ? "Envoi de la commande..." : "✓ Confirmer la Commande"}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-12 space-y-6">
              <span className="text-7xl block animate-bounce">🎉</span>
              <h4 className="font-display font-black text-2xl text-dark">Commande Envoyée !</h4>
              <p className="text-sm text-text-muted leading-relaxed max-w-sm mx-auto">
                Votre commande a été transmise à notre cuisine. Vous allez recevoir un email de confirmation et nous vous contacterons par téléphone très rapidement !
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-2">
                <div className="text-xs text-primary font-bold uppercase">Important - Djerba Delivery</div>
                <p className="text-xs text-text-muted leading-snug">
                  Par mesure de sécurité ou en cas de retard, vous pouvez doubler l&apos;envoi directement sur WhatsApp en cliquant ci-dessous.
                </p>
                <button onClick={handleWhatsAppBackup} className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 text-xs font-bold uppercase tracking-wider mt-2 flex items-center justify-center gap-2">
                  <span>💬 Envoyer sur WhatsApp</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  onClose();
                }}
                className="btn-outline px-8 py-3 text-xs uppercase"
              >
                Fermer
              </button>
            </div>
          )}

        </div>

        {/* Footer Area (Prices & Subtotal) */}
        {step < 3 && cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-text-muted">
                <span>Sous-total</span>
                <span className="font-bold text-dark">{subtotal.toFixed(3).replace(/\.000$/, "")} dt</span>
              </div>
              <div className="flex justify-between text-sm text-text-muted">
                <span>Livraison</span>
                <span className="font-bold text-accent-green uppercase">Gratuite 🛵</span>
              </div>
              <div className="flex justify-between text-lg font-black text-dark border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-primary text-2xl font-black">{subtotal.toFixed(3).replace(/\.000$/, "")} dt</span>
              </div>
            </div>

            {step === 1 && (
              <button onClick={handleNextStep} className="w-full btn-primary py-4 text-xs font-bold uppercase tracking-wider">
                Passer la commande
              </button>
            )}
            
            {step === 2 && (
              <button onClick={() => setStep(1)} className="w-full text-center text-xs font-bold text-text-muted hover:text-dark uppercase tracking-wider py-2">
                ← Retour au panier
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("casapresto_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("casapresto_cart", JSON.stringify(newCart));
  };

  const handleAddToCart = (item: Omit<CartItem, "quantity">) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      saveCart(cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
    // Auto open cart drawer
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    const updated = cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="bg-bg text-text selection:bg-primary selection:text-white min-h-screen relative">
      <Topbar />
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={totalCount} />
      <Hero />
      <MenuList onAddToCart={handleAddToCart} />
      <DropTagsSection />
      <DeliverySection />
      <ReviewsSection />
      <CTA />
      <Footer />

      {/* Floating cart button at bottom right (sticky fallback for easy access) */}
      {totalCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-primary text-white rounded-full w-16 h-16 shadow-2xl flex items-center justify-center border-2 border-white animate-bounce"
        >
          <span className="text-2xl">🛒</span>
          <span className="absolute -top-1 -right-1 bg-red-600 border border-white text-white font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center">
            {totalCount}
          </span>
        </button>
      )}

      {/* Goated Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
      />
    </main>
  );
}
