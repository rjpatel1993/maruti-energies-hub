import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Save } from "lucide-react";
import SortableList from "./SortableList";

export default function AboutEditor() {
  const [team, setTeam] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([
      supabase.from("team_members").select("*").order("sort_order"),
      supabase.from("milestones").select("*").order("sort_order"),
    ]).then(([t, m]) => {
      if (t.data) setTeam(t.data);
      if (m.data) setMilestones(m.data);
      setLoading(false);
    });
  }, []);

  const saveTeam = async () => {
    for (const t of team) {
      await supabase.from("team_members").update({ name: t.name, role: t.role, description: t.description, sort_order: t.sort_order }).eq("id", t.id);
    }
    toast({ title: "Team saved!" });
  };

  const saveMilestones = async () => {
    for (const m of milestones) {
      await supabase.from("milestones").update({ year: m.year, text: m.text, sort_order: m.sort_order }).eq("id", m.id);
    }
    toast({ title: "Milestones saved!" });
  };

  const addTeamMember = async () => {
    const { data } = await supabase.from("team_members").insert({ name: "New Member", role: "Role", description: "Description", sort_order: team.length }).select().single();
    if (data) setTeam([...team, data]);
  };

  const removeTeamMember = async (id: string) => {
    await supabase.from("team_members").delete().eq("id", id);
    setTeam(team.filter((t) => t.id !== id));
  };

  const addMilestone = async () => {
    const { data } = await supabase.from("milestones").insert({ year: "2025", text: "New milestone", sort_order: milestones.length }).select().single();
    if (data) setMilestones([...milestones, data]);
  };

  const removeMilestone = async (id: string) => {
    await supabase.from("milestones").delete().eq("id", id);
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-10">
      {/* Team */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">Team Members</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Manage your team. Drag to reorder.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={addTeamMember} className="flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"><Plus size={14} /> Add</button>
            <button onClick={saveTeam} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"><Save size={14} /> Save</button>
          </div>
        </div>
        <SortableList
          items={team}
          onReorder={setTeam}
          renderItem={(t) => (
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground">Name</label>
                  <input value={t.name} onChange={(e) => setTeam(team.map((x) => x.id === t.id ? { ...x, name: e.target.value } : x))}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground">Role</label>
                  <input value={t.role} onChange={(e) => setTeam(team.map((x) => x.id === t.id ? { ...x, role: e.target.value } : x))}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                </div>
                <button onClick={() => removeTeamMember(t.id)} className="text-destructive hover:text-destructive/80 p-2 rounded-lg hover:bg-destructive/10 transition-colors mt-5">
                  <Trash2 size={14} />
                </button>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <input value={t.description} onChange={(e) => setTeam(team.map((x) => x.id === t.id ? { ...x, description: e.target.value } : x))}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
            </div>
          )}
        />
      </div>

      {/* Milestones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">Timeline / Milestones</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Company timeline entries. Drag to reorder.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={addMilestone} className="flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"><Plus size={14} /> Add</button>
            <button onClick={saveMilestones} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"><Save size={14} /> Save</button>
          </div>
        </div>
        <SortableList
          items={milestones}
          onReorder={setMilestones}
          renderItem={(m) => (
            <div className="bg-card border border-border rounded-xl p-4 flex gap-3 items-start">
              <div className="w-24 shrink-0">
                <label className="text-xs font-semibold text-muted-foreground">Year</label>
                <input value={m.year} onChange={(e) => setMilestones(milestones.map((x) => x.id === m.id ? { ...x, year: e.target.value } : x))}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <input value={m.text} onChange={(e) => setMilestones(milestones.map((x) => x.id === m.id ? { ...x, text: e.target.value } : x))}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
              </div>
              <button onClick={() => removeMilestone(m.id)} className="text-destructive hover:text-destructive/80 p-2 rounded-lg hover:bg-destructive/10 transition-colors mt-5">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
