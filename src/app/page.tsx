"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Navigation, Heart, Star, Quote, PhoneCall } from "lucide-react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import type { CartItem } from "../components/CartDrawer";

const REVIEWS = [
  { name: "Safeeyah", role: "Local Guide", text: "Hier soir, nous avons pris des pizzas chez Casa Presto. C'est sans doute la meilleure pizza de Djerba ! Le service était excellent et la pizza était délicieuse !" },
  { name: "Jamel Henchiri", role: "Client Fidèle", text: "Très bonne pizza, service parfait. Menu pas cher du tout. La livraison est super rapide sur leurs scooters électriques, c'est le top !" },
  { name: "Mohamed Hedi", role: "Amateur de Pizza", text: "J'ai goûté la Barbecue. Elle était excellente et le service est vraiment rapide et agréable. Je recommande fortement." },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("casa-presto-cart");
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("casa-presto-cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const handleAddToCart = (item: Omit<CartItem, "id">) => {
    const id = item.size ? `${item.name}-${item.size}` : item.name;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, id }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter((i) => i.quantity > 0));
  };

  const handleClearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!mounted) return null;

  return (
    <main className="bg-bg text-text min-h-screen">
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />
      
      <Hero />

      <MenuSection onAddToCart={handleAddToCart} />

      {/* Concept Éco Section */}
      <section id="delivery" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-green/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-2 text-accent-green font-display font-bold text-xs uppercase tracking-widest mb-4">
                <Leaf className="w-4 h-4" /> Concept Unique
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-dark leading-[1.1]">
                Livraison Rapide, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-emerald-400">
                  100% Écologique.
                </span>
              </h2>
              <p className="mt-6 text-text-muted text-lg leading-relaxed max-w-lg">
                À Casa Presto, on pense aussi à notre belle île de Djerba. C&apos;est pourquoi nous assurons la <strong>livraison gratuite</strong> de vos pizzas chaudes sur nos scooters électriques <em>Novago</em>, silencieux, rapides et respectueux de l&apos;environnement.
              </p>
              
              <div className="mt-10 space-y-6">
                {[
                  { icon: Leaf, color: "text-accent-green", bg: "bg-accent-green/10", text: "Zéro pollution atmosphérique" },
                  { icon: Navigation, color: "text-primary", bg: "bg-primary/10", text: "Livraison rapide et silencieuse" },
                  { icon: Heart, color: "text-red-500", bg: "bg-red-50", text: "Service de livraison 100% gratuit" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span className="text-dark font-bold text-lg">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-8 sm:items-center bg-gray-50 p-6 rounded-3xl border border-gray-100 w-fit">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-glow"><PhoneCall className="w-5 h-5" /></div>
                  <div>
                    <div className="text-[10px] text-text-muted font-black uppercase tracking-wider">Fixe</div>
                    <a href="tel:75655169" className="text-xl font-display font-black text-dark hover:text-primary transition-colors">75 655 169</a>
                  </div>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
                <div>
                  <div className="text-[10px] text-text-muted font-black uppercase tracking-wider">Mobile / WhatsApp</div>
                  <a href="tel:28201445" className="text-xl font-display font-black text-dark hover:text-primary transition-colors">28 201 445</a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-[4/3] md:aspect-square w-full rounded-[3rem] overflow-hidden shadow-premium group">
                <Image 
                  src="/delivery-scooter.jpg" 
                  alt="Scooter électrique Novago Casa Presto" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width:1024px) 100vw, 50vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <div className="bg-accent-green/90 backdrop-blur-md px-4 py-2 text-xs font-bold rounded-full uppercase tracking-widest inline-flex items-center gap-2 mb-4 shadow-lg">
                    <Leaf className="w-4 h-4" /> Green Delivery Novago
                  </div>
                  <h4 className="text-3xl font-display font-black">Livraison partout à Djerba</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-32 bg-bg-alt relative border-t border-gray-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black text-dark mb-4">Ce qu&apos;ils en <span className="text-primary">pensent</span></h2>
            <p className="text-text-muted text-lg">La satisfaction de nos clients est notre priorité absolue.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-premium transition-shadow"
              >
                <div className="flex text-gold mb-6 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <Quote className="w-10 h-10 text-gray-100 mb-4" />
                <p className="text-text-muted italic flex-1 leading-relaxed">{r.text}</p>
                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-display font-black flex items-center justify-center text-xl shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-dark">{r.name}</h4>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-bold mt-1">{r.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

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
