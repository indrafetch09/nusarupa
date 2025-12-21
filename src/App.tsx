import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
import Program from "./pages/Program";
import MenjadiBagian from "./pages/MenjadiBagian";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Galeri from "./pages/Galeri";
import DetailKarya from "./pages/DetailKarya";
import Kolaborasi from "./pages/Kolaborasi";
import Donasi from "./pages/Donasi";
import DetailDonasi from "./pages/DetailDonasi";
import ProsesDonasi from "./pages/ProsesDonasi";
import BerhasilDonasi from "./pages/BerhasilDonasi";
import DetailAktivitas from "./pages/DetailAktivitas";
import BerhasilDaftarEvent from "./pages/BerhasilDaftarEvent";
import Profil from "./pages/Profil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/program" element={<Program />} />
            <Route path="/menjadi-bagian" element={<MenjadiBagian />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/galeri"
              element={
                <ProtectedRoute>
                  <Galeri />
                </ProtectedRoute>
              }
            />
            <Route
              path="/karya/:id"
              element={
                <ProtectedRoute>
                  <DetailKarya />
                </ProtectedRoute>
              }
            />
            <Route
              path="/kolaborasi"
              element={
                <ProtectedRoute>
                  <Kolaborasi />
                </ProtectedRoute>
              }
            />
            <Route path="/donasi" element={<ProtectedRoute><Donasi /></ProtectedRoute>} />
            <Route path="/donasi/:id" element={<ProtectedRoute><DetailDonasi /></ProtectedRoute>} />
            <Route path="/donasi/:id/proses" element={<ProtectedRoute><ProsesDonasi /></ProtectedRoute>} />
            <Route path="/donasi/:id/berhasil" element={<ProtectedRoute><BerhasilDonasi /></ProtectedRoute>} />
            <Route path="/aktivitas/:id" element={<ProtectedRoute><DetailAktivitas /></ProtectedRoute>} />
            <Route path="/aktivitas/:id/daftar" element={<ProtectedRoute><BerhasilDaftarEvent /></ProtectedRoute>} />
            <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
