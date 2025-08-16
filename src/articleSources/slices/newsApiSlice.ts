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

export const newsApiSlice = createSlice({
  name: "newsApi",
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
} = newsApiSlice.actions;

export default newsApiSlice.reducer;

export const getIsLoading = (state: RootState) => state.newsApi.isLoading;
export const getIsLastPageReached = (state: RootState) =>
  state.newsApi.isLastPageReached;
export const getPageNumber = (state: RootState) => state.newsApi.pageNumber;
