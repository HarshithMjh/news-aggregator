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
} from "../slices/newsApiSlice.ts";

export interface NewsApiArticle {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string;
}

const formatConvertArticles = (articles: Array<NewsApiArticle>) =>
  articles.map((article) => ({
    title: article.title,
    description: article.description,
    imageUrl: article.urlToImage,
    fullArticleUrl: article.url,
    publishedAt: article.publishedAt,
    source: article.source?.name,
    author: article.author,
    category: "",
  }));

const getArticlesFromApi = (
  searchText: string,
  startDate: string,
  endDate: string,
  pageNumber: number,
) => {
  const url = new URL("https://newsapi.org/v2/everything");
  url.searchParams.append("apiKey", "3cd57e262cc04b0b8bc57a863791cb39");
  url.searchParams.append("pageSize", "10");
  url.searchParams.append("page", pageNumber.toString());
  url.searchParams.append("language", "en");
  url.searchParams.append("q", searchText);
  if (startDate) {
    url.searchParams.append("from", startDate);
  }
  if (endDate) {
    url.searchParams.append("to", endDate);
  }
  return fetch(url.href)
    .then((resp) => resp.json())
    .then((resp) => {
      if (Array.isArray(resp.articles)) {
        return formatConvertArticles(resp.articles);
      }
      return [];
    })
    .catch((error) => {
      console.log("Something went wrong in NewsApi response");
      console.error(error);
      return [];
    });
};

export const getArticles = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>("newsApi/getArticles", async (_, { getState, dispatch }) => {
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
>("newsApi/getNextPageArticles", async (_, { getState, dispatch }) => {
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
