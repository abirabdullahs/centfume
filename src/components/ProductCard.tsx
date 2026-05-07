import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/src/store/useCartStore";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Product } from "../types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="border border-white/5 bg-zinc-900/20 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/40 shadow-2xl">
        <CardContent className="p-0 relative">
          {/* Image Container */}
          <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.01] group-hover:scale-110"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />

            {/* Price Tag (Modern) */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
              <span className="text-[10px] font-mono tracking-tight text-white/90">৳{product.price.toLocaleString()}</span>
            </div>
          </Link>
          
          {/* Interaction Buttons */}
          <div className="absolute inset-x-0 bottom-32 flex items-center justify-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-6">
            <Button 
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="flex-1 bg-white text-black hover:bg-slate-200 rounded-none h-12 uppercase text-[9px] tracking-[0.2em] font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Add to Bag
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button size="icon" variant="outline" className="h-12 w-12 border-white/10 rounded-none hover:bg-white hover:text-black">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          {/* Content */}
          <Link to={`/product/${product.id}`} className="block p-6 text-center space-y-2">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-light tracking-wide text-white/90">{product.name}</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-medium">{product.description}</p>
            </div>
            {product.tag && (
              <div className="pt-2">
                <span className="text-[8px] uppercase tracking-[0.4em] bg-white text-black px-2 py-0.5 font-bold">
                  {product.tag}
                </span>
              </div>
            )}
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
