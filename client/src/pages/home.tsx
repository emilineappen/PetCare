import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  ShoppingBag, 
  Stethoscope, 
  Calendar, 
  User, 
  ArrowRight,
  Heart
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      title: "Pet Shop",
      description: "Find the best toys and treats",
      icon: ShoppingBag,
      href: "/shopping",
      color: "text-blue-500",
      bg: "bg-blue-50",
      hover: "group-hover:bg-blue-100",
    },
    {
      title: "AI Veterinarian",
      description: "Get instant pet health advice",
      icon: Stethoscope,
      href: "/ai-vet",
      color: "text-green-500",
      bg: "bg-green-50",
      hover: "group-hover:bg-green-100",
    },
    {
      title: "Book Visit",
      description: "Schedule your next appointment",
      icon: Calendar,
      href: "/booking",
      color: "text-purple-500",
      bg: "bg-purple-50",
      hover: "group-hover:bg-purple-100",
    },
    {
      title: "Pet Profile",
      description: "Manage your pet's medical history",
      icon: User,
      href: "/profile",
      color: "text-orange-500",
      bg: "bg-orange-50",
      hover: "group-hover:bg-orange-100",
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 shadow-2xl shadow-primary/20 text-white p-8 md:p-16 text-center md:text-left">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            Happy Pets,<br/>Happy Owners
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg font-medium">
            Welcome back, {user?.name}! Provide the best care for your furry friends with our all-in-one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/shopping">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold h-12 px-8 rounded-full shadow-lg border-0">
                Start Shopping
              </Button>
            </Link>
            <Link href="/ai-vet">
              <Button size="lg" variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 font-bold h-12 px-8 rounded-full">
                Consult AI Vet
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Abstract shapes/blobs */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl"></div>
        
        {/* Unsplash Image - Happy dog */}
        {/* https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop */}
        <div className="absolute hidden md:block right-0 bottom-0 w-1/2 h-full">
          <div 
            className="w-full h-full bg-cover bg-center opacity-90 mix-blend-overlay"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
        </div>
      </div>

      {/* Stats / Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Health Status</p>
            <p className="text-lg font-bold text-foreground">Excellent Condition</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Next Delivery</p>
            <p className="text-lg font-bold text-foreground">Tomorrow, 2:00 PM</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Upcoming Visit</p>
            <p className="text-lg font-bold text-foreground">Oct 24 - Checkup</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 font-display">Explore Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Link key={i} href={feature.href} className="group cursor-pointer">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-transparent hover:border-primary/20 overflow-hidden">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full justify-between">
                    <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 transition-colors ${feature.hover}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300`}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
