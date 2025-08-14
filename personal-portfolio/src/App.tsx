import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './pages/HomePage';
import "./index.css"
import Video from "./assets/space_scene_desktop.mp4"
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00796b',
    },
    background: {
      default: '#f4fdfc',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const App: React.FC = () => {
  return (
<div className="app-container">
  <video autoPlay muted loop playsInline id="bg-video">
    <source src={Video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="content">
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  </div>
</div>


  );
};

export default App;
