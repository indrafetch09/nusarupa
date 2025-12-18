import { Button } from "@/components/ui/button";
import heroCommunity from "@/assets/nusarupa-hero-background.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCommunity}
          alt="Komunitas relawan Nusarupa bersatu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 text-center">
        <h1 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl mx-auto text-balance">
          Membangun Masyarakat
          <br />
          <span className="text-foreground">Menjadi yang </span>
          <span className="text-primary">Terbaik</span>
        </h1>

        <p className="animate-fade-up-delay mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Bergabung dengan Komunitas Nusarupa, Platform relawan terbaik se Indonesia
        </p>

        <div className="animate-fade-up-delay-2 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg">
            Gabung Sekarang
          </Button>
          <Button variant="heroOutline" size="lg">
            Pelajari lebih lanjut
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
