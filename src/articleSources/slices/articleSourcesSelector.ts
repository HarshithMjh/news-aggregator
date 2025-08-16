import { createSelector } from "reselect";
import { getIsLoading as getIsNewsApiLoading } from "./newsApiSlice.ts";
import { getIsLoading as getIsGuardianApiLoading } from "./guardianApiSlice.ts";
import { getIsLoading as getIsNYTimesApiLoading } from "./nyTimesApiSlice.ts";

export const getIsAnySourceLoading = createSelector(
  getIsNewsApiLoading,
  getIsGuardianApiLoading,
  getIsNYTimesApiLoading,
  (...args) => args.includes(true),
);
