import { ShoppingBag, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/src/store/useCartStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../context/AuthContext";
import { LoginModal } from "./LoginModal";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-light tracking-[0.3em] uppercase transition-all hover:italic">Centfume</Link>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest text-slate-400 font-medium">
            <Link to="/shop" className="hover:text-white transition-colors duration-300">Shop</Link>
            <Link to="/shop" className="hover:text-white transition-colors duration-300">Collections</Link>
            <Link to="#" className="hover:text-white transition-colors duration-300">Journal</Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Menu className="w-5 h-5 cursor-pointer text-slate-400" onClick={() => setIsMenuOpen(true)} />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-8 text-[11px] uppercase tracking-widest text-slate-400">
          <div className="hidden sm:block cursor-pointer hover:text-white transition-colors">Search</div>
          
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/profile" className="flex items-center gap-3 hover:text-white transition-colors">
                <UserIcon className="w-4 h-4" />
                <span className="hidden lg:block text-slate-500 lowercase tracking-normal">{user.email?.split('@')[0]}</span>
              </Link>
            </div>
          ) : (
            <LoginModal />
          )}

          <Sheet>
            <SheetTrigger asChild>
              <div className="relative cursor-pointer hover:text-white transition-colors group">
                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/40 transition-all duration-500">
                   <div className="relative">
                    <ShoppingBag className="w-4 h-4" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-white text-brand-black text-[8px] font-bold w-3 h-3 rounded-full flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                   </div>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent className="bg-brand-black border-l border-white/10 text-white w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="font-light text-2xl tracking-[0.2em] uppercase text-white">Your Bag</SheetTitle>
              </SheetHeader>
              <Separator className="my-6 bg-white/5" />
              <ScrollArea className="h-[calc(100vh-280px)] pr-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-500 space-y-4">
                    <p className="uppercase tracking-widest text-[10px] font-bold">Your bag is empty</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-6 items-center">
                        <div className="w-20 h-24 bg-zinc-900 border border-white/5 rounded-none overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-serif text-lg font-light tracking-wide">{item.name}</h3>
                          <p className="text-[10px] font-mono text-slate-400">৳{item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-none"
                            >-</button>
                            <span className="text-[10px] font-medium w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-none"
                            >+</button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-white transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              {items.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-6 space-y-6">
                  <div className="flex justify-between items-center uppercase tracking-[0.2em] text-[10px] font-light">
                    <span className="text-slate-400 font-bold">Subtotal</span>
                    <span className="font-mono text-lg text-white">৳{getTotal().toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/cart" className="block">
                      <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white hover:text-black transition-all py-8 rounded-none uppercase tracking-[0.3em] text-[9px] font-bold">
                        View Bag
                      </Button>
                    </Link>
                    <Link to="/checkout" className="block">
                      <Button className="w-full bg-white text-black hover:bg-slate-200 transition-all py-8 rounded-none uppercase tracking-[0.3em] text-[9px] font-bold">
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
