import React from 'react';
interface Props {
    collectionName: string;
    cardNumber: string;
}

const CardTiltable = ({ collectionName, cardNumber }: Props) => {
    const getImageUrl = (collectionName: string, cardNumber: string) => {
        return `../cards/${collectionName}/${collectionName}-${cardNumber}.png`;
    };
    return (
        <div className='card-wrapper'>
            <img 
            src={getImageUrl(collectionName, cardNumber)}
            alt={`card ${collectionName}-${cardNumber}`} 
            className=' object-contain w-60 m-2 rounded-lg'
            />
        </div>
    );
};

export default CardTiltable;