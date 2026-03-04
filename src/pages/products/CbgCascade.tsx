import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const specs = [
  { label: "Capacity Range", value: "300 Ltr to 13,200 Ltr" },
  { label: "Working Pressure", value: "200 Bar / 250 Bar" },
  { label: "Test Pressure", value: "300 Bar / 375 Bar" },
  { label: "Material", value: "Seamless Carbon Steel" },
  { label: "Configuration", value: "Stationary & Mobile" },
  { label: "Standard", value: "IS 7285 / ISO 11439" },
  { label: "Approval", value: "PESO Approved" },
  { label: "Gas Type", value: "Compressed Bio-Gas (CBG)" },
];

const applications = [
  "Bio-Gas Plants",
  "Dairy & Agricultural Sector",
  "Municipal Waste-to-Gas Projects",
  "CBG Dispensing Stations",
  "Green Fuel Distribution",
  "Rural Energy Infrastructure",
];

export default function CbgCascade() {
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
            <span className="inline-block bg-green-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded mb-4">CBG</span>
            <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl mb-4">Type 1 CBG Cascade</h1>
            <p className="text-orange font-semibold text-lg mb-6">Compressed Bio-Gas Storage</p>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              Purpose-built for Compressed Bio-Gas, our CBG Cascades support India's push towards green fuel alternatives — from bio-gas plants to municipal waste conversion projects.
            </p>
          </div>
        </section>

        {/* Detail */}
        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-navy font-black text-2xl mb-4">Product Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Built to the same high standards as our CNG cascades, the Type 1 CBG Cascade is engineered specifically for Compressed Bio-Gas. As India pushes towards green fuel alternatives, CBG cascades from Maruti Engineering support bio-gas plants, dairy farms, and municipal solid waste conversion projects.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Each cascade undergoes rigorous quality checks and is certified under PESO norms. The seamless carbon steel construction ensures durability and gas-tight integrity for long service life in demanding field conditions.
              </p>

              <h3 className="text-navy font-bold text-sm uppercase tracking-widest mb-4">Applications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-green-600 shrink-0" />
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
                <div className="h-1 w-12 bg-green-500 rounded mb-6" />
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

        <section className="py-14 bg-green-950 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-white font-black text-2xl mb-3">Interested in CBG Solutions?</h2>
            <p className="text-white/60 mb-6">We'll help you spec the right cascade for your bio-gas project. Respond within 24 hours.</p>
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
