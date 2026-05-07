import { ArrowLeft, Printer, Truck, Download, ChevronRight, Package, User, MapPin, CreditCard } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminOrderDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-12 max-w-6xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/admin/orders" className="p-3 bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-[0.4em] text-[9px] font-bold">Transaction</span>
            <h1 className="text-3xl font-serif">Order <span className="font-mono text-2xl text-slate-400">{id || "#ORD-9012"}</span></h1>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-none border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold gap-2">
            <Printer className="w-4 h-4" />
            Print Invoice
          </Button>
          <Button className="bg-white text-black hover:bg-slate-200 rounded-none px-8 py-6 uppercase tracking-widest text-[10px] font-bold gap-2">
            <Truck className="w-4 h-4" />
            Ship Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <div className="p-10 bg-zinc-950 border border-white/5 space-y-10">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold border-b border-white/5 pb-4">Consignment Details</h3>
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-8 items-center group">
                  <div className="w-24 h-32 bg-zinc-900 border border-white/5 overflow-hidden shrink-0">
                    <img src={`https://images.unsplash.com/photo-1541602240222-7776483486c9?w=300&q=80`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">Midnight Oasis</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Fragrance • 100ml • EDP</p>
                      </div>
                      <p className="font-mono text-sm font-bold">৳12,000</p>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest">
                      <span>Quantity: 01</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span>SKU: CF-MO100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-12">
               <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Notes</p>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed italic">"Please ensure the gift wrap is aesthetic. It's for an anniversary."</p>
               </div>
               <div className="space-y-4 text-right">
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">৳24,000</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-slate-400">
                    <span>Shipping</span>
                    <span className="font-mono text-white">৳120</span>
                  </div>
                  <div className="flex justify-between text-lg uppercase tracking-[0.2em] font-serif pt-4 border-t border-white/5">
                    <span className="text-brand-gold">Total</span>
                    <span className="text-white">৳24,120</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-10 bg-zinc-950 border border-white/5 space-y-10">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold border-b border-white/5 pb-4">Logistics Timeline</h3>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
              {[
                { status: "Order Placed", date: "May 7, 2026 • 10:20 AM", active: true },
                { status: "Payment Confirmed", date: "May 7, 2026 • 10:25 AM", active: true },
                { status: "Processing at Maison", date: "May 7, 2026 • 11:45 AM", active: true },
                { status: "Handed over to Courier", date: "Pending", active: false },
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-start relative z-10">
                  <div className={`w-6 h-6 border ${step.active ? 'bg-white border-white' : 'bg-zinc-950 border-white/10'} flex items-center justify-center shrink-0`}>
                    {step.active && <div className="w-2 h-2 bg-black" />}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${step.active ? 'text-white' : 'text-slate-500'}`}>{step.status}</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Customer Card */}
          <div className="p-8 bg-zinc-950 border border-white/5 space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">Patron Profile</h3>
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center font-serif text-xl">S</div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest">Sophia Reynolds</p>
                <p className="text-[9px] text-slate-500 lowercase tracking-normal">sophia.r@example.com</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  <MapPin className="w-3 h-3" /> Shipping Destination
                </div>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed uppercase tracking-widest px-5">
                  Building 12, Floor 4,<br />
                  Gulshan Avenue, Dhaka
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  <CreditCard className="w-3 h-3" /> Settlement Method
                </div>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed uppercase tracking-widest px-5 italic">
                  Cash on Delivery (COD)
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-zinc-950 border border-white/5 space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start rounded-none text-[9px] uppercase tracking-widest font-bold hover:bg-white hover:text-black">Return Processing</Button>
              <Button variant="ghost" className="w-full justify-start rounded-none text-[9px] uppercase tracking-widest font-bold hover:bg-white hover:text-black">Issue Refund</Button>
              <Button variant="ghost" className="w-full justify-start rounded-none text-[9px] uppercase tracking-widest font-bold text-rose-400 hover:bg-rose-400/5">Cancel Consignment</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
