export interface ShippingAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  shippingCost: number;
}
