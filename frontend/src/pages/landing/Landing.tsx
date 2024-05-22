import * as React from 'react';
import '../../index.css'
import './Landing.css'
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../../components/Header.tsx';
import { User } from "../../types/User";
import getCurrentUser from '../../scripts/getCurrentUser.ts';

export default function LandingPage() {
  const [mode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const user: User | null = getCurrentUser()

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header user={user}/>
        <main className='md:mt-30 mt-20 pt-10 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
            <div className='diagonalParent w-full h-80 flex shadow-lg rounded-lg relative'>
                <div className='banner-text flex flex-col justify-evenly md:justify-start'>
                  <h1 className="
                    text-black font-bold
                    md:mt-6 md:ml-6 lg:mt-8 lg:ml-8 xl:mt-10 xl:ml-10
                    text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl
                    text-center md:text-left
                  ">
                    JOIN OUR <span className="text-red-500">CREW!</span>
                  </h1>
                  <div className='md:mt-20 md:ml-10 flex items-center justify-center md:items-start md:justify-start'>
                    <button
                    className="
                      px-10 py-2
                      flex items-center justify-center
                      text-white rounded bg-red-500 transition-colors text-4xl
                      hover:bg-red-600
                      active:bg-red-700
                    "
                    >
                      <p>SIGN UP!</p>
                    </button>
                  </div>
                </div>
                <div className='diagonal w-full h-full rounded absolute shadow md:block hidden'></div>
            </div>
            <div className='diagonalParent w-full h-80 flex flex-row-reverse shadow-lg rounded-lg relative mt-20'>
                <div className='diagonal2 w-full h-full rounded absolute shadow md:block hidden'></div>
                <div className='banner-text flex flex-col justify-evenly md:justify-start'>
                  <p className="
                    text-black font-bold
                    md:mt-6 md:mr-6 lg:mt-8 lg:mr-8 xl:mt-10 xl:mr-10
                    text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl
                    text-center md:text-right
                  ">
                    Build your own <span className='text-red-500'>decks</span> to play on tournaments!
                  </p>
                </div>
            </div>
        </main>
    </ThemeProvider>
  );
}