## Plan: Gallery / Portfolio Page

### New Page: `/gallery`

A dedicated gallery page showcasing photos of recent work — installed cascades, manufacturing facility, testing plants, and client sites.

**Sections:**

1. **Hero banner** — "Our Work" with a short subtitle
2. **Filter tabs** — All | CNG Cascades | CBG Cascades | Hydrogen | Fill Post | Facility (so visitors can filter by category)
3. **Masonry/grid photo cards** — Each card shows an image, a short caption, and a category badge
4. **Lightbox on click** — Clicking a photo opens a full-screen overlay with the image and caption

### Image Strategy

Since no photos are uploaded yet, the page will use placeholder images from Unsplash (industrial/gas/pressure vessel imagery) with real captions. The user can later swap these with actual photos by uploading them directly in the chat.

### Navigation

- Add "Gallery" link to `Navbar.tsx` nav links
- Add "Gallery" link to footer quick links

### Files to create/edit:

```
CREATE src/pages/Gallery.tsx
EDIT   src/App.tsx              (add /gallery route)
EDIT   src/components/Navbar.tsx (add Gallery nav link)
EDIT   src/components/Footer.tsx (add Gallery to quick links)
```

### Note for User

You can upload real photos directly in the chat (drag and drop or attach), and I'll replace the placeholder images with your actual work photos instantly.  
  
i also want to add that section on homepage