import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "CNG Cascades", "CBG Cascades", "Hydrogen", "Fill Post", "Facility"] as const;
type Category = (typeof categories)[number];

const photos = [
  {
    url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    caption: "CNG Cascade – 13,200 Ltr installation at HPCL station",
    category: "CNG Cascades",
  },
  {
    url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    caption: "CNG mother station infrastructure, Gujarat",
    category: "CNG Cascades",
  },
  {
    url: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    caption: "High-pressure tubing network at dispensing station",
    category: "Fill Post",
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    caption: "Manufacturing floor – cylinder assembly line",
    category: "Facility",
  },
  {
    url: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&q=80",
    caption: "High-pressure gas storage vessels, ready for dispatch",
    category: "CNG Cascades",
  },
  {
    url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
    caption: "CBG cascade installed at bio-gas plant, Rajasthan",
    category: "CBG Cascades",
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    caption: "Quality inspection – pressure testing bay",
    category: "Facility",
  },
  {
    url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    caption: "Hydrogen cascade prototype – R&D unit",
    category: "Hydrogen",
  },
  {
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    caption: "Fill post assembly – CNG station, Mumbai",
    category: "Fill Post",
  },
  {
    url: "https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?w=800&q=80",
    caption: "Cascade delivery – client site, Nigeria",
    category: "CNG Cascades",
  },
  {
    url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    caption: "CBG storage unit for waste-to-energy project",
    category: "CBG Cascades",
  },
  {
    url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80",
    caption: "Control room and monitoring systems – Unit 2",
    category: "Facility",
  },
];

const categoryColor: Record<string, string> = {
  "CNG Cascades": "bg-blue-600",
  "CBG Cascades": "bg-green-600",
  "Hydrogen": "bg-purple-600",
  "Fill Post": "bg-orange",
  "Facility": "bg-slate-600",
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<(typeof photos)[0] | null>(null);

  const filtered = activeTab === "All" ? photos : photos.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=60')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-orange font-bold text-xs uppercase tracking-widest mb-3">Portfolio</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl mb-4">Our Work</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            A look at installations, manufacturing, and deployed cascade solutions across India and beyond.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-30 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === cat
                    ? "bg-orange text-white shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo) => (
              <div
                key={photo.url}
                className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer border border-border shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setLightbox(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full object-cover"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className={`inline-block text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded mb-2 ${categoryColor[photo.category] ?? "bg-orange"}`}>
                      {photo.category}
                    </span>
                    <p className="text-white text-sm font-medium leading-snug">{photo.caption}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur rounded-full p-2">
                      <ZoomIn size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No photos in this category yet.</div>
          )}
        </div>
      </section>

      {/* Upload CTA */}
      <section className="py-12 bg-muted/40 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Want to add your actual work photos?{" "}
            <span className="font-semibold text-foreground">Simply upload images directly in the chat</span>{" "}
            and they'll be added to this gallery instantly.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2"
            onClick={() => setLightbox(null)}
          >
            <X size={22} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url.replace("w=800", "w=1200")}
              alt={lightbox.caption}
              className="w-full rounded-xl shadow-2xl"
            />
            <div className="mt-4 flex items-center gap-3">
              <span className={`inline-block text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${categoryColor[lightbox.category] ?? "bg-orange"}`}>
                {lightbox.category}
              </span>
              <p className="text-white/80 text-sm">{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
