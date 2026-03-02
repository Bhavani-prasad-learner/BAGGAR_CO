
import React from "react";
import { Link } from "react-router-dom";
import { Home, Menu, ShoppingCart, UserRound } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import CartContents from "./CartContents";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MobileNavigation: React.FC = () => {
  const { getTotalItems } = useCart();
  const { user } = useAuth();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "";
    const username = user.user_metadata?.username;
    if (username) {
      return username.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const navItems = [
    { label: "Home", icon: <Home className="h-6 w-6" />, href: "#" },
    { 
      label: "Menu", 
      icon: <Menu className="h-6 w-6" />, 
      href: "#menu" 
    },
    { 
      label: "Cart", 
      icon: (
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          {getTotalItems() > 0 && (
            <span className="absolute bg-restaurant-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </div>
      ),
      isSheet: true
    },
    { 
      label: "Profile", 
      icon: user ? (
        <Avatar className="h-6 w-6 border border-restaurant-primary">
          <AvatarFallback className="bg-restaurant-primary/20 text-restaurant-primary text-xs">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <UserRound className="h-6 w-6" />
      ),
      href: user ? "#profile" : "/auth"
    }
  ];

  return (
    <div className="fixed bottom-10 left-0 right-0 z-50 md:hidden">
      <div className="bg-gradient-to-r from-black via-restaurant-dark to-black border-t-2 border-restaurant-primary/30 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => (
            item.isSheet ? (
              <Sheet key={index}>
                <SheetTrigger asChild>
                  <button className="flex flex-col items-center justify-center text-white hover:text-restaurant-primary transition-colors">
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                  </button>
                </SheetTrigger>
                <SheetContent className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                  </SheetHeader>
                  <CartContents />
                </SheetContent>
              </Sheet>
            ) : (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center text-white hover:text-restaurant-primary transition-colors"
                )}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
