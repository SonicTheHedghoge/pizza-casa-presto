import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-24 pb-24 md:pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shadow-sm shrink-0">
                <Image src="/logo.jpg" alt="Casa Presto Logo" fill sizes="48px" className="object-cover" />
              </div>
              <span className="font-display text-2xl font-black text-white italic tracking-tighter">CASA <span className="text-primary">PRESTO</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm font-medium">
              La meilleure pizzeria de Djerba. Ingrédients frais, pâte artisanale et livraison rapide écologique avec Novago.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-widest text-primary">Notre Carte</h4>
            <div className="flex flex-col gap-4 text-white/70 text-sm font-medium">
              <a href="#menu" className="hover:text-white transition-colors w-fit">Pizzas Sauce Tomate</a>
              <a href="#menu" className="hover:text-white transition-colors w-fit">Pizzas Base Crème</a>
              <a href="#menu" className="hover:text-white transition-colors w-fit">Tex-Mex & Sandwichs</a>
              <a href="#menu" className="hover:text-white transition-colors w-fit">Salades & Boissons</a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-widest text-primary">Contact & Infos</h4>
            <div className="flex flex-col gap-4 text-white/70 text-sm font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <p>VVH7+H3H, Houmt Souk, Djerba<br/><span className="text-xs text-white/40 mt-1 block">En face de la station</span></p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <p>Fixe: 75 655 169<br/>WhatsApp: 28 201 445</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <p>11h00 - 14h30<br/>17h00 - 22h30<br/><span className="text-xs text-primary mt-1 block">Fermé le Lundi</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs tracking-wider uppercase font-medium">
          <span>© {new Date().getFullYear()} Pizza Casa Presto Djerba. Tous droits réservés.</span>
          <span>Développé pour l'excellence.</span>
        </div>
      </div>
    </footer>
  );
}
