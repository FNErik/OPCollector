import React from 'react';
import Tilt from 'react-parallax-tilt';

interface Props {
    collectionName: string;
    cardNumber: string;
    isCentered: boolean;
    handleClick: () => void;
}

const CardTiltable = ({ collectionName, cardNumber, isCentered, handleClick }: Props) => {
    return (
        <div className='card-wrapper w-60 m-2'>
            <Tilt
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor="lightblue"
                glarePosition="all"
                glareBorderRadius="20px"
                style={{
                    borderRadius: '0.5rem',
                    position: isCentered ? 'absolute' : 'static',
                    top: isCentered ? '50%' : 'auto',
                    left: isCentered ? '50%' : 'auto',
                    transform: isCentered ? 'translate(-50%, -50%)' : 'none',
                    zIndex: isCentered ? 999 : 'auto',
                }}
            >
                <img 
                    src={`../cards/${collectionName}/${collectionName}-${cardNumber}.png`}
                    alt={`card ${collectionName}-${cardNumber}`} 
                    className='object-contain rounded-lg shadow-lg'
                    onClick={handleClick}
                    style={{
                        height: isCentered ? '75vh' : 'auto',
                    }}
                />
            </Tilt>
        </div>
    );
};

export default CardTiltable;
