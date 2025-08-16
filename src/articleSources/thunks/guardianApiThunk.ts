import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";
import {
  getSearchText,
  getStartDate,
  getEndDate,
  appendArticles,
} from "../../slices/dataSlice.ts";
import {
  resetAllStates,
  setIsLoading,
  setIsLastPageReached,
  getPageNumber,
  incrementPageNumber,
} from "../slices/guardianApiSlice.ts";

export interface GuardianApiArticle {
  fields: {
    headline: string;
    trailText: string;
    thumbnail: string;
    publication: string;
  };
  webUrl: string;
  webPublicationDate: string;
}

const formatConvertArticles = (articles: Array<GuardianApiArticle>) =>
  articles.map((article) => ({
    title: article.fields?.headline,
    description: article.fields?.trailText,
    imageUrl: article.fields?.thumbnail,
    fullArticleUrl: article.webUrl,
    publishedAt: article.webPublicationDate,
    source: article.fields?.publication,
    author: "",
    category: "",
  }));

const getArticlesFromApi = (
  searchText: string,
  startDate: string,
  endDate: string,
  pageNumber: number,
) => {
  const url = new URL("https://content.guardianapis.com/search");
  url.searchParams.append("api-key", "1e417b0f-cf20-44e0-84d1-f9a5d7d8c632");
  url.searchParams.append("page-size", "10");
  url.searchParams.append("page", pageNumber.toString());
  url.searchParams.append("lang", "en");
  url.searchParams.append(
    "show-fields",
    "headline,trailText,thumbnail,publication",
  );
  url.searchParams.append("show-references", "author");
  url.searchParams.append("q", searchText);
  if (startDate) {
    url.searchParams.append("from-date", startDate);
  }
  if (endDate) {
    url.searchParams.append("to-date", endDate);
  }
  return fetch(url.href)
    .then((resp) => resp.json())
    .then((resp) => {
      if (Array.isArray(resp.response.results)) {
        return formatConvertArticles(resp.response.results);
      }
      return [];
    })
    .catch((error) => {
      console.log("Something went wrong in Guardian API response");
      console.error(error);
      return [];
    });
};

export const getArticles = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>("guardianApi/getArticles", async (_, { getState, dispatch }) => {
  const state = getState();
  const searchText = getSearchText(state);
  const startDate = getStartDate(state);
  const endDate = getEndDate(state);
  dispatch(resetAllStates());
  dispatch(setIsLoading(true));
  const articles = await getArticlesFromApi(searchText, startDate, endDate, 1);
  dispatch(setIsLoading(false));
  if (articles.length) {
    dispatch(setIsLastPageReached(false));
    dispatch(appendArticles(articles));
  } else {
    dispatch(setIsLastPageReached(true));
  }
});

export const getNextPageArticles = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>("guardianApi/getNextPageArticles", async (_, { getState, dispatch }) => {
  const state = getState();
  const searchText = getSearchText(state);
  const startDate = getStartDate(state);
  const endDate = getEndDate(state);
  const pageNumber = getPageNumber(state);
  dispatch(incrementPageNumber());
  dispatch(setIsLoading(true));
  const articles = await getArticlesFromApi(
    searchText,
    startDate,
    endDate,
    pageNumber + 1,
  );
  dispatch(setIsLoading(false));
  if (articles.length) {
    dispatch(setIsLastPageReached(false));
    dispatch(appendArticles(articles));
  } else {
    dispatch(setIsLastPageReached(true));
  }
});
