import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
//import './../css/CollectionCard.css';

interface Props {
    id: string;
    collectionName: string;
    cardNumber: string;
    handleClick: () => void;
    userHasCard: boolean;
}

const CardTiltable = ({ id, collectionName, cardNumber, handleClick, userHasCard }: Props) => {
    
    return (
        <div 
            className={`card-wrapper w-40 m-2`} 
        >
            <Tilt
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor="lightblue"
                glarePosition="all"
                glareBorderRadius="20px"
                style={{
                    borderRadius: '0.5rem',
                    width: 'auto',
                }}
            >
                <img
                    src={`../cards/${collectionName}/${collectionName}-${cardNumber}.png`}
                    alt={`card ${collectionName}-${cardNumber}`}
                    className={`object-contain aspect-auto rounded-lg shadow-lg border border-black `}
                    onClick={handleClick}
                    style={{
                        width: '100%',
                        filter: userHasCard ? 'none' : 'grayscale(1)',
                    }}
                />
            </Tilt>
        </div>
    );
};

export default CardTiltable;
    