import React, { Fragment } from 'react';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import Header from '../../components/Header.tsx';
import AuthNeeded from '../../components/UserNotLogged/AuthNeeded.tsx';

const DeckBuilder = () => {
    const user: User | null = getCurrentUser();
    
    return (
        <Fragment>
            <Header user={user} />
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
            {user === null ? (
                <AuthNeeded 
                    page='deck-builder'
                />
            ) : (
                <Fragment>
                    <h1 className="text-3xl mb-10 text-left w-full">Deck builder</h1>
                    <div className='bg-red-500 w-full h-80 flex overflow-y-auto flex-wrap'>
                        
                    </div>
                </Fragment>
            )}
            </main>
        </Fragment>
    );
};

export default DeckBuilder;