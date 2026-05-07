import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 pt-32 pb-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
        {/* Brand */}
        <div className="space-y-8">
          <Link to="/" className="text-3xl font-serif tracking-[0.2em] font-light italic">CENTFUME</Link>
          <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs">
            Curating the world's most evocative fragrances, delivered with the poise and precision of luxury heritage.
          </p>
          <div className="flex gap-6">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-600 hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-10">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Collections</h4>
          <ul className="space-y-6">
            {["Signature", "Limited Edition", "Sample Sets", "Gift Concierge"].map(link => (
              <li key={link}>
                <Link to="/shop" className="text-slate-500 hover:text-white text-sm font-light transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-10">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Support</h4>
          <ul className="space-y-6">
            {["Authenticity", "Shipping Essence", "Returns", "Private Consultations"].map(link => (
              <li key={link}>
                <Link to="#" className="text-slate-500 hover:text-white text-sm font-light transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-10">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">The Atelier</h4>
          <ul className="space-y-6">
            <li className="flex items-center gap-4 text-slate-500 text-sm font-light">
               <MapPin className="w-4 h-4 text-slate-700" /> Banani, Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-4 text-slate-500 text-sm font-light">
               <Phone className="w-4 h-4 text-slate-700" /> +880 1234 567890
            </li>
            <li className="flex items-center gap-4 text-slate-500 text-sm font-light">
               <Mail className="w-4 h-4 text-slate-700" /> atelier@centfume.com
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">© 2026 Centfume Luxury Fragrances</p>
        <div className="flex gap-12">
            {["Privacy", "Terms", "Cookies"].map(link => (
              <Link key={link} to="#" className="text-[10px] uppercase tracking-widest text-slate-600 hover:text-slate-400 font-bold transition-colors">{link}</Link>
            ))}
        </div>
      </div>
    </footer>
  );
}
