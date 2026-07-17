import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onOpenCart, cartCount }: { onOpenCart: () => void; cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Topbar */}
      <div className="bg-primary text-white text-center py-2 text-xs font-display tracking-widest uppercase z-50 relative">
        Livraison Gratuite sur toute l&apos;île de Djerba 🛵 75 655 169
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? "bg-bg/90 backdrop-blur-xl shadow-premium border-b border-gray-100" : "bg-bg"}`}>
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[80px]">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo.jpg" alt="Casa Presto Logo" fill className="object-cover" sizes="48px" />
            </div>
            <span className="font-display text-2xl font-black text-dark italic tracking-tighter">CASA <span className="text-primary">PRESTO</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: "Notre Carte", href: "#menu" },
              { label: "Concept Éco", href: "#delivery" },
              { label: "Avis Clients", href: "#reviews" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-bold text-text-muted hover:text-primary transition-colors uppercase tracking-wider relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:75655169" className="font-display font-bold text-lg text-dark hover:text-primary transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              75 655 169
            </a>
            <button onClick={onOpenCart} className="btn-primary flex items-center gap-2 px-6 py-3 shadow-glow group hover:-translate-y-1 transition-transform">
              <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Panier</span>
              {cartCount > 0 && (
                <span className="bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black ml-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={onOpenCart} className="relative p-2 text-dark">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setOpen(!open)} className="text-dark p-2">
              {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-bg border-b border-gray-100"
            >
              <div className="px-6 py-6 flex flex-col gap-6">
                {["Notre Carte", "Concept Éco", "Avis Clients"].map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase().replace("notre carte", "menu").replace("concept éco", "delivery").replace("avis clients", "reviews")}`}
                    onClick={() => setOpen(false)}
                    className="font-display font-black text-2xl text-dark uppercase hover:text-primary transition-colors"
                  >
                    {l}
                  </a>
                ))}
                <a href="tel:75655169" className="font-display font-bold text-xl text-primary flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Phone className="w-6 h-6" />
                  Appeler: 75 655 169
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
