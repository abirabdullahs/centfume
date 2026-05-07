import React from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { motion } from "motion/react";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types";
import { Link } from "react-router-dom";

const FEATURED_PRODUCTS_FALLBACK: Product[] = [
  {
    id: "1",
    name: "Midnight Oasis",
    price: 185,
    description: "Oud • Black Pepper • Saffron",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
    tag: "Signature"
  },
  {
    id: "2",
    name: "Azure Mist",
    price: 145,
    description: "Sea Salt • Bergamot • Driftwood",
    image: "https://images.unsplash.com/photo-1583445328900-24449833595e?q=80&w=1000&auto=format&fit=crop",
    tag: "Best Seller"
  }
];

export default function Home() {
  const { products: dbProducts, loading } = useProducts();
  const displayProducts = dbProducts.length > 0 ? dbProducts : FEATURED_PRODUCTS_FALLBACK;

  return (
    <div className="space-y-0">
      <Hero />

      {/* Featured Section */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -z-10" />

        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold"
            >
              Curation 2026
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-serif font-light tracking-wide"
            >
              The Signature <span className="italic">Collection</span>
            </motion.h2>
          </div>
          <p className="text-slate-400 text-sm max-w-sm font-light leading-relaxed">
            Meticulously crafted fragrances designed to evoke memories and stir emotions through the purest natural essences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
          {displayProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 items-center gap-24 relative z-10">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] bg-zinc-900 overflow-hidden rounded-3xl border border-white/10 group">
               <img 
                src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop" 
                alt="Perfumer working" 
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-black/60 backdrop-blur-2xl border border-white/10 p-10 rounded-2xl hidden md:block max-w-xs shadow-2xl">
              <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold block mb-4">Origins</span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Hand-sourced Bulgarian roses and aged sandalwood from the Mysore valley define our heritage.
              </p>
            </div>
          </div>
          
          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Our Philosophy</span>
              <h2 className="text-6xl font-serif font-extralight leading-none">Artistry in <br /><span className="italic text-slate-400">Exile</span></h2>
            </div>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Centfume was born from a desire to encapsulate the most profound human emotions in liquid form. Our master perfumers travel the globe to source the rarest ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center space-y-4 mb-20">
          <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Discover</span>
          <h2 className="text-5xl font-serif font-light tracking-wide italic">Olfactory Families</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {["Floral", "Woody", "Fresh", "Oriental", "Fruity", "Spicy"].map((cat) => (
            <Link to={`/shop?category=${cat}`} key={cat} className="group">
              <div className="aspect-square bg-zinc-950 border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-all">
                <span className="text-[10px] uppercase tracking-widest font-bold z-10 group-hover:scale-110 transition-transform">{cat}</span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-24">
          <div className="max-w-2xl">
            <span className="text-slate-400 uppercase tracking-[0.4em] text-[10px] font-bold block mb-4">Voices</span>
            <h2 className="text-5xl font-serif leading-tight">What the <span className="italic">connoisseurs</span> say about our blends.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { name: "Sophia R.", role: "Fragrance Critic", text: "Centfume doesn't just sell perfume; they sell atmosphere. Midnight Oasis has become my absolute evening staple." },
              { name: "James L.", role: "Collector", text: "The longevity of these natural extracts is unparalleled. A truly artisanal approach to modern perfumery." },
              { name: "Elena V.", role: "Lifestyle Blogger", text: "Every scent tells a story. The packaging, the delivery, the essence—it's pure luxury from start to finish." }
            ].map((t, i) => (
              <div key={i} className="space-y-8">
                <p className="text-xl font-light italic leading-relaxed">"{t.text}"</p>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold">{t.name}</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Assistance</span>
          <h2 className="text-4xl font-serif">Frequently Asked</h2>
        </div>
        <div className="space-y-12">
          {[
            { q: "How long is the typical longevity?", a: "Our Eau de Parfums typically last between 8 to 12 hours depending on skin chemistry and environmental factors." },
            { q: "Are the ingredients ethically sourced?", a: "We maintain direct relationships with farmers in Bulgaria, India, and France to ensure both quality and ethical labor practices." },
            { q: "Do you offer sample discovery sets?", a: "Yes, our Discovery Set includes five 2ml vials of our core collection, redeemable against any full-size bottle." }
          ].map((faq, i) => (
            <div key={i} className="space-y-4 border-b border-white/5 pb-10">
              <h4 className="text-lg font-serif italic text-white/90">{faq.q}</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-40 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-slate-800/10 blur-[150px] pointer-events-none" />
        
        <div className="max-w-xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
             <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Stay Updated</span>
            <h3 className="text-4xl font-serif font-light uppercase tracking-wide">The Inner Circle</h3>
            <p className="text-slate-400 font-light">Subscribe to receive first access to limited releases and bespoke scent events.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-0 border-b border-white/20 pb-2 focus-within:border-white transition-colors duration-500">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 bg-transparent py-4 outline-none text-white font-light tracking-wide placeholder:text-slate-600" 
            />
            <button className="uppercase tracking-[0.3em] text-[10px] font-bold text-white px-8 py-4 hover:text-brand-gold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
