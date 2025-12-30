import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Edit, Save, X, Shield, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type UserProfile = Database[ "public" ][ "Tables" ][ "profiles" ][ "Row" ]

const AdminProfil = () => {
  useDocumentTitle("Profil Admin");
  const { toast } = useToast();
  const { user } = useAuth();
  const [ isEditing, setIsEditing ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ saving, setSaving ] = useState(false);
  const [ profile, setProfile ] = useState<UserProfile | null>(null);
  const [ formData, setFormData ] = useState({
    full_name: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [ user ]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || user.user_metadata?.full_name || "",
          bio: data.bio || "",
        });
      } else {
        // Create initial profile if doesn't exist
        setFormData({
          full_name: user.user_metadata?.full_name || "",
          bio: "",
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      toast({
        title: "Error",
        description: "Gagal memuat profil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || saving) return;

    try {
      setSaving(true);

      const profileData = {
        user_id: user.id,
        full_name: formData.full_name,
        bio: formData.bio || null,
        role: 'admin' as const,
        updated_at: new Date().toISOString(),
      };

      if (profile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert([ { ...profileData, created_at: new Date().toISOString() } ]);

        if (error) throw error;
      }

      // Update auth metadata
      await supabase.auth.updateUser({
        data: { full_name: formData.full_name }
      });

      setIsEditing(false);
      fetchProfile();
      toast({ title: "Profil berhasil diperbarui" });
    } catch (err) {
      console.error('Error saving profile:', err);
      toast({
        title: "Error",
        description: "Gagal menyimpan profil",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
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
                  <h2 className="text-xl font-semibold text-foreground">
                    {loading ? "Loading..." : formData.full_name || "Admin Nusarupa"}
                  </h2>
                  <p className="text-muted-foreground">{user?.email || "admin@nusarupa.id"}</p>
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
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email tidak dapat diubah
                    </p>
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
                    <Button onClick={handleSave} disabled={saving} className="gap-2">
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Simpan
                        </>
                      )}
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
                    <p className="text-foreground">
                      {loading ? "Loading..." : formData.full_name || "Admin Nusarupa"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p className="text-foreground">{user?.email || "admin@nusarupa.id"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Bio</h3>
                    <p className="text-foreground">
                      {loading ? "Loading..." : formData.bio || "Belum ada bio"}
                    </p>
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
