import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface BasketState {
  items: Product[];
}

// Define the initial state using that type
const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = basketSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const basket = (state: RootState) => state.basketReducer.items;

export default basketSlice.reducer;
