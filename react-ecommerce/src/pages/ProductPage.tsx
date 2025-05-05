// src/pages/ProductPage.tsx
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import AddToCartModal from "../components/AddToCartModal";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p>Produit introuvable.</p>;
  }

  const handleAdd = () => {
    addToCart(product);
    setModalOpen(true);
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-cover rounded-xl shadow-md"
      />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl text-indigo-600 font-semibold">
          {product.price.toFixed(2)} €
        </p>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700"
        >
          Ajouter au panier
        </button>
      </div>

      {/* Modale d'ajout au panier */}
      <AddToCartModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={product.title}
      />
    </div>
  );
};

export default ProductPage;
