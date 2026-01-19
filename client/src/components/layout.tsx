import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  LogOut, 
  Home, 
  ShoppingBag, 
  Stethoscope, 
  Calendar, 
  User, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shopping", label: "Shop", icon: ShoppingBag },
    { href: "/ai-vet", label: "AI Vet", icon: Stethoscope },
    { href: "/booking", label: "Book", icon: Calendar },
    { href: "/profile", label: "Profile", icon: User },
  ];

  if (!user && location !== "/login" && location !== "/register") {
    return <>{children}</>;
  }

  // Don't show layout on login/register pages
  if (location === "/login" || location === "/register") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-display font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-display font-bold text-primary">PetCare</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`
                      px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all
                      ${isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="h-6 w-px bg-border mx-2" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-muted-foreground hover:text-destructive gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-muted-foreground hover:bg-muted"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors
                    ${isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="border-t border-border my-2 pt-2">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 PetCare Demo App. Created with ❤️ for pets everywhere.</p>
        </div>
      </footer>
    </div>
  );
}
