import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ListTree, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { signOut, user } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: ListTree, label: "Categories", path: "/admin/categories" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } border-r border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-300 flex flex-col z-50`}
      >
        <div className="h-24 flex items-center px-6 border-b border-white/5">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-serif text-xl">C</div>
            {isSidebarOpen && <span className="font-serif tracking-widest uppercase text-sm">Centfume Admin</span>}
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-none transition-all group ${
                  isActive 
                    ? "bg-white text-black" 
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
                {isSidebarOpen && <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-[10px] uppercase tracking-widest font-bold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Header */}
        <header className="h-24 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
              <Input 
                placeholder="Search analytics..." 
                className="bg-white/5 border-white/5 focus:border-white/20 pl-10 h-10 w-64 rounded-none text-[10px] uppercase tracking-widest transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full" />
            </button>
            <div className="h-10 w-[1px] bg-white/5" />
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] uppercase tracking-widest font-bold">Administrator</p>
                <p className="text-[9px] text-slate-500 lowercase tracking-normal">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-zinc-900 border border-white/10 rounded-none flex items-center justify-center font-serif">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
