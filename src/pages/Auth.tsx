import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import nusarupaLogo from "@/assets/icon-nusarupa.svg";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "login" ? "login" : "register";
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useDocumentTitle(mode === "login" ? "Masuk" : "Daftar");

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsSubmitting(false);
          return;
        }

        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              variant: "destructive",
              title: "Gagal masuk",
              description: "Email atau password salah. Silakan coba lagi.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Gagal masuk",
              description: error.message,
            });
          }
          setIsSubmitting(false);
          return;
        }

        toast({
          title: "Berhasil masuk!",
          description: "Selamat datang kembali di Nusarupa",
        });
        navigate("/home");
      } else {
        const result = registerSchema.safeParse({ email, password, name });
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsSubmitting(false);
          return;
        }

        const { error } = await signUp(email, password, name);
        if (error) {
          if (error.message.includes("User already registered")) {
            toast({
              variant: "destructive",
              title: "Gagal mendaftar",
              description: "Email sudah terdaftar. Silakan masuk atau gunakan email lain.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Gagal mendaftar",
              description: error.message,
            });
          }
          setIsSubmitting(false);
          return;
        }

        toast({
          title: "Berhasil mendaftar!",
          description: "Selamat datang di Nusarupa",
        });
        navigate("/home");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan",
        description: "Silakan coba lagi nanti.",
      });
      setIsSubmitting(false);
    }
  };

  if (loading) {
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
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <img className="h-10 w-10" src={nusarupaLogo} alt="nusarupa-logo" />
          <span className="text-2xl font-bold text-foreground">nusarupa</span>
        </Link>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-foreground mb-2">
          {mode === "login" ? "Masuk ke Nusarupa" : "Perjalananmu dimulai dari sini"}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {mode === "login"
            ? "Selamat datang kembali! Masuk untuk melanjutkan."
            : "Daftar untuk bergabung dengan komunitas kreatif."}
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
                className={`border-0 border-b-2 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {mode === "register" && (
              <div>
                <Input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`border-0 border-b-2 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                    errors.name ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border-0 border-b-2 rounded-none px-0 py-3 pr-10 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                  errors.password ? "border-destructive" : "border-border"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-lg text-base font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
            ) : mode === "login" ? (
              "Masuk"
            ) : (
              "Daftar"
            )}
          </Button>
        </form>

        {/* Switch mode */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          {mode === "login" ? (
            <>
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setErrors({});
                }}
                className="text-primary hover:underline font-medium"
              >
                Daftar
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrors({});
                }}
                className="text-primary hover:underline font-medium"
              >
                Masuk
              </button>
            </>
          )}
        </p>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground font-medium">
              Atau lebih cepat
            </span>
          </div>
        </div>

        {/* Social login buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 rounded-lg text-sm font-medium justify-center gap-3"
            type="button"
            disabled
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Masuk dengan Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-lg text-sm font-medium justify-center gap-3"
            type="button"
            disabled
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Masuk dengan Apple ID
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-lg text-sm font-medium justify-center gap-3"
            type="button"
            disabled
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Masuk dengan Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
