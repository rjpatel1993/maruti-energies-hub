import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebar, { type AdminSection } from "@/components/admin/AdminSidebar";
import DashboardHome from "@/components/admin/DashboardHome";
import HeroEditor from "@/components/admin/HeroEditor";
import ProductsEditor from "@/components/admin/ProductsEditor";
import GalleryEditor from "@/components/admin/GalleryEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import HomeEditor from "@/components/admin/HomeEditor";
import ContactEditor from "@/components/admin/ContactEditor";

const sectionTitles: Record<AdminSection, string> = {
  dashboard: "Dashboard",
  hero: "Hero Slider",
  home: "Home Page",
  products: "Products",
  gallery: "Gallery",
  about: "About",
  contact: "Contact Info",
};

export default function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
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
    <div className="h-screen flex bg-muted/30 overflow-hidden">
      <AdminSidebar
        active={section}
        onNavigate={setSection}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        userEmail={user?.email}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-card border-b border-border flex items-center px-6 shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Admin</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="font-semibold text-foreground">{sectionTitles[section]}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {section === "dashboard" && <DashboardHome />}
            {section === "hero" && <HeroEditor />}
            {section === "home" && <HomeEditor />}
            {section === "products" && <ProductsEditor />}
            {section === "gallery" && <GalleryEditor />}
            {section === "about" && <AboutEditor />}
            {section === "contact" && <ContactEditor />}
          </div>
        </main>
      </div>
    </div>
  );
}
