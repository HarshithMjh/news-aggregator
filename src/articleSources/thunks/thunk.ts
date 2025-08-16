import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";
import {
  setArticles,
  getFilteredSources,
  SOURCES,
  type SOURCES_TYPE,
} from "../../slices/dataSlice.ts";
import {
  getArticles as getNewsApiArticles,
  getNextPageArticles as getNewsApiNextPageArticles,
} from "./newsApiThunk.ts";
import {
  getArticles as getGuardianApiArticles,
  getNextPageArticles as getGuardianApiNextPageArticles,
} from "./guardianApiThunk.ts";
import {
  getArticles as getNYTimesApiArticles,
  getNextPageArticles as getNYTimesApiNextPageArticles,
} from "./nyTimesApiThunk.ts";
import {
  getIsLoading as getNewsApiIsLoading,
  getIsLastPageReached as getNewsApiIsLastPageReached,
} from "../slices/newsApiSlice.ts";
import {
  getIsLoading as getGuardianApiIsLoading,
  getIsLastPageReached as getGuardianApiIsLastPageReached,
} from "../slices/guardianApiSlice.ts";
import {
  getIsLoading as getNYTimesApiIsLoading,
  getIsLastPageReached as getNYTimesApiIsLastPageReached,
} from "../slices/nyTimesApiSlice.ts";

const findSourcesCouldBeFetched = (filteredSources: Array<SOURCES_TYPE>) => {
  if (filteredSources.length) {
    return filteredSources;
  }
  return [
    SOURCES.NEWS_API.value,
    SOURCES.THE_GUARDIAN_API.value,
    SOURCES.NY_TIMES_API.value,
  ];
};

export const getArticlesFromSources = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>("data/getArticlesFromAllSources", async (_, { getState, dispatch }) => {
  const state = getState();
  dispatch(setArticles([]));
  const filteredSources = getFilteredSources(state);
  const sourcesCouldBeFetched = findSourcesCouldBeFetched(filteredSources);
  if (sourcesCouldBeFetched.includes(SOURCES.NEWS_API.value)) {
    dispatch(getNewsApiArticles());
  }
  if (sourcesCouldBeFetched.includes(SOURCES.THE_GUARDIAN_API.value)) {
    dispatch(getGuardianApiArticles());
  }
  if (sourcesCouldBeFetched.includes(SOURCES.NY_TIMES_API.value)) {
    dispatch(getNYTimesApiArticles());
  }
});

export const getNextPageArticlesFromSources = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>("data/getArticlesFromAllSources", async (_, { getState, dispatch }) => {
  const state = getState();
  const newsApiIsLoading = getNewsApiIsLoading(state);
  const newsApiISLastPageReached = getNewsApiIsLastPageReached(state);
  const guardianApiIsLoading = getGuardianApiIsLoading(state);
  const guardianApiISLastPageReached = getGuardianApiIsLastPageReached(state);
  const nyTimesApiIsLoading = getNYTimesApiIsLoading(state);
  const nyTimesApiISLastPageReached = getNYTimesApiIsLastPageReached(state);
  const filteredSources = getFilteredSources(state);
  const sourcesCouldBeFetched = findSourcesCouldBeFetched(filteredSources);
  if (
    sourcesCouldBeFetched.includes(SOURCES.NEWS_API.value) &&
    !newsApiIsLoading &&
    !newsApiISLastPageReached
  ) {
    dispatch(getNewsApiNextPageArticles());
  }
  if (
    sourcesCouldBeFetched.includes(SOURCES.THE_GUARDIAN_API.value) &&
    !guardianApiIsLoading &&
    !guardianApiISLastPageReached
  ) {
    dispatch(getGuardianApiNextPageArticles());
  }
  if (
    sourcesCouldBeFetched.includes(SOURCES.NY_TIMES_API.value) &&
    !nyTimesApiIsLoading &&
    !nyTimesApiISLastPageReached
  ) {
    dispatch(getNYTimesApiNextPageArticles());
  }
});
