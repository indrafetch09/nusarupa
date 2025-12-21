import { useParams, useSearchParams, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Heart, Home, History } from "lucide-react";
import { donationCampaigns } from "./Donasi";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const BerhasilDonasi = () => {
  useDocumentTitle("Donasi Berhasil");
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const campaign = donationCampaigns.find((c) => c.id === Number(id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16 min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-12">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-up">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 animate-fade-up">
            Terima Kasih! 💚
          </h1>
          <p className="text-muted-foreground mb-8 animate-fade-up-delay">
            Donasi Anda telah berhasil diterima
          </p>

          {/* Donation Info */}
          <div className="bg-card rounded-xl p-6 border border-border mb-8 text-left animate-fade-up-delay-2">
            <div className="space-y-4">
              {campaign && (
                <div className="flex gap-4 pb-4 border-b border-border">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-foreground line-clamp-2">{campaign.title}</p>
                    <span className="text-xs text-muted-foreground capitalize">{campaign.category}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Jumlah Donasi</span>
                <span className="font-bold text-primary text-lg">
                  {amount ? formatCurrency(parseInt(amount)) : "-"}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  <CheckCircle2 className="w-4 h-4" />
                  Berhasil
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tanggal</span>
                <span className="text-foreground">
                  {new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="bg-primary/5 rounded-xl p-4 mb-8 animate-fade-up-delay-2">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Kebaikan Anda Berarti</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Setiap donasi membantu para seniman dan pengrajin Indonesia untuk terus berkarya dan melestarikan budaya.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 animate-fade-up-delay-2">
            <Link to="/home" className="block">
              <Button className="w-full h-12 gap-2">
                <Home className="w-5 h-5" />
                Kembali ke Home
              </Button>
            </Link>
            <Link to="/profil" className="block">
              <Button variant="outline" className="w-full h-12 gap-2">
                <History className="w-5 h-5" />
                Lihat Riwayat Donasi
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BerhasilDonasi;
