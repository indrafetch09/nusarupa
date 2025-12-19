import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail } from "lucide-react";
import nusarupaLogo from "@/assets/icon-nusarupa.svg";

const OTPVerification = () => {
    useDocumentTitle("Verifikasi OTP");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "user@email.com";
    
    const [otp, setOtp] = useState("");
    const [countdown, setCountdown] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleResend = () => {
        setCountdown(30);
        setCanResend(false);
        // TODO: Implement resend OTP logic
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement verification logic
        console.log("Verifying OTP:", otp);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-background rounded-2xl shadow-lg p-8 md:p-10">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-2 mb-8">
                    <img className="h-10 w-10" src={nusarupaLogo} alt="nusarupa-logo" />
                    <span className="text-2xl font-bold text-foreground">nusarupa</span>
                </Link>

                {/* Heading */}
                <p className="text-base text-foreground mb-8 text-center">
                    Masukkan 6 digit kode verifikasi yang dikirimkan ke email{" "}
                    <span className="font-semibold">{email}</span>
                </p>

                {/* OTP Form */}
                <form className="space-y-8" onSubmit={handleVerify}>
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={setOtp}
                            containerClassName="gap-3"
                        >
                            <InputOTPGroup className="gap-3">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <InputOTPSlot
                                        key={index}
                                        index={index}
                                        className="w-12 h-14 text-xl font-semibold border-0 border-b-2 border-border rounded-none bg-transparent focus-within:border-primary"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full h-12 rounded-lg text-base font-medium"
                        disabled={otp.length !== 6}
                    >
                        Verifikasi
                    </Button>
                </form>

                {/* Resend countdown */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    {canResend ? (
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-primary hover:underline font-medium"
                        >
                            Kirim ulang kode
                        </button>
                    ) : (
                        <>
                            Kirim ulang kode dalam{" "}
                            <span className="font-semibold text-foreground">{formatTime(countdown)}</span>
                        </>
                    )}
                </p>

                {/* Change email button */}
                <Button
                    variant="outline"
                    className="w-full h-12 rounded-lg text-sm font-medium mt-4 gap-2"
                    onClick={() => navigate("/auth?mode=login")}
                >
                    <Mail className="w-4 h-4" />
                    Ubah Email
                </Button>
            </div>
        </div>
    );
};

export default OTPVerification;
