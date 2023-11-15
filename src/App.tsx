import { theme } from "./static/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Home } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", boxSizing: "content-box" }} maxWidth="xl">
          <Home />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
