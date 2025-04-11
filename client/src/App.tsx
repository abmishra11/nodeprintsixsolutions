import { RouterProvider } from "react-router-dom";
import frontendRoutes from "./common/routes";
import Loader from "./common/Loader";
import { ToastContainer } from "react-toastify";
import { colors, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fc9b04"
    },
    secondary: {
      main: "#212121"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={frontendRoutes} fallbackElement={<Loader />} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
