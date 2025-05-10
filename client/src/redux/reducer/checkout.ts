import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutFormData {
  [key: string]: any; 
}

interface CheckoutState {
  currentStep: number;
  checkoutFormData: CheckoutFormData;
}

const initialState: CheckoutState = {
  currentStep: 1,
  checkoutFormData: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateCheckoutFormData: (state, action: PayloadAction<CheckoutFormData>) => {
      state.checkoutFormData = {
        ...state.checkoutFormData,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentStep, updateCheckoutFormData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
