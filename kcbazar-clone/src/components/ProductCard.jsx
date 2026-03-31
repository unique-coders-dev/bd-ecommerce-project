import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, brand, image, regularPrice, salePrice, discount, stockStatus } = product;

  return (
    <div className="shop-product-card stylish-card">
      <div className="product-image-container">
        {discount && <span className="discount-badge">{discount}</span>}
        <Link to={`/product/${id}`} className="product-img-link">
          <img src={image} alt={name} className="product-image" loading="lazy" />
        </Link>
        <div className="product-overlay">
          {/* Removed Love Button as requested */}
          <button className="overlay-btn" title="Compare">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 21V16h5M4 3h5v5M15 21h5v-5M8 3v18M16 3v18M3 8h18M3 16h18"></path></svg>
          </button>
          <button className="overlay-btn" title="Quick View">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
      </div>
      <div className="product-details">
        <div className="product-brand-link">{brand}</div>
        <Link to={`/product/${id}`} className="product-title-link">
          <h3 className="product-title">{name}</h3>
        </Link>
        <div className="star-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-text">(0)</span>
        </div>
        <div className="stock-status" data-status={stockStatus === 'In stock' ? 'instock' : 'outofstock'}>
          {stockStatus}
        </div>
        <div className="product-pricing">
          <span className="old-price">৳ {regularPrice}</span>
          <span className="current-price">৳ {salePrice}</span>
        </div>
        <button className="add-to-cart-btn">
          <span className="btn-icon">🛒</span>
          <span className="btn-text">Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
