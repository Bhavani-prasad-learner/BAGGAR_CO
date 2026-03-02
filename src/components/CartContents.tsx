
import React from "react";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

const CartContents: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <p className="text-sm text-muted-foreground">Add some delicious items from our menu!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto py-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-restaurant-primary font-semibold">
                  {formatCurrency(item.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeFromCart(item.id)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-5 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => addToCart(item)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t pt-4">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total:</span>
          <span>{formatCurrency(getTotalPrice())}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartContents;
