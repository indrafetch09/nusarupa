import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { useState } from "react";

const programs = [
  {
    id: 1,
    title: "Mengajar di Pelosok",
    category: "Pendidikan",
    location: "NTT, Indonesia",
    date: "20-25 Jan 2024",
    participants: 25,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
    description: "Program mengajar untuk anak-anak di daerah terpencil Nusa Tenggara Timur.",
  },
  {
    id: 2,
    title: "Pembersihan Pantai",
    category: "Lingkungan",
    location: "Bali, Indonesia",
    date: "5-7 Feb 2024",
    participants: 50,
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop",
    description: "Aksi bersih pantai dan edukasi pengelolaan sampah bagi masyarakat pesisir.",
  },
  {
    id: 3,
    title: "Bakti Sosial Kesehatan",
    category: "Kesehatan",
    location: "Jawa Barat, Indonesia",
    date: "15-17 Feb 2024",
    participants: 30,
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop",
    description: "Pemeriksaan kesehatan gratis dan penyuluhan gizi untuk masyarakat desa.",
  },
  {
    id: 4,
    title: "Renovasi Sekolah",
    category: "Infrastruktur",
    location: "Sulawesi Selatan",
    date: "1-10 Mar 2024",
    participants: 40,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
    description: "Renovasi dan pembangunan fasilitas sekolah dasar di daerah tertinggal.",
  },
  {
    id: 5,
    title: "Pelatihan UMKM",
    category: "Ekonomi",
    location: "Yogyakarta, Indonesia",
    date: "20-22 Mar 2024",
    participants: 35,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop",
    description: "Pelatihan kewirausahaan dan digitalisasi untuk pelaku UMKM lokal.",
  },
  {
    id: 6,
    title: "Konservasi Hutan",
    category: "Lingkungan",
    location: "Kalimantan Timur",
    date: "5-12 Apr 2024",
    participants: 20,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    description: "Program penanaman pohon dan pelestarian hutan hujan tropis.",
  },
];

const categories = [ "Semua", "Pendidikan", "Lingkungan", "Kesehatan", "Infrastruktur", "Ekonomi" ];

const Program = () => {
  useDocumentTitle("Program");
  const [ activeCategory, setActiveCategory ] = useState("Semua");
  const filteredPrograms = programs.filter((program) => {
    if (activeCategory === "Semua") return true;
    return program.category === activeCategory;
  })


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
                Program <span className="text-primary">Volunteer</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up-delay">
                Temukan berbagai program volunteer yang sesuai dengan minat dan kemampuanmu.
                Bergabung bersama kami untuk memberikan dampak positif bagi masyarakat.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-border/50">
          <div className="container px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-background rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {program.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {program.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{program.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{program.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{program.participants} relawan dibutuhkan</span>
                      </div>
                    </div>
                    <Link to="/auth?mode=register">
                      <Button className="w-full group/btn">
                        Daftar Sekarang
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Tidak menemukan program yang cocok?
              </h2>
              <p className="text-muted-foreground mb-6">
                Hubungi kami untuk mendiskusikan kebutuhan volunteer Anda atau ajukan program baru.
              </p>
              <Link to="/kontak">
                <Button variant="outline" size="lg">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Program;
