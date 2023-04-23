import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  card: [],
};

export const cardSelector = (state) => state.card;

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard(state, { payload }) {
      const itemInCard = state.card.find(
        (item) => item.product_id === payload.product_id
      );
      if (itemInCard) {
        itemInCard.quantity++;
      } else {
        state.card.push({
          ...payload,
          quantity: 1,
        });
      }
    },
    incrementQuantity(state, { payload }) {
      const item = state.card.find(
        (item) => item.product_id === payload.product_id
      );

      item.quantity++;
    },
    decrementQuantity(state, { payload }) {
      const item = state.card.find(
        (item) => item.product_id === payload.product_id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem(state, { payload }) {
      state.card = state.card.filter(
        (item) => item.product_id !== payload.product_id
      );
    },
    resetCard: (state) => {
      state.card = [];
    },
  },
});

export const {
  addToCard,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  resetCard,
} = cardSlice.actions;

export default cardSlice.reducer;
