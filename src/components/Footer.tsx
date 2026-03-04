import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center text-white font-black text-lg">
                M
              </div>
              <div>
                <div className="text-white font-black text-sm tracking-widest uppercase">Maruti</div>
                <div className="text-orange text-[10px] font-semibold tracking-wider uppercase">Engineering & Services</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Manufacturer of Type 1 CNG, CBG & Hydrogen Cascades. ISO 9001:2015 certified, PESO approved. Trusted by HPCL, IOCL, and 600+ clients Pan-India.
            </p>
            <div className="mt-4 text-white/40 text-xs">GST: 24BSTPP4394R1ZE</div>
          </div>

          {/* Unit 1 */}
          <div>
            <h4 className="text-orange font-bold uppercase text-xs tracking-widest mb-4">Unit 1 — Manufacturing</h4>
            <div className="flex gap-2 text-sm text-white/70 mb-2">
              <MapPin size={14} className="text-orange mt-0.5 shrink-0" />
              <span>Plot No. 131/4, Halol - Maswad Industrial Estate, Panchmahal — 389350, Gujarat</span>
            </div>
            <div className="flex gap-2 text-sm text-white/70 mb-2">
              <Phone size={14} className="text-orange mt-0.5 shrink-0" />
              <a href="tel:+919924567355" className="hover:text-orange transition-colors">+91 99245 67355</a>
            </div>
            <div className="flex gap-2 text-sm text-white/70">
              <Mail size={14} className="text-orange mt-0.5 shrink-0" />
              <a href="mailto:maruties.2019@gmail.com" className="hover:text-orange transition-colors">maruties.2019@gmail.com</a>
            </div>
          </div>

          {/* Unit 2 + Quick links */}
          <div>
            <h4 className="text-orange font-bold uppercase text-xs tracking-widest mb-4">Unit 2 — Testing & Assembly</h4>
            <div className="flex gap-2 text-sm text-white/70 mb-4">
              <Building2 size={14} className="text-orange mt-0.5 shrink-0" />
              <span>Plot No. 713/4, Halol - Maswad Industrial Estate, Panchmahal — 389350, Gujarat</span>
            </div>
            <h4 className="text-orange font-bold uppercase text-xs tracking-widest mb-3">Quick Links</h4>
            <div className="flex flex-col gap-1">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Products", href: "/products" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link key={l.href} to={l.href} className="text-sm text-white/60 hover:text-orange transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/30 text-xs">
          © {new Date().getFullYear()} Maruti Engineering & Services. All rights reserved. | Est. 2019, Halol, Gujarat
        </div>
      </div>
    </footer>
  );
}
