import React, { useState } from 'react';
import Header from '../../components/Header.tsx';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import CardTypesAutocomplete from '../../components/InputsCardBrowser/CardTypesAutocomplete.tsx';
import CardColorAutocomplete from '../../components/InputsCardBrowser/CardColorAutocomplete.tsx';
import CardNameAutocomplete from '../../components/InputsCardBrowser/CardNameAutocomplete.tsx';
import CardRaritySelect from '../../components/InputsCardBrowser/CardRaritySelect.tsx';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import getTypesFromElements from '../../scripts/getTypesFromElements.ts';
import getColorsFromElements from '../../scripts/getColorsFromElements.ts';

const BrowseCards = () => {
    const user: User | null = getCurrentUser();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#CC3333',
            },
        },
    });

    // Estado para los filtros
    const [filters, setFilters] = useState({
        types: [], // Aquí guarda los tipos seleccionados
        colors: [], // Aquí guarda los colores seleccionados
        name: '', // Aquí guarda el nombre de la carta
        collection: '', // Aquí guarda el número de colección
    });

    // Función para manejar el cambio en los filtros
    const handleFilterChange = (newFilters) => {
        setFilters({
            ...filters,
            ...newFilters,
        });
        console.log('Filters:', filters); // Imprimir los filtros actualizados en la consola
    };

    // Función para ejecutar la búsqueda al hacer clic en el botón "Search"
    const handleSearch = () => {
        const types = getTypesFromElements();
        const colors = getColorsFromElements();
        const searchFilters = {
            name: filters.name,
            type: types,
            color: colors,
        }
        console.log('Searching with filters:', searchFilters);
    };

    return (
        <ThemeProvider theme={theme}>
            <Header user={user} />
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                <div className='w-full'>
                    <div className='w-full'>
                        <h1 className='ml-5 text-3xl'>Browse any <span className=' text-red-500'>card</span> you want</h1>
                    </div>
                    <div className='w-full'>
                        
                    </div>
                    <div className='w-full flex flex-col md:flex-row'>
                        <div className="w-full sm:w-1/2 p-5">
                            <CardTypesAutocomplete
                                //onChange={(types) => handleFilterChange({ types })}
                            />
                        </div>
                        <div className="w-full sm:w-1/2 p-5">
                            <CardColorAutocomplete
                                //onChange={(colors) => handleFilterChange({ colors })}
                            />
                        </div>
                    </div>
                    <div className='w-full flex flex-col md:flex-row'>
                        <div className="w-full sm:w-1/2 p-5">
                            <CardNameAutocomplete
                                onChange={(event) => {                                    
                                    handleFilterChange({ name: event.name });
                                }}
                            />
                        </div>
                        <div className="w-full sm:w-1/2 p-5">
                            <TextField
                                label="Collection and number"
                                variant="standard"
                                InputLabelProps={{ shrink: true, style: {fontSize: '18px', color: '#444444'}}}
                                style={{width: '100%'}}
                                onChange={(event) => handleFilterChange({ collection: event.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <button 
                            className="
                                ml-5 mt-5 text-white rounded bg-red-500 p-1 px-10 transition-colors text-xl flex items-center
                                hover:bg-red-600
                                active:bg-red-700
                            "
                            onClick={handleSearch}
                        >
                            <p>Search</p>
                            <ExploreOutlinedIcon sx={{color: "white"}} style={{marginLeft: '0.2em'}}/>
                        </button>
                    </div>
                </div>
                <div>

                </div>
            </main>
        </ThemeProvider>
    );
};

export default BrowseCards;
