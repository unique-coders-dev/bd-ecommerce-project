import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);
        
        // Calculate effective sale price if missing but discount exists
        let effectiveProduct = { ...product };
        if (!effectiveProduct.salePrice || effectiveProduct.salePrice <= 0) {
          const discountVal = parseFloat(product.discount);
          if (discountVal > 0) {
            if (String(product.discount).includes('%')) {
               effectiveProduct.salePrice = Math.round(product.regularPrice * (1 - discountVal / 100));
            } else {
               // If no percentage, treat as percentage for now to match ProductCard logic
               // unless we want to treat it as flat. ProductCard uses it as percentage.
               effectiveProduct.salePrice = Math.round(product.regularPrice * (1 - discountVal / 100));
            }
          }
        }

        if (existingItem) {
          set({
            cartItems: cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ cartItems: [...cartItems, { ...effectiveProduct, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        });
      },
      appliedCoupon: null,
      setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
      clearAppliedCoupon: () => set({ appliedCoupon: null }),
      clearCart: () => set({ cartItems: [], appliedCoupon: null }),
      getCartSubtotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + (item.regularPrice || 0) * item.quantity,
          0
        );
      },
      getCartDiscount: () => {
        const subtotal = get().getCartSubtotal();
        const total = get().getCartTotal();
        return subtotal - total;
      },
      getCartTotal: () => {
        const itemsTotal = get().cartItems.reduce(
          (total, item) => total + (item.salePrice || item.regularPrice || 0) * item.quantity,
          0
        );
        const coupon = get().appliedCoupon;
        if (!coupon) return itemsTotal;
        
        let discount = 0;
        if (coupon.discountType === 'percentage') {
          discount = (itemsTotal * coupon.discountValue) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
        return Math.max(0, itemsTotal - discount);
      },
      getCouponDiscount: () => {
        const itemsTotal = get().cartItems.reduce(
          (total, item) => total + (item.salePrice || item.regularPrice || 0) * item.quantity,
          0
        );
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        
        let discount = 0;
        if (coupon.discountType === 'percentage') {
          discount = (itemsTotal * coupon.discountValue) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
        return discount;
      }
    }),
    {
      name: 'kcbazar-cart',
    }
  )
);
