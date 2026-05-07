import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const { products, loading } = useProducts();

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Inventory</span>
          <h1 className="text-4xl font-serif">Product <span className="italic text-slate-400">Library</span></h1>
        </div>
        <Link to="/admin/products/add">
          <Button className="bg-white text-black hover:bg-slate-200 rounded-none px-8 py-6 uppercase tracking-widest text-[10px] font-bold gap-2">
            <Plus className="w-4 h-4" />
            Add Masterpiece
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
          <Input 
            placeholder="Search products..." 
            className="bg-white/5 border-white/5 focus:border-white/20 pl-10 h-12 rounded-none text-[10px] uppercase tracking-widest"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none border-white/5 bg-zinc-950 text-slate-500 hover:text-white hover:bg-white/5 rounded-none px-6 h-12 uppercase tracking-widest text-[10px] font-bold gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <select className="flex-1 md:flex-none bg-zinc-950 border border-white/5 text-slate-500 text-[10px] uppercase tracking-widest font-bold px-6 h-12 rounded-none focus:ring-0 cursor-pointer hover:border-white/20 transition-all">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Stock: Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
              <th className="pb-6 px-4">Product</th>
              <th className="pb-6 px-4">Category</th>
              <th className="pb-6 px-4">Price</th>
              <th className="pb-6 px-4">Stock</th>
              <th className="pb-6 px-4">Status</th>
              <th className="pb-6 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={6} className="py-20 text-center text-slate-500 uppercase tracking-widest text-[10px]">Curating collection...</td></tr>
            ) : products?.map((product) => (
              <tr key={product.id} className="group hover:bg-white/5 transition-all">
                <td className="py-6 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-zinc-900 border border-white/5 overflow-hidden rounded-none shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold uppercase tracking-widest leading-tight">{product.name}</p>
                      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">SKU: CF-{product.id.slice(0, 8)}</p>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-medium">{product.tag || "Uncategorized"}</td>
                <td className="py-6 px-4 font-mono text-[11px] font-bold">৳{product.price.toLocaleString()}</td>
                <td className="py-6 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1 flex-1 bg-white/5 w-20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white opacity-40 max-w-[45%]" />
                    </div>
                    <span className="text-[10px] font-mono">45</span>
                  </div>
                </td>
                <td className="py-6 px-4">
                  <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-1 border border-emerald-400/20 text-emerald-400 bg-emerald-400/5">
                    Active
                  </span>
                </td>
                <td className="py-6 px-4 text-right">
                  <div className="flex justify-end gap-2 pr-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-500 hover:text-white hover:bg-white/5 rounded-none"><Eye className="w-4 h-4" /></Button>
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-500 hover:text-white hover:bg-white/5 rounded-none"><Edit className="w-4 h-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-500 hover:text-rose-400 hover:bg-rose-400/5 rounded-none"><Trash2 className="w-4 h-4" /></Button>
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
