import React, { useState, useEffect, Fragment } from 'react';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardTiltable from './CardTiltable.tsx';
import './css/MyCollection.css'

const MyCollection = ({ cards, centeredCard, handleCardClick }) => {
    const [collections, setCollections] = useState<any[]>([]);
    const [displayedCards, setDisplayedCards] = useState<any[]>([]);
    const [currentCollection, setCurrentCollection] = useState("EB01");
    const [showMissing, setShowMissing] = useState(false);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await fetch('http://localhost:4022/api/card/collections');
                if (response.ok) {
                    const jsonData = await response.json();
                    setCollections(jsonData.collections);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCollections();
    }, []);

    useEffect(() => {
        if(showMissing) setDisplayedCards(cards.filter(card => (card.cardCollection === currentCollection)));
        else setDisplayedCards(cards.filter(card => (card.cardCollection === currentCollection) && card.hasCard));
    }, [collections, currentCollection, showMissing]); // eslint-disable-line
    
    const theme = createTheme({
        palette: {
          primary: {
            main: '#CC3333',
          },
        },
      });

    return (
        <ThemeProvider theme={theme}>
            <div className='flex w-full justify-between'>
                <h1 className="text-3xl mb-5">My collection</h1>
                <div className='flex items-center justify-center'>
                    Show missing
                    <Switch
                        checked={showMissing}
                        onChange={() => setShowMissing(!showMissing)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
            </div>
            <div className='w-full  mx-10'>
                <div className='flex overflow-y-auto collection-tabs'>
                    {collections.map(collection => (
                        <Fragment key={collection}>
                            <div
                                id={collection}
                                className={`bg-gray-100 tab p-2 mx-1 px-3 user-select-none cursor-pointer ${collection === currentCollection ? 'selected' : ''}`}
                                onClick={() => setCurrentCollection(collection)}
                            >
                                {collection}
                            </div>
                        </Fragment>
                    ))}
                </div>
                <div className='bg-gray-200 flex flex-wrap overflow-x-auto justify-center fixed-container'>
                    {displayedCards.length > 0 ? displayedCards.map((card, index) => (
                        <CardTiltable 
                            key={index}
                            collectionName={card.cardCollection}
                            cardNumber={card.collectionNumber}
                            id={card._id}
                            isCentered={centeredCard === `${card.cardCollection}-${card.collectionNumber}`}
                            handleClick={() => handleCardClick(card.cardCollection, card.collectionNumber)}
                            userHasCard={card.hasCard}
                        />
                    )) : (
                    <p className='font-medium text-2xl'>You have no cards from this expansion or starter pack</p>
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default MyCollection;
