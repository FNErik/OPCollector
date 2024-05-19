import React, { Fragment, useState, useEffect } from 'react';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import Switch from '@mui/material/Switch';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import Header from '../../components/Header.tsx';
import AuthNeeded from '../../components/UserNotLogged/AuthNeeded.tsx';
import CardTiltable from '../../components/DeckBuilder/CardTiltable.tsx';
import CardColorAutocomplete from '../../components/InputsCardBrowser/CardColorAutocomplete.tsx';
import getColorsFromElements from '../../scripts/getColorsFromElements.ts';
import getUserCollectionObject from '../../scripts/getUserCollectionObject.ts';

const NewDeck = () => {
    const user: User | null = getCurrentUser();
    const [loading, setLoading] = useState(true); // Estado de carga
    const [restrictedMode, setRestrictedMode] = useState(true);
    const [leaders, setLeaders] = useState<any>([]);
    const [availableCards, setAvailableCards] = useState<any[]>([]);
    const [userAvailableCards, setUserAvailableCards] = useState<any[]>([]);
    const [userLeaders, setUserLeaders] = useState<any>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [userCollection, setCollection] = useState<any[]>([]);
    const [selectedLeader, setSelectedLeader] = useState<any>();
    const [deck, setDeck] = useState<any>([]);

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
        console.log(selectedLeader);
        if (selectedLeader) {
            setLoading(true)
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
                }
            };
            fetchAvailableCards();
        }
    }, [selectedLeader]);

    useEffect(() => {
        setUserAvailableCards(getUserCollectionObject(availableCards, userCollection))
    }, [availableCards])

    useEffect(() => {
        setLoading(false)
    }, [userAvailableCards])

    const handleAddCardToDeck = (card) => {
        console.log("AÑADIENDO A MAZO");
        console.log(deck);
        let updatedDeck = deck;
        updatedDeck.push(card);
        setDeck(updatedDeck);
    }

    useEffect(() => {
        console.log("UPDATEADO");
        console.log(deck);
    }, [deck])
    
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
                                    </div>
                                    <Switch
                                        checked={restrictedMode}
                                        onChange={() => setRestrictedMode(!restrictedMode)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
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
                                <div className='w-1/4 bg-red-200 h-20'>

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
