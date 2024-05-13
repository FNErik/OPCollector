import React, { Fragment } from 'react';
import CollectionCard from './CollectionCard.tsx';

interface Props {
    collections: string[];
}
const CollectionsCarrousel = ({ collections }: Props) => {
    return (
        <div className='flex overflow-x-auto bg-red-300 w-full mb-10'>
            {collections.length > 0 ? (
                <Fragment>
                    {collections.map((item) => (
                        <CollectionCard 
                            collectionName={item}
                        />
                    ))}
                </Fragment>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default CollectionsCarrousel;