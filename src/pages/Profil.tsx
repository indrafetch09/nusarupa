import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  User, 
  Mail, 
  Edit, 
  Calendar, 
  Heart, 
  CheckCircle2,
  MapPin,
  Clock,
  X
} from "lucide-react";

// Mock data for user activities
const userActivities = [
  {
    id: 1,
    title: "Workshop Batik Tulis untuk Pemula",
    date: "25 Desember 2024",
    location: "Studio Batik Nusantara, Yogyakarta",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Kolaborasi Musik Tradisional & Modern",
    date: "28 Desember 2024",
    location: "Taman Budaya Surakarta",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=200&fit=crop",
    status: "upcoming",
  },
];

const userDonations = [
  {
    id: 1,
    title: "Bantu Pengrajin Tenun Flores",
    amount: 50000,
    date: "20 Desember 2024",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Revitalisasi Sanggar Tari Tradisional",
    amount: 100000,
    date: "15 Desember 2024",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=200&fit=crop",
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

const Profil = () => {
  useDocumentTitle("Profil Saya");
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    bio: "Pecinta seni dan budaya Indonesia. Aktif mengikuti workshop dan event komunitas Nusarupa.",
  });

  const handleSave = () => {
    toast.success("Profil berhasil diperbarui!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Profile Header */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 px-4 border-b border-border">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-lg">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url} 
                  alt={formData.fullName} 
                />
                <AvatarFallback className="text-2xl md:text-3xl bg-primary text-primary-foreground">
                  {formData.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {formData.fullName || "Nama Pengguna"}
                </h1>
                <p className="text-muted-foreground mb-3">{formData.email}</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  {formData.bio}
                </p>
              </div>

              {/* Edit Button */}
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profil
              </Button>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <Tabs defaultValue="aktivitas" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-muted/50">
                <TabsTrigger value="aktivitas" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Aktivitas Saya
                </TabsTrigger>
                <TabsTrigger value="donasi" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Donasi Saya
                </TabsTrigger>
              </TabsList>

              {/* Aktivitas Tab */}
              <TabsContent value="aktivitas">
                {userActivities.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Belum ada aktivitas yang diikuti</p>
                    <Link to="/kolaborasi">
                      <Button>Jelajahi Aktivitas</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userActivities.map((activity) => (
                      <Link
                        key={activity.id}
                        to={`/aktivitas/${activity.id}`}
                        className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
                      >
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-foreground line-clamp-2">
                              {activity.title}
                            </h3>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full flex-shrink-0">
                              <CheckCircle2 className="w-3 h-3" />
                              Terdaftar
                            </span>
                          </div>
                          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{activity.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span className="line-clamp-1">{activity.location}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Donasi Tab */}
              <TabsContent value="donasi">
                {userDonations.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Belum ada riwayat donasi</p>
                    <Link to="/donasi">
                      <Button>Mulai Berdonasi</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userDonations.map((donation) => (
                      <Link
                        key={donation.id}
                        to={`/donasi/${donation.id}`}
                        className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
                      >
                        <img
                          src={donation.image}
                          alt={donation.title}
                          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground line-clamp-2">
                            {donation.title}
                          </h3>
                          <div className="mt-2 space-y-1">
                            <p className="text-primary font-semibold">
                              {formatCurrency(donation.amount)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {donation.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-md p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Edit Profil</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Nama Lengkap
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Masukkan email"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="mb-2 block">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Ceritakan tentang diri Anda"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profil;
