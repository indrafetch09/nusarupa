import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const values = [
  {
    icon: Target,
    title: "Misi Kami",
    description: "Memfasilitasi dan menghubungkan relawan dengan program sosial yang berdampak nyata di seluruh Indonesia.",
  },
  {
    icon: Eye,
    title: "Visi Kami",
    description: "Menjadi platform volunteer terdepan yang memberdayakan masyarakat Indonesia untuk saling membantu.",
  },
  {
    icon: Heart,
    title: "Nilai Kami",
    description: "Kepedulian, kolaborasi, transparansi, dan dampak nyata dalam setiap program yang kami jalankan.",
  },
];

const team = [
  { name: "Ahmad Rizki", role: "Founder & CEO", initial: "AR" },
  { name: "Siti Nurhaliza", role: "Head of Programs", initial: "SN" },
  { name: "Budi Santoso", role: "Community Lead", initial: "BS" },
  { name: "Maya Dewi", role: "Partnership Manager", initial: "MD" },
];

const TentangKami = () => {
  useDocumentTitle("Tentang Kami");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
                Tentang <span className="text-primary">Nusarupa</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up-delay">
                Kami adalah platform yang menghubungkan relawan dengan berbagai program sosial di seluruh Indonesia.
                Didirikan pada tahun 2020, Nusarupa telah membantu ribuan relawan untuk berkontribusi dalam berbagai kegiatan sosial.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <div
                  key={index}
                  className="p-8 bg-background rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-primary">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Cerita Kami
              </h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed mb-8">
                Nusarupa lahir dari kepedulian terhadap kesenjangan sosial di Indonesia. Kami percaya bahwa setiap orang memiliki
                potensi untuk memberikan dampak positif, dan tugas kami adalah memfasilitasi hal tersebut. Dengan teknologi dan
                jaringan yang luas, kami menghubungkan mereka yang ingin membantu dengan mereka yang membutuhkan bantuan.
              </p>
              <Button variant="heroOutline" size="lg" className="border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 hover:border-primary-foreground">
                Bergabung Bersama Kami
              </Button>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Tim Kami
              </h2>
              <p className="text-lg text-muted-foreground">
                Orang-orang berdedikasi di balik Nusarupa
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">{member.initial}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
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

export default TentangKami;
