import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Home } from "./pages/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
