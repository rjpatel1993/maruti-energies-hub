import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const specs = [
  { label: "Capacity Range", value: "300 Ltr to 13,200 Ltr" },
  { label: "Working Pressure", value: "350 Bar / 700 Bar" },
  { label: "Material", value: "Seamless Carbon Steel" },
  { label: "Configuration", value: "Stationary" },
  { label: "Standard", value: "CGD / PESO Norms" },
  { label: "Application", value: "H2 Fuel Cell / Industrial" },
  { label: "Valve", value: "High-Pressure H2 Safety Valve" },
  { label: "Surface Treatment", value: "Special H2-compatible coating" },
];

const applications = [
  "Hydrogen Fuel Cell Stations",
  "Industrial H2 Storage",
  "Green Hydrogen Projects",
  "R&D Facilities",
  "Hydrogen Vehicle Fuelling",
  "Energy Storage Systems",
];

export default function HydrogenCascade() {
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
            <span className="inline-block bg-purple-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded mb-4">H₂</span>
            <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl mb-4">Type 1 Hydrogen Cascade</h1>
            <p className="text-orange font-semibold text-lg mb-6">Clean Hydrogen Storage</p>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              Engineered for safe storage and dispensing of high-pressure hydrogen gas, meeting stringent requirements of hydrogen fuel cell vehicle stations and industrial hydrogen applications.
            </p>
          </div>
        </section>

        {/* Detail */}
        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-navy font-black text-2xl mb-4">Product Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Maruti Engineering's Hydrogen Cascades represent our commitment to the clean energy future. These cascades are engineered to handle the unique challenges of hydrogen — including hydrogen embrittlement resistance and ultra-high pressure ratings up to 700 Bar.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Built to CGD and PESO norms, our hydrogen cascades are suitable for both stationary fuel cell vehicle fuelling stations and large-scale industrial hydrogen storage. Custom pressure ratings and capacities are available.
              </p>

              <h3 className="text-navy font-bold text-sm uppercase tracking-widest mb-4">Applications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 shrink-0" />
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

            <div>
              <div className="bg-navy rounded-2xl p-8">
                <div className="h-1 w-12 bg-purple-500 rounded mb-6" />
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

        <section className="py-14 bg-purple-950 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-white font-black text-2xl mb-3">Building a Hydrogen Station?</h2>
            <p className="text-white/60 mb-6">Our engineers will help you spec the right cascade system for your hydrogen project.</p>
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
