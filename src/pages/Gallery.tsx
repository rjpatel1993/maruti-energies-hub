import { useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "CNG Cascades", "CBG Cascades", "Hydrogen", "Fill Post", "Facility"] as const;
type Category = (typeof categories)[number];

const categoryColor: Record<string, string> = {
  "CNG Cascades": "bg-blue-600",
  "CBG Cascades": "bg-green-600",
  "Hydrogen": "bg-purple-600",
  "Fill Post": "bg-orange",
  "Facility": "bg-slate-600",
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<any>(null);

  const { data: photos = [] } = useQuery({
    queryKey: ["gallery_photos"],
    queryFn: async () => {
      const { data } = await supabase.from("gallery_photos").select("*").order("sort_order");
      return data || [];
    },
  });

  const filtered = activeTab === "All" ? photos : photos.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-orange font-bold text-xs uppercase tracking-widest mb-3">Portfolio</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl mb-4">Our Work</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">A look at installations, manufacturing, and deployed cascade solutions across India and beyond.</p>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveTab(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTab === cat ? "bg-orange text-white shadow" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo) => (
              <div key={photo.id} className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer border border-border shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setLightbox(photo)}>
                <img src={photo.url} alt={photo.caption} className="w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className={`inline-block text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded mb-2 ${categoryColor[photo.category] ?? "bg-orange"}`}>{photo.category}</span>
                    <p className="text-white text-sm font-medium leading-snug">{photo.caption}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur rounded-full p-2"><ZoomIn size={16} className="text-white" /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center py-20 text-muted-foreground">No photos in this category yet.</div>}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2" onClick={() => setLightbox(null)}><X size={22} /></button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.url.replace("w=800", "w=1200")} alt={lightbox.caption} className="w-full rounded-xl shadow-2xl" />
            <div className="mt-4 flex items-center gap-3">
              <span className={`inline-block text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${categoryColor[lightbox.category] ?? "bg-orange"}`}>{lightbox.category}</span>
              <p className="text-white/80 text-sm">{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
