import React from 'react';
import './css/CollectionCard.css'

interface Props {
    collectionName: string;
}

const CollectionCard = ({ collectionName }: Props) => {
    const getImageUrl = (collectionName: string) => {
        return `../collections/${collectionName}.png`;
    };

    const imageUrl = getImageUrl(collectionName);

    return (
        <figure className="m-1 card-wrapper">
            <img 
                className=' object-contain w-full aspect-square card'
                src={imageUrl}
                alt={collectionName}
            />
            <figcaption>{collectionName}</figcaption>
        </figure>
    );
}


export default CollectionCard;