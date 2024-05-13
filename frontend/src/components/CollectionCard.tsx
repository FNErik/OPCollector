import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/CollectionCard.css';
interface Props {
    collectionName: string;
}

const CollectionCard = ({ collectionName }: Props) => {
    const linkUrl = `/collections/${collectionName}`
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
        <Link to={linkUrl}>
            <figure className="m-1 min-w-60 card-wrapper">
                <img 
                    className='object-contain w-full aspect-square card'
                    src={imageUrl}
                    alt={collectionName}
                    onError={handleImageError} // Asigna imagen por defecto si no hay
                />
                <figcaption className='text-center font-semibold text-2xl'>{collectionName}</figcaption>
            </figure>
        </Link>
    );
}

export default CollectionCard;
