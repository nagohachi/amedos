import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchAppBar from "./components/header/SearchAppBar";
import { CssBaseline } from "@mui/material";
import "@fontsource/noto-sans"; // Defaults to weight 400
import "@fontsource/noto-sans/400.css"; // Specify weight
import "@fontsource/noto-sans/400-italic.css"; // Specify weight and style
import "./App.scss";

declare module "@mui/material/styles" {
  interface Theme {
    mode: "light" | "dark";
  }
  interface ThemeOptions {
    mode?: "light" | "dark";
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "on" ? true : false
  );
  const [searchKeyword, setSearchKeyword] = useState("");

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", darkMode ? "off" : "on");
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    mode: darkMode ? "dark" : "light",
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#655980" : "#ccb3ff",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SearchAppBar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <Routes>
          <Route path="/" element={<Home searchKeyword={searchKeyword} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;