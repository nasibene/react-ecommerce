import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

const Cart = () => {
  const { cart, addToCart, removeOneFromCart, removeAllFromCart, clearCart } =
    useCart();
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmRemoveIndex, setConfirmRemoveIndex] = useState<number | null>(
    null
  );

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
                  {item.price.toFixed(2)} €
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">Quantité :</span>
                  <button
                    onClick={() => removeOneFromCart(index)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    –
                  </button>
                  <span className="min-w-[1.5rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setConfirmRemoveIndex(index)}
                    className="ml-4 text-sm text-red-500 hover:text-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-xl font-semibold">Total : {total} €</span>
            <button
              onClick={() => setConfirmClear(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
            >
              Vider le panier
            </button>
          </div>
        </div>
      )}

      {/* Modale confirmation vider panier */}
      <ConfirmDialog
        isOpen={confirmClear}
        title="Vider le panier"
        message="Êtes-vous sûr de vouloir tout supprimer ?"
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => {
          clearCart();
          setConfirmClear(false);
        }}
      />

      {/* Modale confirmation supprimer un produit */}
      <ConfirmDialog
        isOpen={confirmRemoveIndex !== null}
        title="Supprimer cet article"
        message="Souhaitez-vous supprimer tous les exemplaires de ce produit ?"
        onCancel={() => setConfirmRemoveIndex(null)}
        onConfirm={() => {
          if (confirmRemoveIndex !== null)
            removeAllFromCart(confirmRemoveIndex);
          setConfirmRemoveIndex(null);
        }}
      />
    </div>
  );
};

export default Cart;
