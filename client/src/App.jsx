import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from "react-router-dom";

import { router } from "./constants/router/router";

import theme from "./theme";
import "./App.css";


export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}
