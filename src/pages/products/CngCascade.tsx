import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const specs = [
  { label: "Capacity Range", value: "300 Ltr to 13,200 Ltr" },
  { label: "Working Pressure", value: "200 Bar / 250 Bar" },
  { label: "Test Pressure", value: "300 Bar / 375 Bar" },
  { label: "Material", value: "Seamless Carbon Steel (IS 6990)" },
  { label: "Configuration", value: "Stationary & Mobile" },
  { label: "Approval", value: "PESO Approved" },
  { label: "Standard", value: "IS 7285 / ISO 11439" },
  { label: "Valve", value: "High-Pressure Safety Valve" },
];

const applications = [
  "CNG Mother Stations",
  "Daughter Booster Stations",
  "Online CNG Stations",
  "Industrial CNG Storage",
  "Mobile CNG Dispensing Units",
  "CNG Vehicle Fuelling Stations",
];

export default function CngCascade() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Hero Banner */}
        <section className="relative bg-navy py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(28,90%,52%) 0, hsl(28,90%,52%) 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/products" className="inline-flex items-center gap-1.5 text-white/50 hover:text-orange text-sm font-semibold mb-8 transition-colors">
              <ArrowLeft size={14} /> All Products
            </Link>
            <span className="inline-block bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded mb-4">CNG</span>
            <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl mb-4">Type 1 CNG Cascade</h1>
            <p className="text-orange font-semibold text-lg mb-6">Compressed Natural Gas Storage</p>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              Our flagship product — Type 1 CNG Cascades are manufactured from seamless carbon steel tubes, designed for long-term high-pressure storage of Compressed Natural Gas.
            </p>
          </div>
        </section>

        {/* Detail */}
        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description + Applications */}
            <div>
              <h2 className="text-navy font-black text-2xl mb-4">Product Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Available in stationary and mobile configurations, our Type 1 CNG Cascades are widely used in CNG mother stations, daughter booster stations, and online CNG stations. Manufactured under strict quality controls with PESO certification, each cascade is built to withstand demanding operational environments across India and internationally.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                The cascades feature multiple seamless steel cylinders manifolded together, offering storage capacities from 300 litres to an industry-leading 13,200 litres. Custom configurations and capacities are available on request.
              </p>

              <h3 className="text-navy font-bold text-sm uppercase tracking-widest mb-4">Applications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold px-8 py-3.5 rounded transition-colors"
              >
                Request Inquiry <ArrowRight size={16} />
              </Link>
            </div>

            {/* Specs */}
            <div>
              <div className="bg-navy rounded-2xl p-8">
                <div className="h-1 w-12 bg-blue-500 rounded mb-6" />
                <h3 className="text-orange font-bold text-xs uppercase tracking-widest mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  {specs.map((s) => (
                    <div key={s.label} className="flex justify-between items-start border-b border-white/10 pb-4">
                      <span className="text-white/55 text-sm">{s.label}</span>
                      <span className="text-white font-semibold text-sm text-right ml-4">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-blue-950 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-white font-black text-2xl mb-3">Need a Custom CNG Cascade?</h2>
            <p className="text-white/60 mb-6">Share your capacity and pressure requirements. We'll respond within 24 hours.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-orange text-white font-bold px-8 py-3 rounded hover:bg-orange-dark transition-colors">
              Send Inquiry <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
