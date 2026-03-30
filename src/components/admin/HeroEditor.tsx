import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

type Slide = { id: string; url: string; alt: string; sort_order: number };

export default function HeroEditor() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("hero_slides").select("*").order("sort_order");
    if (data) setSlides(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (updated: Slide[]) => {
    for (const s of updated) {
      await supabase.from("hero_slides").update({ url: s.url, alt: s.alt, sort_order: s.sort_order }).eq("id", s.id);
    }
    toast({ title: "Saved!" });
  };

  const addSlide = async () => {
    const { data } = await supabase.from("hero_slides").insert({ url: "https://via.placeholder.com/1600x900", alt: "New slide", sort_order: slides.length }).select().single();
    if (data) setSlides([...slides, data]);
  };

  const removeSlide = async (id: string) => {
    await supabase.from("hero_slides").delete().eq("id", id);
    setSlides(slides.filter((s) => s.id !== id));
    toast({ title: "Slide removed" });
  };

  const update = (id: string, field: keyof Slide, value: string) => {
    setSlides(slides.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-navy font-black text-xl">Hero Slider Images</h2>
        <div className="flex gap-2">
          <button onClick={addSlide} className="flex items-center gap-1.5 bg-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-dark transition-colors">
            <Plus size={14} /> Add Slide
          </button>
          <button onClick={() => save(slides)} className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy/80 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
      {slides.map((s, i) => (
        <div key={s.id} className="bg-white border border-border rounded-xl p-4 flex gap-4 items-start">
          <img src={s.url} alt={s.alt} className="w-32 h-20 object-cover rounded-lg border" />
          <div className="flex-1 space-y-2">
            <input value={s.url} onChange={(e) => update(s.id, "url", e.target.value)} placeholder="Image URL"
              className="w-full border border-border rounded px-3 py-1.5 text-sm" />
            <input value={s.alt} onChange={(e) => update(s.id, "alt", e.target.value)} placeholder="Alt text"
              className="w-full border border-border rounded px-3 py-1.5 text-sm" />
          </div>
          <button onClick={() => removeSlide(s.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
        </div>
      ))}
    </div>
  );
}
