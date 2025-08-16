import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";

export interface Article {
  title: string;
  description: string;
  imageUrl: string;
  fullArticleUrl: string;
  publishedAt: string;
  source: string;
  author: string;
  category: string;
}

type NEWS_API = "news-api";
type THE_GUARDIAN_API = "the-guardian-api";
type NY_TIMES_API = "ny-times-api";

export const SOURCES = {
  NEWS_API: {
    lable: "News API",
    value: "news-api" as NEWS_API,
  },
  THE_GUARDIAN_API: {
    lable: "The Guardian",
    value: "the-guardian-api" as THE_GUARDIAN_API,
  },
  NY_TIMES_API: {
    lable: "New York Times",
    value: "ny-times-api" as NY_TIMES_API,
  },
};

export const ALL_SOURCES = [
  SOURCES.NEWS_API,
  SOURCES.THE_GUARDIAN_API,
  SOURCES.NY_TIMES_API,
];

export type SOURCES_TYPE = NEWS_API | THE_GUARDIAN_API | NY_TIMES_API;

export interface DataSliceState {
  searchText: string;
  articles: Array<Article>;
  isMenuOpen: boolean;
  startDate: string;
  endDate: string;
  filteredSources: Array<SOURCES_TYPE>;
}

const initialState: DataSliceState = {
  searchText: "",
  articles: [],
  isMenuOpen: false,
  startDate: "",
  endDate: "",
  filteredSources: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setArticles: (state, action: PayloadAction<Array<Article>>) => {
      state.articles = action.payload;
    },
    appendArticles: (state, action: PayloadAction<Array<Article>>) => {
      state.articles = [...state.articles, ...action.payload];
    },
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setFilteredSources: (state, action: PayloadAction<Array<SOURCES_TYPE>>) => {
      state.filteredSources = action.payload;
    },
  },
});

export const {
  setSearchText,
  setArticles,
  appendArticles,
  setIsMenuOpen,
  setStartDate,
  setEndDate,
  setFilteredSources,
} = dataSlice.actions;

export default dataSlice.reducer;

export const getSearchText = (state: RootState) => state.data.searchText;
export const getArticles = (state: RootState) => state.data.articles;
export const getIsMenuOpen = (state: RootState) => state.data.isMenuOpen;
export const getStartDate = (state: RootState) => state.data.startDate;
export const getEndDate = (state: RootState) => state.data.endDate;
export const getFilteredSources = (state: RootState) =>
  state.data.filteredSources;
