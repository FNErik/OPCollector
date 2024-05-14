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
                    isCentered={centeredCard === card.collectionNumber}
                    handleClick={() => handleCardClick(card.collectionNumber)}
                />
            ))}
        </div>
    );
};

export default CardsScroll;
