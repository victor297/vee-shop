import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numOfIceCreams: 20,
};

const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState,
  reducers: {
    ordered(state) {
      state.numOfIceCreams--;
    },
    restocked(state, action) {
      state.numOfIceCreams += action.payload;
    },
  },
});

export default iceCreamSlice.reducer;
export const { ordered, restocked } = iceCreamSlice.actions;
