import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/src/lib/supabase";
import { Product } from "../types";
import { useCartStore } from "@/src/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { ChevronLeft, Star, ShoppingBag, Heart, Share2, Shield, Truck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setProduct({
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.image_url || data.image,
            description: data.description,
            tag: data.tag
          });
        }
      } catch (err: any) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center min-h-[70vh] space-y-8">
        <div className="w-16 h-16 border-2 border-white/10 border-t-white rounded-full animate-spin" />
        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Unveiling the essence...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 text-center space-y-8">
        <h2 className="text-4xl font-serif">Fragrance Not Found</h2>
        <Link to="/shop">
          <Button variant="outline" className="border-white/10 rounded-none uppercase text-[10px] tracking-widest">
            Back to Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
      <Link to="/shop" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 uppercase text-[10px] tracking-widest font-bold">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-24">
        {/* Gallery */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="relative aspect-[4/5] bg-zinc-900 overflow-hidden rounded-3xl border border-white/5"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          {product.tag && (
            <Badge className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border-white/20 text-white rounded-none py-2 px-6 uppercase tracking-widest text-[10px] pointer-events-none">
              {product.tag}
            </Badge>
          )}
        </motion.div>

        {/* Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-gold">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                <span className="text-slate-500 text-[10px] ml-2 font-bold uppercase tracking-widest">48 Verified Reviews</span>
              </div>
              <h1 className="text-6xl font-serif font-light tracking-wide">{product.name}</h1>
            </div>
            <p className="text-5xl font-light text-slate-200">৳{product.price.toLocaleString()}</p>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-lg">
              {product.description}. A masterfully balanced composition that evolves beautifully on the skin, lingering with purpose and poise.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block">Select Volume</span>
              <div className="flex gap-4">
                {["50ml", "100ml", "200ml"].map(size => (
                  <button 
                    key={size}
                    className={`h-12 px-10 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      size === "100ml" ? "border-white bg-white text-black" : "border-white/10 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-12">
              <Button 
                onClick={() => {
                  addItem(product);
                  toast.success(`${product.name} added to cart`);
                }}
                className="h-16 px-16 bg-white text-black hover:bg-slate-200 rounded-none uppercase text-[11px] tracking-[0.3em] font-bold flex-1"
              >
                <ShoppingBag className="w-4 h-4 mr-3" /> Add to Shopping Bag
              </Button>
              <Button size="icon" variant="outline" className="h-16 w-16 border-white/10 rounded-none hover:bg-white hover:text-black transition-all">
                <Heart className="w-5 h-5" />
              </Button>
               <Button size="icon" variant="outline" className="h-16 w-16 border-white/10 rounded-none hover:bg-white hover:text-black transition-all">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
            {[
               { icon: Truck, label: "Next Day Delivery" },
               { icon: Shield, label: "Authenticity Guaranteed" },
               { icon: RefreshCw, label: "Complimentary Returns" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-3 text-center">
                <item.icon className="w-6 h-6 text-slate-500 mx-auto" />
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-tight">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Scent Pyramid Section */}
          <div className="pt-24 space-y-12">
            <h3 className="text-2xl font-serif italic border-b border-white/5 pb-6">The Olfactory Journey</h3>
            <div className="space-y-10">
               <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block">Top Notes</span>
                  <p className="text-slate-300 font-light">Bergamot, Pink Pepper, Juniper Berries</p>
               </div>
               <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block">Middle Notes</span>
                  <p className="text-slate-300 font-light">Lily of the Valley, Iris, Rose</p>
               </div>
               <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block">Base Notes</span>
                  <p className="text-slate-300 font-light">White Musk, Sandalwood, Patchouli</p>
               </div>
            </div>
          </div>

          {/* Related Products */}
          <section className="pt-32 space-y-16">
            <h3 className="text-4xl font-serif">Complementary <span className="italic">Essences</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Using static recommendations for now or we could fetch based on category */}
              <div className="p-12 border border-white/5 bg-zinc-950/50 hover:border-white/10 transition-colors group cursor-pointer">
                 <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-4">Perfect Pairing</p>
                 <h4 className="text-2xl font-serif italic mb-6">Discovery Set</h4>
                 <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">Not sure? Experience our full repertoire with five signature samples.</p>
                 <Link to="/shop" className="text-[10px] uppercase tracking-[0.3em] font-bold text-white border-b border-white/20 pb-1 hover:border-white transition-all">Explore Discovery</Link>
              </div>
              <div className="p-12 border border-white/5 bg-zinc-950/50 hover:border-white/10 transition-colors group cursor-pointer">
                 <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-4">Maison Service</p>
                 <h4 className="text-2xl font-serif italic mb-6">Gift Concierge</h4>
                 <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">Personalized consultation to find the perfect gift for your beloved.</p>
                 <Link to="#" className="text-[10px] uppercase tracking-[0.3em] font-bold text-white border-b border-white/20 pb-1 hover:border-white transition-all">Talk to a Perfumer</Link>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
