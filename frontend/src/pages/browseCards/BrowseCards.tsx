import React, { Fragment } from 'react';
import Header from '../../components/Header.tsx';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import CardTypesAutocomplete from '../../components/CardTypesAutocomplete.tsx';

const BrowseCards = () => {
    const user: User | null = getCurrentUser();
    return (
        <Fragment>
            <Header user={user} />
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                <div className='w-full'>
                    <h1>Filtros</h1>    
                </div>
                <div className='w-full'>
                        <CardTypesAutocomplete />
                </div>
            </main>
        </Fragment>
    );
};

export default BrowseCards;
