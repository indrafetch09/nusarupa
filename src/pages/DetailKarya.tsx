import { useParams, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, Eye, Share2, MessageCircle, Calendar, Tag } from "lucide-react";

// Mock data - in real app this would come from database
const artworksData: Record<string, {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  image: string;
  likes: number;
  views: number;
  description: string;
  createdAt: string;
  tags: string[];
  comments: { id: number; author: string; avatar: string; text: string; date: string }[];
}> = {
  "1": {
    id: 1,
    title: "Batik Mega Mendung",
    author: "Siti Rahayu",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    category: "Batik",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    likes: 245,
    views: 1200,
    description: "Batik Mega Mendung adalah motif batik khas Cirebon yang terinspirasi dari awan. Motif ini melambangkan kesabaran dan ketenangan dalam menghadapi cobaan hidup. Warna biru yang dominan menggambarkan langit dan ketenangan jiwa.",
    createdAt: "15 November 2024",
    tags: ["Batik", "Cirebon", "Tradisional", "Tekstil"],
    comments: [
      { id: 1, author: "Dewi Lestari", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop", text: "Sangat indah! Warnanya sangat khas Cirebon.", date: "2 hari lalu" },
      { id: 2, author: "Budi Santoso", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop", text: "Motifnya sangat detail dan rapi. Kerja bagus!", date: "5 hari lalu" },
    ],
  },
  "2": {
    id: 2,
    title: "Pemandangan Sawah",
    author: "Budi Santoso",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    category: "Lukisan",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
    likes: 189,
    views: 890,
    description: "Lukisan cat minyak yang menggambarkan keindahan sawah terasering di Indonesia. Karya ini terinspirasi dari pemandangan sawah di Ubud, Bali yang terkenal dengan keindahan alamnya.",
    createdAt: "10 November 2024",
    tags: ["Lukisan", "Alam", "Sawah", "Cat Minyak"],
    comments: [
      { id: 1, author: "Made Wira", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop", text: "Mengingatkan saya pada kampung halaman!", date: "1 minggu lalu" },
    ],
  },
  "3": {
    id: 3,
    title: "Keranjang Rotan Modern",
    author: "Made Wira",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    category: "Kerajinan",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&h=600&fit=crop",
    likes: 156,
    views: 678,
    description: "Kerajinan rotan dengan desain modern yang memadukan teknik tradisional dengan estetika kontemporer. Dibuat dengan tangan oleh pengrajin lokal Bali.",
    createdAt: "8 November 2024",
    tags: ["Kerajinan", "Rotan", "Modern", "Handmade"],
    comments: [],
  },
  "4": {
    id: 4,
    title: "Patung Garuda",
    author: "Komang Adi",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    category: "Patung",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&h=600&fit=crop",
    likes: 312,
    views: 1450,
    description: "Patung kayu Garuda yang diukir dengan detail tinggi. Garuda adalah lambang negara Indonesia yang melambangkan kekuatan dan keberanian.",
    createdAt: "5 November 2024",
    tags: ["Patung", "Garuda", "Kayu", "Ukiran"],
    comments: [
      { id: 1, author: "Agus Wibowo", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop", text: "Ukirannya sangat detail!", date: "3 hari lalu" },
    ],
  },
  "5": {
    id: 5,
    title: "Sunrise di Bromo",
    author: "Dewi Lestari",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    category: "Fotografi",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    likes: 423,
    views: 2100,
    description: "Foto landscape sunrise di Gunung Bromo, Jawa Timur. Diambil pada pukul 5 pagi saat kabut mulai menipis dan matahari terbit dari balik gunung.",
    createdAt: "1 November 2024",
    tags: ["Fotografi", "Landscape", "Bromo", "Sunrise"],
    comments: [
      { id: 1, author: "Raka Pratama", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=50&h=50&fit=crop", text: "Wah, timingnya perfect!", date: "1 hari lalu" },
      { id: 2, author: "Siti Rahayu", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop", text: "Breathtaking view!", date: "4 hari lalu" },
    ],
  },
  "6": {
    id: 6,
    title: "Nusantara Digital",
    author: "Raka Pratama",
    authorAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    category: "Seni Digital",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    likes: 278,
    views: 980,
    description: "Karya seni digital yang menggabungkan elemen-elemen budaya Nusantara dengan gaya futuristik. Dibuat menggunakan software digital painting.",
    createdAt: "28 Oktober 2024",
    tags: ["Digital Art", "Nusantara", "Futuristik", "Modern"],
    comments: [],
  },
};

const DetailKarya = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const artwork = id ? artworksData[id] : null;
  
  useDocumentTitle(artwork?.title || "Detail Karya");

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 px-4">
          <div className="container mx-auto max-w-4xl text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">Karya tidak ditemukan</h1>
            <p className="text-muted-foreground mb-6">Maaf, karya yang Anda cari tidak tersedia.</p>
            <Button onClick={() => navigate("/galeri")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Galeri
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Back Button */}
        <div className="bg-background border-b border-border py-4 px-4">
          <div className="container mx-auto max-w-6xl">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/galeri")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Galeri
            </Button>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden border border-border bg-card">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <Heart className="w-4 h-4" />
                  Suka ({artwork.likes})
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </Button>
              </div>

              {/* Description - Mobile */}
              <div className="lg:hidden mt-6 p-4 bg-card rounded-xl border border-border">
                <h1 className="text-2xl font-bold text-foreground mb-2">{artwork.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Eye className="w-4 h-4" />
                  <span>{artwork.views} views</span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4" />
                  <span>{artwork.createdAt}</span>
                </div>
                <p className="text-foreground leading-relaxed">{artwork.description}</p>
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Komentar ({artwork.comments.length})
                </h2>
                
                {artwork.comments.length === 0 ? (
                  <div className="bg-muted/30 rounded-xl p-6 text-center">
                    <p className="text-muted-foreground">Belum ada komentar. Jadilah yang pertama!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {artwork.comments.map((comment) => (
                      <div key={comment.id} className="bg-card rounded-xl p-4 border border-border">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-foreground">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Title & Stats - Desktop */}
              <div className="hidden lg:block bg-card rounded-xl border border-border p-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">{artwork.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {artwork.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {artwork.likes}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{artwork.createdAt}</span>
                </div>
                <p className="text-foreground leading-relaxed">{artwork.description}</p>
              </div>

              {/* Author */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Seniman</h3>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={artwork.authorAvatar} alt={artwork.author} />
                    <AvatarFallback>{artwork.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{artwork.author}</p>
                    <p className="text-sm text-muted-foreground">Seniman Nusarupa</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Lihat Profil
                </Button>
              </div>

              {/* Category */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Kategori</h3>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {artwork.category}
                </span>
              </div>

              {/* Tags */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailKarya;
