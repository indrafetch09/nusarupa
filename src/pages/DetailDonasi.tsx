import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Users, Clock, Share2, Target } from "lucide-react";
import { donationCampaigns } from "./Donasi";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const DetailDonasi = () => {
  const { id } = useParams();
  const campaign = donationCampaigns.find((c) => c.id === Number(id));

  useDocumentTitle(campaign?.title || "Detail Donasi");

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 px-4">
          <div className="container mx-auto max-w-4xl text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">Campaign tidak ditemukan</h1>
            <Link to="/donasi">
              <Button>Kembali ke Daftar Donasi</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const progress = (campaign.collected / campaign.target) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Back Button */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto max-w-4xl px-4 py-4">
            <Link
              to="/donasi"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Donasi
            </Link>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 capitalize">
                  {campaign.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {campaign.title}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {campaign.description}
                </p>
              </div>

              {/* Description */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Tentang Campaign</h2>
                <div className="prose prose-sm text-muted-foreground">
                  <p>
                    Campaign ini bertujuan untuk memberikan dukungan langsung kepada para seniman dan pengrajin tradisional Indonesia. 
                    Setiap donasi yang terkumpul akan digunakan untuk:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li>Pengadaan bahan baku dan peralatan</li>
                    <li>Pelatihan dan pengembangan keterampilan</li>
                    <li>Promosi dan pemasaran karya</li>
                    <li>Dokumentasi dan pelestarian teknik tradisional</li>
                  </ul>
                  <p className="mt-4">
                    Dengan berdonasi, Anda turut serta dalam melestarikan warisan budaya Indonesia dan membantu 
                    meningkatkan kesejahteraan para seniman tradisional.
                  </p>
                </div>
              </div>

              {/* Updates */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Update Terbaru</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 pb-4 border-b border-border">
                    <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground">Pengadaan bahan baku tahap pertama selesai</p>
                      <span className="text-xs text-muted-foreground">2 hari yang lalu</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 bg-muted rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground">Campaign dimulai</p>
                      <span className="text-xs text-muted-foreground">2 minggu yang lalu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Card */}
              <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{formatCurrency(campaign.collected)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{Math.round(progress)}% terkumpul</span>
                      <span className="text-foreground font-medium">dari {formatCurrency(campaign.target)}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <Heart className="w-4 h-4" />
                    </div>
                    <p className="text-lg font-semibold text-foreground">{campaign.donors}</p>
                    <p className="text-xs text-muted-foreground">Donatur</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-lg font-semibold text-foreground">{campaign.daysLeft}</p>
                    <p className="text-xs text-muted-foreground">Hari Lagi</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <Target className="w-4 h-4" />
                    </div>
                    <p className="text-lg font-semibold text-foreground">{Math.round(progress)}%</p>
                    <p className="text-xs text-muted-foreground">Tercapai</p>
                  </div>
                </div>

                {/* CTA */}
                <Link to={`/donasi/${campaign.id}/proses`}>
                  <Button className="w-full h-12 text-base font-semibold gap-2">
                    <Heart className="w-5 h-5" />
                    Donasi Sekarang
                  </Button>
                </Link>

                <Button variant="outline" className="w-full mt-3 gap-2">
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailDonasi;
