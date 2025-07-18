import { RouterProvider } from "react-router-dom";
import frontendRoutes from "./common/routes";
import Loader from "./common/Loader";
import { ToastContainer } from "react-toastify";
import { colors, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fc9b04",
    },
    secondary: {
      main: "#212121",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
          color: "#212121",
          borderRadius: 4,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
          color: "#212121",
        },
        input: {
          "&::placeholder": {
            color: "#9e9e9e",
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#ccc",
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fc9b04",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fc9b04",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#9e9e9e", 
          "&.Mui-focused": {
            color: "#212121",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={frontendRoutes} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
