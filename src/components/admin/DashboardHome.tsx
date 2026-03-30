import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Image, Package, GalleryHorizontal, Users, Clock } from "lucide-react";

interface StatCard {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}

export default function DashboardHome() {
  const [counts, setCounts] = useState({ slides: 0, products: 0, photos: 0, team: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("hero_slides").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("gallery_photos").select("id", { count: "exact", head: true }),
      supabase.from("team_members").select("id", { count: "exact", head: true }),
    ]).then(([s, p, g, t]) => {
      setCounts({
        slides: s.count || 0,
        products: p.count || 0,
        photos: g.count || 0,
        team: t.count || 0,
      });
      setLoading(false);
    });
  }, []);

  const cards: StatCard[] = [
    { label: "Hero Slides", value: counts.slides, icon: Image, color: "bg-blue-500/10 text-blue-600" },
    { label: "Products", value: counts.products, icon: Package, color: "bg-accent/10 text-accent" },
    { label: "Gallery Photos", value: counts.photos, icon: GalleryHorizontal, color: "bg-emerald-500/10 text-emerald-600" },
    { label: "Team Members", value: counts.team, icon: Users, color: "bg-purple-500/10 text-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-foreground">Welcome back 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your website content from here.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
              <card.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-foreground">{loading ? "..." : card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-muted-foreground" />
          <h3 className="font-bold text-sm text-foreground">Quick Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Use the sidebar to navigate between content sections</li>
          <li>• Drag and drop images to upload them directly</li>
          <li>• Changes are saved instantly and visible to all visitors</li>
          <li>• Use the rich text editor for formatted content</li>
        </ul>
      </div>
    </div>
  );
}
