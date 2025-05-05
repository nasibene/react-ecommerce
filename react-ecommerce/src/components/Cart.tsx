import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeOneFromCart, removeAllFromCart, clearCart } = useCart();

  const total = cart.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>

      {cart.items.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md hover:opacity-90 transition"
                />
              </Link>

              <div className="flex-1">
                <Link
                  to={`/product/${item.id}`}
                  className="text-lg font-semibold text-indigo-600 hover:underline"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-gray-500">
                  {item.price.toFixed(2)} € × {item.quantity}
                </p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => removeOneFromCart(index)}
                    className="text-sm px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    ➖ Retirer 1
                  </button>
                  <button
                    onClick={() => removeAllFromCart(index)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Supprimer tout
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-xl font-semibold">Total : {total} €</span>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
            >
              Vider le panier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
