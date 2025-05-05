import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "../data/products";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE_ONE"; payload: number }
  | { type: "REMOVE_ALL"; payload: number }
  | { type: "CLEAR" };

const CartContext = createContext<{
  cart: CartState;
  addToCart: (product: Product) => void;
  removeOneFromCart: (index: number) => void;
  removeAllFromCart: (index: number) => void;
  clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD": {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        const updated = [...state.items];
        updated[index].quantity += 1;
        return { items: updated };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_ONE": {
      const updated = [...state.items];
      if (updated[action.payload].quantity > 1) {
        updated[action.payload].quantity -= 1;
        return { items: updated };
      } else {
        updated.splice(action.payload, 1);
        return { items: updated };
      }
    }
    case "REMOVE_ALL": {
      const updated = [...state.items];
      updated.splice(action.payload, 1);
      return { items: updated };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD", payload: product });
  };

  const removeOneFromCart = (index: number) => {
    dispatch({ type: "REMOVE_ONE", payload: index });
  };

  const removeAllFromCart = (index: number) => {
    dispatch({ type: "REMOVE_ALL", payload: index });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeOneFromCart,
        removeAllFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
