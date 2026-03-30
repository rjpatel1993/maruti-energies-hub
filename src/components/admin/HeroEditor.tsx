import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Save } from "lucide-react";
import ImageUploader from "./ImageUploader";
import SortableList from "./SortableList";

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

  const save = async () => {
    for (const s of slides) {
      await supabase.from("hero_slides").update({ url: s.url, alt: s.alt, sort_order: s.sort_order }).eq("id", s.id);
    }
    toast({ title: "Hero slides saved!" });
  };

  const addSlide = async () => {
    const { data } = await supabase.from("hero_slides").insert({ url: "", alt: "New slide", sort_order: slides.length }).select().single();
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
        <div>
          <h2 className="text-xl font-black text-foreground">Hero Slider</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Manage background carousel images. Drag to reorder.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addSlide} className="flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus size={14} /> Add Slide
          </button>
          <button onClick={save} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Save size={14} /> Save
          </button>
        </div>
      </div>

      <SortableList
        items={slides}
        onReorder={setSlides}
        renderItem={(s) => (
          <div className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start">
            <div className="w-48 shrink-0">
              <ImageUploader value={s.url} onChange={(url) => update(s.id, "url", url)} folder="hero" aspectRatio="16/9" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Alt Text</label>
                <input value={s.alt} onChange={(e) => update(s.id, "alt", e.target.value)} placeholder="Describe this image"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
            </div>
            <button onClick={() => removeSlide(s.id)} className="text-destructive hover:text-destructive/80 p-2 rounded-lg hover:bg-destructive/10 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      />
    </div>
  );
}
