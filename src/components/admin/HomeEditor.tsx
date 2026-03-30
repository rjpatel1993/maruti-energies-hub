import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Save } from "lucide-react";
import SortableList from "./SortableList";

export default function HomeEditor() {
  const [stats, setStats] = useState<any[]>([]);
  const [whyUs, setWhyUs] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([
      supabase.from("stats").select("*").order("sort_order"),
      supabase.from("why_us").select("*").order("sort_order"),
      supabase.from("clients").select("*").order("sort_order"),
    ]).then(([s, w, c]) => {
      if (s.data) setStats(s.data);
      if (w.data) setWhyUs(w.data);
      if (c.data) setClients(c.data);
      setLoading(false);
    });
  }, []);

  const saveStats = async () => {
    for (const s of stats) {
      await supabase.from("stats").update({ value: s.value, label: s.label, sort_order: s.sort_order }).eq("id", s.id);
    }
    toast({ title: "Stats saved!" });
  };

  const saveWhyUs = async () => {
    for (const w of whyUs) {
      await supabase.from("why_us").update({ icon_name: w.icon_name, title: w.title, description: w.description, sort_order: w.sort_order }).eq("id", w.id);
    }
    toast({ title: "Why Us saved!" });
  };

  const saveClients = async () => {
    for (const c of clients) {
      await supabase.from("clients").update({ name: c.name, sort_order: c.sort_order }).eq("id", c.id);
    }
    toast({ title: "Clients saved!" });
  };

  const addClient = async () => {
    const { data } = await supabase.from("clients").insert({ name: "New Client", sort_order: clients.length }).select().single();
    if (data) setClients([...clients, data]);
  };

  const removeClient = async (id: string) => {
    await supabase.from("clients").delete().eq("id", id);
    setClients(clients.filter((c) => c.id !== id));
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-10">
      {/* Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">Stats Bar</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Key numbers displayed on the homepage.</p>
          </div>
          <button onClick={saveStats} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Save size={14} /> Save
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Value</label>
                <input value={s.value} onChange={(e) => setStats(stats.map((x) => x.id === s.id ? { ...x, value: e.target.value } : x))}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Label</label>
                <input value={s.label} onChange={(e) => setStats(stats.map((x) => x.id === s.id ? { ...x, label: e.target.value } : x))}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Us */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">Why Choose Us</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Feature cards on the homepage. Drag to reorder.</p>
          </div>
          <button onClick={saveWhyUs} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Save size={14} /> Save
          </button>
        </div>
        <SortableList
          items={whyUs}
          onReorder={setWhyUs}
          renderItem={(w) => (
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-32 shrink-0">
                  <label className="text-xs font-semibold text-muted-foreground">Icon</label>
                  <input value={w.icon_name} onChange={(e) => setWhyUs(whyUs.map((x) => x.id === w.id ? { ...x, icon_name: e.target.value } : x))}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" placeholder="Shield, Award..." />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground">Title</label>
                  <input value={w.title} onChange={(e) => setWhyUs(whyUs.map((x) => x.id === w.id ? { ...x, title: e.target.value } : x))}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <input value={w.description} onChange={(e) => setWhyUs(whyUs.map((x) => x.id === w.id ? { ...x, description: e.target.value } : x))}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
            </div>
          )}
        />
      </div>

      {/* Clients */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">Clients</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Client names displayed on the homepage.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={addClient} className="flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"><Plus size={14} /> Add</button>
            <button onClick={saveClients} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"><Save size={14} /> Save</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {clients.map((c) => (
            <div key={c.id} className="bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-2">
              <input value={c.name} onChange={(e) => setClients(clients.map((x) => x.id === c.id ? { ...x, name: e.target.value } : x))}
                className="border-none outline-none text-sm bg-transparent w-32" />
              <button onClick={() => removeClient(c.id)} className="text-destructive hover:text-destructive/80"><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
