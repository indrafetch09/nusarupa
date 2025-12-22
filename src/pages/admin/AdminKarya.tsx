import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialArtworks = [
  {
    id: 1,
    title: "Batik Kontemporer",
    author: "Siti Rahayu",
    description: "Karya batik modern dengan motif tradisional",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Lukisan Alam",
    author: "Budi Santoso",
    description: "Lukisan pemandangan alam Indonesia",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Kerajinan Rotan",
    author: "Made Wira",
    description: "Kerajinan tangan dari rotan asli Bali",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=400&h=300&fit=crop",
  },
];

const AdminKarya = () => {
  useDocumentTitle("Kelola Karya - Admin");
  const { toast } = useToast();
  const [artworks, setArtworks] = useState(initialArtworks);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setArtworks(artworks.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a)));
      toast({ title: "Karya berhasil diperbarui" });
    } else {
      setArtworks([...artworks, { ...formData, id: Date.now() }]);
      toast({ title: "Karya berhasil ditambahkan" });
    }
    resetForm();
  };

  const handleEdit = (artwork: typeof initialArtworks[0]) => {
    setFormData({
      title: artwork.title,
      author: artwork.author,
      description: artwork.description,
      image: artwork.image,
    });
    setEditingId(artwork.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setArtworks(artworks.filter((a) => a.id !== id));
    toast({ title: "Karya berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ title: "", author: "", description: "", image: "" });
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Kelola Karya</h1>
                <p className="text-muted-foreground">Tambah, edit, dan hapus karya seni</p>
              </div>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Karya
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
                    {editingId ? "Edit Karya" : "Tambah Karya Baru"}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Upload Gambar
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
                    placeholder="Judul Karya"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Nama Pembuat"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Deskripsi Singkat"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="bg-card rounded-xl overflow-hidden border border-border"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">{artwork.author}</p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleEdit(artwork)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleDelete(artwork.id)}
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

export default AdminKarya;
