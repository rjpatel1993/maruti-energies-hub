import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Award, Shield, Globe, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { value: "600+", label: "Cascades Supplied" },
  { value: "Pan-India", label: "Distribution" },
  { value: "ISO 9001", label: "Certified" },
  { value: "PESO", label: "Approved" },
  { value: "Nigeria & Tanzania", label: "Export Markets" },
];

const products = [
  {
    title: "Type 1 CNG Cascade",
    desc: "High-pressure CNG storage cascades for stations and mobile dispensing. Range: 300–13,200 Ltr.",
    icon: "🏭",
    href: "/products#cng",
  },
  {
    title: "Type 1 CBG Cascade",
    desc: "Compressed Bio-Gas cascades built to the same rigorous standards as our CNG line.",
    icon: "🌱",
    href: "/products#cbg",
  },
  {
    title: "Type 1 Hydrogen Cascade",
    desc: "Future-ready hydrogen storage cascades for clean energy applications.",
    icon: "⚡",
    href: "/products#hydrogen",
  },
  {
    title: "Fill Post & Tubing",
    desc: "Complete CNG station tubing solutions and fill post assemblies.",
    icon: "🔧",
    href: "/products#fillpost",
  },
];

const whyUs = [
  { icon: <Shield size={28} />, title: "Safe & Certified", desc: "PESO approved & ISO 9001:2015 certified manufacturing" },
  { icon: <Award size={28} />, title: "Industry Leader", desc: "Largest cascade capacity manufacturer in India" },
  { icon: <CheckCircle size={28} />, title: "Proven Reliability", desc: "600+ cascades in service across Pan-India clients" },
  { icon: <Globe size={28} />, title: "Global Reach", desc: "Exporting to Nigeria & Tanzania with growing international footprint" },
  { icon: <Zap size={28} />, title: "End-to-End Solutions", desc: "From manufacturing to installation and after-sales support" },
];

const clients = [
  "IMC", "AGNP", "Think Gas", "HPCL", "IOCL", "GAIL", "Adani Gas",
  "Mahanagar Gas", "Gujarat Gas", "IGL", "Torrent Gas", "Bharat Petroleum",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(215,60%,12%) 0%, hsl(215,50%,20%) 60%, hsl(210,30%,28%) 100%)" }}
      >
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,hsl(28,90%,52%) 39px,hsl(28,90%,52%) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,hsl(28,90%,52%) 39px,hsl(28,90%,52%) 40px)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/40 rounded-full px-4 py-1.5 text-orange text-xs font-bold uppercase tracking-widest mb-6">
            ISO 9001:2015 · PESO Approved · Est. 2019
          </div>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Trusted in{" "}
            <span className="text-orange">High Pressure</span>
            <br />
            Cascade & Station
            <br />
            Tubing Solutions
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Manufacturer of Type 1 CNG, CBG & Hydrogen Cascades. Supplying to HPCL, IOCL, GAIL & 600+ clients across India and internationally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold px-8 py-3.5 rounded transition-colors text-base"
            >
              Explore Products <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-orange text-white hover:text-orange font-bold px-8 py-3.5 rounded transition-colors text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-orange py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.value}>
                <div className="text-white font-black text-2xl sm:text-3xl">{s.value}</div>
                <div className="text-white/80 text-xs font-semibold uppercase tracking-wide mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Snapshot */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Our Products</p>
            <h2 className="text-navy text-3xl sm:text-4xl font-black">High-Pressure Storage Solutions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link
                key={p.title}
                to={p.href}
                className="group bg-white border border-border rounded-xl p-6 hover:border-orange hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-navy font-bold text-lg mb-2 group-hover:text-orange transition-colors">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-orange text-sm font-semibold">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Why Maruti</p>
            <h2 className="text-white text-3xl sm:text-4xl font-black">Built on Trust & Engineering Excellence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-orange mb-4">{w.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{w.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Strip */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Trusted By</p>
            <h2 className="text-navy text-2xl sm:text-3xl font-black">Our Esteemed Clients</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {clients.map((c) => (
              <div
                key={c}
                className="bg-white border border-border rounded-lg px-6 py-3 text-navy font-bold text-sm shadow-sm hover:border-orange hover:text-orange transition-colors"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4">Ready to Power Your CNG Station?</h2>
          <p className="text-white/80 text-lg mb-8">Get in touch for custom cascade solutions, technical specs, and pricing.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-orange font-black px-10 py-4 rounded hover:bg-white/90 transition-colors text-base"
          >
            Request a Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
