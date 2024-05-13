import React from 'react';

interface Props {
    collectionName: string;
}

const CollectionCard = ({ collectionName }: Props) => {
    const getImageUrl = (collectionName: string) => {
        return `../collections/${collectionName}.webp`;
    };

    const imageUrl = getImageUrl(collectionName);

    return (
        <div className="m-1 min-w-80 bg-blue-500">
            <img 
                src={imageUrl}
                alt={collectionName}
            />
            <p>{collectionName}</p>
        </div>
    );
}


export default CollectionCard;