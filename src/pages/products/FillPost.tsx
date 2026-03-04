import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const specs = [
  { label: "Pressure Rating", value: "Up to 250 Bar" },
  { label: "Material", value: "High-grade SS / Carbon Steel" },
  { label: "Fittings", value: "Swagelok / Parker Compatible" },
  { label: "Hose Length", value: "Custom" },
  { label: "Nozzle", value: "Type 1 CNG Nozzle" },
  { label: "Standard", value: "IS / CGD Compliance" },
  { label: "Testing", value: "Hydrostatic Pressure Tested" },
  { label: "Supply", value: "Pan-India Installation Support" },
];

const applications = [
  "CNG Dispensing Stations",
  "Cascade Interconnection",
  "Mother Station Piping",
  "Mobile CNG Units",
  "High-Pressure Manifold Systems",
  "Station Interconnect Tubing",
];

export default function FillPost() {
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
            <span className="inline-block bg-orange text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded mb-4">INFRA</span>
            <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl mb-4">Fill Post & Station Tubing</h1>
            <p className="text-orange font-semibold text-lg mb-6">CNG Station Infrastructure</p>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              Complete CNG station tubing and fill post solutions to complement our cascade products — high-pressure tubing assemblies, fill posts, and piping that meet all safety and regulatory requirements.
            </p>
          </div>
        </section>

        {/* Detail */}
        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-navy font-black text-2xl mb-4">Product Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Maruti Engineering supplies complete CNG station infrastructure beyond cascades — including high-pressure fill posts, manifold assemblies, station interconnect tubing, and nozzle assemblies. All products are manufactured to IS and CGD compliance standards.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our fill post and tubing solutions are fully compatible with our cascade range and can be supplied as a complete station package. Custom configurations, hose lengths, and connector types are available on request with our technical support team.
              </p>

              <h3 className="text-navy font-bold text-sm uppercase tracking-widest mb-4">Applications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-orange shrink-0" />
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
                <div className="h-1 w-12 bg-orange rounded mb-6" />
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

        <section className="py-14 bg-orange/10 border-t border-orange/20 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-navy font-black text-2xl mb-3">Need a Full Station Package?</h2>
            <p className="text-muted-foreground mb-6">Cascade + fill post + tubing, all from one manufacturer. Get a combined quote today.</p>
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
