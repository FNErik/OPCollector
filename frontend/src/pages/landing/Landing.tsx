import * as React from 'react';
import '../../index.css'
import './Landing.css'
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
        <div className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
            <div className='diagonalParent w-full h-80 flex shadow-lg rounded-lg relative'>
                <div className='absolute'>
                    <h1 className='text-black mt-5 ml-5 text-6xl md:text-7xl lg:text-8xl font-bold text-center'>
                        JOIN OUR <span className='text-red-500'>CREW</span>!
                    </h1>
                </div>
                <div className='diagonal w-full h-full rounded shadow'></div>
            </div>
        </div>
    </ThemeProvider>
  );
}