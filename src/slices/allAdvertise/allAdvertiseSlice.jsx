import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAdvertise: [],
};

const allAdvertiseSlice = createSlice({
  name: "alladvertise",
  initialState,
  reducers: {
    setAllAdvertse: (state, action) => {
      state.allAdvertise = action.payload;
    },
  },
});
export const { setAllAdvertse } = allAdvertiseSlice.actions;
export default allAdvertiseSlice.reducer;
