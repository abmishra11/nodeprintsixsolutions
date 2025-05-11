import { CartItem } from "../types/cart";
import { store } from "../redux/Store";
import { useAddCartItemMutation } from "../redux/services/cart";

export const migrateGuestCart = async (addCartItem: any) => {
  try {
    const raw = localStorage.getItem("guest_cart");
    const guestCart: CartItem[] = raw ? JSON.parse(raw) : [];

    if (guestCart.length === 0) return;

    for (const item of guestCart) {
      try {
        await addCartItem(item).unwrap();
      } catch (e) {
        console.error("Error migrating item:", item, e);
      }
    }

    localStorage.removeItem("guest_cart");
  } catch (e) {
    console.error("Error during guest cart migration", e);
  }
};
