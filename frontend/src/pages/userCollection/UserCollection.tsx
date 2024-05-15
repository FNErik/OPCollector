import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import React, { useState, useEffect, Fragment } from 'react';

const UserCollection = () => {
    const [collection, setCollection] = useState<any[]>([]);
    const user: User | null = getCurrentUser();

    useEffect(() => {
        const fetchCollection = async() => {
            try {
                const response = await fetch('http://localhost:4022/api/userHasCard');
                if (response.ok) {
                    const jsonData = await response.json();
                    setCollection(jsonData.collection)
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCollection();
    }, []);
    return (
        
    );
};

export default UserCollection;
