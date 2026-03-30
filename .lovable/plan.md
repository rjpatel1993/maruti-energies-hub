

## Plan: Admin Dashboard with Supabase Backend (Instant Content Updates)

Since you want content changes to reflect everywhere instantly (across all devices and visitors), we need a real database backend instead of localStorage. We'll use **Lovable Cloud (Supabase)** to store all content and serve it to every visitor in real-time.

### How It Works

1. All website content (hero images, products, gallery, about, stats, clients) is stored in Supabase database tables
2. The admin dashboard lets you edit content via a protected UI at `/admin`
3. When you save changes, they're written to the database and instantly visible to all visitors on all devices

---

### Database Tables

| Table | Purpose |
|-------|---------|
| `hero_slides` | Hero carousel images + alt text |
| `stats` | Stats bar values (600+, Pan-India, etc.) |
| `products` | Product cards (title, description, tag, accent color, link) |
| `product_details` | Full product page content (specs, applications, features) |
| `gallery_photos` | Gallery images with captions and categories |
| `why_us` | "Why Choose Us" items |
| `clients` | Client names |
| `team_members` | Team member names, roles, descriptions |
| `milestones` | Timeline entries |
| `company_info` | Contact details, addresses, certifications |

### Admin Dashboard (`/admin`)

- **Login page** with email/password authentication via Supabase Auth
- **Tabbed dashboard** with editors for each content section
- Image upload via Supabase Storage (no more Unsplash placeholders)
- Save button writes to database instantly

### Frontend Changes

All pages (`Index.tsx`, `About.tsx`, `Gallery.tsx`, `Products.tsx`, `Contact.tsx`, product detail pages) will fetch content from Supabase using `@tanstack/react-query` instead of hardcoded arrays. Content loads on page visit and is always up-to-date.

### Files

```
CREATE  Supabase migrations (all tables + RLS policies + seed data)
CREATE  src/pages/admin/AdminLogin.tsx
CREATE  src/pages/admin/AdminDashboard.tsx
CREATE  src/components/admin/HeroEditor.tsx
CREATE  src/components/admin/ProductsEditor.tsx
CREATE  src/components/admin/GalleryEditor.tsx
CREATE  src/components/admin/AboutEditor.tsx
CREATE  src/components/admin/HomeEditor.tsx
CREATE  src/components/admin/ContactEditor.tsx
EDIT    src/App.tsx (add admin routes, auth guard)
EDIT    src/pages/Index.tsx (fetch from Supabase)
EDIT    src/pages/About.tsx (fetch from Supabase)
EDIT    src/pages/Gallery.tsx (fetch from Supabase)
EDIT    src/pages/Products.tsx (fetch from Supabase)
EDIT    src/pages/Contact.tsx (fetch from Supabase)
EDIT    src/pages/products/*.tsx (fetch from Supabase)
```

### Security

- Admin routes protected by Supabase Auth
- RLS policies: public read access, authenticated write access
- Admin user created via Supabase Auth (you'll set your email/password)

