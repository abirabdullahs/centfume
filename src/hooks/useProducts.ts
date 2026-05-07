import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { Product } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;

        if (data) {
          // Map database fields to our Product interface if they differ
          const mappedProducts = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image_url || item.image, // Supporting both conventions
            description: item.description,
            tag: item.tag,
          }));
          setProducts(mappedProducts);
        }
      } catch (err: any) {
        console.error("Error fetching products:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
