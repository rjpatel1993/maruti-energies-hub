import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Globe, Zap, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PAGE_TITLE = "Maruti Engineering & Services — CNG, CBG & Hydrogen Cascade Manufacturer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const iconMap: Record<string, any> = { Shield, Award, CheckCircle, Globe, Zap };

export default function Home() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: heroSlides = [] } = useQuery({
    queryKey: ["hero_slides"],
    queryFn: async () => {
      const { data } = await supabase.from("hero_slides").select("*").order("sort_order");
      return data || [];
    },
  });

  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await supabase.from("stats").select("*").order("sort_order");
      return data || [];
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products_home"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").order("sort_order");
      return data || [];
    },
  });

  const { data: whyUs = [] } = useQuery({
    queryKey: ["why_us"],
    queryFn: async () => {
      const { data } = await supabase.from("why_us").select("*").order("sort_order");
      return data || [];
    },
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data } = await supabase.from("clients").select("*").order("sort_order");
      return data || [];
    },
  });

  const { data: galleryPhotos = [] } = useQuery({
    queryKey: ["gallery_preview"],
    queryFn: async () => {
      const { data } = await supabase.from("gallery_photos").select("*").order("sort_order").limit(6);
      return data || [];
    },
  });

  useEffect(() => {
    if (heroSlides.length === 0) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero with background slider */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
            <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/90" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-orange w-6" : "bg-white/40"}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/40 rounded-full px-4 py-1.5 text-orange text-xs font-bold uppercase tracking-widest mb-6">
            ISO 9001:2015 · PESO Approved · Est. 2019
          </div>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Trusted in <span className="text-orange">High Pressure</span><br />Cascade & Station<br />Tubing Solutions
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Manufacturer of Type 1 CNG, CBG & Hydrogen Cascades. Supplying to HPCL, IOCL, GAIL & 600+ clients across India and internationally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold px-8 py-3.5 rounded transition-colors text-base">
              Explore Products <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-orange text-white hover:text-orange font-bold px-8 py-3.5 rounded transition-colors text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-orange py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.id}>
                <div className="text-white font-black text-2xl sm:text-3xl">{s.value}</div>
                <div className="text-white/80 text-xs font-semibold uppercase tracking-wide mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Snapshot */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Our Products</p>
            <h2 className="text-navy text-3xl sm:text-4xl font-black">High-Pressure Storage Solutions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link key={p.id} to={`/products/${p.slug}`}
                className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`h-1.5 w-full ${p.tag_color}`} />
                <div className="p-6">
                  <span className={`inline-block text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded mb-3 ${p.tag_color}`}>{p.tag}</span>
                  <h3 className="text-navy font-bold text-lg mb-2 group-hover:text-orange transition-colors">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-orange text-sm font-semibold">Learn more <ArrowRight size={14} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Why Maruti</p>
            <h2 className="text-white text-3xl sm:text-4xl font-black">Built on Trust & Engineering Excellence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w) => {
              const Icon = iconMap[w.icon_name] || Shield;
              return (
                <div key={w.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <div className="text-orange mb-4"><Icon size={28} /></div>
                  <h3 className="text-white font-bold text-lg mb-2">{w.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{w.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients Strip */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Trusted By</p>
            <h2 className="text-navy text-2xl sm:text-3xl font-black">Our Esteemed Clients</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {clients.map((c) => (
              <div key={c.id} className="bg-white border border-border rounded-lg px-6 py-3 text-navy font-bold text-sm shadow-sm hover:border-orange hover:text-orange transition-colors">
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Portfolio</p>
            <h2 className="text-navy text-3xl sm:text-4xl font-black">Recent Work</h2>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">Installations, manufacturing snapshots, and deployed cascade solutions across India and beyond.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="group relative rounded-xl overflow-hidden aspect-square border border-border shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/55 transition-all duration-300 flex items-end">
                  <p className="w-full px-3 py-2 text-white text-xs font-medium translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-3.5 rounded hover:bg-navy/80 transition-colors text-sm">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4">Ready to Power Your CNG Station?</h2>
          <p className="text-white/80 text-lg mb-8">Get in touch for custom cascade solutions, technical specs, and pricing.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-orange font-black px-10 py-4 rounded hover:bg-white/90 transition-colors text-base">
            Request a Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
