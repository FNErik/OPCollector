import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import './css/CollectionCard.css';

interface Props {
    id: string;
    collectionName: string;
    cardNumber: string;
    isCentered: boolean;
    handleClick: () => void;
    userHasCard? : boolean;
    quantity? : number;
}

const CardTiltable = ({ id, collectionName, cardNumber, isCentered, handleClick, userHasCard, quantity }: Props) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 640);
    if(userHasCard === undefined) userHasCard = true // Parche de mierda historico
    
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div 
            className={`card-wrapper m-2 ${quantity && quantity > 0 ? 'showQuantity' : ''}`} style={{ marginRight: (isCentered && isLargeScreen) ? '50vw' : '0vw', bottom: isCentered ? '2rem' : 'auto', width: isCentered ? 'auto' : '15rem', position: isCentered ? 'fixed' : 'static', zIndex: isCentered ? 19 : 'auto' }}
            data-quantity={quantity}
        >
            <Tilt
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor="lightblue"
                glarePosition="all"
                glareBorderRadius="20px"
                gyroscope={isCentered}
                style={{
                    borderRadius: '0.5rem',
                    transform: isCentered ? 'translate(-50%, -50%)' : 'none',
                    height: isCentered ? '75vh' : 'auto',
                    width: 'auto',
                }}
            >
                <img
                    src={`../cards/${collectionName}/${collectionName}-${cardNumber}.png`}
                    alt={`card ${collectionName}-${cardNumber}`}
                    loading='lazy'
                    className={`object-contain aspect-auto rounded-lg shadow-lg border border-black `}
                    onClick={handleClick}
                    style={{
                        height: isCentered ? '75vh' : 'auto',
                        width: '100%',
                        filter: userHasCard ? 'none' : 'grayscale(1)',
                    }}
                />
            </Tilt>
        </div>
    );
};

export default CardTiltable;
    