import React from 'react';

const CardsScroll = ({ cards }) => {
    return (
        <div>
            {cards.map((card, index) => (
                <div key={index}>
                    {/* Renderizar los datos de cada tarjeta */}
                    <h2>{card.name}</h2>
                    <p>{card.cardCollection + " " + card.collectionNumber}</p>
                    <p>{}</p>
                </div>
            ))}
        </div>
    );
};

export default CardsScroll;
