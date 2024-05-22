import React, { useState, useEffect, Fragment } from 'react';
import CardTiltable from './CardTiltable.tsx';
import './css/MyCollection.css'

const MyCollection = ({ cards, centeredCard, handleCardClick }) => {
    const [collections, setCollections] = useState<any[]>([]);
    const [displayedCards, setDisplayedCards] = useState<any[]>([]);
    const [currentCollection, setCurrentCollection] = useState("EB01");
    const [showMissing, setShowMissing] = useState(false);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await fetch('http://localhost:4022/api/card/collections');
                if (response.ok) {
                    const jsonData = await response.json();
                    setCollections(jsonData.collections);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCollections();
    }, []);

    useEffect(() => {
        if(showMissing) setDisplayedCards(cards.filter(card => (card.cardCollection === currentCollection)));
        else setDisplayedCards(cards.filter(card => (card.cardCollection === currentCollection) && card.hasCard));
    }, [collections, currentCollection, showMissing]); // eslint-disable-line
    
    console.log(displayedCards);
    return (
        <Fragment>
            <div className='flex w-full justify-between'>
                <h1 className="text-3xl mb-5">My collection</h1>
                <label htmlFor="showMissing">
                    <p>Show missing</p>
                    <input type="checkbox" name="showMissing" id="showMissing" onChange={() => setShowMissing(!showMissing)}/>
                </label>
            </div>
            <div className='w-full border border-black mx-10'>
                <div className='flex overflow-y-auto'>
                    {collections.map(collection => (
                        <Fragment key={collection}>
                            <div
                                id={collection}
                                className={`border p-2 mx-1 px-3 border-black user-select-none cursor-pointer ${collection === currentCollection ? 'selected' : ''}`}
                                onClick={() => setCurrentCollection(collection)}
                            >
                                {collection}
                            </div>
                        </Fragment>
                    ))}
                </div>
                <div className='flex flex-wrap'>
                    {displayedCards.map((card, index) => (
                        <CardTiltable 
                            key={index}
                            collectionName={card.cardCollection}
                            cardNumber={card.collectionNumber}
                            id={card._id}
                            isCentered={centeredCard === `${card.cardCollection}-${card.collectionNumber}`}
                            handleClick={() => handleCardClick(card.cardCollection, card.collectionNumber)}
                            userHasCard={card.hasCard}
                            quantity={card.quantity}
                        />
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default MyCollection;
