import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, LayoutDashboard, Image, Calendar, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import nusarupaLogo from "@/assets/icon-nusarupa.svg";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/karya", label: "Karya", icon: Image },
  { href: "/admin/aktivitas", label: "Aktivitas & Kolaborasi", icon: Calendar },
  { href: "/admin/donasi", label: "Donasi", icon: Heart },
];

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-2">
            <img className="h-6 w-6" src={nusarupaLogo} alt="nusarupa-logo" />
            <span className="text-xl font-bold text-foreground">nusarupa</span>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-2 ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Profile */}
          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-primary/10 hover:bg-primary/20"
                >
                  <User className="h-5 w-5 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium truncate">
                    {user?.user_metadata?.full_name || user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  <p className="text-xs text-primary font-medium mt-1">Admin</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin/profil" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profil Admin
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {adminNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 text-sm font-medium transition-colors rounded-lg flex items-center gap-2 ${
                    location.pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium truncate">
                    {user?.user_metadata?.full_name || user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  <p className="text-xs text-primary font-medium mt-1">Admin</p>
                </div>
                <Link to="/admin/profil" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profil Admin
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
