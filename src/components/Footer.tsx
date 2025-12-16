import { Link } from "react-router-dom";
import nusarupaLogo from "@/assets/icon-nusarupa.svg";

const Footer = () => {
  return (
    <footer className="py-12 bg-muted/50 border-t border-border">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <img className="h-8 w-8"
                  src={nusarupaLogo}
                  alt="nusarupa-logo" />
              </div>
              <span className="text-xl font-bold text-foreground">nusarupa</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Platform relawan terbaik se Indonesia untuk membangun masyarakat yang lebih baik.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/tentang-kami" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link to="/program" className="text-sm text-muted-foreground hover:text-primary transition-colors">Program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li><Link to="/menjadi-bagian" className="text-sm text-muted-foreground hover:text-primary transition-colors">Menjadi Relawan</Link></li>
              <li><Link to="/program" className="text-sm text-muted-foreground hover:text-primary transition-colors">Program Sosial</Link></li>
              <li><Link to="/kontak" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kemitraan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontak</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">info@nusarupa.id</li>
              <li className="text-sm text-muted-foreground">+62 21 1234 5678</li>
              <li className="text-sm text-muted-foreground">Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Nusarupa. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
