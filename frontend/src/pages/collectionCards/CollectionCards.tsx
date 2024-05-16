import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import { User } from '../../types/User.ts';
import Header from '../../components/Header.tsx';
import CardsScroll from '../../components/CardsScroll.tsx';

const CollectionCards = () => {
    const { collectionName } = useParams();
    const [cards, setCards] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [centeredCard, setCenteredCard] = useState<string | null>(null);
    const [isCardCentered, setIsCardCentered] = useState(false);
    const user: User | null = getCurrentUser();

    useEffect(() => {
        const fetchCardsByCollection = async () => {
            try {
                const response = await fetch('http://localhost:4022/api/card/filterCard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cardCollection: collectionName }),
                });
                if (response.ok) {
                    const jsonData = await response.json();
                    setCards(jsonData);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCardsByCollection();
    }, [collectionName]);
    
    const handleContainerClick = () => {
        if (centeredCard !== null) {
            setCenteredCard(null);
            setIsCardCentered(false);
            removeControls()
        }
    };

    const handleCardClick = (cardNumber: string) => {
        setCenteredCard(cardNumber);
        setIsCardCentered(true);
        setControls(cardNumber)
    };

    
    const setControls = (cardNumber) => {
        let controls = document.getElementById("controls")
        console.log(controls);
        controls?.classList.remove("hidden")
    }

    const removeControls = () => {
        let controls = document.getElementById("controls")
        console.log(controls);
        controls?.classList.add("hidden")
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Fragment>
            <Header user={user} />
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center' onClick={handleContainerClick}>
                <CardsScroll 
                    cards={cards}
                    centeredCard={centeredCard}
                    handleCardClick={handleCardClick}
                />
                {isCardCentered && <div className="overlay"></div>}
            </main>
            <div id='controls' className='fixed w-full h-full bg-black opacity-50 top-0 hidden transition-all' onClick={handleContainerClick}>
                {/*Controles para pantallas grandes */}
                <div className='w-full sm:flex hidden justify-items-center'>
                    <div className='w-10 h-10 bg-red-300 border border-black'></div>
                    <div className='w-10 h-10 bg-red-300 border border-black'></div>
                    <div className='w-10 h-10 bg-red-300 border border-black'></div>
                    <div className='w-10 h-10 bg-red-300 border border-black'></div>
                </div>
                {/*Controles para movil */}
                <div className='w-full sm:hidden flex justify-items-center'>
                    <div className='w-10 h-10 bg-red-600 border border-black'></div>
                    <div className='w-10 h-10 bg-red-600 border border-black'></div>
                    <div className='w-10 h-10 bg-red-600 border border-black'></div>
                    <div className='w-10 h-10 bg-red-600 border border-black'></div>
                </div>
            </div>
        </Fragment>
    );
};

export default CollectionCards;
