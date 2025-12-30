import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";
import { Image, Calendar, Heart, Users, Loader2 } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";

const AdminDashboard = () => {
  useDocumentTitle("Dashboard Admin");
  const { stats, loading, error } = useDashboardStats();

  const statsCards = [
    {
      title: "Total Karya",
      value: stats.totalArtworks.toString(),
      icon: Image,
      description: "Karya seni terdaftar",
      loading: loading,
    },
    {
      title: "Total Aktivitas",
      value: stats.totalActivities.toString(),
      icon: Calendar,
      description: "Event terdaftar",
      loading: loading,
    },
    {
      title: "Total Donasi",
      value: stats.totalDonations.toString(),
      icon: Heart,
      description: "Campaign donasi",
      loading: loading,
    },
    {
      title: "Total Pengguna",
      value: stats.totalUsers.toString(),
      icon: Users,
      description: "Anggota komunitas",
      loading: loading,
    },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNavbar />
        <main className="pt-16">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">Error loading dashboard: {error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-background py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Dashboard Admin
            </h1>
            <p className="text-lg text-muted-foreground">
              Kelola konten komunitas Nusarupa
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statsCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {card.loading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      card.value
                    )}
                  </h3>
                  <p className="text-sm font-medium text-foreground mt-1">{card.title}</p>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-10 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xl font-semibold text-foreground mb-6">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/karya"
                className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Image className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Kelola Karya</h3>
                  <p className="text-sm text-muted-foreground">Tambah, edit, hapus karya</p>
                </div>
              </a>
              <a
                href="/admin/aktivitas"
                className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Kelola Aktivitas</h3>
                  <p className="text-sm text-muted-foreground">Tambah, edit, hapus event</p>
                </div>
              </a>
              <a
                href="/admin/donasi"
                className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Kelola Donasi</h3>
                  <p className="text-sm text-muted-foreground">Tambah, edit, hapus campaign</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
