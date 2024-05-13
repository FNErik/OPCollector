import React from 'react';
import CardTiltable from './CardTiltable.tsx';

const CardsScroll = ({ cards }) => {
    return (
        <div className='w-full flex flex-wrap justify-center'>
            {cards.map((card, index) => (
                <CardTiltable 
                collectionName={card.cardCollection}
                cardNumber={card.collectionNumber}
                key={index}
                />
            ))}
        </div>
    );
};

export default CardsScroll;
