import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/contexts/AdminContext";
import nusarupaLogo from "@/assets/icon-nusarupa.svg";
import { Eye, EyeOff, Shield } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useDocumentTitle("Login Admin");

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!authLoading && !adminLoading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          variant: "destructive",
          title: "Gagal masuk",
          description: "Email atau password salah.",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Berhasil masuk!",
        description: "Selamat datang di Admin Panel",
      });
      navigate("/admin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan",
        description: "Silakan coba lagi nanti.",
      });
      setIsSubmitting(false);
    }
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-lg p-8 md:p-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <img className="h-10 w-10" src={nusarupaLogo} alt="nusarupa-logo" />
          <span className="text-2xl font-bold text-foreground">nusarupa</span>
        </Link>

        {/* Admin Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Admin Panel</span>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-foreground mb-2 text-center">
          Login Admin
        </h1>
        <p className="text-sm text-muted-foreground mb-8 text-center">
          Masuk untuk mengelola konten Nusarupa
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 border-b-2 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-primary bg-transparent border-border"
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-0 border-b-2 rounded-none px-0 py-3 pr-10 focus-visible:ring-0 focus-visible:border-primary bg-transparent border-border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-lg text-base font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Back to home */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline font-medium">
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
