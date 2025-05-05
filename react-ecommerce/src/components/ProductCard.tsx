import { Product } from "../data/products";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image cliquable avec zoom on hover */}
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          <Link to={`/product/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-600 font-bold text-lg">
            {product.price.toFixed(2)} €
          </span>
          <button
            onClick={() => onAdd(product)}
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm transition"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
