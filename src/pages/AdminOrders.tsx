import { ShoppingBag, Eye, Download, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Logistics</span>
        <h1 className="text-4xl font-serif">Order <span className="italic text-slate-400">Registry</span></h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
          <Input 
            placeholder="Search by Order ID or Customer..." 
            className="bg-white/5 border-white/5 focus:border-white/20 pl-10 h-12 rounded-none text-[10px] uppercase tracking-widest"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none border-white/5 bg-zinc-950 text-slate-500 hover:text-white hover:bg-white/5 rounded-none px-6 h-12 uppercase tracking-widest text-[10px] font-bold gap-2">
            <Filter className="w-4 h-4" />
            Filter Status
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none border-white/5 bg-zinc-950 text-slate-500 hover:text-white hover:bg-white/5 rounded-none px-6 h-12 uppercase tracking-widest text-[10px] font-bold gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
              <th className="pb-6 px-4">Order ID</th>
              <th className="pb-6 px-4">Customer</th>
              <th className="pb-6 px-4">Date</th>
              <th className="pb-6 px-4">Items</th>
              <th className="pb-6 px-4">Payment</th>
              <th className="pb-6 px-4">Status</th>
              <th className="pb-6 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[11px] uppercase tracking-widest">
            {[1,2,3,4,5].map((i) => (
              <tr key={i} className="group hover:bg-white/5 transition-all">
                <td className="py-8 px-4 font-mono">#ORD-900{i}</td>
                <td className="py-8 px-4">
                  <p className="font-bold">Customer Name</p>
                  <p className="text-[9px] text-slate-500 lowercase tracking-normal">customer@example.com</p>
                </td>
                <td className="py-8 px-4 text-slate-400">May {i}, 2026</td>
                <td className="py-8 px-4">3 Items</td>
                <td className="py-8 px-4">
                  <p className="font-mono font-bold">৳12,000</p>
                  <p className="text-[8px] text-slate-500">COD</p>
                </td>
                <td className="py-8 px-4">
                  <span className="text-[9px] font-bold px-2 py-1 border border-brand-gold/20 text-brand-gold bg-brand-gold/5">
                    Processing
                  </span>
                </td>
                <td className="py-8 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/admin/orders/ORD-900${i}`}>
                      <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-500 hover:text-white hover:bg-white/5 rounded-none border border-transparent hover:border-white/10"><Eye className="w-4 h-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-500 hover:text-white hover:bg-white/5 rounded-none border border-transparent hover:border-white/10"><Download className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
