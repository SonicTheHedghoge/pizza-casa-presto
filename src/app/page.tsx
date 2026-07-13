"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Scroll Reveal Hook ─── */
function useReveal(threshold = 0.15) {
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
const MENU_ITEMS = [
  { name: "Pizza Del Casa", price: "16.500", image: "/pizza-del-casa.png", slug: "pizza-del-casa" },
  { name: "Pizza Margherita", price: "11.000", image: "/pizza-margherita.png", slug: "pizza-margherita" },
  { name: "Pizza BBQ Chicken", price: "15.000", image: "/pizza-bbq.png", slug: "pizza-bbq" },
];

const PRODUCTS = [
  { name: "MARGHERITA", image: "/pizza-margherita.png" },
  { name: "DEL CASA", image: "/pizza-del-casa.png" },
  { name: "BBQ CHICKEN", image: "/pizza-bbq.png" },
  { name: "SLICES", image: "/pizza-slice.png" },
];

const REVIEWS = [
  { name: "Safeeyah (Local Guide)", text: "Hier soir, nous avons pris des pizzas chez Casa Presto. C'est sans doute la meilleure pizza de Djerba ! Le service était excellent et la pizza était délicieuse ! Le cadre sur place est confortable, propre et le personnel est très amical." },
  { name: "Jamel Henchiri", text: "Très bonne pizza, genre Pizza Hut, service parfait. Menu pas cher du tout. La livraison est super rapide sur leurs scooters électriques, c'est le top !" },
  { name: "Mohamed Hedi Maïza", text: "Très bonnes pizzas. J'ai goûté la Barbecue. Elle était excellente et le service est vraiment rapide et agréable. Je recommande fortement." },
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
    <div className="bg-red text-white text-center py-2.5 text-sm font-display font-medium tracking-wide">
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-cream"}`}>
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <a href="#" className="font-display text-[28px] font-extrabold text-red italic">Casa Presto</a>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Menu", href: "#menu" },
            { label: "À Propos", href: "#about" },
            { label: "Avis", href: "#reviews" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="group relative text-sm font-medium text-dark uppercase tracking-wide">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">{l.label}</span>
              <span className="absolute inset-0 block text-red translate-y-full transition-transform duration-300 group-hover:translate-y-0">{l.label}</span>
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-primary hidden md:inline-flex px-6 py-2.5 text-xs">Contact</a>
        <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5" aria-label="Menu">
          <span className={`block h-0.5 w-full bg-dark transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-full bg-red transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-full bg-dark transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-cream border-t border-cream-dark px-6 pb-6 space-y-4">
          {["Menu", "À Propos", "Avis", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace("à propos", "about")}`} onClick={() => setOpen(false)} className="block font-display text-lg text-dark uppercase">{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-8 md:py-0 md:min-h-[85vh] flex items-center bg-[#FEF3E8]">
      {/* Marquee Text Behind */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden z-0">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-left 25s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <h1 key={`a${i}`} className="text-[clamp(4rem,12vw,10rem)] font-display font-black uppercase text-red leading-none mx-4 shrink-0">
              Casa Presto – Pizza, Bites &amp; Vibes
            </h1>
          ))}
        </div>
        <div className="flex whitespace-nowrap mt-2" style={{ animation: "marquee-right 30s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <h1 key={`b${i}`} className="text-[clamp(4rem,12vw,10rem)] font-display font-black uppercase text-stroke-red leading-none mx-4 shrink-0">
              Casa Presto – Pizza, Bites &amp; Vibes
            </h1>
          ))}
        </div>
      </div>
      {/* Center Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 flex flex-col items-center text-center">
        {/* We use black bg image with mix-blend-mode: screen to blend perfectly */}
        <div className="relative w-[min(80vw,520px)] aspect-square bg-black rounded-full overflow-hidden border border-black shadow-inner">
          <Image src="/hero-pizza.png" alt="Casa Presto Hero Pizza" fill className="object-cover blend-screen" priority sizes="(max-width:768px) 80vw, 520px" />
        </div>
        <a href="#menu" className="btn-primary px-10 py-4 text-sm mt-6">Explorer le Menu</a>
      </div>
    </section>
  );
}

function About() {
  const { ref, visible } = useReveal();
  return (
    <section id="about" className="relative">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
          <Image src="/about-restaurant.png" alt="Pizzeria Casa Presto" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        </div>
        {/* Content */}
        <div ref={ref} className="bg-dark text-white p-10 md:p-16 lg:p-20 flex flex-col justify-center">
          <h2 className={`text-4xl md:text-5xl font-display font-bold leading-tight transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Les meilleures pizzas artisanales de Djerba.
          </h2>
          <p className={`mt-6 text-white/70 text-lg leading-relaxed transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Chez Pizza Casa Presto, nous croyons à l&apos;art de la pizza traditionnelle au feu de bois. Une pâte à fermentation lente, de la sauce tomate cuisinée maison avec amour, et des fromages crémeux de qualité supérieure. Une texture croustillante à l&apos;extérieur et moelleuse à l&apos;intérieur.
          </p>
          <div className={`mt-8 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <a href="#menu" className="btn-primary inline-flex px-8 py-3 text-xs">Découvrir la carte</a>
          </div>
        </div>
      </div>
      {/* About marquee */}
      <div className="bg-red py-5 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-left 20s linear infinite" }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="text-3xl md:text-4xl font-hand text-white mx-4">C&apos;est l&apos;Heure Pizza Casa Presto</span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/50 mx-4 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="menu" className="py-20 md:py-28" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <h2 className={`text-4xl md:text-5xl font-display font-bold text-red transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              Au Menu de Pizza Casa Presto
            </h2>
            <p className={`mt-3 text-text-muted text-lg max-w-xl transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              Des pizzas savoureuses, généreuses et chaudes. Choisissez votre recette favorite ou créez la vôtre.
            </p>
          </div>
          <a href="#menu" className={`btn-outline inline-flex px-7 py-3 text-xs shrink-0 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Explorer Tout Le Menu
          </a>
        </div>
        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {MENU_ITEMS.map((item, i) => (
            <div
              key={item.slug}
              className={`group bg-cream-dark rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <Image src={item.image} alt={item.name} fill className="object-cover blend-screen group-hover:scale-110 transition-transform duration-700" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-dark">{item.name}</h3>
                  <p className="text-red font-bold text-lg mt-1">{item.price} DT</p>
                </div>
                <a href="#" className="btn-primary px-5 py-2.5 text-[10px]">Commander</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-20 md:py-28 bg-cream" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className={`text-4xl md:text-5xl font-display font-bold text-red transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            La Sélection de Saisons
          </h2>
          <p className={`mt-3 text-text-muted text-lg max-w-xl mx-auto transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Commandez en ligne la pizza de votre choix. Prête en moins de 15 minutes.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.name}
              className={`group text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="relative mx-auto w-full aspect-square rounded-full overflow-hidden bg-black border-4 border-transparent group-hover:border-red transition-all duration-500 group-hover:shadow-lg">
                <Image src={p.image} alt={p.name} fill className="object-cover blend-screen group-hover:scale-110 transition-transform duration-700" sizes="25vw" />
              </div>
              <h3 className="mt-4 font-display font-bold text-xl md:text-2xl uppercase text-dark group-hover:text-red transition-colors">{p.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferenceSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className={`text-4xl md:text-5xl font-display font-bold text-red transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Notre Recette Magique
          </h2>
          <p className={`mt-3 text-text-muted text-lg max-w-xl mx-auto transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Une croûte gonflée et aérée, un mélange exclusif de fromages fondants et des garnitures savoureuses.
          </p>
        </div>
        {/* Annotated Image */}
        <div className={`relative max-w-3xl mx-auto transition-all duration-700 delay-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          {/* Left annotations */}
          <div className="absolute left-0 top-[20%] -translate-x-[10%] hidden md:block">
            <p className="font-hand text-2xl text-red text-right">Pâte levée<br/>24h minimum</p>
            <svg className="ml-auto mt-1" width="80" height="40" viewBox="0 0 80 40" fill="none"><path d="M0 5C30 5 50 35 80 35" stroke="#C41E24" strokeWidth="2" strokeDasharray="6 4" /></svg>
          </div>
          <div className="absolute left-0 bottom-[20%] -translate-x-[10%] hidden md:block">
            <p className="font-hand text-2xl text-red text-right">Four à bois<br/>traditionnel</p>
            <svg className="ml-auto mt-1" width="80" height="40" viewBox="0 0 80 40" fill="none"><path d="M0 35C30 35 50 5 80 5" stroke="#C41E24" strokeWidth="2" strokeDasharray="6 4" /></svg>
          </div>
          {/* Right annotations */}
          <div className="absolute right-0 top-[20%] translate-x-[10%] hidden md:block">
            <p className="font-hand text-2xl text-red">Fromages<br/>fondants de<br/>Djerba</p>
            <svg className="mt-1" width="80" height="40" viewBox="0 0 80 40" fill="none"><path d="M80 5C50 5 30 35 0 35" stroke="#C41E24" strokeWidth="2" strokeDasharray="6 4" /></svg>
          </div>
          <div className="absolute right-0 bottom-[20%] translate-x-[10%] hidden md:block">
            <p className="font-hand text-2xl text-red">Sauce aromatique<br/>secrète</p>
            <svg className="mt-1" width="80" height="40" viewBox="0 0 80 40" fill="none"><path d="M80 35C50 35 30 5 0 5" stroke="#C41E24" strokeWidth="2" strokeDasharray="6 4" /></svg>
          </div>
          {/* Center pizza with blend-screen */}
          <div className="relative w-[min(70vw,400px)] aspect-square mx-auto bg-black rounded-full overflow-hidden border-2 border-black">
            <Image src="/hero-pizza.png" alt="Notre Pizza Secrète" fill className="object-cover blend-screen" sizes="400px" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DropsSection() {
  const { ref, visible } = useReveal(0.3);
  return (
    <section className="relative py-32 md:py-44 overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/pizza-margherita.png" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      {/* Dropping Tags */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="relative min-h-[200px] mb-8 flex flex-wrap justify-center gap-3">
          {DROP_TAGS.map((tag) => (
            <span
              key={tag.text}
              className={`inline-block bg-white/95 text-dark rounded-full px-5 py-2 text-sm font-hand text-xl tracking-wide transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-40"}`}
              style={{
                transitionDelay: tag.delay,
                transform: visible ? `rotate(${tag.rotate})` : `translateY(-200px) rotate(${tag.rotate})`,
              }}
            >
              {tag.text}
            </span>
          ))}
        </div>
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase leading-tight transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Certaines choses et pensées <span className="text-gold italic">prennent du temps</span>, mais manger une bonne pizza chaude n&apos;en fait pas partie !
        </h2>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal();
  return (
    <section id="reviews" className="py-20 md:py-28" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className={`text-4xl md:text-5xl font-display font-bold text-red transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Bouchées d&apos;Éloge
          </h2>
          <p className={`mt-3 text-text-muted text-lg max-w-xl mx-auto transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Savourez les commentaires de nos clients à Houmt Souk Djerba.
          </p>
        </div>
        {/* Review cards */}
        <div className="relative flex items-center justify-center gap-6 overflow-hidden min-h-[350px]">
          {REVIEWS.map((r, i) => {
            const isActive = i === active;
            const offset = i - active;
            return (
              <div
                key={r.name}
                className={`absolute md:relative w-[min(100%,380px)] rounded-3xl p-8 transition-all duration-500 shrink-0 ${
                  isActive
                    ? "bg-red text-white scale-100 opacity-100 z-10 shadow-xl"
                    : "bg-cream-dark text-dark scale-90 opacity-50 z-0"
                }`}
                style={{ transform: `translateX(${offset * 120}%) scale(${isActive ? 1 : 0.9})` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className={`w-5 h-5 ${isActive ? "text-white" : "text-gold"}`} viewBox="0 0 29 27" fill="currentColor"><path d="M13.238.708C13.59-.082 14.712-.082 15.065.708l3.272 7.34a1.12 1.12 0 00.808.588l7.992.843c.86.09 1.208 1.158.565 1.737l-5.97 5.38a1.12 1.12 0 00-.148.95l1.668 7.862c.18.846-.728 1.506-1.477 1.073l-6.962-4.015a1.12 1.12 0 00-1 0l-6.961 4.015c-.75.433-1.658-.227-1.478-1.073l1.667-7.862a1.12 1.12 0 00-.148-.95l-5.97-5.38c-.643-.58-.296-1.647.565-1.737l7.992-.843a1.12 1.12 0 00.808-.588L13.238.708z" /></svg>
                  ))}
                </div>
                <p className={`text-base leading-relaxed mb-6 ${isActive ? "text-white/90" : "text-text-muted"}`}>{r.text}</p>
                <p className={`font-display font-bold ${isActive ? "text-white" : "text-dark"}`}>{r.name}</p>
              </div>
            );
          })}
        </div>
        {/* Nav dots */}
        <div className="flex justify-center gap-3 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                i === active ? "border-red bg-red text-white" : "border-text-muted/30 text-text-muted hover:border-red"
              }`}
              aria-label={`Review ${i + 1}`}
            >
              {i === active ? "›" : "›"}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative aspect-[16/9] md:aspect-[21/9] bg-black">
        <Image src="/pizza-slice.png" alt="Pizza Casa Presto Slices" fill className="object-cover blend-screen" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-red/80 via-red/20 to-transparent" />
      </div>
      {/* Marquee */}
      <div className="bg-red py-4 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-left 18s linear infinite" }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-2xl md:text-3xl font-display font-bold uppercase text-white mx-6 shrink-0">
              Pizza Casa Presto – Djerba Houmt Souk 🍕
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, visible } = useReveal();
  return (
    <section id="contact" className="py-20 md:py-28 bg-dark text-white" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="font-hand text-3xl text-gold">Livraison Rapide &amp; Emporter</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">Houmt Souk Djerba</h2>
          <div className="mt-8 space-y-6">
            {[
              { icon: "📍", title: "Adresse", desc: "VVH7+H3H, Houmt Souk, Djerba, Tunisie" },
              { icon: "🕐", title: "Horaires", desc: "Lundi — Dimanche • 11h00 – 23h00" },
              { icon: "📞", title: "Téléphone", desc: "28 201 445", link: "tel:28201445" },
            ].map((c) => (
              <div key={c.title} className="flex gap-4 items-start">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <h4 className="font-display font-bold">{c.title}</h4>
                  {c.link ? (
                    <a href={c.link} className="text-white/60 hover:text-gold transition-colors font-bold text-lg">{c.desc}</a>
                  ) : (
                    <p className="text-white/60">{c.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-3xl overflow-hidden border border-white/10 h-[350px] transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1646.611111111111!2d10.9685483!3d33.8174831!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13aabd70f532452b%3A0xadc053ace391adf1!2sCrousty%20Street%20Djerba!5e0!3m2!1sfr!2stn!4v1720000000000!5m2!1sfr!2stn"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Pizza Casa Presto Djerba Location Map" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark-soft text-white border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-2xl font-bold italic text-red">Casa Presto</h3>
            <p className="mt-3 text-white/50 text-sm leading-relaxed">
              Des saveurs méditerranéennes, des garnitures généreuses et le meilleur de la pizza à Djerba. Pizza Casa Presto vous apporte une expérience inégalable à chaque part.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-display font-bold uppercase text-sm tracking-widest mb-2">Navigation</h4>
            {["Menu", "À Propos", "Avis", "Contact"].map((l) => (
              <a key={l} href="#" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-display font-bold uppercase text-sm tracking-widest mb-2">Contact Direct</h4>
            <p className="text-white/50 text-sm">📞 28 201 445</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Pizza Casa Presto Djerba. Les Meilleures Pizzas de Djerba 🇹🇳
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <ProductsSection />
      <DifferenceSection />
      <DropsSection />
      <ReviewsSection />
      <CTASection />
      <Contact />
      <Footer />
    </>
  );
}
