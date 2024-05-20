import React, { Fragment, useState, useEffect } from 'react';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import Switch from '@mui/material/Switch';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import Header from '../../components/Header.tsx';
import TextField from '@mui/material/TextField';
import AuthNeeded from '../../components/UserNotLogged/AuthNeeded.tsx';
import CardTiltable from '../../components/DeckBuilder/CardTiltable.tsx';
import CardColorAutocomplete from '../../components/InputsCardBrowser/CardColorAutocomplete.tsx';
import getColorsFromElements from '../../scripts/getColorsFromElements.ts';
import getUserCollectionObject from '../../scripts/getUserCollectionObject.ts';

const NewDeck = () => {
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
    }, [leaders]);

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
        console.log("AÑADIENDO A MAZO");
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
            console.log("REMOVIENDO DEL MAZO");
            console.log(updatedDeck);
        }
    };

    const saveDeckToDatabase = async () => {
        try {
            if(!user){}else{
                const userId = user._id;
                const leadId = selectedLeader._id;
                const cardIdsArray = deck.map(card => ({
                    cardCollection: card.cardCollection,
                    collectionNumber: card.collectionNumber,
                    quantity: card.quantity
                }));
    
                const response = await fetch('http://localhost:4022/api/addNewDeck', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        userId: userId,
                        deckName: deckName,
                        leadId: leadId,
                        cardIdsArray: cardIdsArray
                    }),
                });
                if (response.ok) {
                    const jsonData = await response.json();
                    console.log(jsonData);
                    alert('Mazo guardado exitosamente');
                } else {
                    throw new Error('Error al guardar el mazo');
                }
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Fragment>
            <Header user={user} />
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                {user === null ? (
                    <AuthNeeded page='deck-builder' />
                ) : loading ? (
                    <p>Cargando...</p>
                ) : !selectedLeader ? (
                    <Fragment>
                        <div className='w-full'>
                            <div className='w-full mb-5 ml-20 pl-4'>
                                <p className='text-2xl font-semibold'>Pick your Leader</p>
                                <div className='flex items-end'>
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
                                    <Switch
                                        checked={restrictedMode}
                                        onChange={() => setRestrictedMode(!restrictedMode)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center flex-wrap'>
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
                                        value={deckName}
                                        placeholder='Enter the deck name here'
                                        /> 
                                    </div>
                                    <Switch
                                        checked={restrictedMode}
                                        onChange={() => setRestrictedMode(!restrictedMode)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                                        onClick={saveDeckToDatabase}
                                    >
                                        Save Deck
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
                                                cardIsInDeck={false}
                                            />
                                        );
                                    })}
                                </div>
                                <div className='w-1/4 bg-red-200 p-4'>
                                    <h3 className='text-xl font-semibold'>Deck</h3>
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
        </Fragment>
    );
};

export default NewDeck;
