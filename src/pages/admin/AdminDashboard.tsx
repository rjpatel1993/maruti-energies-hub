import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";
import HeroEditor from "@/components/admin/HeroEditor";
import ProductsEditor from "@/components/admin/ProductsEditor";
import GalleryEditor from "@/components/admin/GalleryEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import HomeEditor from "@/components/admin/HomeEditor";
import ContactEditor from "@/components/admin/ContactEditor";

const tabs = ["Hero Slider", "Home Page", "Products", "Gallery", "About", "Contact"] as const;
type Tab = (typeof tabs)[number];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Hero Slider");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate("/admin");
      else setUser(session.user);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin");
      else setUser(session.user);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-navy text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-white font-black text-sm">M</div>
          <span className="font-bold text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-xs hidden sm:block">{user?.email}</span>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-white/70 hover:text-orange text-sm transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto py-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab ? "bg-orange text-white" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "Hero Slider" && <HeroEditor />}
        {activeTab === "Home Page" && <HomeEditor />}
        {activeTab === "Products" && <ProductsEditor />}
        {activeTab === "Gallery" && <GalleryEditor />}
        {activeTab === "About" && <AboutEditor />}
        {activeTab === "Contact" && <ContactEditor />}
      </div>
    </div>
  );
}
