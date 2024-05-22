import React, { Fragment, useState, useEffect } from 'react';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import Header from '../../components/Header.tsx';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import AuthNeeded from '../../components/UserNotLogged/AuthNeeded.tsx';
import CardTiltable from '../../components/DeckBuilder/CardTiltable.tsx';
import getUserCollectionObject from '../../scripts/getUserCollectionObject.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const NewDeck = () => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [userDecks, setUserDecks] = useState<any>();
    const [selectedDeck, setSelectedDeck] = useState<any>();
    const user: User | null = getCurrentUser();
    const [loading, setLoading] = useState(true);
    const [restrictedMode, setRestrictedMode] = useState(false);
    const [availableCards, setAvailableCards] = useState<any[]>([]);
    const [userAvailableCards, setUserAvailableCards] = useState<any[]>([]);
    const [userCollection, setCollection] = useState<any[]>([]);
    const [selectedLeader, setSelectedLeader] = useState<any>();
    const [deck, setDeck] = useState<any>([]);
    const [deckName, setDeckName] = useState("");
    const [totalCardsInDeck, setTotalCardsInDeck] = useState(0);

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                if (user === null) {
                    setLoading(false);
                    return;
                }
                const response = await fetch('http://localhost:4022/api/deckBuilder/getUserDecks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: user._id }),
                });
                if (response.ok) {
                    const jsonData = await response.json();
                    setUserDecks(jsonData.decks);
                } else {
                    setLoading(false)
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchDecks();
    }, [])

    useEffect(() => {
        const deck = userDecks && userDecks.find((deck) => deck._id === deckId);
        console.log(deck);
        setSelectedDeck(deck);
    }, [userDecks])

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
    }, []);

    useEffect(() => {
        if(selectedDeck){
        setDeck(selectedDeck.deck.cards)
        const fetchLeaders = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:4022/api/card/filterCard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cardCollection: selectedDeck.deck.lead.cardCollection, collectionNumber: selectedDeck.deck.lead.collectionNumber }),
                });
                if (response.ok) {
                    const jsonData = await response.json();                  
                    setSelectedLeader(jsonData[0]);
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
        }
    }, [selectedDeck]);

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
    }, [availableCards]);

    useEffect(() => {
        setLoading(false)
    }, [userAvailableCards]);

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
                alert('User not found');
                return;
            }
    
            const userId = user._id;
            const lead = {
                cardCollection: selectedLeader.cardCollection,
                collectionNumber: selectedLeader.collectionNumber,
            };
            const cardIdsArray = deck.map(card => ({
                cardName: card.name,
                cardCollection: card.cardCollection,
                collectionNumber: card.collectionNumber,
                quantity: card.quantity,
                _id: card._id
            }));
            console.log("MAZO:")
            console.log(cardIdsArray);
            
            const deckData = {
                deckId,
                userId,
                deckName: selectedDeck.deck.name,
                lead,
                cardIdsArray: cardIdsArray,
            };
    
            console.log('Sending data to server:', deckData);
    
            const response = await fetch('http://localhost:4022/api/saveEditedDeck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deckData),
            });
    
            if (response.ok) {
                const jsonData = await response.json();
                console.log(jsonData);
                alert('Mazo guardado exitosamente');
                navigate("/deck-builder");
            } else {
                throw new Error('Error al guardar el mazo');
            }
        } catch (error) {
            console.log("Error en el try-catch:");
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
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                {user === null ? (
                    <AuthNeeded page='deck-builder' />
                ) : loading ? (
                    <p>Cargando...</p>
                ): userAvailableCards && selectedDeck && selectedLeader && (
                    <Fragment>
                        {/* TODO: THEME PROVIDER EN VEZ DE FRAGMENT */}
                        <div className='w-full'>
                            <div className='w-full mb-5 ml-20 pl-4'>
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
                                            value={selectedDeck.deck.name}
                                            placeholder='Enter the deck name here'
                                        />
                                    </div>
                                    <Switch
                                        checked={restrictedMode}
                                        onChange={() => setRestrictedMode(!restrictedMode)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <button
                                        className='
                                        px-10 py-2 ml-5 flex justify-center items-center
                                        text-white rounded bg-red-500 transition-colors
                                        hover:bg-red-600
                                        active:bg-red-700'
                                        onClick={saveDeckToDatabase}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                            <div className='w-full flex'>
                                <div className='w-3/4 flex justify-center items-center flex-wrap'>
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
                                                relativeRoute={true}
                                            />
                                        );
                                    })}
                                </div>
                                <div className='w-1/4 bg-red-200 p-4'>
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
                                            <span>{card.cardName} - x{card.quantity.toString().padStart(2, '0')}</span>
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
