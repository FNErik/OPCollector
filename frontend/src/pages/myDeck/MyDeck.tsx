import React, { Fragment, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/User.ts";
import getCurrentUser from "../../scripts/getCurrentUser.ts";
import Header from "../../components/Header.tsx";
import AuthNeeded from "../../components/UserNotLogged/AuthNeeded.tsx";
import TextField from '@mui/material/TextField';
import CardTiltable from "../../components/DeckBuilder/CardTiltable.tsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MyDeck = () => {
    const user: User | null = getCurrentUser();
    const { deckId } = useParams();
    const [userDecks, setUserDecks] = useState<any>();
    const [selectedDeck, setSelectedDeck] = useState<any>();
    const [loading, setLoading] = useState(true); // Estado de carga
    const [deckName, setDeckName] = useState(""); // eslint-disable-line
    const navigate = useNavigate();

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
    }, []) // eslint-disable-line

    useEffect(() => {
        const deck = userDecks && userDecks.find((deck) => deck._id === deckId);
        console.log(deck);
        setSelectedDeck(deck);
    }, [userDecks]) // eslint-disable-line

    useEffect(() => {
        setLoading(false)
    }, [selectedDeck])

    const handleDownload = async () => {
        try {
            if(!user){

            }else{
                const response = await fetch(`http://localhost:4022/api/getDeckFormatted/${user._id}/${deckId}/download`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    console.log(response);
                    a.download = `deck-${selectedDeck.deck.name}.deck`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                } else {
                    console.error('Error al descargar el archivo');
                }
            }
        } catch (error) {
            console.error('Error al realizar la solicitud de descarga', error);
        }

    }

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
                    <AuthNeeded
                        page='deck-builder'
                    />
                ) : loading ? (
                    <p>Cargando...</p>
                ) : selectedDeck && ( // Hace falta poner el 'selectedDeck &&' porque si llega antes de estar seteada se caga encima
                <Fragment>
                        {/* TODO: THEME PROVIDER EN VEZ DE FRAGMENT */}
                        <div className="w-full flex md:flex-row flex-col">
                            <div className='mb-5 md:ml-20 pl-4'>
                                <p className='text-2xl font-semibold mb-5'>View your <span className="text-red-500">deck</span> info</p>
                                <div className='flex items-end flex-wrap'>
                                    <div className='md:w-80'>
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
                                    <div className="w-full flex flex-col mt-5 md:mr-0 mr-5">
                                        <button
                                            className='
                                            w-full py-2 md:mt-10 mt-5 flex justify-center items-center
                                            text-white rounded bg-red-500 transition-colors
                                            hover:bg-red-600
                                            active:bg-red-700'
                                            onClick={() => navigate("/deck-builder/edit/" + deckId)}
                                        >
                                            Edit deck
                                        </button>
                                        <button
                                            className='
                                            w-full py-2 mt-5 flex justify-center items-center
                                            text-white rounded bg-red-500 transition-colors
                                            hover:bg-red-600
                                            active:bg-red-700'
                                            onClick={handleDownload}
                                        >
                                            Export deck
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col md:ml-20 pl-4">
                                    <p className="text-2xl font-semibold ml-2">Leader: </p>
                                <div>
                                    <CardTiltable
                                        key={"leader"}
                                        id={"leader"}
                                        collectionName={selectedDeck.deck.lead.cardCollection}
                                        cardNumber={selectedDeck.deck.lead.collectionNumber}
                                        handleClick={() => console.log(selectedDeck.deck.lead)}
                                        userHasCard={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-5 flex flex-wrap fixed-container shadow-lg overflow-y-auto justify-center">
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
        </ThemeProvider>
    )
}

export default MyDeck
