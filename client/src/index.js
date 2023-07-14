import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ContextProvider } from "./hooks/useStateContext.js";
import App from "./App";
import "./index.css";
import { CssBaseline } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <ContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ContextProvider>
  </>
);
