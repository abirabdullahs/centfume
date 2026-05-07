import { useState } from "react";
import { ArrowLeft, Save, Trash2, Globe, Eye, Image as ImageIcon, Plus } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    shortDesc: "",
    longDesc: "",
    type: "EDP",
    family: [],
    volumes: ["100ml"],
    status: "Active",
    isNew: false,
    isBestseller: false,
    isLimited: false
  });

  const handleSave = () => {
    toast.success(isEdit ? "Product refined successfully" : "New masterpiece added to collection");
    navigate("/admin/products");
  };

  return (
    <div className="space-y-12 max-w-5xl">
       <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/admin/products" className="p-3 bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-[0.4em] text-[9px] font-bold">Curation</span>
            <h1 className="text-3xl font-serif">{isEdit ? "Refine" : "Create"} <span className="italic text-slate-400">Masterpiece</span></h1>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="rounded-none uppercase tracking-widest text-[10px] font-bold text-slate-500 hover:text-white">Preview</Button>
          <Button onClick={handleSave} className="bg-white text-black hover:bg-slate-200 rounded-none px-8 py-6 uppercase tracking-widest text-[10px] font-bold gap-2">
            <Save className="w-4 h-4" />
            {isEdit ? "Update Archive" : "Publish to Maison"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* General Information */}
          <section className="p-10 bg-zinc-950 border border-white/5 space-y-10">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold border-b border-white/5 pb-4">Essential Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Product Name</label>
                <Input placeholder="e.g. Midnight Oasis" className="bg-white/5 border-white/5 rounded-none h-12 uppercase tracking-widest text-[10px]" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">SKU Code</label>
                <Input placeholder="CF-AUTO" className="bg-white/5 border-white/5 rounded-none h-12 font-mono text-[10px]" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Category</label>
                <select className="w-full bg-white/5 border border-white/5 rounded-none h-12 text-[10px] uppercase tracking-widest font-bold px-4 focus:ring-0">
                  <option>Floral</option>
                  <option>Woody</option>
                  <option>Fresh</option>
                  <option>Oriental</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Base Price (৳)</label>
                <Input type="number" placeholder="12,000" className="bg-white/5 border-white/5 rounded-none h-12 font-mono text-[11px]" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Stock Level</label>
                <Input type="number" placeholder="50" className="bg-white/5 border-white/5 rounded-none h-12 font-mono text-[11px]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Brief Essence (Short Description)</label>
              <textarea placeholder="The nocturnal soul of the desert..." className="w-full bg-white/5 border border-white/5 rounded-none p-4 h-24 uppercase tracking-widest text-[10px] focus:outline-none focus:border-white/20 transition-all font-sans" />
            </div>
          </section>

          {/* Specifications */}
          <section className="p-10 bg-zinc-950 border border-white/5 space-y-10">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold border-b border-white/5 pb-4">Olfactory Specs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Concentration</label>
                <select className="w-full bg-white/5 border border-white/5 rounded-none h-12 text-[10px] uppercase tracking-widest font-bold px-4 focus:ring-0">
                  <option>Eau de Parfum (EDP)</option>
                  <option>Eau de Toilette (EDT)</option>
                  <option>Parfum</option>
                  <option>Discovery Set</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Longevity</label>
                <select className="w-full bg-white/5 border border-white/5 rounded-none h-12 text-[10px] uppercase tracking-widest font-bold px-4 focus:ring-0">
                  <option>Eternal (12h+)</option>
                  <option>Long Lasting (8-12h)</option>
                  <option>Moderate (4-8h)</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Top Notes (Separated by commas)</label>
                <Input placeholder="Bergamot, Pink Pepper, Sage" className="bg-white/5 border-white/5 rounded-none h-12 uppercase tracking-widest text-[10px]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Base Notes (Separated by commas)</label>
                <Input placeholder="Oud, Ambergris, Musk" className="bg-white/5 border-white/5 rounded-none h-12 uppercase tracking-widest text-[10px]" />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-12">
          {/* Media Section */}
          <section className="p-8 bg-zinc-950 border border-white/5 space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">Visuals</h3>
            <div className="aspect-[4/5] bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all group">
              <div className="p-4 bg-white/5 rounded-none group-hover:bg-white group-hover:text-black transition-all">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-500">Upload Hero Image</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className="aspect-square bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10">
                   <Plus className="w-4 h-4 text-slate-500" />
                 </div>
               ))}
            </div>
          </section>

          {/* Visibility & Badges */}
          <section className="p-8 bg-zinc-950 border border-white/5 space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">Exclusivity</h3>
            <div className="space-y-4">
              {[
                { label: "Is New", key: "isNew" },
                { label: "Is Bestseller", key: "isBestseller" },
                { label: "Is Limited Edition", key: "isLimited" },
                { label: "Is Active", key: "isActive" }
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{item.label}</span>
                  <div className="w-10 h-5 bg-white/5 border border-white/10 p-1 flex items-center relative transition-all">
                    <div className="w-3 h-3 bg-slate-500" />
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* SEO Section */}
          <section className="p-8 bg-zinc-950 border border-white/5 space-y-8">
             <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">Discoverability</h3>
             <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Meta Description</label>
                 <textarea className="w-full bg-white/5 border border-white/5 rounded-none p-3 h-20 text-[9px] lowercase focus:outline-none" placeholder="A brief snippet for search engines..." />
               </div>
               <div className="space-y-2">
                 <label className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">URL Snippet</label>
                 <div className="flex items-center gap-2 text-[9px] text-slate-500">
                    centfume.com/shop/
                    <Input className="bg-white/5 border-none h-6 p-0 text-[10px] lowercase focus:ring-0" placeholder="midnight-oasis" />
                 </div>
               </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
