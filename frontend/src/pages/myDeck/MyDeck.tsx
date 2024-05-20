import React, { Fragment, useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { User } from "../../types/User.ts";
import getCurrentUser from "../../scripts/getCurrentUser.ts";
import Header from "../../components/Header.tsx";
import AuthNeeded from "../../components/UserNotLogged/AuthNeeded.tsx";

const MyDeck = () => {
    const user: User | null = getCurrentUser();
    const { deckId } = useParams();
    const [userDecks, setUserDecks] = useState<any>();
    const [selectedDeck, setSelectedDeck] = useState<any>();
    const [loading, setLoading] = useState(true); // Estado de carga

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
    
    return(
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
                    <h1>{selectedDeck._id}</h1>
                    {/*Toca hacer una vista de la preview del deck */}
                </Fragment>
            )}
            </main>
        </Fragment>
    )
}

export default MyDeck