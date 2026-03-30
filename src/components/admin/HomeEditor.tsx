import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

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
          <h2 className="text-navy font-black text-xl">Stats Bar</h2>
          <button onClick={saveStats} className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold">Save Stats</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.id} className="bg-white border border-border rounded-lg p-3 flex gap-3">
              <input value={s.value} onChange={(e) => setStats(stats.map((x) => x.id === s.id ? { ...x, value: e.target.value } : x))}
                className="border border-border rounded px-2 py-1 text-sm w-28" placeholder="Value" />
              <input value={s.label} onChange={(e) => setStats(stats.map((x) => x.id === s.id ? { ...x, label: e.target.value } : x))}
                className="border border-border rounded px-2 py-1 text-sm flex-1" placeholder="Label" />
            </div>
          ))}
        </div>
      </div>

      {/* Why Us */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-navy font-black text-xl">Why Choose Us</h2>
          <button onClick={saveWhyUs} className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold">Save</button>
        </div>
        <div className="space-y-3">
          {whyUs.map((w) => (
            <div key={w.id} className="bg-white border border-border rounded-lg p-3 space-y-2">
              <div className="flex gap-3">
                <input value={w.icon_name} onChange={(e) => setWhyUs(whyUs.map((x) => x.id === w.id ? { ...x, icon_name: e.target.value } : x))}
                  className="border border-border rounded px-2 py-1 text-sm w-32" placeholder="Icon (Shield, Award...)" />
                <input value={w.title} onChange={(e) => setWhyUs(whyUs.map((x) => x.id === w.id ? { ...x, title: e.target.value } : x))}
                  className="border border-border rounded px-2 py-1 text-sm flex-1" placeholder="Title" />
              </div>
              <input value={w.description} onChange={(e) => setWhyUs(whyUs.map((x) => x.id === w.id ? { ...x, description: e.target.value } : x))}
                className="border border-border rounded px-2 py-1 text-sm w-full" placeholder="Description" />
            </div>
          ))}
        </div>
      </div>

      {/* Clients */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-navy font-black text-xl">Clients</h2>
          <div className="flex gap-2">
            <button onClick={addClient} className="flex items-center gap-1.5 bg-orange text-white px-4 py-2 rounded-lg text-sm font-semibold"><Plus size={14} /> Add</button>
            <button onClick={saveClients} className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold">Save</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {clients.map((c) => (
            <div key={c.id} className="bg-white border border-border rounded-lg px-3 py-2 flex items-center gap-2">
              <input value={c.name} onChange={(e) => setClients(clients.map((x) => x.id === c.id ? { ...x, name: e.target.value } : x))}
                className="border-none outline-none text-sm w-28" />
              <button onClick={() => removeClient(c.id)} className="text-red-500 hover:text-red-700"><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
