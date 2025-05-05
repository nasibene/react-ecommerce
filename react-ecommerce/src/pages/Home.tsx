import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import AddToCartModal from "../components/AddToCartModal";

const Home = () => {
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [lastProduct, setLastProduct] = useState<Product | null>(null);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setLastProduct(product);
    setModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nos produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAdd} />
        ))}
      </div>

      {lastProduct && (
        <AddToCartModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productName={lastProduct.title}
        />
      )}
    </div>
  );
};

export default Home;
