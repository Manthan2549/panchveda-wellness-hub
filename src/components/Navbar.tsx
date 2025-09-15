import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, MessageCircle, User, ShoppingCart, Calendar, BarChart3, BookOpen, LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
  };

  const navItems = [
    { name: "Home", path: "/", icon: null },
    { name: "Features", path: "/features", icon: null },
    { name: "Book Therapy", path: "/book", icon: Calendar },
    { name: "Track Progress", path: "/progress", icon: BarChart3 },
    { name: "Store", path: "/store", icon: ShoppingCart },
    { name: "Knowledge Hub", path: "/knowledge", icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm"><img src="data:image/jpeg;base64,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" style="width: 24px; height:24px;" /></span>
            </div>
            <span className="font-bold text-xl text-primary">Panchaveda</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors hover:text-primary ${
                  isActive(item.path) ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/chat">
                <MessageCircle className="w-4 h-4 mr-2" />
                ArogyaMitra
              </Link>
            </Button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button className="hero-button" size="sm" asChild>
                  <Link to="/health-questionnaire">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <div className="pt-4 space-y-2">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 px-3 py-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">Guest User</span>
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsOpen(false); }}>
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/login" onClick={() => setIsOpen(false)}>
                            <User className="w-4 h-4 mr-2" />
                            Login
                          </Link>
                        </Button>
                        <Button className="hero-button w-full" asChild>
                          <Link to="/health-questionnaire" onClick={() => setIsOpen(false)}>
                            Get Started
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
add a logo behind panchveda
