import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, Heart, ChevronRight } from "lucide-react";

const categories = [
  { id: "semua", label: "Semua" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "pengrajin", label: "Pengrajin" },
  { id: "komunitas", label: "Komunitas" },
  { id: "budaya", label: "Pelestarian Budaya" },
];

export const donationCampaigns = [
  {
    id: 1,
    title: "Bantu Pengrajin Tenun Flores",
    category: "pengrajin",
    description: "Dukung pengrajin tenun tradisional Flores untuk mengembangkan usaha dan melestarikan warisan budaya.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop",
    target: 10000000,
    collected: 7500000,
    donors: 156,
    daysLeft: 15,
  },
  {
    id: 2,
    title: "Pendidikan Seni untuk Anak Pedalaman",
    category: "pendidikan",
    description: "Berikan kesempatan belajar seni kepada anak-anak di pedalaman Kalimantan.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
    target: 5000000,
    collected: 2250000,
    donors: 89,
    daysLeft: 30,
  },
  {
    id: 3,
    title: "Revitalisasi Sanggar Tari Tradisional",
    category: "budaya",
    description: "Bantu renovasi sanggar tari tradisional yang menjadi pusat pelatihan generasi muda.",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=400&fit=crop",
    target: 15000000,
    collected: 12000000,
    donors: 234,
    daysLeft: 7,
  },
  {
    id: 4,
    title: "Alat Musik untuk Komunitas Seni",
    category: "komunitas",
    description: "Pengadaan alat musik gamelan untuk komunitas seni di desa terpencil.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    target: 8000000,
    collected: 4800000,
    donors: 112,
    daysLeft: 21,
  },
  {
    id: 5,
    title: "Beasiswa Seni Lukis Anak Yatim",
    category: "pendidikan",
    description: "Berikan beasiswa seni lukis untuk anak-anak yatim yang berbakat.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop",
    target: 6000000,
    collected: 3600000,
    donors: 78,
    daysLeft: 45,
  },
  {
    id: 6,
    title: "Modal Usaha Pengrajin Batik",
    category: "pengrajin",
    description: "Bantu pengrajin batik mendapatkan modal untuk mengembangkan usaha mereka.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    target: 12000000,
    collected: 9600000,
    donors: 189,
    daysLeft: 10,
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const Donasi = () => {
  useDocumentTitle("Donasi");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = donationCampaigns.filter((campaign) => {
    const matchesCategory = activeCategory === "semua" || campaign.category === activeCategory;
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 px-4 border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 animate-fade-up">
              Tolong Menolong 💚
            </h1>
            <p className="text-muted-foreground mb-6 animate-fade-up-delay">
              Berikan dukungan untuk seniman dan komunitas seni Indonesia
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md animate-fade-up-delay-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari campaign donasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full border-border bg-background"
              />
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="bg-background py-4 px-4 sticky top-16 z-10 border-b border-border shadow-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "rounded-full whitespace-nowrap transition-all",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Campaigns Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Tidak ada campaign yang ditemukan
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => {
                  const progress = (campaign.collected / campaign.target) * 100;

                  return (
                    <Link
                      key={campaign.id}
                      to={`/donasi/${campaign.id}`}
                      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                            {campaign.daysLeft} hari lagi
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium mb-3 capitalize">
                          {campaign.category}
                        </span>

                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {campaign.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {campaign.description}
                        </p>

                        {/* Progress */}
                        <div className="space-y-2 mb-4">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{Math.round(progress)}% terkumpul</span>
                            <span className="font-medium text-foreground">{formatCurrency(campaign.target)}</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="w-4 h-4" />
                            <span>{campaign.donors} donatur</span>
                          </div>
                          <span className="text-sm font-medium text-primary">
                            {formatCurrency(campaign.collected)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {filteredCampaigns.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="gap-2">
                  Lihat Lebih Banyak
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donasi;
