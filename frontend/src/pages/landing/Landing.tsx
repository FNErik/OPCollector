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
        <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
            <div className='diagonalParent w-full h-80 flex shadow-lg rounded-lg relative'>
                <div className='banner-text'>
                    <h1 className='text-black mt-5 ml-5 text-6xl md:text-6xl lg:text-8xl font-bold'>
                        JOIN OUR <span className='text-red-500'>CREW!</span>
                    </h1>
                </div>
                <div className='diagonal w-full h-full rounded absolute shadow md:block hidden'></div>
            </div>
        </main>
    </ThemeProvider>
  );
}