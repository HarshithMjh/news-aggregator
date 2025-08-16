import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice.ts";
import newsApiReducer from "./articleSources/slices/newsApiSlice.ts";
import guardianApiReducer from "./articleSources/slices/guardianApiSlice.ts";
import nyTimesApiReducer from "./articleSources/slices/nyTimesApiSlice.ts";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    newsApi: newsApiReducer,
    guardianApi: guardianApiReducer,
    nyTimesApi: nyTimesApiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
