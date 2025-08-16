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
} from "../slices/nyTimesApiSlice.ts";

export interface NYTimesApiArticle {
  headline: {
    main: string;
  };
  abstract: string;
  multimedia: {
    default: {
      url: string;
    };
  };
  web_url: string;
  pub_date: string;
  source: string;
  byline: {
    original: string;
  };
}

const formatConvertArticles = (articles: Array<NYTimesApiArticle>) =>
  articles.map((article) => ({
    title: article.headline?.main,
    description: article?.abstract,
    imageUrl: article.multimedia?.default?.url,
    fullArticleUrl: article.web_url,
    publishedAt: article.pub_date,
    source: article.source,
    author: article.byline?.original,
    category: "",
  }));

const getArticlesFromApi = (
  searchText: string,
  startDate: string,
  endDate: string,
  pageNumber: number,
) => {
  const url = new URL(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  );
  url.searchParams.append("api-key", "34FmGpqNnpWGb3cs43XAqtHmUqxlA1Zu");
  url.searchParams.append("page", pageNumber.toString());
  url.searchParams.append("q", searchText);
  if (startDate) {
    url.searchParams.append("begin_date", startDate.replaceAll("-", ""));
  }
  if (endDate) {
    url.searchParams.append("end_date", endDate.replaceAll("-", ""));
  }
  return fetch(url.href)
    .then((resp) => resp.json())
    .then((resp) => {
      if (Array.isArray(resp.response.docs)) {
        return formatConvertArticles(resp.response.docs);
      }
      return [];
    })
    .catch((error) => {
      console.log("Something went wrong in nyTimes API response");
      console.error(error);
      return [];
    });
};

export const getArticles = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>("nyTimes/getArticles", async (_, { getState, dispatch }) => {
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
>("nyTimes/getNextPageArticles", async (_, { getState, dispatch }) => {
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
