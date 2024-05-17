import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './CollectionCards.css'
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import { User } from '../../types/User.ts';
import Header from '../../components/Header.tsx';
import CardsScroll from '../../components/CardsScroll.tsx';

const CollectionCards = () => {
    const { collectionName } = useParams();
    const [cards, setCards] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [yAxis, setYAxis] = useState(0);
    const [centeredCard, setCenteredCard] = useState<string | null>(null);
    const [isCardCentered, setIsCardCentered] = useState(false);
    const [amountOfCard, setAmountOfCards] = useState(Number)
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

    const manageScroll = useCallback(() => {
        if (isCardCentered) {
            window.scrollTo(0, yAxis);
        }
    }, [isCardCentered, yAxis]);

    useEffect(() => {
        if (isCardCentered) {
            window.addEventListener('scroll', manageScroll);
        } else {
            window.removeEventListener('scroll', manageScroll);
        }
        return () => {
            window.removeEventListener('scroll', manageScroll);
        };
    }, [isCardCentered, manageScroll]);

    const handleContainerClick = () => {
        if (centeredCard !== null) {
            setCenteredCard(null);
            removeControls();
            setIsCardCentered(false);
        }
        console.log("Contenedor")
    
    };

    const handleCardClick = (cardNumber: string) => {
        setCenteredCard(cardNumber);
        setIsCardCentered(true);
        console.log("Carta")
        setControls(cardNumber);
        setYAxis(window.scrollY);
    };

    const setControls = (cardNumber: string) => {
        const controls = document.getElementById('controls');
        controls?.classList.remove('hidden');
    };

    const removeControls = () => {
        const controls = document.getElementById('controls');
        controls?.classList.add('hidden');
    };

    const [count, setCount] = useState(1);

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
            setAmountOfCards(count - 1)
        }
        console.log(centeredCard);
    };

    const handleIncrement = () => {
        if (count < 99) {
            setCount(count + 1);
            setAmountOfCards(count + 1)
        }
        console.log(centeredCard);
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 99) {
            setCount(value);
        } else if (value > 99) {
            setCount(99);
        }
    };
        
    const insertIntoCollection = async() =>{
        if(!user || !centeredCard){

        }else{
            try {
                const response = await fetch('http://localhost:4022/api/addCardToUser',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user._id, cardCollection: collectionName, cardNumber: centeredCard, cardQuantity: amountOfCard}),
                });
                if (response.ok) {
                    const jsonData = await response.json();
                    setAmountOfCards(jsonData);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
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
            <div id='controls' className='fixed w-full h-full  top-0 hidden transition-all' >
                <div className='absolute w-full h-full bg-black opacity-50 z-20' onClick={handleContainerClick}></div>
                {/*Controles para pantallas grandes */}
                {/* <div className='fixed flex w-full items-center justify-end min-h-screen z-50'>
                    
                </div> */}
                <div className="absolute w-full top-60  left-80 flex flex-col items-center mr-60 z-50">
                        <div className="flex flex-row items-center mb-3">
                            <div className='w-20 h-20 text-center'>
                                <button 
                                onClick={handleDecrement}
                                className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-black rounded shadow">
                                    -
                                </button>
                            </div>
                            <div className='w-60 h-20  text-center'>
                                <input
                                    type="number"
                                    value={count}
                                    onChange={handleChange}
                                    className='w-60 h-10 text-center bg-white border border-gray-300 rounded'
                                    min="1"
                                    max="99"
                                />
                            </div>
                            <div className='w-20 h-20 text-center'>
                                <button 
                                onClick={handleIncrement}
                                className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-black rounded shadow">
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='w-50 h-10'>
                            <button 
                            onClick={insertIntoCollection}
                            className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-20 border border-black rounded shadow">
                                Añadir
                            </button>
                        </div>
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
