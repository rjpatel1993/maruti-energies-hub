
## Plan: Hero Photo Slider + Separate Product Pages + Design Improvements

### 1. Hero Section — Auto-playing Image Carousel Background
- Use `embla-carousel-react` (already installed) with autoplay via `setInterval`
- 4–5 industrial/cascade images using high-quality Unsplash URLs (industrial gas tanks, pressure vessels, CNG stations)
- Slides cycle every 4s with a smooth crossfade overlay
- Hero text and CTA buttons remain on top with a dark overlay ensuring readability

### 2. Separate Product Pages (4 new routes)
Create individual pages:
- `/products/cng` → `src/pages/products/CngCascade.tsx`
- `/products/cbg` → `src/pages/products/CbgCascade.tsx`
- `/products/hydrogen` → `src/pages/products/HydrogenCascade.tsx`
- `/products/fillpost` → `src/pages/products/FillPost.tsx`

Each page will have:
- Hero banner with product name
- Full description
- Technical specs table
- Applications list
- "Request Inquiry" CTA linking to `/contact`

The main `/products` page becomes a product listing/overview with cards linking to these individual pages (no emoji icons — replace with styled category badges or colored accent bars).

Update `App.tsx` to add the 4 new routes.

Update `Index.tsx` product cards to link to `/products/cng` etc. instead of hash links.

### 3. Remove Emoji Icons
- Products page listing: remove `icon` emoji from product data and cards
- Replace with a decorative colored top-border or category tag on cards instead

### 4. Design Improvements
- **Navbar**: Add subtle backdrop blur `bg-white/90 backdrop-blur` when scrolled (scroll listener)
- **Product cards on home**: More polished cards with a colored accent bar on top instead of emoji
- **Why Choose Us section**: Keep lucide icons (they look professional, not emoji)
- **Products listing page**: Clean grid layout with large cards, category color accent borders
- **Typography**: Slightly larger section headings, better spacing
- **Hover effects**: Subtle `shadow-xl` and `translateY(-2px)` on cards

### Files to create/edit:
```
CREATE src/pages/products/CngCascade.tsx
CREATE src/pages/products/CbgCascade.tsx
CREATE src/pages/products/HydrogenCascade.tsx
CREATE src/pages/products/FillPost.tsx
EDIT   src/pages/Index.tsx      (hero slider + product cards)
EDIT   src/pages/Products.tsx   (listing page, remove icons, link to new pages)
EDIT   src/App.tsx              (add 4 new routes)
EDIT   src/components/Navbar.tsx (scroll-aware styling)
```
