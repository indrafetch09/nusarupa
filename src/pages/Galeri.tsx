import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Heart, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "semua", label: "Semua" },
  { id: "lukisan", label: "Lukisan" },
  { id: "batik", label: "Batik" },
  { id: "kerajinan", label: "Kerajinan" },
  { id: "patung", label: "Patung" },
  { id: "fotografi", label: "Fotografi" },
  { id: "digital", label: "Seni Digital" },
];

const artworks = [
  {
    id: 1,
    title: "Batik Mega Mendung",
    author: "Siti Rahayu",
    category: "batik",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    likes: 245,
    views: 1200,
  },
  {
    id: 2,
    title: "Pemandangan Sawah",
    author: "Budi Santoso",
    category: "lukisan",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
    likes: 189,
    views: 890,
  },
  {
    id: 3,
    title: "Keranjang Rotan Modern",
    author: "Made Wira",
    category: "kerajinan",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=400&h=400&fit=crop",
    likes: 156,
    views: 678,
  },
  {
    id: 4,
    title: "Patung Garuda",
    author: "Komang Adi",
    category: "patung",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&h=400&fit=crop",
    likes: 312,
    views: 1450,
  },
  {
    id: 5,
    title: "Sunrise di Bromo",
    author: "Dewi Lestari",
    category: "fotografi",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    likes: 423,
    views: 2100,
  },
  {
    id: 6,
    title: "Nusantara Digital",
    author: "Raka Pratama",
    category: "digital",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    likes: 278,
    views: 980,
  },
  {
    id: 7,
    title: "Batik Parang Rusak",
    author: "Kartini Dewi",
    category: "batik",
    image: "https://images.unsplash.com/photo-1569091791842-7cfb64e04797?w=400&h=400&fit=crop",
    likes: 198,
    views: 756,
  },
  {
    id: 8,
    title: "Abstrak Nusantara",
    author: "Ahmad Fauzi",
    category: "lukisan",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    likes: 267,
    views: 1340,
  },
  {
    id: 9,
    title: "Anyaman Bambu",
    author: "Nyoman Sari",
    category: "kerajinan",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop",
    likes: 134,
    views: 567,
  },
  {
    id: 10,
    title: "Tari Kecak",
    author: "Putu Agung",
    category: "fotografi",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=400&fit=crop",
    likes: 389,
    views: 1890,
  },
  {
    id: 11,
    title: "Wayang Digital",
    author: "Dian Permata",
    category: "digital",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=400&fit=crop",
    likes: 245,
    views: 1100,
  },
  {
    id: 12,
    title: "Relief Candi",
    author: "Agus Wibowo",
    category: "patung",
    image: "https://images.unsplash.com/photo-1551913902-c92207136625?w=400&h=400&fit=crop",
    likes: 178,
    views: 834,
  },
];

const Galeri = () => {
  useDocumentTitle("Galeri Karya");
  const [ activeCategory, setActiveCategory ] = useState("semua");
  const [ searchQuery, setSearchQuery ] = useState("");

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesCategory = activeCategory === "semua" || artwork.category === activeCategory;
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-background py-10 px-4 border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Galeri Karya
            </h1>
            <p className="text-muted-foreground mb-6">
              Jelajahi berbagai karya seni dari seniman Nusantara
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari karya atau seniman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full border-border bg-muted/50"
              />
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="bg-muted/30 py-4 px-4 sticky top-16 z-10 border-b border-border">
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

        {/* Artwork Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {filteredArtworks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Tidak ada karya yang ditemukan
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredArtworks.map((artwork) => (
                  <Link
                    key={artwork.id}
                    to={`/karya/${artwork.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-1">
                        {artwork.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">
                        {artwork.author}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {artwork.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {artwork.views}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Galeri;
