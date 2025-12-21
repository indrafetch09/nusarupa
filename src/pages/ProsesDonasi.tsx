import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowLeft, CreditCard, QrCode, Building2, Heart } from "lucide-react";
import { donationCampaigns } from "./Donasi";

const nominalOptions = [
  { value: 10000, label: "Rp 10.000" },
  { value: 25000, label: "Rp 25.000" },
  { value: 50000, label: "Rp 50.000" },
  { value: 100000, label: "Rp 100.000" },
];

const paymentMethods = [
  { id: "transfer", label: "Transfer Bank", icon: Building2, description: "BCA, Mandiri, BNI, BRI" },
  { id: "qris", label: "QRIS", icon: QrCode, description: "Scan QR dari e-wallet" },
  { id: "va", label: "Virtual Account", icon: CreditCard, description: "Bayar via ATM/M-Banking" },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const ProsesDonasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = donationCampaigns.find((c) => c.id === Number(id));

  useDocumentTitle("Proses Donasi");

  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [customNominal, setCustomNominal] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 px-4">
          <div className="container mx-auto max-w-4xl text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">Campaign tidak ditemukan</h1>
            <Link to="/donasi">
              <Button>Kembali ke Daftar Donasi</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const finalAmount = selectedNominal || (customNominal ? parseInt(customNominal.replace(/\D/g, "")) : 0);

  const handleSubmit = () => {
    if (finalAmount > 0 && selectedPayment) {
      navigate(`/donasi/${id}/berhasil?amount=${finalAmount}`);
    }
  };

  const handleCustomNominalChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setCustomNominal(numericValue);
    setSelectedNominal(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Back Button */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto max-w-2xl px-4 py-4">
            <Link
              to={`/donasi/${id}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Detail Campaign
            </Link>
          </div>
        </div>

        <div className="container mx-auto max-w-2xl px-4 py-8">
          {/* Campaign Info */}
          <div className="bg-card rounded-xl p-4 border border-border mb-8 flex gap-4">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div>
              <h2 className="font-semibold text-foreground line-clamp-2">{campaign.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {formatCurrency(campaign.collected)} terkumpul
              </p>
            </div>
          </div>

          {/* Nominal Selection */}
          <div className="space-y-4 mb-8">
            <Label className="text-base font-semibold text-foreground">Pilih Nominal Donasi</Label>
            <div className="grid grid-cols-2 gap-3">
              {nominalOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedNominal(option.value);
                    setCustomNominal("");
                  }}
                  className={cn(
                    "p-4 rounded-xl border-2 text-center transition-all",
                    selectedNominal === option.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  )}
                >
                  <span className="font-semibold">{option.label}</span>
                </button>
              ))}
            </div>

            <div className="relative">
              <Label className="text-sm text-muted-foreground mb-2 block">Atau masukkan nominal lain</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                <Input
                  type="text"
                  placeholder="0"
                  value={customNominal ? parseInt(customNominal).toLocaleString("id-ID") : ""}
                  onChange={(e) => handleCustomNominalChange(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4 mb-8">
            <Label className="text-base font-semibold text-foreground">Pilih Metode Pembayaran</Label>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all text-left",
                    selectedPayment === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    selectedPayment === method.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{method.label}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-4">Ringkasan Donasi</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nominal Donasi</span>
                <span className="font-medium text-foreground">
                  {finalAmount > 0 ? formatCurrency(finalAmount) : "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Metode Pembayaran</span>
                <span className="font-medium text-foreground">
                  {selectedPayment
                    ? paymentMethods.find((m) => m.id === selectedPayment)?.label
                    : "-"}
                </span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-primary text-lg">
                    {finalAmount > 0 ? formatCurrency(finalAmount) : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={finalAmount <= 0 || !selectedPayment}
            className="w-full h-12 text-base font-semibold gap-2"
          >
            <Heart className="w-5 h-5" />
            Lanjutkan Donasi
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProsesDonasi;
