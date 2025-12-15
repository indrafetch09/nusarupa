import { Heart, Users, Target, Award } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Komunitas Kuat",
    description: "Bergabung dengan ribuan relawan aktif di seluruh Indonesia yang siap berbagi pengalaman.",
  },
  {
    icon: Heart,
    title: "Dampak Nyata",
    description: "Setiap aksi yang kamu lakukan memberikan perubahan positif bagi masyarakat sekitar.",
  },
  {
    icon: Target,
    title: "Program Terarah",
    description: "Program volunteer yang terstruktur dan sesuai dengan minat serta keahlianmu.",
  },
  {
    icon: Award,
    title: "Pengakuan Resmi",
    description: "Dapatkan sertifikat dan pengakuan atas kontribusimu dalam program sosial.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mengapa Bergabung dengan Kami?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nusarupa memberikan wadah terbaik untuk kamu yang ingin berkontribusi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-background rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
