import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

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
      url: "https://via.placeholder.com/800x600", caption: "New photo", category: "Facility", sort_order: photos.length,
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
        <h2 className="text-navy font-black text-xl">Gallery Photos</h2>
        <div className="flex gap-2">
          <button onClick={addPhoto} className="flex items-center gap-1.5 bg-orange text-white px-4 py-2 rounded-lg text-sm font-semibold"><Plus size={14} /> Add Photo</button>
          <button onClick={save} className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold">Save All</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {photos.map((p) => (
          <div key={p.id} className="bg-white border border-border rounded-xl p-3 space-y-2">
            <img src={p.url} alt={p.caption} className="w-full h-32 object-cover rounded-lg" />
            <input value={p.url} onChange={(e) => update(p.id, "url", e.target.value)} placeholder="Image URL"
              className="w-full border border-border rounded px-3 py-1.5 text-sm" />
            <input value={p.caption} onChange={(e) => update(p.id, "caption", e.target.value)} placeholder="Caption"
              className="w-full border border-border rounded px-3 py-1.5 text-sm" />
            <div className="flex gap-2 items-center">
              <select value={p.category} onChange={(e) => update(p.id, "category", e.target.value)}
                className="border border-border rounded px-3 py-1.5 text-sm flex-1">
                <option>CNG Cascades</option>
                <option>CBG Cascades</option>
                <option>Hydrogen</option>
                <option>Fill Post</option>
                <option>Facility</option>
              </select>
              <button onClick={() => removePhoto(p.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
