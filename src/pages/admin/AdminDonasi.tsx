import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialDonations = [
  {
    id: 1,
    title: "Bantu Pengrajin Tenun",
    description: "Dukung pengrajin tenun tradisional Indonesia",
    target: 10000000,
    collected: 7500000,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Pendidikan Seni Anak",
    description: "Program pendidikan seni untuk anak-anak",
    target: 5000000,
    collected: 2250000,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Pelestarian Musik Tradisional",
    description: "Melestarikan alat musik tradisional nusantara",
    target: 15000000,
    collected: 9000000,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const AdminDonasi = () => {
  useDocumentTitle("Kelola Donasi - Admin");
  const { toast } = useToast();
  const [donations, setDonations] = useState(initialDonations);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    collected: "0",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationData = {
      title: formData.title,
      description: formData.description,
      target: parseInt(formData.target) || 0,
      collected: parseInt(formData.collected) || 0,
      image: formData.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=200&fit=crop",
    };
    
    if (editingId) {
      setDonations(donations.map((d) => (d.id === editingId ? { ...donationData, id: editingId } : d)));
      toast({ title: "Donasi berhasil diperbarui" });
    } else {
      setDonations([...donations, { ...donationData, id: Date.now() }]);
      toast({ title: "Donasi berhasil ditambahkan" });
    }
    resetForm();
  };

  const handleEdit = (donation: typeof initialDonations[0]) => {
    setFormData({
      title: donation.title,
      description: donation.description,
      target: donation.target.toString(),
      collected: donation.collected.toString(),
      image: donation.image,
    });
    setEditingId(donation.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setDonations(donations.filter((d) => d.id !== id));
    toast({ title: "Donasi berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", target: "", collected: "0", image: "" });
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Kelola Donasi</h1>
                <p className="text-muted-foreground">Tambah, edit, dan hapus campaign donasi</p>
              </div>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Donasi
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
                    {editingId ? "Edit Donasi" : "Tambah Donasi Baru"}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Upload Gambar Campaign
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
                    placeholder="Judul Campaign"
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
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Target Dana (Rp)
                    </label>
                    <Input
                      type="number"
                      placeholder="10000000"
                      value={formData.target}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      required
                    />
                  </div>
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
              {donations.map((donation) => {
                const progress = Math.round((donation.collected / donation.target) * 100);
                return (
                  <div
                    key={donation.id}
                    className="bg-card rounded-xl overflow-hidden border border-border"
                  >
                    <div className="aspect-[2/1] overflow-hidden">
                      <img
                        src={donation.image}
                        alt={donation.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground">{donation.title}</h3>
                      <div className="space-y-2 mt-3">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{progress}% terkumpul</span>
                          <span className="font-medium text-foreground">
                            {formatCurrency(donation.target)}
                          </span>
                        </div>
                        <p className="text-sm text-primary font-medium">
                          Terkumpul: {formatCurrency(donation.collected)}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1"
                          onClick={() => handleEdit(donation)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1 gap-1"
                          onClick={() => handleDelete(donation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDonasi;
