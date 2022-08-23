import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SettingsConsumer, SettingsProvider } from "./context/theme-context";
import { createTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <SettingsConsumer>
        {({ settings }) => (
          <ThemeProvider
            theme={createTheme({
              mode: settings.theme,
            })}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        )}
      </SettingsConsumer>
    </SettingsProvider>
  </React.StrictMode>
);
reportWebVitals();
