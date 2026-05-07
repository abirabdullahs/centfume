import { Save, Bell, Shield, Globe, Mail, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSettings() {
  return (
    <div className="space-y-12 max-w-4xl">
      <div className="space-y-2">
        <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Configuration</span>
        <h1 className="text-4xl font-serif">Maison <span className="italic text-slate-400">Settings</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/5 pb-4">Categories</h3>
          <nav className="flex flex-col gap-2">
            {[
              { label: "General", icon: Globe },
              { label: "Notifications", icon: Bell },
              { label: "Security", icon: Shield },
              { label: "Emails", icon: Mail },
              { label: "Media", icon: ImageIcon },
            ].map((item) => (
              <button key={item.label} className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-left transition-all ${
                item.label === "General" ? "bg-white text-black" : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2 space-y-12">
          {/* General Section */}
          <section className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">General Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Store Name</label>
                <Input defaultValue="Centfume" className="bg-white/5 border-white/5 rounded-none h-12 uppercase tracking-widest text-[10px]" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Support Email</label>
                <Input defaultValue="maison@centfume.com" className="bg-white/5 border-white/5 rounded-none h-12 lowercase tracking-normal text-[11px]" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Business Address</label>
                <textarea className="w-full bg-white/5 border border-white/5 rounded-none p-4 h-32 uppercase tracking-widest text-[10px] focus:outline-none focus:border-white/20 transition-all font-sans" defaultValue="Gulshan-2, Dhaka, Bangladesh" />
              </div>
            </div>
          </section>

          {/* Social Section */}
          <section className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">Brand Identity</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-8 bg-zinc-950 border border-white/5">
                <div className="w-20 h-20 bg-white flex items-center justify-center font-serif text-4xl text-black">C</div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest font-bold">Store Logo</p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="h-8 rounded-none border-white/10 text-[9px] uppercase tracking-widest font-bold hover:bg-white hover:text-black">Update</Button>
                    <Button variant="ghost" className="h-8 rounded-none text-rose-400 hover:bg-rose-400/5 text-[9px] uppercase tracking-widest font-bold">Remove</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-8 border-t border-white/5 flex justify-end gap-6">
            <Button variant="ghost" className="rounded-none uppercase tracking-widest text-[10px] font-bold text-slate-500 hover:text-white">Discard Changes</Button>
            <Button className="bg-white text-black hover:bg-slate-200 rounded-none px-12 py-6 uppercase tracking-widest text-[10px] font-bold gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
