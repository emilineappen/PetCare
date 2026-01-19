import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    price: 3499,
    category: "Food",
    image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Cat Scratch Post",
    price: 2450,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Squeaky Bone Toy",
    price: 499,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Adjustable Leash",
    price: 899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Comfort Bed",
    price: 4500,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Pet Carrier",
    price: 3999,
    category: "Travel",
    image: "https://images.unsplash.com/photo-1601758177266-bc599de87707?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Organic Cat Food",
    price: 2899,
    category: "Food",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Pet Shampoo",
    price: 649,
    category: "Grooming",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Cat Litter (10kg)",
    price: 1299,
    category: "Grooming",
    image: "https://images.unsplash.com/photo-1597843796321-230ff7362ba6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Rope Tug Toy",
    price: 399,
    category: "Toys",
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Pet Shop</h1>
          <p className="text-muted-foreground mt-1">Quality products for your furry friends</p>
        </div>
        <Button variant="outline" className="gap-2 rounded-full border-2">
          <ShoppingBag className="w-4 h-4" />
          View Cart (0)
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
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
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
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
    </div>
  );
}
