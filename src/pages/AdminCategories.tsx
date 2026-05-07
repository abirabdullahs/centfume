import { ListTree, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCategories() {
  const categories = [
    { name: "Floral", description: "Delicate and blooming essences", count: 12, status: "Active" },
    { name: "Woody", description: "Earthbound and grounded aromas", count: 8, status: "Active" },
    { name: "Fresh", description: "Crisp and invigorating notes", count: 15, status: "Active" },
    { name: "Oriental", description: "Rich and mysterious blends", count: 6, status: "Active" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Taxonomy</span>
          <h1 className="text-4xl font-serif">Aroma <span className="italic text-slate-400">Families</span></h1>
        </div>
        <Button className="bg-white text-black hover:bg-slate-200 rounded-none px-8 py-6 uppercase tracking-widest text-[10px] font-bold gap-2">
          <Plus className="w-4 h-4" />
          New Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="p-10 bg-zinc-950 border border-white/5 flex justify-between items-start group hover:border-white/10 transition-all">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-brand-gold text-[9px] uppercase tracking-widest font-bold">Family {i + 1}</span>
                <h3 className="text-2xl font-serif">{cat.name}</h3>
                <p className="text-slate-500 text-sm font-light max-w-xs">{cat.description}</p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">{cat.count} Masterpieces</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="w-10 h-10 border border-white/5 bg-zinc-900 rounded-none hover:bg-white hover:text-black transition-all"><Edit className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 border border-white/5 bg-zinc-900 rounded-none hover:bg-rose-400/10 hover:text-rose-400 transition-all"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
