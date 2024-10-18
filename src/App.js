import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import AppRoutes from './routes';
import CssBaseline from '@mui/material/CssBaseline';
import getBlogTheme from './pages/theme/getBlogTheme';

function App() {
  const theme = createTheme(getBlogTheme());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
