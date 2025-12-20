import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronRight,
  Palette,
  Music,
  Camera,
  Brush,
} from "lucide-react";

const categories = [
  { id: "semua", label: "Semua", icon: null },
  { id: "workshop", label: "Workshop", icon: Brush },
  { id: "pameran", label: "Pameran", icon: Palette },
  { id: "musik", label: "Musik", icon: Music },
  { id: "fotografi", label: "Fotografi", icon: Camera },
];

const activities = [
  {
    id: 1,
    title: "Workshop Batik Tulis untuk Pemula",
    category: "workshop",
    description: "Pelajari teknik dasar membuat batik tulis dengan panduan dari pengrajin berpengalaman.",
    date: "25 Desember 2024",
    time: "09:00 - 15:00 WIB",
    location: "Studio Batik Nusantara, Yogyakarta",
    participants: 12,
    maxParticipants: 20,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    organizer: {
      name: "Siti Rahayu",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    status: "open",
  },
  {
    id: 2,
    title: "Pameran Seni Rupa Kontemporer 2024",
    category: "pameran",
    description: "Pameran karya seni rupa kontemporer dari 50+ seniman muda Indonesia.",
    date: "1-15 Januari 2025",
    time: "10:00 - 20:00 WIB",
    location: "Galeri Nasional Indonesia, Jakarta",
    participants: 156,
    maxParticipants: 500,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
    organizer: {
      name: "Komunitas Seni Jakarta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    status: "open",
  },
  {
    id: 3,
    title: "Kolaborasi Musik Tradisional & Modern",
    category: "musik",
    description: "Workshop kolaborasi antara musisi tradisional gamelan dengan musisi modern.",
    date: "28 Desember 2024",
    time: "14:00 - 18:00 WIB",
    location: "Taman Budaya Surakarta",
    participants: 25,
    maxParticipants: 30,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    organizer: {
      name: "Made Wira",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    status: "almost-full",
  },
  {
    id: 4,
    title: "Hunting Foto Arsitektur Nusantara",
    category: "fotografi",
    description: "Jelajahi dan abadikan keindahan arsitektur tradisional Indonesia bersama komunitas fotografi.",
    date: "30 Desember 2024",
    time: "06:00 - 12:00 WIB",
    location: "Kota Tua, Jakarta",
    participants: 18,
    maxParticipants: 25,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    organizer: {
      name: "Dewi Lestari",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    status: "open",
  },
  {
    id: 5,
    title: "Workshop Lukis Cat Air Pemandangan",
    category: "workshop",
    description: "Belajar teknik melukis pemandangan alam dengan cat air bersama pelukis profesional.",
    date: "5 Januari 2025",
    time: "09:00 - 13:00 WIB",
    location: "Art Space Bandung",
    participants: 8,
    maxParticipants: 15,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop",
    organizer: {
      name: "Budi Santoso",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    status: "open",
  },
  {
    id: 6,
    title: "Pameran Fotografi Budaya Nusantara",
    category: "pameran",
    description: "Pameran foto dokumentasi budaya dan tradisi dari berbagai daerah di Indonesia.",
    date: "10-20 Januari 2025",
    time: "09:00 - 17:00 WIB",
    location: "Museum Nasional, Jakarta",
    participants: 89,
    maxParticipants: 300,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop",
    organizer: {
      name: "Raka Pratama",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    },
    status: "open",
  },
];

const getStatusBadge = (status: string, participants: number, maxParticipants: number) => {
  const percentage = (participants / maxParticipants) * 100;
  
  if (status === "closed" || percentage >= 100) {
    return { text: "Penuh", className: "bg-destructive/10 text-destructive" };
  }
  if (status === "almost-full" || percentage >= 80) {
    return { text: "Hampir Penuh", className: "bg-orange/20 text-orange-700" };
  }
  return { text: "Tersedia", className: "bg-primary/10 text-primary" };
};

const Kolaborasi = () => {
  useDocumentTitle("Kolaborasi & Aktivitas");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = activities.filter((activity) => {
    const matchesCategory = activeCategory === "semua" || activity.category === activeCategory;
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase());
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
              Kolaborasi & Aktivitas 🤝
            </h1>
            <p className="text-muted-foreground mb-6 animate-fade-up-delay">
              Temukan workshop, pameran, dan event seni dari komunitas Nusarupa
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md animate-fade-up-delay-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari aktivitas atau lokasi..."
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
                    "rounded-full whitespace-nowrap transition-all gap-2",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {category.icon && <category.icon className="w-4 h-4" />}
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Activities List */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Tidak ada aktivitas yang ditemukan
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredActivities.map((activity) => {
                  const statusBadge = getStatusBadge(activity.status, activity.participants, activity.maxParticipants);
                  
                  return (
                    <Link
                      key={activity.id}
                      to={`/aktivitas/${activity.id}`}
                      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            statusBadge.className
                          )}>
                            {statusBadge.text}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Category Badge */}
                        <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium mb-3 capitalize">
                          {activity.category}
                        </span>

                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {activity.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {activity.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{activity.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="line-clamp-1">{activity.location}</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={activity.organizer.avatar} alt={activity.organizer.name} />
                              <AvatarFallback>{activity.organizer.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-foreground font-medium">
                              {activity.organizer.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{activity.participants}/{activity.maxParticipants}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {filteredActivities.length > 0 && (
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

export default Kolaborasi;
