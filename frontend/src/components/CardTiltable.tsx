import React from 'react';
import Tilt from 'react-parallax-tilt';
import './css/CardTiltable.css';

interface Props {
    collectionName: string;
    cardNumber: string;
}

const CardTiltable = ({ collectionName, cardNumber }: Props) => {

    return (
        <Tilt>
        <div className='card-wrapper w-60 m-2'>
            <img 
                src={`../cards/${collectionName}/${collectionName}-${cardNumber}.png`}
                alt={`card ${collectionName}-${cardNumber}`} 
                className='object-contain rounded-lg card h-4/5'
            />
        </div>
        </Tilt>
    );
};

export default CardTiltable;