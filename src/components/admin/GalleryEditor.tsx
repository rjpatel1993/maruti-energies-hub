import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Save } from "lucide-react";
import ImageUploader from "./ImageUploader";
import SortableList from "./SortableList";

export default function GalleryEditor() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("gallery_photos").select("*").order("sort_order").then(({ data }) => {
      if (data) setPhotos(data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    for (const p of photos) {
      await supabase.from("gallery_photos").update({ url: p.url, caption: p.caption, category: p.category, sort_order: p.sort_order }).eq("id", p.id);
    }
    toast({ title: "Gallery saved!" });
  };

  const addPhoto = async () => {
    const { data } = await supabase.from("gallery_photos").insert({
      url: "", caption: "New photo", category: "Facility", sort_order: photos.length,
    }).select().single();
    if (data) setPhotos([...photos, data]);
  };

  const removePhoto = async (id: string) => {
    await supabase.from("gallery_photos").delete().eq("id", id);
    setPhotos(photos.filter((p) => p.id !== id));
    toast({ title: "Photo removed" });
  };

  const update = (id: string, field: string, value: string) => {
    setPhotos(photos.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-foreground">Gallery</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Upload and organize your portfolio photos. Drag to reorder.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addPhoto} className="flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus size={14} /> Add Photo
          </button>
          <button onClick={save} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Save size={14} /> Save All
          </button>
        </div>
      </div>

      <SortableList
        items={photos}
        onReorder={setPhotos}
        renderItem={(p) => (
          <div className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start">
            <div className="w-40 shrink-0">
              <ImageUploader value={p.url} onChange={(url) => update(p.id, "url", url)} folder="gallery" aspectRatio="4/3" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Caption</label>
                <input value={p.caption} onChange={(e) => update(p.id, "caption", e.target.value)} placeholder="Photo caption"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Category</label>
                <select value={p.category} onChange={(e) => update(p.id, "category", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all">
                  <option>CNG Cascades</option>
                  <option>CBG Cascades</option>
                  <option>Hydrogen</option>
                  <option>Fill Post</option>
                  <option>Facility</option>
                </select>
              </div>
            </div>
            <button onClick={() => removePhoto(p.id)} className="text-destructive hover:text-destructive/80 p-2 rounded-lg hover:bg-destructive/10 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        )}
      />
    </div>
  );
}
