import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, Ticket } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Workshop Batik Tulis untuk Pemula",
    category: "workshop",
    description: "Pelajari teknik dasar membuat batik tulis dengan panduan dari pengrajin berpengalaman. Workshop ini cocok untuk pemula yang ingin mengenal dan mempelajari seni batik tradisional Indonesia.",
    fullDescription: `Workshop ini akan mengajarkan Anda tentang sejarah batik, jenis-jenis motif tradisional, dan teknik dasar pembuatan batik tulis. 

Anda akan belajar langsung dari pengrajin batik yang telah berpengalaman lebih dari 20 tahun dalam industri batik. Di akhir workshop, Anda akan membawa pulang karya batik pertama Anda!

Fasilitas yang disediakan:
• Kain mori dan bahan pewarna
• Canting dan lilin/malam
• Makan siang dan snack
• Sertifikat keikutsertaan`,
    date: "25 Desember 2024",
    time: "09:00 - 15:00 WIB",
    location: "Studio Batik Nusantara, Yogyakarta",
    address: "Jl. Prawirotaman No. 42, Yogyakarta 55153",
    participants: 12,
    maxParticipants: 20,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    organizer: {
      name: "Siti Rahayu",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      bio: "Pengrajin batik berpengalaman 20+ tahun",
    },
    price: 150000,
    requirements: [
      "Tidak perlu pengalaman sebelumnya",
      "Membawa pakaian yang tidak takut kotor",
      "Usia minimal 12 tahun",
      "Hadir tepat waktu",
    ],
  },
  {
    id: 2,
    title: "Pameran Seni Rupa Kontemporer 2024",
    category: "pameran",
    description: "Pameran karya seni rupa kontemporer dari 50+ seniman muda Indonesia.",
    fullDescription: `Pameran seni rupa terbesar tahun ini menampilkan karya-karya inovatif dari lebih dari 50 seniman muda Indonesia.

Tema pameran tahun ini adalah "Identitas dalam Perubahan", mengeksplorasi bagaimana seniman muda melihat dan merespons perubahan sosial dan budaya di Indonesia.

Highlight acara:
• Karya lukis, patung, dan instalasi
• Sesi diskusi dengan seniman
• Workshop singkat setiap akhir pekan
• Katalog pameran eksklusif`,
    date: "1-15 Januari 2025",
    time: "10:00 - 20:00 WIB",
    location: "Galeri Nasional Indonesia, Jakarta",
    address: "Jl. Medan Merdeka Timur No. 14, Jakarta Pusat",
    participants: 156,
    maxParticipants: 500,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=500&fit=crop",
    organizer: {
      name: "Komunitas Seni Jakarta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      bio: "Komunitas seni rupa terbesar di Jakarta",
    },
    price: 0,
    requirements: [
      "Terbuka untuk umum",
      "Dilarang menyentuh karya seni",
      "Fotografi diperbolehkan tanpa flash",
      "Anak di bawah 12 tahun harus didampingi",
    ],
  },
  {
    id: 3,
    title: "Kolaborasi Musik Tradisional & Modern",
    category: "musik",
    description: "Workshop kolaborasi antara musisi tradisional gamelan dengan musisi modern.",
    fullDescription: `Sebuah workshop unik yang mempertemukan musik tradisional gamelan dengan genre musik modern seperti jazz dan elektronik.

Workshop ini dipandu oleh maestro gamelan dan produser musik profesional yang akan mengajarkan teknik-teknik kolaborasi lintas genre.

Yang akan dipelajari:
• Dasar-dasar gamelan Jawa
• Teknik mixing tradisional-modern
• Jamming session bersama
• Recording sederhana`,
    date: "28 Desember 2024",
    time: "14:00 - 18:00 WIB",
    location: "Taman Budaya Surakarta",
    address: "Jl. Ir. Sutami No. 57, Surakarta 57126",
    participants: 25,
    maxParticipants: 30,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=500&fit=crop",
    organizer: {
      name: "Made Wira",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      bio: "Musisi dan produser musik etnik",
    },
    price: 75000,
    requirements: [
      "Terbuka untuk semua level",
      "Diutamakan yang bisa memainkan alat musik",
      "Membawa alat musik sendiri (opsional)",
      "Berpakaian nyaman",
    ],
  },
  {
    id: 4,
    title: "Hunting Foto Arsitektur Nusantara",
    category: "fotografi",
    description: "Jelajahi dan abadikan keindahan arsitektur tradisional Indonesia bersama komunitas fotografi.",
    fullDescription: `Tur fotografi yang akan membawa Anda menjelajahi keindahan arsitektur kolonial dan tradisional di kawasan Kota Tua Jakarta.

Dipandu oleh fotografer arsitektur profesional, Anda akan belajar teknik-teknik khusus untuk mengabadikan keindahan bangunan bersejarah.

Rute hunting:
• Museum Fatahillah
• Gedung-gedung kolonial
• Pelabuhan Sunda Kelapa
• Jembatan Kota Intan`,
    date: "30 Desember 2024",
    time: "06:00 - 12:00 WIB",
    location: "Kota Tua, Jakarta",
    address: "Museum Fatahillah, Jl. Taman Fatahillah No. 1",
    participants: 18,
    maxParticipants: 25,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    organizer: {
      name: "Dewi Lestari",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      bio: "Fotografer arsitektur & travel",
    },
    price: 50000,
    requirements: [
      "Membawa kamera (HP/DSLR/mirrorless)",
      "Sepatu nyaman untuk jalan kaki",
      "Topi/payung untuk perlindungan matahari",
      "Meeting point tepat waktu",
    ],
  },
  {
    id: 5,
    title: "Workshop Lukis Cat Air Pemandangan",
    category: "workshop",
    description: "Belajar teknik melukis pemandangan alam dengan cat air bersama pelukis profesional.",
    fullDescription: `Workshop intensif selama 4 jam untuk mempelajari teknik melukis pemandangan alam dengan cat air.

Cocok untuk pemula maupun yang ingin mengasah kemampuan melukis. Semua peralatan disediakan dan karya Anda bisa dibawa pulang!

Materi workshop:
• Pengenalan cat air dan teknik dasar
• Mixing warna untuk pemandangan
• Teknik wet-on-wet dan wet-on-dry
• Melukis langit, pegunungan, dan vegetasi`,
    date: "5 Januari 2025",
    time: "09:00 - 13:00 WIB",
    location: "Art Space Bandung",
    address: "Jl. Braga No. 99, Bandung 40111",
    participants: 8,
    maxParticipants: 15,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=500&fit=crop",
    organizer: {
      name: "Budi Santoso",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      bio: "Pelukis cat air profesional",
    },
    price: 200000,
    requirements: [
      "Tidak perlu pengalaman sebelumnya",
      "Semua peralatan disediakan",
      "Usia minimal 15 tahun",
      "Membawa celemek (opsional)",
    ],
  },
  {
    id: 6,
    title: "Pameran Fotografi Budaya Nusantara",
    category: "pameran",
    description: "Pameran foto dokumentasi budaya dan tradisi dari berbagai daerah di Indonesia.",
    fullDescription: `Pameran fotografi yang menampilkan keindahan dan keragaman budaya Indonesia dari Sabang sampai Merauke.

Lebih dari 200 foto karya fotografer dokumenter terbaik Indonesia dipamerkan, menampilkan upacara adat, kehidupan sehari-hari, dan lanskap budaya.

Highlight:
• Foto upacara adat dari 34 provinsi
• Sesi talkshow dengan fotografer
• Screening dokumenter
• Merchandise eksklusif`,
    date: "10-20 Januari 2025",
    time: "09:00 - 17:00 WIB",
    location: "Museum Nasional, Jakarta",
    address: "Jl. Medan Merdeka Barat No. 12, Jakarta Pusat",
    participants: 89,
    maxParticipants: 300,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=500&fit=crop",
    organizer: {
      name: "Raka Pratama",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
      bio: "Kurator dan fotografer dokumenter",
    },
    price: 25000,
    requirements: [
      "Tiket dapat dibeli di lokasi",
      "Tersedia audio guide (sewa terpisah)",
      "Fotografi diperbolehkan",
      "Tersedia akses disabilitas",
    ],
  },
];

const formatCurrency = (amount: number) => {
  if (amount === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const DetailAktivitas = () => {
  const { id } = useParams();
  const activity = activities.find((a) => a.id === Number(id));

  useDocumentTitle(activity?.title || "Detail Aktivitas");

  if (!activity) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 px-4">
          <div className="container mx-auto max-w-4xl text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">Aktivitas tidak ditemukan</h1>
            <Link to="/kolaborasi">
              <Button>Kembali ke Daftar Aktivitas</Button>
            </Link>
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
        <div className="bg-background border-b border-border">
          <div className="container mx-auto max-w-4xl px-4 py-4">
            <Link
              to="/kolaborasi"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Aktivitas
            </Link>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 capitalize">
                  {activity.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {activity.title}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>

              {/* Details */}
              <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Tanggal</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Waktu</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{activity.location}</p>
                    <p className="text-sm text-muted-foreground">{activity.address}</p>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Deskripsi Lengkap</h2>
                <div className="prose prose-sm text-muted-foreground whitespace-pre-line">
                  {activity.fullDescription}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Syarat & Ketentuan</h2>
                <ul className="space-y-2">
                  {activity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price & CTA Card */}
              <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                {/* Organizer */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={activity.organizer.avatar} alt={activity.organizer.name} />
                    <AvatarFallback>{activity.organizer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{activity.organizer.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.organizer.bio}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Harga</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(activity.price)}
                  </p>
                </div>

                {/* Participants */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                  <Users className="w-4 h-4" />
                  <span>{activity.participants}/{activity.maxParticipants} peserta</span>
                </div>

                {/* CTA */}
                <Link to={`/aktivitas/${activity.id}/daftar`}>
                  <Button className="w-full h-12 text-base font-semibold gap-2">
                    <Ticket className="w-5 h-5" />
                    {activity.price === 0 ? "Daftar Sekarang" : "Beli Tiket"}
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

export default DetailAktivitas;
