import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();
  const itemCount = cart.items.length;

  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-tight"
        >
          ReactShop
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-indigo-600 transition"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
