import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
        <Header />
        <main className="flex-1 w-full px-4 py-8 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Router>
  );
};

export default App;
