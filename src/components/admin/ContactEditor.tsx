import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "gst", label: "GST Number" },
    { key: "unit1_address", label: "Unit 1 Address" },
    { key: "unit2_address", label: "Unit 2 Address" },
    { key: "business_hours", label: "Business Hours" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-navy font-black text-xl">Contact & Company Info</h2>
        <button onClick={save} className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold">Save</button>
      </div>
      <div className="bg-white border border-border rounded-xl p-6 space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-muted-foreground">{f.label}</label>
            <input
              value={info[f.key]?.value || ""}
              onChange={(e) => update(f.key, e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
