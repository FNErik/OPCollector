import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../components/Header.tsx';
import CardsScroll from '../../components/CardsScroll.tsx';

const UserCollection = () => {
    const [collection, setCollection] = useState<any[]>([]);
    const [cards, setCards] = useState<any[]>([]);
    const user: User | null = getCurrentUser();

    useEffect(() => {
        const fetchCollection = async() => {
            try {
                if(!user){

                }else{
                    const response = await fetch('http://localhost:4022/api/getCardsfromUser',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({user: user._id}),
                    });
                    if (response.ok) {
                        const jsonData = await response.json();
                        setCollection(jsonData)
                    } else {
                        throw new Error('Error al obtener los datos');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const fetchAllCards = async() => {
            try {
                const cardsResponse = await fetch('http://localhost:4022/api/card')
                if(cardsResponse.ok) {
                    const jsonData = await cardsResponse.json();
                    setCards(jsonData);
                }else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
            fetchAllCards();
            fetchCollection();
    }, []);

    console.log(collection);
    console.log(cards);

    return (
        <Fragment>
            <Header user={user} />
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                {
                    cards.map(card =>(
                        <h1>{card._id}</h1>
                    ))
                }
            </main>
        </Fragment>
    );
};

export default UserCollection;
