import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Star, 
  Filter, 
  Search,
  Leaf,
  Package,
  Award,
  Heart,
  Zap,
  Brain
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Store = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: "Premium Abhyanga Oil",
      category: "oils",
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviews: 124,
      description: "Traditional herbal oil blend for deep tissue massage and stress relief",
      image: "🛢️",
      benefits: ["Stress Relief", "Joint Pain", "Better Sleep"],
      inStock: true,
      bestseller: true
    },
    {
      id: 2,
      name: "Organic Triphala Powder",
      category: "powders",
      price: 599,
      originalPrice: 799,
      rating: 4.9,
      reviews: 89,
      description: "Pure Triphala powder for digestive health and detoxification",
      image: "🌿",
      benefits: ["Digestive Health", "Detox", "Immunity"],
      inStock: true,
      bestseller: false
    },
    {
      id: 3,
      name: "Panchakarma Detox Kit",
      category: "kits",
      price: 3999,
      originalPrice: 4999,
      rating: 4.7,
      reviews: 67,
      description: "Complete 7-day home detox kit with herbs, oils, and guidance",
      image: "📦",
      benefits: ["Complete Detox", "Weight Loss", "Energy Boost"],
      inStock: true,
      bestseller: true
    },
    {
      id: 4,
      name: "Brahmi Memory Capsules",
      category: "supplements",
      price: 899,
      originalPrice: 1199,
      rating: 4.6,
      reviews: 156,
      description: "Natural brain tonic for memory enhancement and mental clarity",
      image: "💊",
      benefits: ["Memory", "Focus", "Mental Clarity"],
      inStock: false,
      bestseller: false
    },
    {
      id: 5,
      name: "Ashwagandha Stress Relief",
      category: "supplements",
      price: 1099,
      originalPrice: 1399,
      rating: 4.9,
      reviews: 203,
      description: "Premium Ashwagandha extract for stress management and energy",
      image: "🌱",
      benefits: ["Stress Relief", "Energy", "Sleep Quality"],
      inStock: true,
      bestseller: true
    },
    {
      id: 6,
      name: "Turmeric Golden Milk Mix",
      category: "powders",
      price: 449,
      originalPrice: 599,
      rating: 4.5,
      reviews: 78,
      description: "Organic turmeric blend with spices for daily wellness drink",
      image: "☕",
      benefits: ["Anti-inflammatory", "Immunity", "Digestion"],
      inStock: true,
      bestseller: false
    }
  ];

  const categories = [
    { id: "all", name: "All Products", icon: Package },
    { id: "oils", name: "Herbal Oils", icon: Leaf },
    { id: "powders", name: "Herb Powders", icon: Zap },
    { id: "supplements", name: "Supplements", icon: Brain },
    { id: "kits", name: "Detox Kits", icon: Award }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const addToCart = (product: any) => {
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="bg-[var(--gradient-primary)] bg-clip-text text-black">
              Ayurveda Store
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Authentic herbal medicines, oils, and wellness products curated by Ayurveda experts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <category.icon className="w-4 h-4 mr-1" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="wellness-card group hover:scale-105 transition-transform duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <div className="flex flex-col items-end space-y-1">
                    {product.bestseller && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Bestseller
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="outline" className="text-xs">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Benefits */}
                <div className="flex flex-wrap gap-1">
                  {product.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-accent fill-current' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div className="space-x-2">
                    <span className="text-lg font-bold text-foreground">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>

                {/* Add to Cart */}
                <Button 
                  className="w-full hero-button"
                  disabled={!product.inStock}
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mx-auto">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">100% Natural</h3>
            <p className="text-muted-foreground">
              All products are sourced from organic farms and prepared using traditional methods.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--gradient-accent)] rounded-full flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Expert Curated</h3>
            <p className="text-muted-foreground">
              Every product is selected and approved by certified Ayurveda practitioners.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--gradient-secondary)] rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Wellness Guarantee</h3>
            <p className="text-muted-foreground">
              30-day money-back guarantee if you're not satisfied with the results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
