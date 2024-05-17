import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import './css/CollectionCard.css';

interface Props {
    collectionName: string;
    cardNumber: string;
    isCentered: boolean;
    handleClick: () => void;
}

const CardTiltable = ({ collectionName, cardNumber, isCentered, handleClick }: Props) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 640);

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
        <div className='card-wrapper m-2' style={{ bottom: isCentered ? '2rem' : 'auto', width: isCentered ? 'auto' : '15rem', position: isCentered ? 'fixed' : 'static', zIndex: isCentered ? 19 : 'auto' }}>
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
                    marginRight: (isCentered && isLargeScreen) ? '50vw' : 'auto',
                }}
            >
                <img
                    src={`../cards/${collectionName}/${collectionName}-${cardNumber}.png`}
                    alt={`card ${collectionName}-${cardNumber}`}
                    className=' object-contain aspect-auto rounded-lg shadow-lg border border-black'
                    onClick={handleClick}
                    style={{
                        height: isCentered ? '75vh' : 'auto',
                        width: '100%',
                    }}
                />
            </Tilt>
        </div>
    );
};

export default CardTiltable;
