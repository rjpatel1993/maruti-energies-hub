import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Products() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").order("sort_order");
      return data || [];
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="bg-navy py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Our Products</p>
            <h1 className="text-white font-black text-4xl sm:text-5xl mb-6">High-Pressure Storage Solutions</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Type 1 Cascades for CNG, CBG, and Hydrogen — designed for safety, certified to global standards, and built for Indian conditions.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {products.map((p) => {
                const specs = (p.specs as any[] || []);
                return (
                  <div key={p.id} className={`bg-white border border-border border-t-4 ${p.accent_color} rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className={`inline-block text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded mb-3 ${p.tag_color}`}>{p.tag}</span>
                          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">{p.subtitle}</p>
                          <h2 className="text-navy font-black text-2xl mt-1">{p.title}</h2>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{p.description}</p>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {specs.map((s: any) => (
                          <div key={s.label} className="bg-muted/40 rounded-lg p-3 text-center">
                            <div className="text-navy font-black text-sm">{s.value}</div>
                            <div className="text-muted-foreground text-[10px] uppercase tracking-wide mt-0.5">{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <Link to={`/products/${p.slug}`}
                        className="inline-flex items-center gap-2 bg-navy hover:bg-navy/80 text-white font-bold px-6 py-2.5 rounded transition-colors text-sm">
                        View Full Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-orange text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-white font-black text-3xl mb-4">Need Custom Specifications?</h2>
            <p className="text-white/80 text-lg mb-8">We manufacture to order. Share your requirements and our team will respond within 24 hours.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-orange font-black px-10 py-4 rounded hover:bg-white/90 transition-colors">
              Send Inquiry <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
