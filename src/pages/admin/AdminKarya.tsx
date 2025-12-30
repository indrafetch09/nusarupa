import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useArtworks } from "@/hooks/useArtworks";
import type { Database } from "@/integrations/supabase/types";

type Artwork = Database[ "public" ][ "Tables" ][ "artworks" ][ "Row" ]

const categories = [
  { id: "lukisan", label: "Lukisan" },
  { id: "batik", label: "Batik" },
  { id: "kerajinan", label: "Kerajinan" },
  { id: "patung", label: "Patung" },
  { id: "fotografi", label: "Fotografi" },
  { id: "digital", label: "Seni Digital" },
];

const AdminKarya = () => {
  useDocumentTitle("Kelola Karya - Admin");
  const { toast } = useToast();
  const { artworks, loading, error, createArtwork, updateArtwork, deleteArtwork, uploadImage } = useArtworks();
  const [ showForm, setShowForm ] = useState(false);
  const [ editingId, setEditingId ] = useState<string | null>(null);
  const [ formData, setFormData ] = useState({
    title: "",
    author: "",
    description: "",
    image_url: "",
    category: "lukisan",
  });
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const artworkData = {
        title: formData.title,
        author: formData.author,
        description: formData.description || null,
        image_url: formData.image_url || null,
        category: formData.category,
      };

      if (editingId) {
        await updateArtwork(editingId, artworkData);
      } else {
        await createArtwork(artworkData);
      }
      resetForm();
    } catch (err) {
      console.error("Error saving artwork:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setFormData({
      title: artwork.title,
      author: artwork.author,
      description: artwork.description || "",
      image_url: artwork.image_url || "",
      category: artwork.category,
    });
    setEditingId(artwork.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus karya ini?")) {
      await deleteArtwork(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      image_url: "",
      category: "lukisan",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[ 0 ];
    if (file) {
      try {
        const imageUrl = await uploadImage(file, 'artworks');
        setFormData({ ...formData, image_url: imageUrl });
        toast({
          title: "Berhasil",
          description: "Gambar berhasil diupload"
        });
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
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
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Unggah gambar untuk ditampilkan pada halaman user
                    </p>
                    {formData.image_url && (
                      <div className="mt-2">
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="w-32 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
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
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Textarea
                    placeholder="Deskripsi Singkat"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan"
                    )}
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
                      src={artwork.image_url || "/placeholder.svg"}
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
