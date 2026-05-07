import React, { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, LogIn, Mail } from "lucide-react";
import { toast } from "sonner";

export function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password 
        });
        if (error) throw error;
        toast.success("Registration successful! Check your email for verification.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-white/70 transition-colors">
          <User className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-wide">
            {isSignUp ? "Join Centfume" : "Welcome Back"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAuth} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="bg-zinc-900/50 border-white/5 pl-10 focus:border-white/20 transition-all rounded-none h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-zinc-900/50 border-white/5 focus:border-white/20 transition-all rounded-none h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black hover:bg-slate-200 rounded-none h-12 uppercase text-[10px] tracking-[0.3em] font-bold"
          >
            {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors font-bold"
            >
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
