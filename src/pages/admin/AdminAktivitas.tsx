import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialActivities = [
  {
    id: 1,
    title: "Workshop Batik Modern",
    description: "Belajar teknik batik kontemporer",
    date: "2024-02-15",
    time: "09:00",
    location: "Gedung Seni Jakarta",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Pameran Seni Rupa",
    description: "Pameran karya seniman muda Indonesia",
    date: "2024-02-20",
    time: "10:00",
    location: "Museum Nasional",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Festival Musik Tradisional",
    description: "Pertunjukan musik tradisional nusantara",
    date: "2024-03-01",
    time: "19:00",
    location: "Taman Ismail Marzuki",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop",
  },
];

const AdminAktivitas = () => {
  useDocumentTitle("Kelola Aktivitas - Admin");
  const { toast } = useToast();
  const [activities, setActivities] = useState(initialActivities);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setActivities(activities.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a)));
      toast({ title: "Aktivitas berhasil diperbarui" });
    } else {
      setActivities([...activities, { ...formData, id: Date.now() }]);
      toast({ title: "Aktivitas berhasil ditambahkan" });
    }
    resetForm();
  };

  const handleEdit = (activity: typeof initialActivities[0]) => {
    setFormData({
      title: activity.title,
      description: activity.description,
      date: activity.date,
      time: activity.time,
      location: activity.location,
      image: activity.image,
    });
    setEditingId(activity.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
    toast({ title: "Aktivitas berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", date: "", time: "", location: "", image: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-background py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Kelola Aktivitas & Kolaborasi</h1>
                <p className="text-muted-foreground">Tambah, edit, dan hapus event</p>
              </div>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Aktivitas
              </Button>
            </div>
          </div>
        </section>

        {/* Form Section */}
        {showForm && (
          <section className="py-6 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    {editingId ? "Edit Aktivitas" : "Tambah Aktivitas Baru"}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Upload Poster Kegiatan
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Unggah gambar untuk ditampilkan pada halaman user
                    </p>
                  </div>
                  <Input
                    placeholder="Judul Kegiatan"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Deskripsi"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Tanggal
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Waktu
                      </label>
                      <Input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Input
                    placeholder="Lokasi"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Simpan
                  </Button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* List Section */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-card rounded-xl overflow-hidden border border-border"
                >
                  <div className="aspect-[2/1] overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground">{activity.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.date} • {activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleEdit(activity)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleDelete(activity.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminAktivitas;
