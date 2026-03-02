
import React from "react";
import { MenuItem } from "../data/menuData";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden transition-all duration-300 bg-black/40 border border-restaurant-primary/30 hover:shadow-lg hover:shadow-restaurant-primary/20 hover:scale-[1.02]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 bg-restaurant-primary text-white font-bold px-3 py-1 rounded-full text-sm">
          {formatCurrency(item.price)}
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-medium text-white mb-2 font-display">{item.name}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{item.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 gap-2 py-6"
          onClick={() => addToCart(item)}
        >
          <ShoppingCart className="h-5 w-5" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
