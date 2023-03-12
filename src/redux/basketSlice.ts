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
  reducers: {
    addToBasket: (state: BasketState, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeFromBasket: (
      state: BasketState,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload.id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors
export const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBasketItemsWithId = (state: RootState, id: string) =>
  state.basket.items.filter((item: Product) => item._id === id);

export const selectBasketTotal = (state: RootState) =>
  state.basket.items.reduce(
    (total: number, item: Product) => (total += item.price),
    0
  );

export default basketSlice.reducer;
