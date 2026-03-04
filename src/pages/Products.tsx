import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    id: "cng",
    title: "Type 1 CNG Cascade",
    subtitle: "Compressed Natural Gas Storage",
    tag: "CNG",
    tagColor: "bg-blue-600",
    accentColor: "border-t-blue-600",
    description:
      "Manufactured from seamless carbon steel tubes, designed for long-term high-pressure storage of Compressed Natural Gas. Available in stationary and mobile configurations.",
    specs: [
      { label: "Capacity", value: "300–13,200 Ltr" },
      { label: "Pressure", value: "200 / 250 Bar" },
      { label: "Approval", value: "PESO Approved" },
    ],
    href: "/products/cng",
  },
  {
    id: "cbg",
    title: "Type 1 CBG Cascade",
    subtitle: "Compressed Bio-Gas Storage",
    tag: "CBG",
    tagColor: "bg-green-600",
    accentColor: "border-t-green-600",
    description:
      "Purpose-built for Compressed Bio-Gas, supporting India's green fuel push — from bio-gas plants and dairy farms to municipal waste conversion projects.",
    specs: [
      { label: "Capacity", value: "300–13,200 Ltr" },
      { label: "Pressure", value: "200 / 250 Bar" },
      { label: "Standard", value: "IS 7285 / ISO 11439" },
    ],
    href: "/products/cbg",
  },
  {
    id: "hydrogen",
    title: "Type 1 Hydrogen Cascade",
    subtitle: "Clean Hydrogen Storage",
    tag: "H₂",
    tagColor: "bg-purple-600",
    accentColor: "border-t-purple-600",
    description:
      "Engineered for safe storage of high-pressure hydrogen gas. Meets stringent requirements of hydrogen fuel cell stations and industrial hydrogen applications.",
    specs: [
      { label: "Capacity", value: "300–13,200 Ltr" },
      { label: "Pressure", value: "350 / 700 Bar" },
      { label: "Standard", value: "CGD / PESO Norms" },
    ],
    href: "/products/hydrogen",
  },
  {
    id: "fillpost",
    title: "Fill Post & Station Tubing",
    subtitle: "CNG Station Infrastructure",
    tag: "INFRA",
    tagColor: "bg-orange",
    accentColor: "border-t-orange",
    description:
      "Complete high-pressure tubing assemblies, fill posts, and station piping meeting all safety and regulatory requirements for CNG dispensing infrastructure.",
    specs: [
      { label: "Pressure", value: "Up to 250 Bar" },
      { label: "Fittings", value: "Swagelok / Parker" },
      { label: "Standard", value: "IS / CGD Compliant" },
    ],
    href: "/products/fillpost",
  },
];

export default function Products() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-navy py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Our Products</p>
            <h1 className="text-white font-black text-4xl sm:text-5xl mb-6">High-Pressure Storage Solutions</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Type 1 Cascades for CNG, CBG, and Hydrogen — designed for safety, certified to global standards, and built for Indian conditions.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white border border-border border-t-4 ${p.accentColor} rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`inline-block text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded mb-3 ${p.tagColor}`}>
                          {p.tag}
                        </span>
                        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">{p.subtitle}</p>
                        <h2 className="text-navy font-black text-2xl mt-1">{p.title}</h2>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{p.description}</p>

                    {/* Quick specs */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {p.specs.map((s) => (
                        <div key={s.label} className="bg-muted/40 rounded-lg p-3 text-center">
                          <div className="text-navy font-black text-sm">{s.value}</div>
                          <div className="text-muted-foreground text-[10px] uppercase tracking-wide mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={p.href}
                      className="inline-flex items-center gap-2 bg-navy hover:bg-navy/80 text-white font-bold px-6 py-2.5 rounded transition-colors text-sm"
                    >
                      View Full Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-orange text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-white font-black text-3xl mb-4">Need Custom Specifications?</h2>
            <p className="text-white/80 text-lg mb-8">We manufacture to order. Share your requirements and our team will respond within 24 hours.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-orange font-black px-10 py-4 rounded hover:bg-white/90 transition-colors"
            >
              Send Inquiry <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
