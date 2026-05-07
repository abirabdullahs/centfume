import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { User, Mail, Shield, Bell, LogOut, Package, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="pt-40 text-center space-y-8 min-h-screen">
        <h2 className="text-4xl font-serif italic">Please sign in</h2>
        <Link to="/">
          <Button variant="outline" className="border-white/10 rounded-none uppercase text-[10px] tracking-widest">
            Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      <header className="mb-20 space-y-4">
        <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Cabinet</span>
        <h1 className="text-6xl font-serif font-light tracking-wide italic leading-none">Your Identity</h1>
      </header>

      <div className="grid lg:grid-cols-12 gap-24">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-12">
           <div className="flex flex-col gap-2">
              <button className="flex items-center gap-4 py-4 px-6 bg-white text-black font-bold uppercase text-[10px] tracking-widest transition-all">
                 <User className="w-4 h-4" /> Account Details
              </button>
              <Link to="/orders" className="flex items-center gap-4 py-4 px-6 text-slate-500 hover:text-white font-bold uppercase text-[10px] tracking-widest transition-all">
                 <Package className="w-4 h-4" /> Order History
              </Link>
              <button className="flex items-center gap-4 py-4 px-6 text-slate-500 hover:text-white font-bold uppercase text-[10px] tracking-widest transition-all">
                 <Heart className="w-4 h-4" /> Wishlist
              </button>
              <button className="flex items-center gap-4 py-4 px-6 text-slate-500 hover:text-white font-bold uppercase text-[10px] tracking-widest transition-all">
                 <Bell className="w-4 h-4" /> Notifications
              </button>
           </div>
           
           <button 
             onClick={() => signOut()}
             className="flex items-center gap-4 py-4 px-6 text-red-500/70 hover:text-red-500 font-bold uppercase text-[10px] tracking-widest transition-all border border-red-500/10 hover:border-red-500/30 w-full"
           >
              <LogOut className="w-4 h-4" /> Sign Out
           </button>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-9 space-y-16">
           <section className="space-y-10">
              <div className="space-y-4">
                 <h3 className="text-2xl font-serif">Profile Information</h3>
                 <p className="text-slate-400 text-sm font-light">Your personal details are securely stored and encrypted.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Email Essence</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                       <Input value={user.email} disabled className="bg-white/5 border-white/10 rounded-none h-14 pl-12 text-slate-400 opacity-60" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Member Since</label>
                    <Input value={new Date(user.created_at).toLocaleDateString()} disabled className="bg-white/5 border-white/10 rounded-none h-14 text-slate-400 opacity-60" />
                 </div>
              </div>
           </section>

           <section className="space-y-10 border-t border-white/5 pt-16">
              <div className="space-y-4">
                 <h3 className="text-2xl font-serif">Security & Shield</h3>
                 <p className="text-slate-400 text-sm font-light">Maintain your digital veil with password rotations.</p>
              </div>
              
              <div className="space-y-8 max-w-md">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Update Passphrase</label>
                    <Input type="password" placeholder="Enter new password" className="bg-white/5 border-white/10 rounded-none h-14" />
                 </div>
                 <Button className="h-14 px-12 bg-white text-black hover:bg-slate-200 rounded-none uppercase text-[10px] tracking-[0.3em] font-bold">
                    Confirm Changes
                 </Button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
