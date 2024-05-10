import * as React from 'react';
import '../../index.css'
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../../components/Header.tsx';

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <div className='mt-20 pt-20 mx-80 flex column'>
        <h1 className=' text-black text-6xl ml-20'>JOIN OUR <span className=' text-red-500'>CREW</span> !</h1>
      </div>
    </ThemeProvider>
  );
}