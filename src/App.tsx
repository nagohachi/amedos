import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchAppBar from "./components/header/SearchAppBar";
import { CssBaseline } from "@mui/material";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/400-italic.css";
import "./App.scss";
import { Helmet } from "react-helmet";

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
        main: darkMode ? "#ffffff" : "#ccb3ff",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 800,
        md: 1300,
        lg: 1500,
        xl: 1536,
      },
    },
  });

  return (
    <>
      <div>
        <Helmet
          title="Amedos"
          meta={[
            { property: "og:type", content: "website" },
            { property: "og:title", content: "Amedos" },
            {
              property: "description",
              content: "Amedos は、京都人流の天気予報サイトです。",
            },
            {
              property: "og:url",
              content: "https://yukihira-pot.github.io/amedos/",
            },
            { property: "og.site_name", content: "Amedos" },
            {
              property: "og:image",
              content: "https://yukihira-pot.github.io/amedos/ogp.png",
            },
            { name: "twitter:card", content: "summary_large_image" },
            {
              name: "twitter:image",
              content: "https://yukihira-pot.github.io/amedos/ogp.png",
            },
          ]}
        />
      </div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <SearchAppBar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            setSearchKeyword={setSearchKeyword}
          />
          <Routes>
            <Route
              path="/amedos/"
              element={<Home searchKeyword={searchKeyword} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
