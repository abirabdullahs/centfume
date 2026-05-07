import { Users, Search, MoreVertical, Mail, Phone, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminCustomers() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Patrons</span>
        <h1 className="text-4xl font-serif">Customer <span className="italic text-slate-400">Directory</span></h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
          <Input 
            placeholder="Search patrons..." 
            className="bg-white/5 border-white/5 focus:border-white/20 pl-10 h-12 rounded-none text-[10px] uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
              <th className="px-6">Patron</th>
              <th className="px-6">Contact</th>
              <th className="px-6">Engagement</th>
              <th className="px-6">Spent</th>
              <th className="px-6">Status</th>
              <th className="px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map((i) => (
              <tr key={i} className="bg-zinc-950/50 border border-white/5 group hover:bg-zinc-900 transition-all">
                <td className="py-8 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-none flex items-center justify-center font-serif text-xl">
                      {["S", "J", "E", "M", "I"][i-1]}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold uppercase tracking-widest leading-tight">
                        {["Sophia Reynolds", "James Lawson", "Elena Vance", "Marcus Thorne", "Isabella Gray"][i-1]}
                      </p>
                      <p className="text-[9px] text-slate-500 lowercase tracking-normal">Registered Oct {i+10}, 2025</p>
                    </div>
                  </div>
                </td>
                <td className="py-8 px-6 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Mail className="w-3 h-3" />
                    patron{i}@example.com
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Phone className="w-3 h-3" />
                    +880 1712-34567{i}
                  </div>
                </td>
                <td className="py-8 px-6">
                  <div className="flex items-center gap-4">
                    <div className="space-y-1 text-center border-r border-white/5 pr-4">
                      <p className="text-[12px] font-bold font-mono">{i * 2 + 3}</p>
                      <p className="text-[8px] text-slate-500 uppercase tracking-widest">Orders</p>
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-[12px] font-bold font-mono">৳{i * 5000 + 12000}</p>
                      <p className="text-[8px] text-slate-500 uppercase tracking-widest">Total</p>
                    </div>
                  </div>
                </td>
                <td className="py-8 px-6">
                   <p className="text-[10px] uppercase tracking-widest text-slate-400">Regular</p>
                </td>
                <td className="py-8 px-6">
                  <span className="text-[9px] font-bold px-2 py-1 border border-emerald-400/20 text-emerald-400 bg-emerald-400/5 uppercase tracking-widest">
                    Active
                  </span>
                </td>
                <td className="py-8 px-6 text-right">
                  <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-500 hover:text-white hover:bg-white/5 rounded-none"><MoreVertical className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
