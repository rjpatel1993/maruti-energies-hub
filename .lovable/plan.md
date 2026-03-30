

## Plan: Professional Admin Dashboard Redesign + Visual Editor

### Current Problem
The admin dashboard is basic — plain text inputs, no sidebar navigation, no image upload, no rich text editing. You want a professional CMS-style experience.

### What Changes

#### 1. Dashboard Layout Overhaul
- **Sidebar navigation** (collapsible) with icons for each section — replaces the current top tab bar
- **Breadcrumbs** showing current section
- **Dashboard home** with quick stats (total products, gallery photos, last updated timestamps)
- Clean card-based layout with proper spacing and visual hierarchy

#### 2. Image Upload (Drag & Drop)
- Replace all "paste URL" inputs with a proper **drag-and-drop image uploader**
- Uploads go to the `site-images` storage bucket
- Shows image preview with remove/replace option
- Works for: hero slides, gallery photos, product images

#### 3. Rich Text Editor
- Add a **rich text editor** (using `@tiptap/react`) for content fields like product descriptions, overview text, about page content
- Supports bold, italic, bullet lists, headings, links
- Stores content as HTML in the database

#### 4. Visual Page Preview
- **Live preview panel** — split-screen view showing how the page looks as you edit
- Toggle between edit mode and preview mode
- Preview renders the actual page component with current form data

#### 5. Better UX Throughout
- **Unsaved changes indicator** (dot on tab/save button)
- **Drag-to-reorder** for lists (slides, gallery, team members, milestones) using `@dnd-kit`
- **Confirmation dialogs** before deleting items
- **Search/filter** in gallery and products sections
- **Toast notifications** with undo option
- **Auto-save draft** indicator

---

### Technical Approach

**New dependencies**: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@dnd-kit/core`, `@dnd-kit/sortable`

**New/edited files**:
```
CREATE  src/components/admin/AdminSidebar.tsx        (sidebar nav with icons)
CREATE  src/components/admin/AdminLayout.tsx          (sidebar + content wrapper)
CREATE  src/components/admin/DashboardHome.tsx        (overview/stats page)
CREATE  src/components/admin/ImageUploader.tsx        (drag-drop upload component)
CREATE  src/components/admin/RichTextEditor.tsx       (tiptap wrapper)
CREATE  src/components/admin/SortableList.tsx         (drag-to-reorder wrapper)
CREATE  src/components/admin/PagePreview.tsx          (live preview panel)
EDIT    src/pages/admin/AdminDashboard.tsx            (use new layout)
EDIT    src/components/admin/HeroEditor.tsx           (image upload + reorder)
EDIT    src/components/admin/ProductsEditor.tsx       (rich text + image upload)
EDIT    src/components/admin/GalleryEditor.tsx        (image upload + reorder)
EDIT    src/components/admin/AboutEditor.tsx          (rich text + reorder)
EDIT    src/components/admin/HomeEditor.tsx           (reorder + better UI)
EDIT    src/components/admin/ContactEditor.tsx        (better form layout)
```

### Dashboard Sections (Sidebar)
| Icon | Label | Content |
|------|-------|---------|
| LayoutDashboard | Dashboard | Stats overview |
| Image | Hero Slider | Slide images with drag-reorder |
| Home | Home Page | Stats, Why Us, Clients |
| Package | Products | Product cards + detail pages |
| GalleryHorizontal | Gallery | Photo grid with upload |
| Info | About | Team, milestones, company story |
| Phone | Contact | Company info fields |

