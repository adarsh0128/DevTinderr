import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isPaymentDone: false, 
  },
  reducers: {
    setPaymentStatus: (state, action) => {
      state.isPaymentDone = action.payload; 
    },
  },
});

export const { setPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;