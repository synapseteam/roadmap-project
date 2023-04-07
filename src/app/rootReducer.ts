import { combineReducers } from "redux";

import { authUserReducer } from "./slices/authSlice";
import { cardsListReducer } from "./slices/cardsListSlice";

export const rootReducer = combineReducers({
  cardList: cardsListReducer,
  auth: authUserReducer,
});
