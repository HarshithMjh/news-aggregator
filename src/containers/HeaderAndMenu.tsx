import { useCallback, useEffect, type ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import debounce from "lodash/debounce";

import type { AppDispatch } from "../store.ts";
import {
  getSearchText,
  setSearchText,
  getIsMenuOpen,
  setIsMenuOpen,
} from "../slices/dataSlice.ts";
import { getArticlesFromSources } from "../articleSources/thunks/thunk.ts";
import Filters from "../components/Filters.tsx";
import "./HeaderAndMenu.scss";

const Header = () => {
  const searchText = useSelector(getSearchText);
  const isMenuOpen = useSelector(getIsMenuOpen);
  const dispatch = useDispatch<AppDispatch>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(() => {
      dispatch(getArticlesFromSources());
    }, 2000),
    [dispatch],
  );

  const handleSearchChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchText(event.target.value));
      debouncedSearch();
    },
    [debouncedSearch, dispatch],
  );

  const handleMenuClicked = useCallback(() => {
    dispatch(setIsMenuOpen(true));
  }, [dispatch]);

  const handleCloseDrawer = useCallback(() => {
    dispatch(setIsMenuOpen(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArticlesFromSources());
  }, [dispatch]);

  return (
    <AppBar position="static" className="header-container" color="transparent">
      <Toolbar>
        <IconButton size="large" color="inherit" onClick={handleMenuClicked}>
          <MenuIcon />
        </IconButton>
        <div className="search-container">
          <Input
            name="Article search"
            fullWidth
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlinedIcon color="inherit" />
              </InputAdornment>
            }
            value={searchText}
            onChange={handleSearchChanged}
          />
        </div>
      </Toolbar>
      <Drawer open={isMenuOpen} onClose={handleCloseDrawer}>
        <div className="drawer-container">
          <AppBar position="static" color="transparent">
            <Toolbar className="drawer-toolbar">
              <Typography variant="h6" component="div">
                Settings
              </Typography>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleCloseDrawer}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Filters />
        </div>
      </Drawer>
    </AppBar>
  );
};

export default Header;
