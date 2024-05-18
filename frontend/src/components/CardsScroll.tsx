import React from 'react';
import CardTiltable from './CardTiltable.tsx';

const CardsScroll = ({ cards, centeredCard, handleCardClick }) => {
    return (
        <div className='w-full flex flex-wrap justify-center'>
            {cards.map((card, index) => (
                <CardTiltable 
                    key={index}
                    collectionName={card.cardCollection}
                    cardNumber={card.collectionNumber}
                    id={card._id}
                    isCentered={centeredCard === `${card.cardCollection}-${card.collectionNumber}`}
                    handleClick={() => handleCardClick(card.cardCollection, card.collectionNumber)}
                />
            ))}
        </div>
    );
};

export default CardsScroll;
