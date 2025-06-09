import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/Home/HomePage';
import { CatalogPage } from './pages/Catalog/CatalogPage';
import { ProductPage } from './pages/Product/ProductPage';
import { CartPage } from './pages/Cart/CartPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { AuthPage } from './pages/Auth/AuthPage';
import './App.css';

// Базовий URL для GitHub Pages
const basename = import.meta.env.PROD ? '/guitar-shop' : '';

function App() {
  return (
    <Router basename={basename}>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;