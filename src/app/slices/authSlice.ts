import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

// eslint-disable-next-line import/no-cycle
import { RootState } from "../store";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setError, setUser } = authSlice.actions;

export const authUserReducer = authSlice.reducer;
const selectState = (state: RootState) => state.auth;

export const selectAuthLoading = createSelector(
  [selectState],
  (state) => state.isLoading
);
export const selectAuthError = createSelector(
  [selectState],
  (state) => state.error
);
