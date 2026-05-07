import React from "react";
import { useCartStore } from "@/src/store/useCartStore";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Truck, ShieldCheck, CreditCard } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = subtotal * 0.15;
  const shipping = subtotal > 10000 ? 0 : 200;
  const total = subtotal + vat + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 text-center min-h-screen space-y-12">
        <div className="space-y-6">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10">
            <ShoppingBag className="w-10 h-10 text-slate-500" />
          </div>
          <h1 className="text-5xl font-serif">Your shopping bag is <span className="italic">empty</span></h1>
          <p className="text-slate-400 font-light max-w-sm mx-auto">Explore our curated collections to find your signature scent.</p>
        </div>
        <Link to="/shop">
          <Button className="h-16 px-16 bg-white text-black hover:bg-slate-200 rounded-none uppercase text-[11px] tracking-[0.3em] font-bold">
            Browse Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <header className="mb-20 space-y-4">
        <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Review Order</span>
        <h1 className="text-6xl font-serif font-light tracking-wide italic leading-none">Shopping Bag</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-24">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-12">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-12 group pb-12 border-b border-white/5"
            >
              <div className="w-full sm:w-48 aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 relative shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-serif tracking-wide">{item.name}</h3>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mt-2">100ml • Eau de Parfum</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm font-light leading-relaxed max-w-sm">{item.description}</p>
                </div>

                <div className="flex justify-between items-end mt-12">
                  <div className="flex items-center gap-6 border border-white/10 px-4 py-2">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="text-slate-400 hover:text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-2xl font-light">৳{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          <button 
            onClick={clearCart}
            className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-white font-bold transition-colors"
          >
            Clear All Items
          </button>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-12">
          <div className="bg-zinc-950 border border-white/5 p-12 space-y-10">
            <h2 className="text-2xl font-serif italic border-b border-white/5 pb-8">Order Summary</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between text-sm font-light text-slate-400">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-light text-slate-400">
                <span>VAT (15%)</span>
                <span>৳{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-light text-slate-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : `৳${shipping}`}</span>
              </div>
              <Separator className="bg-white/5" />
              <div className="flex justify-between text-xl font-light pt-4 text-white">
                <span>Total Amount</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Link to="/checkout" className="block">
                <Button className="w-full h-16 bg-white text-black hover:bg-slate-200 rounded-none uppercase text-[11px] tracking-[0.3em] font-bold group">
                  Secure Checkout <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <p className="text-[9px] text-center uppercase tracking-widest text-slate-500 font-bold">Cash on Delivery only currently</p>
            </div>
          </div>

          <div className="space-y-8 px-6">
             <div className="flex items-center gap-4">
                <Truck className="w-5 h-5 text-slate-500" />
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Standard Delivery: 2-3 Days</p>
             </div>
             <div className="flex items-center gap-4">
                <ShieldCheck className="w-5 h-5 text-slate-500" />
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Authentic & Secure</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
