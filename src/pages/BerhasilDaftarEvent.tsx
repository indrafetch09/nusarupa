import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Home, User } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Workshop Batik Tulis untuk Pemula",
    date: "25 Desember 2024",
    time: "09:00 - 15:00 WIB",
    location: "Studio Batik Nusantara, Yogyakarta",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Pameran Seni Rupa Kontemporer 2024",
    date: "1-15 Januari 2025",
    time: "10:00 - 20:00 WIB",
    location: "Galeri Nasional Indonesia, Jakarta",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Kolaborasi Musik Tradisional & Modern",
    date: "28 Desember 2024",
    time: "14:00 - 18:00 WIB",
    location: "Taman Budaya Surakarta",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Hunting Foto Arsitektur Nusantara",
    date: "30 Desember 2024",
    time: "06:00 - 12:00 WIB",
    location: "Kota Tua, Jakarta",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Workshop Lukis Cat Air Pemandangan",
    date: "5 Januari 2025",
    time: "09:00 - 13:00 WIB",
    location: "Art Space Bandung",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Pameran Fotografi Budaya Nusantara",
    date: "10-20 Januari 2025",
    time: "09:00 - 17:00 WIB",
    location: "Museum Nasional, Jakarta",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop",
  },
];

const BerhasilDaftarEvent = () => {
  useDocumentTitle("Pendaftaran Berhasil");
  const { id } = useParams();
  const activity = activities.find((a) => a.id === Number(id));

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
            Pendaftaran Berhasil! 🎉
          </h1>
          <p className="text-muted-foreground mb-8 animate-fade-up-delay">
            Anda telah terdaftar untuk mengikuti aktivitas ini
          </p>

          {/* Event Info */}
          {activity && (
            <div className="bg-card rounded-xl p-6 border border-border mb-8 text-left animate-fade-up-delay-2">
              <div className="flex gap-4 pb-4 border-b border-border mb-4">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2">{activity.title}</h3>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{activity.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{activity.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-primary mt-0.5" />
                  <span className="text-foreground">{activity.location}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-primary/5 rounded-xl p-4 mb-8 animate-fade-up-delay-2">
            <p className="text-sm text-muted-foreground">
              Detail pendaftaran telah dikirim ke email Anda. Jangan lupa untuk hadir tepat waktu!
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
                <User className="w-5 h-5" />
                Lihat Aktivitas Saya
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BerhasilDaftarEvent;
