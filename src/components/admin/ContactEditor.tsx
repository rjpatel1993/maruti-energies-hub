import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function ContactEditor() {
  const [info, setInfo] = useState<Record<string, { id: string; value: string }>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("company_info").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, { id: string; value: string }> = {};
        data.forEach((d) => { map[d.key] = { id: d.id, value: d.value }; });
        setInfo(map);
      }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    for (const [key, val] of Object.entries(info)) {
      await supabase.from("company_info").update({ value: val.value }).eq("id", val.id);
    }
    toast({ title: "Contact info saved!" });
  };

  const update = (key: string, value: string) => {
    setInfo({ ...info, [key]: { ...info[key], value } });
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  const fields = [
    { key: "phone", label: "Phone Number", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "gst", label: "GST Number", type: "text" },
    { key: "unit1_address", label: "Unit 1 Address", type: "textarea" },
    { key: "unit2_address", label: "Unit 2 Address", type: "textarea" },
    { key: "business_hours", label: "Business Hours", type: "text" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-foreground">Contact & Company Info</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Update contact details, addresses, and business info.</p>
        </div>
        <button onClick={save} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Save size={14} /> Save
        </button>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                value={info[f.key]?.value || ""}
                onChange={(e) => update(f.key, e.target.value)}
                rows={2}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none"
              />
            ) : (
              <input
                value={info[f.key]?.value || ""}
                onChange={(e) => update(f.key, e.target.value)}
                type={f.type}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
