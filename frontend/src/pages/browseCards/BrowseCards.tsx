import React, { useState, useEffect } from 'react';
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
import CardsScroll from '../../components/CardsScroll.tsx';
import Controls from '../../components/AddToCollectionControls.tsx';
import {
  useManageScroll,
  handleContainerClick,
  handleCardClick,
  setControls,
  removeControls,
  handleDecrement,
  handleIncrement,
  handleChange
} from '../../scripts/cardsControlls.ts';
import separateCollectionAndNumber from '../../scripts/separateCollectionAndNumber.ts';
import getRarityValues from '../../scripts/getRarityValues.ts';

const BrowseCards = () => {
  const user: User | null = getCurrentUser();
  const [cards, setCards] = useState<any[]>([]);
  const [yAxis, setYAxis] = useState(0);
  const [centeredCard, setCenteredCard] = useState<string | null>(null);
  const [isCardCentered, setIsCardCentered] = useState(false);
  const [count, setCount] = useState(1);
  const [amountOfCard, setAmountOfCards] = useState(Number);

  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        const cardsResponse = await fetch('http://localhost:4022/api/card');
        if (cardsResponse.ok) {
          const jsonData = await cardsResponse.json();
          setCards(jsonData);
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchAllCards();
  }, []);
  
  useManageScroll(isCardCentered, yAxis);

  const insertIntoCollection = async () => {
    if (!user || !centeredCard) {
      console.log("FALTA USUARIO O CARTA");
    } else {
      const [collection, number] = separateCollectionAndNumber(centeredCard)
      console.log("Num carta: " + number);
      console.log("Cantidad de cartas:" + amountOfCard);
      console.log("id de usuario: " + user._id);
      console.log("Coleccion: " + collection);
      if (amountOfCard === 1) {
        setAmountOfCards(1);
      }
      try {
        const response = await fetch('http://localhost:4022/api/addCardToUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id,
            cardCollection: collection,
            collectionNumber: number,
            cardQuantity: amountOfCard
          }),
        });
        if (response.ok) {
          await response.json();
          setAmountOfCards(count);
        } else {
          console.log("Error en el if response");
          console.log(response);
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

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
    rarity: [],
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
  const handleSearch = async() => {
    const types = getTypesFromElements();
    const colors = getColorsFromElements();
    const [collection, number] = separateCollectionAndNumber(filters.collection);
    const rarity = getRarityValues(filters.rarity)
    const searchFilters = {
      name: filters.name,
      type: types,
      cardCollection: collection,
      collectionNumber: number,
      color: colors,
      rarity: rarity
    }
    console.log('Searching with filters:', searchFilters);
    // PUEDES USAR ESTE CLOG PARA MIRAR LO QUE SE ESTA MANDANDO AL BACK
    const response = await fetch('http://localhost:4022/api/card/filterCard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: searchFilters.name,
            type: searchFilters.type, 
            cardCollection: searchFilters.cardCollection, 
            collectionNumber: searchFilters.collectionNumber, 
            color: searchFilters.color, 
            rarity: searchFilters.rarity,
        }),
    });
    if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setCards(jsonData)
      } else {
        console.log("Error en el if response");
        console.log(response);
      }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header user={user} />
      <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center' onClick={() => handleContainerClick(centeredCard, setCenteredCard, removeControls, setIsCardCentered)}>
        <div className='w-full'>
          <div className='w-full'>
            <h1 className='ml-5 text-3xl'>Browse any <span className=' text-red-500'>card</span> you want</h1>
          </div>
          <div className='w-full flex flex-col md:flex-row'>
            <div className="w-full sm:w-1/2 p-5">
              <CardTypesAutocomplete
              />
            </div>
            <div className="w-full sm:w-1/2 p-5">
              <CardColorAutocomplete
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
                InputLabelProps={{ shrink: true, style: { fontSize: '18px', color: '#444444' } }}
                style={{ width: '100%' }}
                onChange={(event) => handleFilterChange({ collection: event.target.value })}
              />
            </div>
          </div>
          <div className='w-full flex flex-col md:flex-row'>
            <div className="w-full sm:w-1/2 p-5">
              <CardRaritySelect
                onChange={(event) => handleFilterChange({ rarity: event })}
              />
            </div>
            <div className="w-full sm:w-1/2 p-5">
              <button
                className="
                  w-full h-full flex items-center justify-center
                  text-white rounded bg-red-500 transition-colors text-2xl
                  hover:bg-red-600
                  active:bg-red-700
                "
                onClick={handleSearch}
              >
                <p className='mb-1'>Search</p>
                <ExploreOutlinedIcon sx={{ color: "white" }} className='h-2/3 ml-3' />
              </button>
            </div>
          </div>
        </div>
        <CardsScroll
          cards={cards}
          centeredCard={centeredCard}
          handleCardClick={(collectionName: string, cardNumber: string) => handleCardClick(collectionName, cardNumber, setCenteredCard, setIsCardCentered, setControls, setYAxis)}
        />
      </main>
      {isCardCentered && (
        <Controls
          count={count}
          setCount={setCount}
          amountOfCard={amountOfCard}
          setAmountOfCards={setAmountOfCards}
          centeredCard={centeredCard}
          setCenteredCard={setCenteredCard}
          setIsCardCentered={setIsCardCentered}
          insertIntoCollection={insertIntoCollection}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handleChange={handleChange}
          handleContainerClick={handleContainerClick}
          removeControls={removeControls}
        />
      )}
    </ThemeProvider>
  );
};

export default BrowseCards;
