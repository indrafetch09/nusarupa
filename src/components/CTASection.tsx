import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Siap Membuat Perubahan?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Bergabunglah dengan ribuan relawan lainnya dan jadilah bagian dari perubahan positif untuk Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg">
              Daftar Sekarang
            </Button>
            <Button variant="outline" size="lg">
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
