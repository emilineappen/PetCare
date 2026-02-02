import { ShoppingBag, Plus, Pill, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const products = [
  // FOODS
  {
    id: 1,
    name: "Premium Puppy Food (5kg)",
    price: 3499,
    category: "Food",
    image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Organic Cat Food (2kg)",
    price: 2899,
    category: "Food",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 13,
    name: "Adult Dog Kibble (10kg)",
    price: 5999,
    category: "Food",
    image: "https://images.unsplash.com/photo-1585812414564-a82046bc8d74?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 14,
    name: "Wet Cat Food Pouches (12pk)",
    price: 1850,
    category: "Food",
    image: "https://images.unsplash.com/photo-1608096299210-db7e38487075?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 15,
    name: "Gourmet Dog Treats",
    price: 1200,
    category: "Food",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
  },
  
  // MEDICINES
  {
    id: 3,
    name: "Immunity Booster Syrup",
    price: 850,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Anti-Tick & Flea Spray",
    price: 1250,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Digestive Support Tablets",
    price: 999,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1471864190281-ad5f9f81ce8a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Wound Healing Cream",
    price: 450,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Calcium & Bone Health",
    price: 750,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1550573104-4eb62f8ad021?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 16,
    name: "Eye Cleaning Drops",
    price: 680,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1579154235602-3c3b0365757d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 17,
    name: "Ear Care Solution",
    price: 520,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=800&auto=format&fit=crop",
  },

  // OTHERS
  {
    id: 2,
    name: "Cat Scratch Post",
    price: 2450,
    category: "Other",
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Adjustable Leash",
    price: 899,
    category: "Other",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Pet Shampoo (Herbal)",
    price: 649,
    category: "Other",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Comfort Dog Bed",
    price: 4500,
    category: "Other",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Interactive Toy Ball",
    price: 599,
    category: "Other",
    image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Shopping() {
  const { toast } = useToast();

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart!",
      description: `${productName} is now in your shopping bag.`,
      duration: 3000,
    });
  };

  const renderProductGrid = (category: string) => {
    const filteredProducts = products.filter(p => p.category === category);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden group border-0 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Badge className="absolute top-4 left-4 bg-white/90 text-foreground backdrop-blur font-bold hover:bg-white">
                {product.category}
              </Badge>
            </div>
            
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
              </div>
              
              <Button 
                onClick={() => handleAddToCart(product.name)}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-xl h-12 shadow-lg shadow-secondary/20 hover:shadow-secondary/30 transition-all active:scale-95"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Pet Shop</h1>
          <p className="text-muted-foreground mt-1">Everything your pet needs in one place</p>
        </div>
        <Button variant="outline" className="gap-2 rounded-full border-2">
          <ShoppingBag className="w-4 h-4" />
          View Cart (0)
        </Button>
      </div>

      <Tabs defaultValue="Food" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-muted rounded-2xl">
          <TabsTrigger value="Food" className="rounded-xl flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Utensils className="w-4 h-4" />
            Pet Foods
          </TabsTrigger>
          <TabsTrigger value="Medicine" className="rounded-xl flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Pill className="w-4 h-4" />
            Medicines
          </TabsTrigger>
          <TabsTrigger value="Other" className="rounded-xl flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ShoppingBag className="w-4 h-4" />
            Essentials
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="Food" className="mt-0">
          {renderProductGrid("Food")}
        </TabsContent>
        <TabsContent value="Medicine" className="mt-0">
          {renderProductGrid("Medicine")}
        </TabsContent>
        <TabsContent value="Other" className="mt-0">
          {renderProductGrid("Other")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
