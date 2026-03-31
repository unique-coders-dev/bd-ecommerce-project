import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Products from './components/Products';
import Features from './components/Features';
import Footer from './components/Footer';
import Shop from './pages/Shop';

const HomePage = () => (
  <main className="bg-white">
    <Hero />
    <Products />
    <Brands />
    <Features />
  </main>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-transparent">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
