import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, brand, image, regularPrice, salePrice, discount, stockStatus } = product;
  const link = `/product/${id}`;

  return (
    <a href={link} className="product-card">
        <div className="product-img-wrap">
          {discount && <span className="product-badge">{discount}</span>}
          <img src={image} alt={name} className="product-img" loading="lazy" />
          
          <button className="hover-add-cart-btn">Add to cart</button>

          <div className="product-actions">
            <button className="action-circle-btn" aria-label="Compare" title="Compare">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5M4 21V16h5M4 3h5v5M15 21h5v-5M8 3v18M16 3v18M3 8h18M3 16h18"></path>
              </svg>
            </button>
            <button className="action-circle-btn" aria-label="Quick view" title="Quick view">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="action-circle-btn" aria-label="Add to wishlist" title="Add to wishlist">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      <div className="product-info bg-white rounded-b-xl">
        <div className="product-brand">{brand}</div>
        <div className="product-name">{name}</div>
        <div className="star-rating" style={{ color: '#fbbf24', fontSize: '13px' }}>
          ★★★★★ <span className="rating-text" style={{ color: '#999', fontSize: '12px' }}>(0)</span>
        </div>
        <div className="product-stock">{stockStatus}</div>
        <div className="product-price">
          {regularPrice && regularPrice !== salePrice && (
            <span className="price-regular">৳ {regularPrice}</span>
          )}
          <span className="price-sale">৳ {salePrice}</span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
