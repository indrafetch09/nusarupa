import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    details: ["Jl. Sudirman No. 123", "Jakarta Pusat, 10110", "Indonesia"],
  },
  {
    icon: Phone,
    title: "Telepon",
    details: ["+62 21 1234 5678", "+62 812 3456 7890"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@nusarupa.id", "volunteer@nusarupa.id"],
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    details: ["Senin - Jumat: 09:00 - 17:00", "Sabtu: 09:00 - 13:00"],
  },
];

const faqs = [
  {
    question: "Bagaimana cara mendaftar menjadi relawan?",
    answer: "Anda dapat mendaftar melalui halaman 'Menjadi Bagian' dan mengisi formulir pendaftaran online. Tim kami akan menghubungi Anda untuk proses selanjutnya.",
  },
  {
    question: "Apakah ada biaya untuk mengikuti program volunteer?",
    answer: "Sebagian besar program volunteer kami gratis. Beberapa program mungkin memerlukan kontribusi untuk akomodasi dan transportasi.",
  },
  {
    question: "Berapa lama durasi program volunteer?",
    answer: "Durasi bervariasi mulai dari 1 hari hingga beberapa minggu, tergantung jenis program yang Anda pilih.",
  },
];

const Kontak = () => {
  useDocumentTitle("Kontak");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
                Hubungi <span className="text-primary">Kami</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up-delay">
                Punya pertanyaan atau ingin berkolaborasi? Kami senang mendengar dari Anda.
                Jangan ragu untuk menghubungi tim kami.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-background rounded-2xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Kirim Pesan
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nama Lengkap
                      </label>
                      <Input placeholder="Masukkan nama Anda" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input type="email" placeholder="email@contoh.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subjek
                    </label>
                    <Input placeholder="Subjek pesan Anda" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Pesan
                    </label>
                    <Textarea
                      placeholder="Tulis pesan Anda di sini..."
                      rows={5}
                    />
                  </div>
                  <Button className="w-full group">
                    Kirim Pesan
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Informasi Kontak
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="p-6 bg-muted/30 rounded-2xl"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="h-64 bg-muted/30 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-muted-foreground">Peta Lokasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Pertanyaan Umum
                </h2>
                <p className="text-lg text-muted-foreground">
                  Jawaban untuk pertanyaan yang sering diajukan
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-xl p-6 border border-border/50"
                  >
                    <h3 className="font-semibold text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Kontak;
