
-- Create timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Hero Slides
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Auth write hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_hero_slides_ts BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Stats
CREATE TABLE public.stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Auth write stats" ON public.stats FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Products (listing cards)
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT '',
  tag_color TEXT NOT NULL DEFAULT 'bg-blue-600',
  accent_color TEXT NOT NULL DEFAULT 'border-t-blue-600',
  subtitle TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Auth write products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_products_ts BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Product Details (full page content)
CREATE TABLE public.product_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_slug TEXT NOT NULL UNIQUE REFERENCES public.products(slug) ON DELETE CASCADE,
  hero_tag TEXT NOT NULL DEFAULT '',
  hero_tag_color TEXT NOT NULL DEFAULT 'bg-blue-600',
  hero_title TEXT NOT NULL DEFAULT '',
  hero_subtitle TEXT NOT NULL DEFAULT '',
  hero_description TEXT NOT NULL DEFAULT '',
  overview_title TEXT NOT NULL DEFAULT 'Product Overview',
  overview_text TEXT NOT NULL DEFAULT '',
  overview_text_2 TEXT NOT NULL DEFAULT '',
  accent_dot_color TEXT NOT NULL DEFAULT 'bg-blue-600',
  accent_bar_color TEXT NOT NULL DEFAULT 'bg-blue-500',
  cta_bg TEXT NOT NULL DEFAULT 'bg-blue-950',
  cta_title TEXT NOT NULL DEFAULT '',
  cta_description TEXT NOT NULL DEFAULT '',
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  applications JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.product_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read product_details" ON public.product_details FOR SELECT USING (true);
CREATE POLICY "Auth write product_details" ON public.product_details FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_product_details_ts BEFORE UPDATE ON public.product_details FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Gallery Photos
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Facility',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery_photos" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Auth write gallery_photos" ON public.gallery_photos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_gallery_photos_ts BEFORE UPDATE ON public.gallery_photos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Why Us items
CREATE TABLE public.why_us (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon_name TEXT NOT NULL DEFAULT 'Shield',
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.why_us ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read why_us" ON public.why_us FOR SELECT USING (true);
CREATE POLICY "Auth write why_us" ON public.why_us FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Clients
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Auth write clients" ON public.clients FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Team Members
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read team_members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Auth write team_members" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Milestones
CREATE TABLE public.milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  text TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read milestones" ON public.milestones FOR SELECT USING (true);
CREATE POLICY "Auth write milestones" ON public.milestones FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Company Info (key-value config table)
CREATE TABLE public.company_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read company_info" ON public.company_info FOR SELECT USING (true);
CREATE POLICY "Auth write company_info" ON public.company_info FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket for image uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);
CREATE POLICY "Public read site-images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Auth upload site-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images');
CREATE POLICY "Auth update site-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images');
CREATE POLICY "Auth delete site-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images');
