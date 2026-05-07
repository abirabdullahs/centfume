import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/src/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;
      if (!user) throw new Error("Authentication failed");

      // Check role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      
      if (profileError) throw profileError;

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        throw new Error("Access Denied: You do not have administrative privileges.");
      }

      toast.success("Maison Access Granted");
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/20 blur-[150px] pointer-events-none rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-md space-y-12 relative"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-white text-black items-center justify-center font-serif text-3xl mb-4">C</div>
          <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-white">Maison Archive</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Secure Administrative Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
              <Input 
                type="email"
                placeholder="REGISTRY EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/5 focus:border-white/20 pl-10 h-14 rounded-none text-[10px] uppercase tracking-widest text-white transition-all"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
              <Input 
                type="password"
                placeholder="ACCESS KEY"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/5 focus:border-white/20 pl-10 h-14 rounded-none text-[10px] uppercase tracking-widest text-white transition-all"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-slate-200 py-7 rounded-none uppercase tracking-[0.3em] text-[10px] font-bold transition-all disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : (
              <span className="flex items-center gap-3">
                Unlock Archive <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center">
          <button type="button" className="text-[9px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors font-bold">
            Emergency Access Reset
          </button>
        </div>

        <div className="pt-12 text-center text-[8px] uppercase tracking-[0.4em] text-slate-700 font-bold">
          © 2026 Centfume Maison • Internal Use Only
        </div>
      </motion.div>
    </div>
  );
}
