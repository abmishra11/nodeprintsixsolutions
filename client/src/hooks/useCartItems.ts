import { useGetCartItemsQuery } from '../redux/services/cart';
import { CartItem } from '../types/cart';

export function useCartItems(isAuthenticated: boolean) {
  const {
    data: serverCart = [],
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });

  let guestCartItems: CartItem[] = [];

  if (typeof window !== 'undefined' && !isAuthenticated) {
    try {
      const raw = localStorage.getItem('guest_cart');
      guestCartItems = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('Error reading guest cart from localStorage:', error);
    }
  }

  const cartItems = isAuthenticated ? serverCart : guestCartItems;

  return {
    cartItems,
    serverCart,
    guestCartItems,
    isCartLoading,
    cartError,
  };
}
