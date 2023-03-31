import { combineReducers } from "redux";

import { cardsList } from "./slices/cardsListSlice";

export const rootReducer = combineReducers({
  cardList: cardsList,
});
