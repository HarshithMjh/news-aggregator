import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";

export interface CounterState {
  isLoading: boolean;
  isLastPageReached: boolean;
  pageNumber: number;
}

const initialState: CounterState = {
  isLoading: false,
  isLastPageReached: false,
  pageNumber: 1,
};

export const guardianApiSlice = createSlice({
  name: "guardianApi",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLastPageReached: (state, action: PayloadAction<boolean>) => {
      state.isLastPageReached = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    incrementPageNumber: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
    resetAllStates: (state) => {
      state.isLoading = false;
      state.isLastPageReached = false;
      state.pageNumber = 1;
    },
  },
});

export const {
  setIsLoading,
  setIsLastPageReached,
  setPageNumber,
  incrementPageNumber,
  resetAllStates,
} = guardianApiSlice.actions;

export default guardianApiSlice.reducer;

export const getIsLoading = (state: RootState) => state.guardianApi.isLoading;
export const getIsLastPageReached = (state: RootState) =>
  state.guardianApi.isLastPageReached;
export const getPageNumber = (state: RootState) => state.guardianApi.pageNumber;
