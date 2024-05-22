import React, { Fragment, useState, useEffect } from 'react';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import Header from '../../components/Header.tsx';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import AuthNeeded from '../../components/UserNotLogged/AuthNeeded.tsx';
import CardTiltable from '../../components/DeckBuilder/CardTiltable.tsx';
import CardColorAutocomplete from '../../components/InputsCardBrowser/CardColorAutocomplete.tsx';
import getColorsFromElements from '../../scripts/getColorsFromElements.ts';
import getUserCollectionObject from '../../scripts/getUserCollectionObject.ts';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const NewDeck = () => {
    const navigate = useNavigate();
    const user: User | null = getCurrentUser();
    const [loading, setLoading] = useState(true);
    const [restrictedMode, setRestrictedMode] = useState(true);
    const [leaders, setLeaders] = useState<any>([]);
    const [availableCards, setAvailableCards] = useState<any[]>([]);
    const [userAvailableCards, setUserAvailableCards] = useState<any[]>([]);
    const [userLeaders, setUserLeaders] = useState<any[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [userCollection, setCollection] = useState<any[]>([]);
    const [selectedLeader, setSelectedLeader] = useState<any>();
    const [deck, setDeck] = useState<any>([]);
    const [deckName, setDeckName] = useState("");
    const [totalCardsInDeck, setTotalCardsInDeck] = useState(0);

    useEffect(() => {
        const fetchCollection = async () => {
            if (user === null) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch('http://localhost:4022/api/getCardsfromUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: user._id }),
                });
                if (response.ok) {
                    const jsonData = await response.json();
                    setCollection(jsonData.cards);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCollection();
    }, []); // eslint-disable-line

    useEffect(() => {
        const fetchLeaders = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:4022/api/card/filterCard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rarity: ['L'], color: colors }),
                });
                if (response.ok) {
                    const jsonData = await response.json();
                    setLeaders(jsonData);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaders();
    }, [colors]);

    useEffect(() => {
        setUserLeaders(getUserCollectionObject(leaders, userCollection));
    }, [leaders]);  // eslint-disable-line

    useEffect(() => {
        if (selectedLeader) {
            setLoading(true);
            const leaderColors = selectedLeader.color.split("/");
            const fetchAvailableCards = async () => {
                try {
                    const response = await fetch('http://localhost:4022/api/card/filterCard', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ color: leaderColors, rarity: ['C', 'UC', 'R', 'SR', 'SC', 'P'] }),
                    });
                    if (response.ok) {
                        const jsonData = await response.json();
                        setAvailableCards(jsonData);
                    } else {
                        throw new Error('Error al obtener los datos');
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAvailableCards();
        }
    }, [selectedLeader]);

    useEffect(() => {
        setUserAvailableCards(getUserCollectionObject(availableCards, userCollection));
    }, [availableCards]);  // eslint-disable-line

    useEffect(() => {
        let total = 0;
        for (const card of deck) {
            total += card.quantity;
        }
        setTotalCardsInDeck(total);
    }, [deck]);

    const handleAddCardToDeck = (card) => {
        const cardIndex = deck.findIndex(deckCard => deckCard._id === card._id);
        let updatedDeck = [...deck];
        let totalCards = deck.reduce((acc, deckCard) => acc + deckCard.quantity, 0);

        if (totalCards >= 50) {
            alert('No puedes añadir más de 50 cartas al mazo');
            return;
        }

        if (cardIndex > -1) {
            if (updatedDeck[cardIndex].quantity >= 4) {
                alert('No puedes añadir más de 4 cartas iguales');
                return;
            }
            updatedDeck[cardIndex].quantity += 1;
        } else {
            updatedDeck.push({ ...card, quantity: 1 });
        }

        setDeck(updatedDeck);
        console.log(updatedDeck);

    };

    const handleRemoveCardFromDeck = (card) => {
        const cardIndex = deck.findIndex(deckCard => deckCard._id === card._id);
        if (cardIndex > -1) {
            let updatedDeck = [...deck];
            if (updatedDeck[cardIndex].quantity > 1) {
                updatedDeck[cardIndex].quantity -= 1;
            } else {
                updatedDeck.splice(cardIndex, 1);
            }
            setDeck(updatedDeck);
        }
    };

 const saveDeckToDatabase = async () => {
    try {
        if (!user) {
        } else {
            const userId = user._id;
            const lead = {
                cardId: selectedLeader._id,
                cardCollection: selectedLeader.cardCollection,
                collectionNumber: selectedLeader.collectionNumber
            };
            const cardIdsArray = deck.map(card => ({
                name: card.name,
                cardCollection: card.cardCollection,
                collectionNumber: card.collectionNumber,
                quantity: card.quantity,
                _id: card._id
            }));

            const response = await fetch('http://localhost:4022/api/addNewDeck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    deckName: deckName,
                    lead: lead,
                    cardIdsArray: cardIdsArray
                }),
            });
            if (response.ok) {
                const jsonData = await response.json();
                console.log(jsonData);
                alert('Mazo guardado exitosamente');
                navigate("/deck-builder")
            } else {
                throw new Error('Error al guardar el mazo');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



    const removeAllCardsFromDeck = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar todas las cartas del mazo?')) {
            setDeck([]);
        }
    };

    const theme = createTheme({
        palette: {
          primary: {
            main: '#CC3333',
          },
        },
      });

    return (
        <ThemeProvider theme={theme}>
            <Header user={user} />
            <main className='md:mt-40 mt-20 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                {user === null ? (
                    <AuthNeeded page='deck-builder' />
                ) : loading ? (
                    <p>Cargando...</p>
                ) : !selectedLeader ? (
                    <Fragment>
                        <div className='w-full'>
                            <div className='w-full mb-5 md:ml-20 pl-4'>
                                <p className='text-2xl font-semibold'>Pick your Leader</p>
                                <div className='flex items-end flex-wrap'>
                                    <div className='w-80 mr-5'>
                                        <CardColorAutocomplete />
                                    </div>
                                    <button
                                        className='
                                        px-10 py-1 flex justify-center items-center
                                        text-white rounded bg-red-500 transition-colors
                                        hover:bg-red-600
                                        active:bg-red-700'
                                        onClick={() => setColors(getColorsFromElements())}
                                    >
                                        <p className='mb-1'>Search</p>
                                        <ExploreOutlinedIcon sx={{ color: "white" }} className='h-2/3 ml-3' />
                                    </button>
                                    <div className='flex items-center justify-center'>
                                        Restricted mode
                                        <Switch
                                            checked={restrictedMode}
                                            onChange={() => setRestrictedMode(!restrictedMode)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-center flex-wrap overflow-y-auto fixed-container shadow-lg'>
                                {userLeaders.map(leader => {
                                    if (restrictedMode && !leader.hasCard) {
                                        return null;
                                    }
                                    return (
                                        <CardTiltable
                                            key={leader._id}
                                            id={leader._id}
                                            collectionName={leader.cardCollection}
                                            cardNumber={leader.collectionNumber}
                                            handleClick={() => setSelectedLeader(leader)}
                                            userHasCard={leader.hasCard}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        {/* TODO: THEME PROVIDER EN VEZ DE FRAGMENT */}
                        <div className='w-full'>
                            <div className='w-full mb-5 md:ml-20 pl-4'>
                                <p className='text-2xl font-semibold'>Build your Deck</p>
                                <div className='flex items-end'>
                                    <div className='w-80 mr-5'>
                                        <p>Leader: {selectedLeader.name}</p>
                                        <TextField
                                            label="Deck name"
                                            variant="standard"
                                            InputLabelProps={{ shrink: true, style: { fontSize: '18px', color: '#444444' } }}
                                            style={{ width: '100%' }}
                                            onChange={(e) => setDeckName(e.target.value)}
                                            value={deckName}
                                            placeholder='Enter the deck name here'
                                        />
                                    </div>
                                    <div className='w-full flex flex-wrap'>
                                        <div className='flex items-center justify-center'>
                                            Restricted mode
                                            <Switch
                                                checked={restrictedMode}
                                                onChange={() => setRestrictedMode(!restrictedMode)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </div>
                                        <button
                                            className='
                                            px-10 py-2 ml-5 flex justify-center items-center
                                            text-white rounded bg-red-500 transition-colors
                                            hover:bg-red-600
                                            active:bg-red-700'
                                            onClick={saveDeckToDatabase}
                                        >
                                            Save Deck
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex fixed-container shadow-lg'>
                                <div className='md:w-3/4 w-full flex justify-center items-center flex-wrap h-full overflow-y-auto'>
                                    {userAvailableCards.map(card => {
                                        if (restrictedMode && !card.hasCard) {
                                            return null;
                                        }
                                        return (
                                            <CardTiltable
                                                key={card._id}
                                                id={card._id}
                                                collectionName={card.cardCollection}
                                                cardNumber={card.collectionNumber}
                                                handleClick={() => handleAddCardToDeck(card)}
                                                userHasCard={card.hasCard}
                                                quantity={0}
                                            />
                                        );
                                    })}
                                </div>
                                <div className='w-1/4 md:block hidden h-full overflow-y-auto bg-red-200 p-4'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <h3 className='text-xl font-semibold'>Deck ({totalCardsInDeck})</h3>
                                        <button
                                            className='bg-red-500 text-white px-2 py-1 rounded'
                                            onClick={removeAllCardsFromDeck}
                                        >
                                            Remove All
                                        </button>
                                    </div>
                                    {deck.map(card => (
                                        <div key={card._id} className='flex items-center justify-between'>
                                            <span>{card.name} - x{card.quantity.toString().padStart(2, '0')}</span>
                                            <button
                                                className='bg-red-500 text-white px-2 py-1 rounded ml-4'
                                                onClick={() => handleRemoveCardFromDeck(card)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            </main>
        </ThemeProvider>
    );
};

export default NewDeck;
