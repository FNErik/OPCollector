import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../components/Header.tsx';
import { User } from '../../types/User';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import CollectionsCarrousel from '../../components/CollectionsCarrousel.tsx';

const Collections = () => {
    const [collections, setCollections] = useState<string[]>([]);
    const user: User | null = getCurrentUser();

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await fetch('http://localhost:4022/api/card/collections');
                if (response.ok) {
                    const jsonData = await response.json();
                    setCollections(jsonData.colecciones);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCollections();
    }, []);

    const collectionsOP_EB = collections.filter(collection => collection.startsWith("OP") || collection.startsWith("EB"));
    const collectionsST = collections.filter(collection => collection.startsWith("ST"));
    
    return (
        <Fragment>
            <Header user={user}/>
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                <CollectionsCarrousel 
                    collections={collectionsOP_EB}
                />
                <CollectionsCarrousel 
                    collections={collectionsST}
                />
            </main>
        </Fragment>
    );
};

export default Collections;
