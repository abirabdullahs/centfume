import React, { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { motion } from "motion/react";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Shop() {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const categories = ["All", "Signature", "Fresh", "Floral", "Woody", "Oriental"];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(p => p.tag === selectedCategory);
    }

    // Sorting
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Newest") {
      // In a real app we'd use a date field, for now we assume order from hook is newest
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <header className="mb-16 space-y-8">
        <div className="space-y-4">
          <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Catalogue</span>
          <h1 className="text-6xl font-serif font-light tracking-wide italic">Exquisite Scents</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-y border-white/5 py-8">
          {/* Search & Basic Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
              <Input 
                placeholder="Search fragrances..." 
                className="bg-white/5 border-white/10 pl-12 rounded-none h-12 focus:border-white/30 transition-all font-light tracking-wide"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/10 rounded-none h-12 px-6 uppercase text-[10px] tracking-widest font-bold">
                  Category: {selectedCategory} <ChevronDown className="ml-2 w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-950 border-white/10 text-white rounded-none min-w-[160px]">
                {categories.map(cat => (
                  <DropdownMenuItem 
                    key={cat} 
                    className="uppercase text-[10px] tracking-widest font-medium focus:bg-white focus:text-black cursor-pointer py-3"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
             <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Sort By:</span>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-none h-12 px-2 uppercase text-[10px] tracking-widest font-bold hover:bg-transparent hover:text-white">
                  {sortBy} <ChevronDown className="ml-2 w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-950 border-white/10 text-white rounded-none min-w-[200px]">
                {["Newest", "Price: Low to High", "Price: High to Low", "Popular"].map(option => (
                  <DropdownMenuItem 
                    key={option} 
                    className="uppercase text-[10px] tracking-widest font-medium focus:bg-white focus:text-black cursor-pointer py-3"
                    onClick={() => setSortBy(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-[4/6] bg-white/5 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-32 text-center space-y-6">
          <p className="text-slate-500 uppercase tracking-widest text-sm font-light">No fragrances found matching your selection.</p>
          <Button 
            variant="outline" 
            className="border-white/10 rounded-none uppercase text-[10px] tracking-widest"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
