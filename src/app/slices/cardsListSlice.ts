import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { CardType } from "../../types";

type AddCardDataType = {
  title: string;
  description?: string;
};

const initialState: CardType[] = [];

const cardsListSlice = createSlice({
  name: "Cards",
  initialState,
  reducers: {
    addCard: {
      reducer: (state, action: PayloadAction<CardType>) => {
        state.push(action.payload);
      },
      prepare: (data: AddCardDataType) => ({
        payload: {
          id: uuidv4(),
          title: data.title,
          description: data.description,
          status: "Pending",
          likes: 0,
          comments: 0,
        } as CardType,
      }),
    },
    removeCard(state, action: PayloadAction<string>) {
      const index = state.findIndex((card) => card.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const cardsList = cardsListSlice.reducer;
export const { addCard, removeCard } = cardsListSlice.actions;
