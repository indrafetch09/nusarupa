import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Image, Users, Heart, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Image, label: "Galeri Karya", href: "/galeri" },
  { icon: Users, label: "Kolaborasi", href: "/kolaborasi" },
  { icon: Heart, label: "Donasi", href: "/donasi" },
];

const recommendations = [
  {
    id: 1,
    title: "Batik Kontemporer",
    author: "Siti Rahayu",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Lukisan Alam",
    author: "Budi Santoso",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Kerajinan Rotan",
    author: "Made Wira",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=400&h=300&fit=crop",
  },
];

const donationItems = [
  {
    id: 1,
    title: "Bantu Pengrajin Tenun",
    progress: 75,
    target: "Rp 10.000.000",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Pendidikan Seni Anak",
    progress: 45,
    target: "Rp 5.000.000",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=200&fit=crop",
  },
];

const Home = () => {
  useDocumentTitle("Beranda");
  const { user } = useAuth();

  const firstName = user?.user_metadata?.full_name?.split(" ")[ 0 ] || "Kawan";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-background py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Haii {firstName}
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              mau aktif kegiatan apa hari ini?
            </p>
          </div>
        </section>

        {/* Menu Section */}
        <section className="bg-[hsl(45,100%,85%)] py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center gap-3 p-4 md:p-6 bg-background rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-foreground text-center">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Rekomendasi Karya</h2>
              <Link to="/galeri">
                <Button variant="ghost" size="sm" className="text-primary">
                  Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((item) => (
                <Link
                  key={item.id}
                  to={`/karya/${item.id}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="py-10 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Tolong Menolong</h2>
              <Link to="/donasi">
                <Button variant="ghost" size="sm" className="text-primary">
                  Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donationItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/donasi/${item.id}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[2/1] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground mb-3">{item.title}</h3>
                    <div className="space-y-2">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.progress}% terkumpul</span>
                        <span className="font-medium text-foreground">{item.target}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
