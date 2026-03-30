import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const { data: info = {} } = useQuery({
    queryKey: ["company_info"],
    queryFn: async () => {
      const { data } = await supabase.from("company_info").select("*");
      const map: Record<string, string> = {};
      data?.forEach((d) => { map[d.key] = d.value; });
      return map;
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Inquiry Sent!", description: "Thank you for reaching out. Our team will contact you within 24 hours." });
      setForm({ name: "", company: "", email: "", phone: "", product: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="bg-navy py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Get In Touch</p>
            <h1 className="text-white font-black text-4xl sm:text-5xl mb-6">Contact Us</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">Request a quote, ask a technical question, or just say hello. We respond within 24 hours.</p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-navy font-black text-2xl mb-8">Send an Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Full Name *</label>
                    <input required name="name" value={form.name} onChange={handleChange} placeholder="Mr. Ramesh Patel"
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Company</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company Name"
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Email Address *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com"
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9XXXXXXXXX"
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Product of Interest</label>
                  <select name="product" value={form.product} onChange={handleChange}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange bg-white">
                    <option value="">Select a Product</option>
                    <option>Type 1 CNG Cascade</option>
                    <option>Type 1 CBG Cascade</option>
                    <option>Type 1 Hydrogen Cascade</option>
                    <option>Fill Post & Station Tubing</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Message *</label>
                  <textarea required name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Please describe your requirement, capacity needed, location, etc."
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange bg-white resize-none" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-orange hover:bg-orange-dark disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition-colors text-base">
                  {submitting ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-navy font-black text-2xl mb-6">Our Offices</h2>
                <div className="bg-white border border-border rounded-xl p-6 mb-4 hover:border-orange transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-orange flex items-center justify-center text-white text-xs font-black">1</div>
                    <h3 className="text-navy font-bold">Unit 1 — Manufacturing Plant</h3>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin size={14} className="text-orange mt-0.5 shrink-0" />
                    <span>{info.unit1_address || "Plot No. 131/4, Halol - Maswad Industrial Estate, Panchmahal — 389350, Gujarat"}</span>
                  </div>
                </div>
                <div className="bg-white border border-border rounded-xl p-6 hover:border-orange transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-white text-xs font-black">2</div>
                    <h3 className="text-navy font-bold">Unit 2 — Testing & Assembly</h3>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} className="text-orange mt-0.5 shrink-0" />
                    <span>{info.unit2_address || "Plot No. 713/4, Halol - Maswad Industrial Estate, Panchmahal — 389350, Gujarat"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-navy rounded-xl p-6 space-y-4">
                <h3 className="text-orange font-bold text-xs uppercase tracking-widest">Direct Contact</h3>
                <div className="flex gap-3 items-start">
                  <Phone size={16} className="text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-sm">Phone / WhatsApp</div>
                    <a href={`tel:${info.phone || "+919924567355"}`} className="text-white/70 text-sm hover:text-orange transition-colors">{info.phone || "+91 99245 67355"}</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Mail size={16} className="text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-sm">Email</div>
                    <a href={`mailto:${info.email || "maruties.2019@gmail.com"}`} className="text-white/70 text-sm hover:text-orange transition-colors">{info.email || "maruties.2019@gmail.com"}</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Clock size={16} className="text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-sm">Business Hours</div>
                    <div className="text-white/70 text-sm">{info.business_hours || "Mon–Sat: 9:00 AM – 6:00 PM IST"}</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-white/40 text-xs">GST No: {info.gst || "24BSTPP4394R1ZE"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
