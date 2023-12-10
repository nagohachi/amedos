import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import lightLogoUrl from "../../assets/images/amedos_light.png";
import darkLogoUrl from "../../assets/images/amedos_dark.png";
import { FormControlLabel } from "@mui/material";
import ToggleModeSwitch from "../switch/ToggleModeSwitch";
import { Link } from "react-router-dom";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "inherit",
  "& button": {
    background: "none",
    border: "none",
    outline: "none",
    color: "inherit",
    zIndex: 1,
    cursor: "pointer",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  border: "1px solid #beb8cc",
  borderRadius: "3px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
      "&:focus": {
        width: "55ch",
      },
    },
  },
}));

interface SearchAppBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setSearchKeyword: (keyword: string) => void;
}

export default function SearchAppBar({
  darkMode,
  toggleDarkMode,
  setSearchKeyword,
}: SearchAppBarProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Link to="/">
            <img
              src={darkMode ? darkLogoUrl : lightLogoUrl}
              alt="logo"
              style={{ height: "45px" }}
            />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSearchKeyword(inputValue);
            }}
          >
            <Search>
              <SearchIconWrapper>
                <button type="submit">
                  <SearchIcon />
                </button>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="市町村名を入力"
                inputProps={{ "aria-label": "search" }}
                value={inputValue}
                // 入力が更新されたら setInputValue に入力値をセット
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
              />
            </Search>
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <FormControlLabel
            control={
              <ToggleModeSwitch checked={darkMode} onChange={toggleDarkMode} />
            }
            label=""
            sx={{ ml: 2 }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
