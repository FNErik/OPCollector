import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import Header from '../../components/Header.tsx';
import AuthNeeded from '../../components/UserNotLogged/AuthNeeded.tsx';
import './DeckBuilder.css';

const DeckBuilder = () => {
    const user: User | null = getCurrentUser();
    const [userDecks, setUserDecks] = useState<any>();
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
                setLoading(false)
              } else {
                throw new Error('Error al obtener los datos');
              }
            } catch (error) {
              console.error('Error:', error);
            }
        };
        fetchDecks();
    }, []) // eslint-disable-line
    
    console.log(userDecks);
    return (
        <Fragment>
            <Header user={user} />
            <main className='md:mt-40 mt-20 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
            {user === null ? (
                <AuthNeeded 
                    page='deck-builder'
                />
            ) : loading ? (
                    <p>Cargando...</p>
                  ) : (
                <Fragment>
                    <h1 className="text-3xl font-semibold mb-10 text-left w-full">Deck builder</h1>
                    <div className=' w-full text-left mb-5 flex align-baseline'>
                        <p className='text-2xl mr-5'>My decks</p>
                        <Link to='/deck-builder/new-deck'>
                            <button 
                            className='
                            px-5 py-2
                            text-white rounded bg-red-500 transition-colors
                            hover:bg-red-600
                            active:bg-red-700'>
                                Add new
                            </button>
                        </Link>
                    </div>
                    <div className='w-full flex overflow-y-auto flex-wrap fixed-container shadow-lg'>
                        {
                        userDecks && userDecks.map((deck, index) => (
                            <Link to={`/deck-builder/${deck._id}`} key={index} className='m-5'>
                                  <figure className='deck-preview border border-black rounded-lg'>
                                    <img 
                                    className=' object-contain h-60 m-1'
                                    src={`../cards/${deck.deck.lead.cardCollection}/${deck.deck.lead.cardCollection}-${deck.deck.lead.collectionNumber}.png`}
                                    alt={deck.deck.name}
                                    />
                                    <figcaption className='w-full text-center'>
                                      {deck.deck.name}
                                    </figcaption>
                                  </figure>
                            </Link>
                        ))
                        }
                    </div>
                </Fragment>
            )}
            </main>
        </Fragment>
    );
};

export default DeckBuilder;