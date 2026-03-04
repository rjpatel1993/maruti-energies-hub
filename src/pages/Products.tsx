import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    id: "cng",
    title: "Type 1 CNG Cascade",
    subtitle: "Compressed Natural Gas Storage",
    icon: "🏭",
    description:
      "Our flagship product — Type 1 CNG Cascades are manufactured from seamless carbon steel tubes, designed for long-term high-pressure storage of Compressed Natural Gas. Available in stationary and mobile configurations, they are widely used in CNG mother stations, daughter booster stations, and online CNG stations.",
    specs: [
      { label: "Capacity Range", value: "300 Ltr to 13,200 Ltr" },
      { label: "Working Pressure", value: "200 Bar / 250 Bar" },
      { label: "Test Pressure", value: "300 Bar / 375 Bar" },
      { label: "Material", value: "Seamless Carbon Steel (IS 6990)" },
      { label: "Configuration", value: "Stationary & Mobile" },
      { label: "Approval", value: "PESO Approved" },
    ],
    applications: ["CNG Mother Stations", "Daughter Booster Stations", "Online CNG Stations", "Industrial CNG Storage"],
    color: "from-blue-900 to-navy",
  },
  {
    id: "cbg",
    title: "Type 1 CBG Cascade",
    subtitle: "Compressed Bio-Gas Storage",
    icon: "🌱",
    description:
      "Built to the same high standards as our CNG cascades, the Type 1 CBG Cascade is purpose-built for Compressed Bio-Gas. As India pushes towards green fuel alternatives, CBG cascades from Maruti Engineering support bio-gas plants, dairy farms, and municipal solid waste conversion projects.",
    specs: [
      { label: "Capacity Range", value: "300 Ltr to 13,200 Ltr" },
      { label: "Working Pressure", value: "200 Bar / 250 Bar" },
      { label: "Test Pressure", value: "300 Bar / 375 Bar" },
      { label: "Material", value: "Seamless Carbon Steel" },
      { label: "Configuration", value: "Stationary & Mobile" },
      { label: "Standard", value: "IS 7285 / ISO 11439" },
    ],
    applications: ["Bio-Gas Plants", "Dairy & Agricultural Sector", "Municipal Waste-to-Gas Projects", "CBG Dispensing Stations"],
    color: "from-green-900 to-navy",
  },
  {
    id: "hydrogen",
    title: "Type 1 Hydrogen Cascade",
    subtitle: "Clean Hydrogen Storage",
    icon: "⚡",
    description:
      "Maruti Engineering's Hydrogen Cascades represent our commitment to the clean energy future. Engineered for safe storage and dispensing of high-pressure hydrogen gas, these cascades meet the stringent requirements of hydrogen fuel cell vehicle stations and industrial hydrogen applications.",
    specs: [
      { label: "Capacity Range", value: "300 Ltr to 13,200 Ltr" },
      { label: "Working Pressure", value: "350 Bar / 700 Bar" },
      { label: "Material", value: "Seamless Carbon Steel" },
      { label: "Configuration", value: "Stationary" },
      { label: "Standard", value: "CGD / PESO Norms" },
      { label: "Application", value: "H2 Fuel Cell / Industrial" },
    ],
    applications: ["Hydrogen Fuel Stations", "Industrial H2 Storage", "Green Hydrogen Projects", "R&D Facilities"],
    color: "from-purple-900 to-navy",
  },
  {
    id: "fillpost",
    title: "Fill Post & Station Tubing",
    subtitle: "CNG Station Infrastructure",
    icon: "🔧",
    description:
      "Complete CNG station tubing and fill post solutions to complement our cascade products. Maruti Engineering supplies high-pressure tubing assemblies, fill posts, and station piping that meet all safety and regulatory requirements for CNG dispensing infrastructure.",
    specs: [
      { label: "Pressure Rating", value: "Up to 250 Bar" },
      { label: "Material", value: "High-grade SS / Carbon Steel" },
      { label: "Fittings", value: "Swagelok / Parker Compatible" },
      { label: "Hose Length", value: "Custom" },
      { label: "Nozzle", value: "Type 1 CNG Nozzle" },
      { label: "Standard", value: "IS / CGD Compliance" },
    ],
    applications: ["CNG Dispensing Stations", "Cascade Interconnection", "Mother Station Piping", "Mobile CNG Units"],
    color: "from-orange-900 to-navy",
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

        {/* Products */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {products.map((p, i) => (
              <div
                key={p.id}
                id={p.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Info */}
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">{p.subtitle}</p>
                  <h2 className="text-navy font-black text-3xl mb-4">{p.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{p.description}</p>

                  <h4 className="text-navy font-bold text-sm uppercase tracking-wide mb-3">Applications</h4>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {p.applications.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold px-6 py-3 rounded transition-colors text-sm"
                  >
                    Request Inquiry <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Specs Card */}
                <div className={`bg-navy rounded-2xl p-6 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <h4 className="text-orange font-bold text-xs uppercase tracking-widest mb-4">Technical Specifications</h4>
                  <div className="space-y-3">
                    {p.specs.map((s) => (
                      <div key={s.label} className="flex justify-between items-start border-b border-white/10 pb-3">
                        <span className="text-white/60 text-sm">{s.label}</span>
                        <span className="text-white font-semibold text-sm text-right ml-4">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
