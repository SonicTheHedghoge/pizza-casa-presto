import { useState } from "react";
import { X, Plus, Minus, ShoppingBag, CreditCard, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size?: string;
  quantity: number;
}

export default function CartDrawer({
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

  const handleNextStep = () => { if (cart.length > 0) setStep(2); };

  const handleWhatsAppBackup = () => {
    const orderItems = cart.map((i) => ` - ${i.quantity}x ${i.name} ${i.size ? `(${i.size})` : ""} - ${(i.price * i.quantity).toFixed(3)} dt`).join("\n");
    const text = `*NOUVELLE COMMANDE - CASA PRESTO* 🍕\n\n*Client:* ${customer.name}\n*Téléphone:* ${customer.phone}\n*Adresse:* ${customer.address}\n${customer.notes ? `*Notes:* ${customer.notes}\n` : ""}*Paiement:* Espèces\n\n*Articles:*\n${orderItems}\n\n*Total:* *${subtotal.toFixed(3)} dt*`;
    window.open(`https://wa.me/21628201445?text=${encodeURIComponent(text)}`, "_blank");
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
        body: JSON.stringify({ cart, customerInfo: customer, orderTotal: subtotal }),
      });
      if (response.ok) {
        setStep(3);
        onClearCart();
      } else {
        setError("Erreur serveur, utilisez WhatsApp en attendant.");
      }
    } catch {
      setError("Erreur réseau, veuillez utiliser WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
          
          <motion.div
            initial={{ x: "100%", y: typeof window !== 'undefined' && window.innerWidth < 768 ? "100%" : 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : "100%", y: typeof window !== 'undefined' && window.innerWidth < 768 ? "100%" : 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full md:h-full mt-auto md:mt-0 bg-bg shadow-2xl flex flex-col rounded-t-3xl md:rounded-none md:rounded-l-3xl overflow-hidden"
            style={typeof window !== 'undefined' && window.innerWidth < 768 ? { height: '85vh' } : {}}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-bg z-10 sticky top-0">
              <h2 className="font-display font-black text-2xl flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" /> Mon Panier
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {step === 1 && (
                cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-4">
                    <ShoppingBag className="w-16 h-16 opacity-20" />
                    <p className="font-medium text-lg">Votre panier est vide</p>
                    <button onClick={onClose} className="btn-outline px-6 py-2 text-xs">Découvrir le menu</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center">
                          <div className="flex-1">
                            <h4 className="font-bold text-dark">{item.name}</h4>
                            <div className="text-xs text-text-muted mt-1">{item.size && <span className="bg-gray-100 px-2 py-0.5 rounded-md mr-2">{item.size}</span>}</div>
                            <div className="font-black text-primary mt-2">{item.price.toFixed(3)} dt</div>
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                            <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:bg-white rounded-lg shadow-sm text-dark"><Minus className="w-4 h-4" /></button>
                            <span className="w-4 text-center font-bold text-sm">{item.quantity}</span>
                            <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 bg-white rounded-lg shadow-sm text-dark"><Plus className="w-4 h-4" /></button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )
              )}

              {step === 2 && (
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Nom Complet *</label>
                    <input type="text" required placeholder="Ex: Jamel Henchiri" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Téléphone *</label>
                    <input type="tel" required placeholder="Ex: 28 201 445" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Adresse de livraison *</label>
                    <input type="text" required placeholder="Ex: Houmt Souk, en face de l'hôtel X..." value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Notes (Optionnel)</label>
                    <input type="text" placeholder="Ex: Sans oignons..." value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark transition-all" />
                  </div>
                  {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
                </form>
              )}

              {step === 3 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-accent-green rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl mb-2">Commande Reçue !</h3>
                    <p className="text-text-muted">Nous préparons votre commande avec amour. Livraison estimée: 30-45 min.</p>
                  </div>
                  <button onClick={onClose} className="btn-primary px-8 py-3 w-full">Fermer</button>
                  <p className="text-xs text-text-muted">Problème ? <a href="#" onClick={(e) => { e.preventDefault(); handleWhatsAppBackup(); }} className="text-primary font-bold underline">Contactez-nous sur WhatsApp</a></p>
                </div>
              )}
            </div>

            {cart.length > 0 && step < 3 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-text-muted font-medium">Sous-total</span>
                  <span className="font-display font-black text-2xl">{subtotal.toFixed(3)} dt</span>
                </div>
                {step === 1 ? (
                  <button onClick={handleNextStep} className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm shadow-glow hover:-translate-y-1 transition-transform">
                    Commander <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button form="checkout-form" type="submit" disabled={loading} className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm shadow-glow hover:-translate-y-1 transition-transform disabled:opacity-70 disabled:hover:translate-y-0">
                    {loading ? "Traitement..." : "Confirmer la commande"}
                  </button>
                )}
                {step === 1 && (
                  <button onClick={handleWhatsAppBackup} className="mt-3 w-full py-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full font-bold text-sm transition-colors flex justify-center items-center gap-2">
                    Commander via WhatsApp
                  </button>
                )}
                {step === 2 && (
                  <button onClick={() => setStep(1)} className="mt-4 w-full text-center text-sm font-bold text-text-muted hover:text-dark">
                    Retour au panier
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
