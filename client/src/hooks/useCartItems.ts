import { useEffect, useState } from 'react';
import { useGetCartItemsQuery } from '../redux/services/cart';
import { CartItem } from '../types/cart';
import { subscribeToGuestCart } from '../utils/guestCartEvents';

export function useCartItems(isAuthenticated: boolean) {
  const {
    data: serverCart = [],
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [guestCartItems, setGuestCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      const loadGuestCart = () => {
        try {
          const raw = localStorage.getItem('guest_cart');
          const items = raw ? JSON.parse(raw) : [];
          setGuestCartItems(items);
        } catch (error) {
          console.error('Error reading guest cart from localStorage:', error);
        }
      };

      loadGuestCart();

      const unsubscribe = subscribeToGuestCart(loadGuestCart);
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const cartItems = isAuthenticated ? serverCart : guestCartItems;

  return {
    cartItems,
    serverCart,
    guestCartItems,
    isCartLoading,
    cartError,
  };
}
