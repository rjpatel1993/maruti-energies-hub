import { Award, Users, Factory, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const certs = [
{ label: "MSME Registered", icon: "🏛️" },
{ label: "ISO 9001:2015", icon: "✅" },
{ label: "PESO Approved", icon: "🔒" },
{ label: "BIS Hallmarked", icon: "⭐" }];


const team = [
{
  name: "Mr. Jayesh Patel",
  role: "Director & Founder",
  desc: "Visionary leader with deep expertise in the CNG industry and gas infrastructure development."
},
{
  name: "Mr. Bhanuprasad Patel",
  role: "Technical Director",
  desc: "Oversees manufacturing quality, engineering standards and R&D for all cascade products."
},
];


const milestones = [
{ year: "2019", text: "Company established in Halol, Gujarat. First CNG cascade manufactured." },
{ year: "2020", text: "Obtained ISO 9001:2015 certification and PESO approval." },
{ year: "2021", text: "Crossed 100+ cascades milestone. Opened Unit 2 for testing & assembly." },
{ year: "2022", text: "Launched CBG and Hydrogen Cascade product lines." },
{ year: "2023", text: "First international exports to Nigeria and Tanzania." },
{ year: "2024", text: "600+ cascades supplied Pan-India. Expanded capacity to be India's largest." }];


export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-navy py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Our Story</p>
            <h1 className="text-white font-black text-4xl sm:text-5xl mb-6">About Maruti Engineering</h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Founded in 2019 in Halol, Gujarat, Maruti Engineering & Services has grown into one of India's most trusted manufacturers of high-pressure CNG, CBG, and Hydrogen Cascades.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-orange font-bold text-xs uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-navy font-black text-3xl sm:text-4xl mb-6">Engineered for the Energy Future</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Maruti Engineering & Services (MES) was established in 2019 with a clear mission: to manufacture world-class, safe, and reliable high-pressure gas storage cascades for India's growing CNG and clean energy infrastructure.
                </p>
                <p>
                  Operating from two state-of-the-art facilities in GIDC Halol, Panchmahal, Gujarat, MES has the capacity to produce one of the widest ranges of Type 1 cascades in India — from 300 litres to 13,200 litres, both stationary and mobile.
                </p>
                

                
                <p>
                  With HPCL, IOCL, GAIL, Adani Gas, and 600+ clients across India and international markets, MES is now a benchmark in the CNG cascade industry.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
              { value: "2019", label: "Established" },
              { value: "600+", label: "Cascades Supplied" },
              { value: "2", label: "Manufacturing Units" },
              { value: "3+", label: "Countries Served" }].
              map((s) =>
              <div key={s.label} className="bg-navy rounded-xl p-6 text-center">
                  <div className="text-orange font-black text-3xl mb-1">{s.value}</div>
                  <div className="text-white/70 text-sm font-semibold uppercase tracking-wide">{s.label}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Credentials</p>
              <h2 className="text-navy font-black text-3xl">Certifications & Approvals</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {certs.map((c) =>
              <div key={c.label} className="bg-white border border-border rounded-xl p-6 text-center hover:border-orange transition-colors shadow-sm">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <div className="text-navy font-bold text-sm">{c.label}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Journey</p>
              <h2 className="text-navy font-black text-3xl">Our Growth Timeline</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-8">
                {milestones.map((m, i) =>
                <div key={m.year} className={`relative flex items-start gap-6 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-orange flex items-center justify-center text-white z-10 ml-0 sm:ml-0">
                      <CheckCircle size={16} />
                    </div>
                    <div className="bg-white border border-border rounded-xl p-4 shadow-sm flex-1">
                      <div className="text-orange font-black text-sm mb-1">{m.year}</div>
                      <p className="text-muted-foreground text-sm">{m.text}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Leadership</p>
              <h2 className="text-white font-black text-3xl">Key Team Members</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((t) =>
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-orange/20 border-2 border-orange mx-auto mb-4 flex items-center justify-center text-orange font-black text-2xl">
                    {t.name.split(" ")[1][0]}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{t.name}</h3>
                  <div className="text-orange text-xs font-semibold uppercase tracking-wide mb-3">{t.role}</div>
                  <p className="text-white/60 text-sm leading-relaxed">{t.desc}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>);

}