import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

export default function ProductsEditor() {
  const [products, setProducts] = useState<any[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([
      supabase.from("products").select("*").order("sort_order"),
      supabase.from("product_details").select("*"),
    ]).then(([p, d]) => {
      if (p.data) { setProducts(p.data); if (p.data.length) setActiveProduct(p.data[0].id); }
      if (d.data) setDetails(d.data);
      setLoading(false);
    });
  }, []);

  const saveProduct = async (p: any) => {
    await supabase.from("products").update({
      title: p.title, description: p.description, tag: p.tag, subtitle: p.subtitle,
      tag_color: p.tag_color, accent_color: p.accent_color, specs: p.specs,
    }).eq("id", p.id);
    toast({ title: `${p.title} saved!` });
  };

  const saveDetail = async (d: any) => {
    await supabase.from("product_details").update({
      hero_tag: d.hero_tag, hero_tag_color: d.hero_tag_color, hero_title: d.hero_title,
      hero_subtitle: d.hero_subtitle, hero_description: d.hero_description,
      overview_text: d.overview_text, overview_text_2: d.overview_text_2,
      cta_title: d.cta_title, cta_description: d.cta_description,
      specs: d.specs, applications: d.applications,
    }).eq("id", d.id);
    toast({ title: `Detail page saved!` });
  };

  const updateProduct = (id: string, field: string, value: any) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const updateDetail = (id: string, field: string, value: any) => {
    setDetails(details.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  const current = products.find((p) => p.id === activeProduct);
  const currentDetail = current ? details.find((d) => d.product_slug === current.slug) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-foreground">Products</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Edit product cards and their detail pages.</p>
      </div>

      {/* Product selector tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveProduct(p.id)}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeProduct === p.id ? "bg-accent text-accent-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {current && (
        <div className="space-y-6">
          {/* Card info */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground">Card Info</h3>
              <button onClick={() => saveProduct(current)} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                <Save size={12} /> Save Card
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Title</label>
                <input value={current.title} onChange={(e) => updateProduct(current.id, "title", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tag</label>
                <input value={current.tag} onChange={(e) => updateProduct(current.id, "tag", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <RichTextEditor value={current.description} onChange={(html) => updateProduct(current.id, "description", html)} />
              </div>
            </div>
          </div>

          {/* Detail page */}
          {currentDetail && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground">Detail Page Content</h3>
                <button onClick={() => saveDetail(currentDetail)} className="flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Save size={12} /> Save Detail
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Hero Title</label>
                  <input value={currentDetail.hero_title} onChange={(e) => updateDetail(currentDetail.id, "hero_title", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Hero Subtitle</label>
                  <input value={currentDetail.hero_subtitle} onChange={(e) => updateDetail(currentDetail.id, "hero_subtitle", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Hero Description</label>
                <RichTextEditor value={currentDetail.hero_description} onChange={(html) => updateDetail(currentDetail.id, "hero_description", html)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Overview Paragraph 1</label>
                <RichTextEditor value={currentDetail.overview_text} onChange={(html) => updateDetail(currentDetail.id, "overview_text", html)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Overview Paragraph 2</label>
                <RichTextEditor value={currentDetail.overview_text_2} onChange={(html) => updateDetail(currentDetail.id, "overview_text_2", html)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">CTA Title</label>
                  <input value={currentDetail.cta_title} onChange={(e) => updateDetail(currentDetail.id, "cta_title", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">CTA Description</label>
                  <input value={currentDetail.cta_description} onChange={(e) => updateDetail(currentDetail.id, "cta_description", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
