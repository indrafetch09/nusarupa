import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Edit, Save, X, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const AdminProfil = () => {
  useDocumentTitle("Profil Admin");
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || "Admin Nusarupa",
    email: user?.email || "admin@nusarupa.id",
    bio: "Administrator platform Nusarupa",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: "Profil berhasil diperbarui" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-background py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">Profil Admin</h1>
            <p className="text-muted-foreground">Kelola informasi profil administrator</p>
          </div>
        </section>

        {/* Profile Section */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              {/* Avatar Section */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-semibold text-foreground">{formData.name}</h2>
                  <p className="text-muted-foreground">{formData.email}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Admin</span>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nama
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Bio
                    </label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      Simpan
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="gap-2">
                      <X className="h-4 w-4" />
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Nama</h3>
                    <p className="text-foreground">{formData.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p className="text-foreground">{formData.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Bio</h3>
                    <p className="text-foreground">{formData.bio}</p>
                  </div>
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profil
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProfil;
