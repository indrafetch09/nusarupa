import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Heart, Award, Sparkles, ArrowRight } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const benefits = [
  {
    icon: Heart,
    title: "Berkontribusi Nyata",
    description: "Terlibat langsung dalam program-program sosial yang memberikan dampak positif bagi masyarakat Indonesia.",
  },
  {
    icon: Users,
    title: "Jaringan Luas",
    description: "Bangun koneksi dengan relawan lain, mentor, dan profesional dari berbagai latar belakang.",
  },
  {
    icon: Award,
    title: "Sertifikat & Pengakuan",
    description: "Dapatkan sertifikat resmi dan pengakuan atas kontribusi Anda dalam setiap program.",
  },
  {
    icon: Sparkles,
    title: "Pengembangan Diri",
    description: "Tingkatkan soft skills seperti leadership, komunikasi, dan problem solving melalui pengalaman langsung.",
  },
];

const requirements = [
  "Berusia minimal 17 tahun",
  "Memiliki semangat untuk membantu sesama",
  "Bersedia mengikuti orientasi dan pelatihan",
  "Dapat bekerja sama dalam tim",
  "Berkomitmen terhadap program yang diikuti",
];

const steps = [
  {
    step: "01",
    title: "Daftar Akun",
    description: "Buat akun Nusarupa dengan mengisi data diri Anda secara lengkap.",
  },
  {
    step: "02",
    title: "Pilih Program",
    description: "Jelajahi berbagai program volunteer dan pilih yang sesuai dengan minat Anda.",
  },
  {
    step: "03",
    title: "Ikuti Orientasi",
    description: "Ikuti sesi orientasi untuk memahami program dan persiapan yang diperlukan.",
  },
  {
    step: "04",
    title: "Mulai Berkontribusi",
    description: "Bergabung dengan tim dan mulai memberikan dampak positif bersama kami.",
  },
];

const MenjadiBagian = () => {
  useDocumentTitle("Menjadi Bagian");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
                Menjadi <span className="text-primary">Bagian</span> dari Kami
              </h1>
              <p className="text-lg text-muted-foreground mb-8 animate-fade-up-delay">
                Bergabunglah dengan ribuan relawan lainnya dan jadilah bagian dari perubahan positif di Indonesia.
              </p>
              <Button size="lg" className="animate-fade-up-delay group">
                Daftar Sekarang
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Mengapa Bergabung?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Banyak manfaat yang bisa Anda dapatkan dengan menjadi relawan Nusarupa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 bg-background rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Cara Bergabung
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Empat langkah mudah untuk mulai berkontribusi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((item, index) => (
                <div key={index} className="relative">
                  <div className="text-6xl font-bold text-primary/10 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 w-1/2 border-t-2 border-dashed border-primary/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Syarat & Ketentuan
                </h2>
                <p className="text-lg text-muted-foreground">
                  Persyaratan dasar untuk menjadi relawan Nusarupa
                </p>
              </div>

              <div className="bg-muted/30 rounded-2xl p-8">
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Siap Untuk Berkontribusi?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Daftarkan diri Anda sekarang dan mulai perjalanan volunteer Anda bersama Nusarupa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="heroOutline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground">
                  Pelajari Lebih Lanjut
                </Button>
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Daftar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MenjadiBagian;
