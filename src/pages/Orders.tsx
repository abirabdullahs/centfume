import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { motion } from "motion/react";
import { Package, Truck, CheckCircle, Clock, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  created_at: string;
  total_price: number;
  status: string;
  shipping_address: string;
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-5 h-5 text-amber-500" />;
      case "shipped": return <Truck className="w-5 h-5 text-blue-500" />;
      case "delivered": return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Package className="w-5 h-5 text-slate-500" />;
    }
  };

  if (loading) {
    return <div className="pt-40 text-center text-slate-500 uppercase tracking-widest text-[10px] font-bold">Querying history...</div>;
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <header className="mb-20 space-y-4">
        <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Account</span>
        <h1 className="text-6xl font-serif font-light tracking-wide italic leading-none">Your Orders</h1>
      </header>

      {orders.length === 0 ? (
        <div className="text-center py-24 space-y-12">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto grayscale opacity-50">
             <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-4">
             <h2 className="text-3xl font-serif">Empty Chronicles</h2>
             <p className="text-slate-500 font-light max-w-sm mx-auto">Your fragrance journey is just beginning. Let's start with your first order.</p>
          </div>
          <Link to="/shop" className="inline-block mt-8">
            <button className="h-14 px-12 border border-white/20 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
               Explore Collection
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          {orders.map((order) => (
            <motion.div 
               key={order.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-zinc-950 border border-white/5 p-8 md:p-12 hover:border-white/10 transition-colors group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row justify-between gap-8">
                 <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold italic">Order #{order.id.slice(0, 8)}</span>
                       <Badge variant="outline" className="rounded-none uppercase tracking-widest text-[9px] border-white/10 py-1">
                          {order.status}
                       </Badge>
                    </div>
                    <div>
                       <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Delivery Address</p>
                       <p className="text-slate-300 font-light truncate max-w-md">{order.shipping_address}</p>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                       Placed on {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                 </div>

                 <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-12">
                    <div className="flex items-center gap-4 mb-2">
                       {getStatusIcon(order.status)}
                       <span className="text-2xl font-light">৳{order.total_price.toLocaleString()}</span>
                    </div>
                    <button className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors font-bold">
                       View Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
