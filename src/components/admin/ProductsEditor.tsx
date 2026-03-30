import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ProductsEditor() {
  const [products, setProducts] = useState<any[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([
      supabase.from("products").select("*").order("sort_order"),
      supabase.from("product_details").select("*"),
    ]).then(([p, d]) => {
      if (p.data) setProducts(p.data);
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

  return (
    <div className="space-y-8">
      <h2 className="text-navy font-black text-xl">Product Cards & Detail Pages</h2>
      {products.map((p) => {
        const detail = details.find((d) => d.product_slug === p.slug);
        return (
          <div key={p.id} className="bg-white border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-navy font-bold text-lg">{p.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => saveProduct(p)} className="bg-navy text-white px-3 py-1.5 rounded text-xs font-semibold">Save Card</button>
                {detail && <button onClick={() => saveDetail(detail)} className="bg-orange text-white px-3 py-1.5 rounded text-xs font-semibold">Save Detail Page</button>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Title</label>
                <input value={p.title} onChange={(e) => updateProduct(p.id, "title", e.target.value)}
                  className="w-full border border-border rounded px-3 py-1.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tag</label>
                <input value={p.tag} onChange={(e) => updateProduct(p.id, "tag", e.target.value)}
                  className="w-full border border-border rounded px-3 py-1.5 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">Description (Card)</label>
                <textarea value={p.description} onChange={(e) => updateProduct(p.id, "description", e.target.value)}
                  className="w-full border border-border rounded px-3 py-1.5 text-sm" rows={2} />
              </div>
            </div>

            {detail && (
              <div className="border-t border-border pt-4 space-y-3">
                <p className="text-orange font-bold text-xs uppercase tracking-widest">Detail Page Content</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Hero Title</label>
                    <input value={detail.hero_title} onChange={(e) => updateDetail(detail.id, "hero_title", e.target.value)}
                      className="w-full border border-border rounded px-3 py-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Hero Subtitle</label>
                    <input value={detail.hero_subtitle} onChange={(e) => updateDetail(detail.id, "hero_subtitle", e.target.value)}
                      className="w-full border border-border rounded px-3 py-1.5 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Hero Description</label>
                  <textarea value={detail.hero_description} onChange={(e) => updateDetail(detail.id, "hero_description", e.target.value)}
                    className="w-full border border-border rounded px-3 py-1.5 text-sm" rows={2} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Overview Paragraph 1</label>
                  <textarea value={detail.overview_text} onChange={(e) => updateDetail(detail.id, "overview_text", e.target.value)}
                    className="w-full border border-border rounded px-3 py-1.5 text-sm" rows={3} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Overview Paragraph 2</label>
                  <textarea value={detail.overview_text_2} onChange={(e) => updateDetail(detail.id, "overview_text_2", e.target.value)}
                    className="w-full border border-border rounded px-3 py-1.5 text-sm" rows={3} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">CTA Title</label>
                    <input value={detail.cta_title} onChange={(e) => updateDetail(detail.id, "cta_title", e.target.value)}
                      className="w-full border border-border rounded px-3 py-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">CTA Description</label>
                    <input value={detail.cta_description} onChange={(e) => updateDetail(detail.id, "cta_description", e.target.value)}
                      className="w-full border border-border rounded px-3 py-1.5 text-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
