import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDonations } from "@/hooks/useDonations";
import type { Database } from "@/integrations/supabase/types";

type Donation = Database[ "public" ][ "Tables" ][ "donations" ][ "Row" ]

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
  const { donations, loading, error, createDonation, updateDonation, deleteDonation, uploadImage } = useDonations();
  const [ showForm, setShowForm ] = useState(false);
  const [ editingId, setEditingId ] = useState<string | null>(null);
  const [ formData, setFormData ] = useState({
    title: "",
    description: "",
    target_amount: "",
    collected_amount: "0",
    image_url: "",
    is_active: true,
  });
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const donationData = {
        title: formData.title,
        description: formData.description || null,
        target_amount: parseInt(formData.target_amount) || 0,
        collected_amount: parseInt(formData.collected_amount) || 0,
        image_url: formData.image_url || null,
        is_active: formData.is_active,
      };

      if (editingId) {
        await updateDonation(editingId, donationData);
      } else {
        await createDonation(donationData);
      }
      resetForm();
    } catch (err) {
      console.error("Error saving donation:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (donation: Donation) => {
    setFormData({
      title: donation.title,
      description: donation.description || "",
      target_amount: donation.target_amount.toString(),
      collected_amount: donation.collected_amount.toString(),
      image_url: donation.image_url || "",
      is_active: donation.is_active,
    });
    setEditingId(donation.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus donasi ini?")) {
      await deleteDonation(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      target_amount: "",
      collected_amount: "0",
      image_url: "",
      is_active: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[ 0 ];
    if (file) {
      try {
        const imageUrl = await uploadImage(file, 'donations');
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
                          className="w-32 h-20 object-cover rounded border"
                        />
                      </div>
                    )}
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
                      value={formData.target_amount}
                      onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Terkumpul (Rp)
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.collected_amount}
                      onChange={(e) => setFormData({ ...formData, collected_amount: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded border-border"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium text-foreground">
                      Campaign Aktif
                    </label>
                  </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donations.map((donation) => {
                const progress = Math.round((donation.collected_amount / donation.target_amount) * 100);
                return (
                  <div
                    key={donation.id}
                    className="bg-card rounded-xl overflow-hidden border border-border"
                  >
                    <div className="aspect-[2/1] overflow-hidden">
                      <img
                        src={donation.image_url || "/placeholder.svg"}
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
                            {formatCurrency(donation.target_amount)}
                          </span>
                        </div>
                        <p className="text-sm text-primary font-medium">
                          Terkumpul: {formatCurrency(donation.collected_amount)}
                        </p>
                        {!donation.is_active && (
                          <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                            Tidak Aktif
                          </span>
                        )}
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
