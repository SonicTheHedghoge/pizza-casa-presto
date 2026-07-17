"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

/* ─── MENU DATA ─── */
const PIZZAS_TOMATE = [
  { name: "Marguerita", desc: "Tomate, Mozza, Origan", p: [8, 12, 20] },
  { name: "Reine", desc: "Jambon, Champignons", p: [9, 16, 28] },
  { name: "Campione", desc: "Viande Hachée, Champignons", p: [9, 16, 28] },
  { name: "4 Fromages", desc: "Brie, Chèvre, Bleu", p: [9, 16, 28] },
  { name: "Calzone", desc: "Jambon, Oeuf", p: [9, 16, 28] },
  { name: "Neptune", desc: "Thon, Oeuf, Poivrons, Olives", p: [9, 16, 28] },
  { name: "Barbecue", desc: "Sauce Barbecue, Mozza, Oignons, Poulet, Tomates Fraîches, Viande Hachée", p: [9, 16, 28] },
  { name: "Orientale", desc: "Merguez, Poivrons, Oignons, Oeuf", p: [9, 16, 28] },
  { name: "Pépé Originale", desc: "Sauce Tomate, Mozza, Pepperoni", p: [9, 16, 28] },
  { name: "La Tunisienne", desc: "Thon, Champignons, Poivrons, Aubergines marinées, Oignons, Oeufs, Piment Vert, Persillades", p: [10, 18, 31] },
  { name: "Hawaïenne", desc: "Jambon, Ananas", p: [10, 18, 31] },
  { name: "Fruit de Mer", desc: "Calamars, Crevettes, Moules, Citron, Ail, Persil", p: [10, 18, 31] },
  { name: "4 Saisons", desc: "Jambon, Champignons, Poivrons, Artichauts, Olives", p: [10, 18, 31] },
  { name: "La Casa", desc: "Viande Hachée, Merguez, Poulet", p: [10, 18, 31] },
  { name: "Pépé Del Casa", desc: "Poulet, Tomates Cerises, Pepperoni, Gouda, Emmental", p: [10, 18, 31] },
  { name: "Chicken", desc: "Poulet, Tomate Cerise, Poivrons, Parmesan", p: [10, 18, 31] },
];

const PIZZAS_CREME = [
  { name: "Venezia", desc: "Saumon Fumé, Citron", p: [10.5, 18, 32] },
  { name: "Rimini", desc: "Poulet, Champignons, Pomme de Terre", p: [10.5, 18, 32] },
  { name: "Chèvre Miel", desc: "Double Mozza, Chèvre, Miel, Oeuf", p: [10.5, 18, 32] },
  { name: "Boursin", desc: "Viande Hachée, Boursin, Oignons, Oeuf", p: [10.5, 18, 32] },
];

const TEX_MEX = [
  { name: "Chicken Wings", desc: "8 Pièces", p: 7.9 },
  { name: "Calamars frits", desc: "8 Pièces", p: 7.9 },
  { name: "Nuggets", desc: "8 Pièces", p: 7.9 },
];

const TEX_MEX_SIDES = [
  { name: "Frites", p: 4 },
  { name: "Frites Cheddar", p: 5 },
];

const ZAPWICH = [
  { name: "Zapwich", desc: "Viande au choix ou 4 Fromages (Viande Hachée, Merguez, Poulet, Saumon). Avec Frites.", p: 8.5 },
];

const MENU_MIDI = [
  { name: "Menu Midi", desc: "1 Pizza Junior + 1 Boisson + 1 Dessert Grec", p: 10.5 },
];

const KID_BOX = [
  { name: "Kid Box", desc: "Nuggets x4, Frites, 1 Boisson, 1 Surprise", p: 6.9 },
];

const DESSERTS = [
  { name: "Tiramisu", p: 4.9 },
  { name: "Mousse au Chocolat", p: 4.9 },
  { name: "Dessert Grec", p: 4.9 },
];

const BOISSONS = [
  { name: "Sodas", p: 2 },
  { name: "Eau Gazeuse 0.5l", p: 1.5 },
  { name: "Eau Minérale 0.5l", p: 1 },
];

const SALADES = [
  { name: "Exotique", desc: "Salade, Tomates, Maïs, Crevettes", p: 6.5 },
  { name: "Antillais", desc: "Salade, Tomates, Jambon, Ananas, Maïs", p: 6.5 },
  { name: "Chef", desc: "Salade, Tomates, Gruyère, Jambon, Cornichons, Maïs", p: 6.5 },
  { name: "Italienne", desc: "Salade, Tomates, Poivrons, Olives, Anchois, Gruyère", p: 6.5 },
  { name: "Niçoise", desc: "Salade, Tomates, Pomme de terre, Thon, Olives, Oeuf", p: 6.5 },
  { name: "Royale", desc: "Salade, Tomates, Poulet, Croûtons, Chèvre Chaud", p: 6.5 },
  { name: "Norvégienne", desc: "Salade, Tomates, Saumon Fumé, Crème Fraîche, Citron", p: 6.5 },
  { name: "Grecque au Surimi", desc: "Salade, Tomates, Concombre, Surimi de Crabe, Poivrons, Oignons, Fromage, Huile d'Olive, Origan, Sel Poivre, Citron", p: 9.9 },
];

const DROP_TAGS = [
  { text: "PÂTE ARTISANALE", rotate: "-8deg", delay: "0s" },
  { text: "SAUCE TOMATE MAISON", rotate: "12deg", delay: "0.15s" },
  { text: "MOZZARELLA FILANTE", rotate: "-3deg", delay: "0.3s" },
  { text: "LIVRAISON RAPIDE", rotate: "6deg", delay: "0.45s" },
  { text: "CUISSON INTENSE", rotate: "-10deg", delay: "0.6s" },
  { text: "INGRÉDIENTS FRAIS", rotate: "15deg", delay: "0.75s" },
];

/* ─── COMPONENTS ─── */

function Topbar() {
  return (
    <div className="bg-primary text-white text-center py-2.5 text-sm font-display font-medium tracking-wide">
      Friday Pizza Night! Profitez de 15% de réduction chez Pizza Casa Presto ! 🍕
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/95 backdrop-blur-md shadow-sm" : "bg-bg"}`}>
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <a href="#" className="font-display text-[28px] font-extrabold text-primary italic">Casa Presto</a>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Menu", href: "#menu" },
            { label: "Livraison", href: "#delivery" },
            { label: "À Propos", href: "#about" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="group relative text-sm font-medium text-dark uppercase tracking-wide">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">{l.label}</span>
              <span className="absolute inset-0 block text-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <div className="font-display font-bold text-lg">☎ 75 655 169</div>
          <a href="#menu" className="btn-primary px-6 py-2.5 text-xs">Commander</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5" aria-label="Menu">
          <span className={`block h-0.5 w-full bg-dark transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-full bg-primary transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-full bg-dark transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-bg border-t border-bg-alt px-6 pb-6 space-y-4 pt-4">
          {["Menu", "Livraison", "À Propos"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace("à propos", "about")}`} onClick={() => setOpen(false)} className="block font-display text-lg text-dark uppercase">{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-10 md:py-0 md:min-h-[85vh] flex items-center bg-bg">
      {/* Marquee Text Behind */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden z-0 opacity-10">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-left 25s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <h1 key={`a${i}`} className="text-[clamp(4rem,12vw,10rem)] font-display font-black uppercase text-primary leading-none mx-4 shrink-0">
              Casa Presto – Pizza, Bites &amp; Vibes
            </h1>
          ))}
        </div>
        <div className="flex whitespace-nowrap mt-2" style={{ animation: "marquee-right 30s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <h1 key={`b${i}`} className="text-[clamp(4rem,12vw,10rem)] font-display font-black uppercase text-stroke-primary leading-none mx-4 shrink-0">
              Casa Presto – Pizza, Bites &amp; Vibes
            </h1>
          ))}
        </div>
      </div>
      {/* Center Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 flex flex-col items-center text-center">
        <div className="relative w-[min(90vw,520px)] aspect-square mt-8 md:mt-0">
          <Image src="/hero-pizza.png" alt="Casa Presto Hero Pizza" fill className="object-contain drop-shadow-2xl" priority sizes="(max-width:768px) 90vw, 520px" />
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="#menu" className="btn-primary px-10 py-4 text-sm w-full md:w-auto">Explorer le Menu</a>
          <a href="#delivery" className="btn-outline px-10 py-4 text-sm w-full md:w-auto">Livraison Écolo</a>
        </div>
      </div>
    </section>
  );
}

function MenuList() {
  const { ref, visible } = useReveal();
  return (
    <section id="menu" className="py-20 md:py-28 bg-bg-alt relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("/brick-wall.png")' }}></div>
      <div className="max-w-[1280px] mx-auto px-6 relative z-10" ref={ref}>
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-display font-bold text-primary transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Notre Carte
          </h2>
          <p className="font-hand text-3xl md:text-4xl text-dark mt-2">Délice garantie à chaque bouchée</p>
        </div>

        {/* PIZZAS */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8 border-b-2 border-primary/20 pb-4">
            <h3 className="text-4xl font-display font-bold text-primary uppercase">Pizzas</h3>
            <span className="bg-primary text-white px-3 py-1 text-xs font-bold rounded-full">100% Lait</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Base Tomate */}
            <div>
              <div className="flex justify-between items-end mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h4 className="text-2xl font-display font-bold text-red-600">Base Tomate Mozza</h4>
                <div className="flex gap-4 text-xs font-bold text-gray-500 uppercase">
                  <span className="w-12 text-center text-primary">Junior</span>
                  <span className="w-12 text-center text-primary">Senior</span>
                  <span className="w-16 text-center text-primary">Familiale</span>
                </div>
              </div>
              <div className="space-y-4">
                {PIZZAS_TOMATE.map((p, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div className="pr-4 flex-1">
                      <div className="font-bold text-dark text-lg group-hover:text-primary transition-colors">{p.name}</div>
                      <div className="text-sm text-text-muted leading-tight">{p.desc}</div>
                    </div>
                    <div className="flex gap-4 text-sm font-bold text-dark shrink-0">
                      <span className="w-12 text-center bg-white py-1 rounded shadow-sm">{p.p[0]}<span className="text-[10px] text-gray-400">dt</span></span>
                      <span className="w-12 text-center bg-white py-1 rounded shadow-sm">{p.p[1]}<span className="text-[10px] text-gray-400">dt</span></span>
                      <span className="w-16 text-center bg-primary text-white py-1 rounded shadow-sm">{p.p[2]}<span className="text-[10px] text-white/70">dt</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Base Creme */}
            <div>
              <div className="flex justify-between items-end mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h4 className="text-2xl font-display font-bold text-gray-800">Base Crème Mozza</h4>
                <div className="flex gap-4 text-xs font-bold text-gray-500 uppercase">
                  <span className="w-12 text-center text-primary">Junior</span>
                  <span className="w-12 text-center text-primary">Senior</span>
                  <span className="w-16 text-center text-primary">Familiale</span>
                </div>
              </div>
              <div className="space-y-4">
                {PIZZAS_CREME.map((p, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div className="pr-4 flex-1">
                      <div className="font-bold text-dark text-lg group-hover:text-primary transition-colors">{p.name}</div>
                      <div className="text-sm text-text-muted leading-tight">{p.desc}</div>
                    </div>
                    <div className="flex gap-4 text-sm font-bold text-dark shrink-0">
                      <span className="w-12 text-center bg-white py-1 rounded shadow-sm">{p.p[0]}<span className="text-[10px] text-gray-400">dt</span></span>
                      <span className="w-12 text-center bg-white py-1 rounded shadow-sm">{p.p[1]}<span className="text-[10px] text-gray-400">dt</span></span>
                      <span className="w-16 text-center bg-primary text-white py-1 rounded shadow-sm">{p.p[2]}<span className="text-[10px] text-white/70">dt</span></span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ZAPWICH */}
              <div className="mt-12">
                <div className="flex items-center gap-4 mb-6 border-b-2 border-primary/20 pb-4">
                  <h3 className="text-4xl font-display font-bold text-primary uppercase">Zapwich</h3>
                </div>
                {ZAPWICH.map((z, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
                    <div className="relative z-10 pr-6">
                      <div className="font-bold text-dark text-xl">{z.name}</div>
                      <div className="text-sm text-text-muted mt-1">{z.desc}</div>
                    </div>
                    <div className="relative z-10 text-2xl font-bold text-primary shrink-0">
                      {z.p}<span className="text-sm text-gray-400">dt</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TEX-MEX & SALADES */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Tex-Mex */}
          <div>
            <div className="flex items-center gap-4 mb-8 border-b-2 border-red-600/20 pb-4">
              <h3 className="text-4xl font-display font-bold text-red-600 uppercase">Tex-Mex</h3>
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full">Frites/Potatoes Inclus</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {TEX_MEX.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 group hover:border-red-200 transition-colors">
                  <div className="font-display font-bold text-dark text-lg group-hover:text-red-600">{t.name}</div>
                  <div className="text-xs text-text-muted mb-3">{t.desc}</div>
                  <div className="text-xl font-bold text-red-600 bg-red-50 rounded-lg py-2">{t.p} <span className="text-xs">dt</span></div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {TEX_MEX_SIDES.map((s, i) => (
                <div key={i} className="flex-1 bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border border-gray-100">
                  <span className="font-bold text-dark">{s.name}</span>
                  <span className="font-bold text-red-600">{s.p} <span className="text-xs">dt</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Salades */}
          <div>
            <div className="flex items-center gap-4 mb-8 border-b-2 border-accent-green/20 pb-4">
              <h3 className="text-4xl font-display font-bold text-accent-green uppercase">Salades</h3>
              <span className="bg-accent-green text-white px-3 py-1 text-xs font-bold rounded-full">Pain Offert</span>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 bg-green-50 p-4 rounded-xl">
                <span className="font-bold text-accent-green">Toutes nos salades (sauf Grecque)</span>
                <span className="text-xl font-bold text-accent-green">6.5 <span className="text-xs">dt</span></span>
              </div>
              <div className="space-y-4">
                {SALADES.map((s, i) => (
                  <div key={i} className="flex justify-between items-start group">
                    <div className="pr-4">
                      <div className="font-bold text-dark group-hover:text-accent-green transition-colors">{s.name}</div>
                      <div className="text-sm text-text-muted">{s.desc}</div>
                    </div>
                    {s.p !== 6.5 && (
                      <div className="font-bold text-accent-green shrink-0 whitespace-nowrap bg-green-50 px-3 py-1 rounded-lg">
                        {s.p} <span className="text-xs">dt</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* KIDS & DEALS */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {/* Menu Midi */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm border-2 border-primary/20 relative overflow-hidden group hover:border-primary transition-colors">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl">DEAL</div>
            <h4 className="text-3xl font-display font-bold text-primary mb-2">Menu Midi</h4>
            <p className="text-sm text-text-muted mb-6 h-10">{MENU_MIDI[0].desc}</p>
            <div className="text-4xl font-black text-dark">{MENU_MIDI[0].p} <span className="text-lg">dt</span></div>
          </div>

          {/* Kid Box */}
          <div className="bg-blue-50 rounded-3xl p-8 text-center shadow-sm border-2 border-blue-200 relative overflow-hidden group hover:border-blue-400 transition-colors">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">KIDS</div>
            <h4 className="text-3xl font-display font-bold text-blue-600 mb-2">Kid Box</h4>
            <p className="text-sm text-text-muted mb-6 h-10">{KID_BOX[0].desc}</p>
            <div className="text-4xl font-black text-dark">{KID_BOX[0].p} <span className="text-lg">dt</span></div>
          </div>

          {/* Desserts & Boissons */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="mb-6">
              <h4 className="font-display font-bold text-dark text-xl mb-3 border-b pb-2">Desserts (4.9 dt)</h4>
              <div className="flex flex-wrap gap-2">
                {DESSERTS.map(d => <span key={d.name} className="text-sm bg-gray-50 px-3 py-1 rounded-full text-text-muted">{d.name}</span>)}
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-dark text-xl mb-3 border-b pb-2">Boissons</h4>
              <div className="space-y-2">
                {BOISSONS.map(b => (
                  <div key={b.name} className="flex justify-between text-sm text-text-muted">
                    <span>{b.name}</span>
                    <span className="font-bold text-dark">{b.p} dt</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function DifferenceSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-20 bg-bg overflow-hidden relative" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-display font-bold text-dark transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Pourquoi Casa Presto ?
          </h2>
        </div>
        <div className="relative max-w-4xl mx-auto min-h-[500px] flex items-center justify-center">
          {/* Center pizza with bg-dark */}
          <div className="relative w-[min(70vw,400px)] aspect-square mx-auto bg-dark rounded-full overflow-hidden border-2 border-dark">
            <Image src="/hero-pizza.png" alt="Notre Pizza Secrète" fill className="object-cover" sizes="400px" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DropTagsSection() {
  const { ref, visible } = useReveal(0.4);
  return (
    <section className="py-24 bg-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-10">
        <Image src="/hero-pizza.png" alt="Bg" fill className="object-cover" />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 flex flex-col items-center">
        <h2 className={`text-center text-4xl md:text-6xl font-display font-black text-white mb-16 uppercase transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
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
    <section id="delivery" className="py-20 md:py-28 bg-white relative" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className={`text-4xl md:text-5xl font-display font-bold text-dark leading-tight transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              Livraison Rapide, <br/><span className="text-accent-green">100% Écologique.</span>
            </h2>
            <p className={`mt-6 text-text-muted text-lg leading-relaxed transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              À Casa Presto, on ne fait pas que des pizzas incroyables. On pense aussi à notre belle île de Djerba. C&apos;est pourquoi nous assurons la <strong>livraison gratuite</strong> de vos commandes sur nos scooters électriques <em>Novago</em>, silencieux et respectueux de l&apos;environnement.
            </p>
            <ul className={`mt-8 space-y-4 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <li className="flex items-center gap-4 text-dark font-medium">
                <span className="w-8 h-8 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green text-xl">🌱</span>
                Zéro émission de CO2
              </li>
              <li className="flex items-center gap-4 text-dark font-medium">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">🛵</span>
                Livraison rapide et silencieuse
              </li>
              <li className="flex items-center gap-4 text-dark font-medium">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">💸</span>
                Livraison gratuite
              </li>
            </ul>
            <div className={`mt-10 flex gap-6 items-center transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="text-3xl font-display font-black text-primary">☎ 75 655 169</div>
              <div className="text-3xl font-display font-black text-primary">☎ 28 201 445</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className={`relative aspect-[3/4] md:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${visible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-95 -rotate-2"}`}>
              <Image src="/delivery-scooter.jpg" alt="Scooter électrique Novago Casa Presto" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="bg-accent-green px-3 py-1 text-xs font-bold rounded-full uppercase inline-block mb-3">Green Delivery</div>
                <h4 className="text-xl font-display font-bold">Livraison partout à Djerba</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-dark">
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <Image src="/cta-burger-dramatic.png" alt="Appétissant" fill className="object-cover" />
      </div>
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-none">
          C&apos;est le moment <br /><span className="text-primary">de craquer.</span>
        </h2>
        <a href="#menu" className="btn-primary inline-flex px-12 py-5 text-sm mt-10">Commander Maintenant</a>
      </div>
      {/* Bottom marquee */}
      <div className="absolute bottom-0 w-full bg-primary py-3 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-left 15s linear infinite" }}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white font-display font-bold text-lg uppercase mx-6 shrink-0 tracking-widest">
              LIVRAISON GRATUITE ☎ 75 655 169
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-16">
          <div>
            <div className="font-display text-3xl font-black text-primary italic mb-6">Casa Presto</div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              La meilleure pizzeria de Djerba. Ingrédients frais, pâte artisanale et livraison écologique.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Menu</h4>
            <div className="flex flex-col gap-3 text-white/60 text-sm">
              <a href="#menu" className="hover:text-primary transition-colors">Pizzas Base Tomate</a>
              <a href="#menu" className="hover:text-primary transition-colors">Pizzas Base Crème</a>
              <a href="#menu" className="hover:text-primary transition-colors">Tex-Mex & Zapwich</a>
              <a href="#menu" className="hover:text-primary transition-colors">Salades & Kid Box</a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Nous Contacter</h4>
            <div className="flex flex-col gap-3 text-white/60 text-sm">
              <p>📍 VVH7+H3H, Houmt Souk, Djerba</p>
              <p>☎ 75 655 169</p>
              <p>☎ 28 201 445</p>
            </div>
          </div>
        </div>
        <div className="pt-8 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} Pizza Casa Presto. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="bg-bg text-text selection:bg-primary selection:text-white">
      <Topbar />
      <Navbar />
      <Hero />
      <MenuList />
      <DropTagsSection />
      <DeliverySection />
      <CTA />
      <Footer />
    </main>
  );
}
