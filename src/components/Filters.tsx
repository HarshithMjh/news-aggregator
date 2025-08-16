import { useCallback, type ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "@mui/material/Input";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";

import type { AppDispatch } from "../store.ts";
import { getArticlesFromSources } from "../articleSources/thunks/thunk.ts";
import {
  getStartDate,
  getEndDate,
  getFilteredSources,
  setStartDate,
  setEndDate,
  setFilteredSources,
  ALL_SOURCES,
  type SOURCES_TYPE,
} from "../slices/dataSlice.ts";
import "./Filters.scss";

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const filteredSources = useSelector(getFilteredSources);

  const handleStartDateChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setStartDate(event.target.value));
      dispatch(getArticlesFromSources());
    },
    [dispatch],
  );

  const handleEndDateChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setEndDate(event.target.value));
      dispatch(getArticlesFromSources());
    },
    [dispatch],
  );

  const handleFilteredSourcesChanged = useCallback(
    (event: SelectChangeEvent<SOURCES_TYPE[]>) => {
      if (Array.isArray(event.target.value)) {
        dispatch(setFilteredSources(event.target.value));
        dispatch(getArticlesFromSources());
      }
    },
    [dispatch],
  );

  return (
    <div className="filters-container">
      <div className="filters-header">Filters</div>
      <div className="filters-body">
        Date Range
        <div className="date-range-container">
          <Input
            className="date-selector"
            type="date"
            name="start date"
            placeholder="Start Date"
            value={startDate}
            onChange={handleStartDateChanged}
            inputProps={{
              max: endDate,
            }}
          />
          <span>-</span>
          <Input
            className="date-selector"
            type="date"
            name="end date"
            placeholder="End Date"
            value={endDate}
            onChange={handleEndDateChanged}
            inputProps={{
              min: startDate,
            }}
          />
        </div>
        Source
        <div className="source-container">
          <Select
            multiple
            displayEmpty
            value={filteredSources}
            onChange={handleFilteredSourcesChanged}
            className="select"
            input={<OutlinedInput id="select-multiple-chip" />}
            renderValue={(selected) =>
              selected.length ? (
                <Box className="chip-container">
                  {ALL_SOURCES.filter(({ value }) =>
                    selected.includes(value),
                  ).map(({ lable, value }) => (
                    <Chip key={value} label={lable} />
                  ))}
                </Box>
              ) : (
                <em>Select sources</em>
              )
            }
          >
            {ALL_SOURCES.map((source) => (
              <MenuItem key={source.value} value={source.value}>
                {source.lable}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
