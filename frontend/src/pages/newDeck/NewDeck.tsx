import React, { Fragment, useState, useEffect } from 'react';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import Header from '../../components/Header.tsx';
import AuthNeeded from '../../components/UserNotLogged/AuthNeeded.tsx';
import CardTiltable from '../../components/DeckBuilder/CardTiltable.tsx';
import CardColorAutocomplete from '../../components/InputsCardBrowser/CardColorAutocomplete.tsx';
import getColorsFromElements from '../../scripts/getColorsFromElements.ts';
import getUserCollectionObject from '../../scripts/getUserCollectionObject.ts';
import userHasCard from '../../../../backend/models/userHasCard.js';

const NewDeck = () => {
    const user: User | null = getCurrentUser();
    const [loading, setLoading] = useState(true); // Estado de carga
    const [restrictedMode, setRestrictedMode] = useState(false);
    const [leaders, setLeaders] = useState<any>([]);
    const [userLeaders, setUserLeaders] = useState<any>([]);
    const [collection, setCollection] = useState<any[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [selectedLeader, setSelectedLeader] = useState();

    useEffect(() => {
        const fetchCollection = async () => {
          try {
            if (user === null) {
              setLoading(false);
              return;
            }
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
          }
        };
        fetchCollection();
    })

    useEffect(() => {
        const fetchLeaders = async () => {
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
                setLoading(false)
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
    }, [colors])

    useEffect(() => {
        setUserLeaders(getUserCollectionObject(leaders, collection))
    }, [leaders]);
    
    useEffect(() => {
        console.log(selectedLeader);
    }, [selectedLeader])

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
                                    onClick={(e) => {console.log(setColors(getColorsFromElements()))}}
                                >
                                    <p className='mb-1'>Search</p>
                                    <ExploreOutlinedIcon sx={{ color: "white" }} className='h-2/3 ml-3' />
                                </button>
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
                    
                </Fragment>
            )}
            </main>
        </Fragment>
    );
};

export default NewDeck;