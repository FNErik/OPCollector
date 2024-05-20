import React, { Fragment, useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { User } from "../../types/User.ts";
import getCurrentUser from "../../scripts/getCurrentUser.ts";
import Header from "../../components/Header.tsx";
import AuthNeeded from "../../components/UserNotLogged/AuthNeeded.tsx";
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import CardTiltable from "../../components/DeckBuilder/CardTiltable.tsx";

const MyDeck = () => {
    const user: User | null = getCurrentUser();
    const { deckId } = useParams();
    const [userDecks, setUserDecks] = useState<any>();
    const [selectedDeck, setSelectedDeck] = useState<any>();
    const [loading, setLoading] = useState(true); // Estado de carga
    const [deckName, setDeckName] = useState("");

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
        setLoading(false)
    }, [selectedDeck])

    return (
        <Fragment>
            <Header user={user} />
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                {user === null ? (
                    <AuthNeeded
                        page='deck-builder'
                    />
                ) : loading ? (
                    <p>Cargando...</p>
                ) : selectedDeck && ( // Hace falta poner el 'selectedDeck &&' porque si llega antes de estar seteada se caga encima
                <Fragment>
                        {/* TODO: THEME PROVIDER EN VEZ DE FRAGMENT */}
                        <div className="w-full">
                            <div className='w-full mb-5 ml-20 pl-4'>
                                <p className='text-2xl font-semibold mb-5'>View your <span className="text-red-500">deck</span> info</p>
                                <div className='flex items-end'>
                                    <div className='w-80 mr-5'>
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
                                    {/* <Switch 
                                        checked={restrictedMode}
                                        onChange={() => setRestrictedMode(!restrictedMode)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap items-center justify-center">
                            {selectedDeck.deck.cards.map(card => {
                                return (
                                    <CardTiltable
                                        key={card._id}
                                        id={card._id}
                                        collectionName={card.cardCollection}
                                        cardNumber={card.collectionNumber}
                                        handleClick={() => console.log(card)}
                                        userHasCard={true}
                                        quantity={card.quantity}
                                    />
                                );
                            })}
                        </div>
                    </Fragment>
                )}
            </main>
        </Fragment>
    )
}

export default MyDeck
