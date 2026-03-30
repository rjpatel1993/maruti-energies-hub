import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: detail, isLoading } = useQuery({
    queryKey: ["product_detail", slug],
    queryFn: async () => {
      const { data } = await supabase.from("product_details").select("*").eq("product_slug", slug!).single();
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 flex items-center justify-center min-h-[60vh] text-muted-foreground">Loading...</div>
      <Footer />
    </div>
  );

  if (!detail) return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 flex items-center justify-center min-h-[60vh] text-muted-foreground">Product not found</div>
      <Footer />
    </div>
  );

  const specs = (detail.specs as any[]) || [];
  const applications = (detail.applications as string[]) || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="relative bg-navy py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(28,90%,52%) 0, hsl(28,90%,52%) 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/products" className="inline-flex items-center gap-1.5 text-white/50 hover:text-orange text-sm font-semibold mb-8 transition-colors">
              <ArrowLeft size={14} /> All Products
            </Link>
            <span className={`inline-block text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded mb-4 ${detail.hero_tag_color}`}>{detail.hero_tag}</span>
            <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl mb-4">{detail.hero_title}</h1>
            <p className="text-orange font-semibold text-lg mb-6">{detail.hero_subtitle}</p>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{detail.hero_description}</p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-navy font-black text-2xl mb-4">{detail.overview_title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{detail.overview_text}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{detail.overview_text_2}</p>
              <h3 className="text-navy font-bold text-sm uppercase tracking-widest mb-4">Applications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${detail.accent_dot_color}`} />
                    {a}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold px-8 py-3.5 rounded transition-colors">
                Request Inquiry <ArrowRight size={16} />
              </Link>
            </div>
            <div>
              <div className="bg-navy rounded-2xl p-8">
                <div className={`h-1 w-12 rounded mb-6 ${detail.accent_bar_color}`} />
                <h3 className="text-orange font-bold text-xs uppercase tracking-widest mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  {specs.map((s: any) => (
                    <div key={s.label} className="flex justify-between items-start border-b border-white/10 pb-4">
                      <span className="text-white/55 text-sm">{s.label}</span>
                      <span className="text-white font-semibold text-sm text-right ml-4">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`py-14 text-center ${detail.cta_bg}`}>
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-white font-black text-2xl mb-3">{detail.cta_title}</h2>
            <p className="text-white/60 mb-6">{detail.cta_description}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-orange text-white font-bold px-8 py-3 rounded hover:bg-orange-dark transition-colors">
              Send Inquiry <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
