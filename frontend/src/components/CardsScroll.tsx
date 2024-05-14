import React from 'react';
import CardTiltable from './CardTiltable.tsx';

const CardsScroll = ({ cards, centeredCard, setCenteredCard }) => {
    const handleClick = (cardNumber) => {
        setCenteredCard(cardNumber);
    };

    const handleContainerClick = () => {
        if (centeredCard !== null) {
            setCenteredCard(null);
        }
    };

    return (
        <div className='w-full flex flex-wrap justify-center' onClick={handleContainerClick}>
            {cards.map((card, index) => (
                <CardTiltable 
                    key={index}
                    collectionName={card.cardCollection}
                    cardNumber={card.collectionNumber}
                    isCentered={centeredCard === card.collectionNumber}
                    handleClick={() => handleClick(card.collectionNumber)}
                />
            ))}
        </div>
    );
};

export default CardsScroll;
