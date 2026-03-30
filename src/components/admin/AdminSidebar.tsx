import { LayoutDashboard, Image, Home, Package, GalleryHorizontal, Info, Phone, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminSection = "dashboard" | "hero" | "home" | "products" | "gallery" | "about" | "contact";

const navItems: { id: AdminSection; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "hero", label: "Hero Slider", icon: Image },
  { id: "home", label: "Home Page", icon: Home },
  { id: "products", label: "Products", icon: Package },
  { id: "gallery", label: "Gallery", icon: GalleryHorizontal },
  { id: "about", label: "About", icon: Info },
  { id: "contact", label: "Contact", icon: Phone },
];

interface AdminSidebarProps {
  active: AdminSection;
  onNavigate: (section: AdminSection) => void;
  collapsed: boolean;
  onToggle: () => void;
  userEmail?: string;
  onLogout: () => void;
}

export default function AdminSidebar({ active, onNavigate, collapsed, onToggle, userEmail, onLogout }: AdminSidebarProps) {
  return (
    <aside className={cn(
      "bg-primary text-primary-foreground flex flex-col transition-all duration-300 shrink-0",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-white/10">
        <img src="/logo.png" alt="Maruti Engineering" className="h-8 w-auto shrink-0" />
        {!collapsed && <span className="ml-3 font-bold text-sm truncate">Admin Panel</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/5"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-3 space-y-2">
        {!collapsed && userEmail && (
          <p className="text-[10px] text-primary-foreground/40 truncate px-1">{userEmail}</p>
        )}
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-primary-foreground/60 hover:text-destructive hover:bg-white/5 transition-colors" title="Logout">
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button onClick={onToggle} className="w-full flex items-center justify-center py-1.5 rounded-lg text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
