import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  MessageCircle,
  User,
  ShoppingCart,
  Calendar,
  BarChart3,
  BookOpen,
} from "lucide-react";
import logo from "@/assets/logo.png"; // ✅ your logo file (put inside src/assets)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Book Therapy", path: "/book-therapy", icon: Calendar },
    { name: "Track Progress", path: "/track-progress", icon: BarChart3 },
    { name: "Store", path: "/store", icon: ShoppingCart },
    { name: "Knowledge Hub", path: "/knowledge-hub", icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* ===== Left Section (Logo + Title) ===== */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-primary">🌿 Panchaveda</span>
        </Link>

        {/* ===== Desktop Nav Links ===== */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {Icon && <Icon size={18} />}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* ===== Right Section (Buttons) ===== */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>

        {/* ===== Mobile Menu ===== */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 text-base font-medium transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon && <Icon size={20} />}
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex space-x-4 pt-4">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
