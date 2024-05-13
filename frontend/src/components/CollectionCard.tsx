import React, { useState } from 'react';
import './css/CollectionCard.css';
interface Props {
    collectionName: string;
}

const CollectionCard = ({ collectionName }: Props) => {
    const getImageUrl = (collectionName: string) => {
        return `../collections/${collectionName}.png`;
    };

    const [imageUrl, setImageUrl] = useState(getImageUrl(collectionName));

    // Función para manejar errores de carga de la imagen
    const handleImageError = () => {
        if (collectionName.startsWith("ST")) {
            setImageUrl('../collections/ST_DEFAULT.png');
        } else {
            setImageUrl('../collections/OP_EB_DEFAULT.png')
        }
    };

    return (
        <figure className="m-1 card-wrapper">
            <img 
                className='object-contain w-full aspect-square card'
                src={imageUrl}
                alt={collectionName}
                onError={handleImageError} // Maneja el error de carga de la imagen
            />
            <figcaption>{collectionName}</figcaption>
        </figure>
    );
}

export default CollectionCard;
