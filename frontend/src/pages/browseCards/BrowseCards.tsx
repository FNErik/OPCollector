import React, { Fragment } from 'react';
import Header from '../../components/Header.tsx';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import { Input } from '@mui/material';

const BrowseCards = () => {
    const user: User | null = getCurrentUser();
    return (
        <Fragment>
            <Header user={user} />
            <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center'>
                <div className='w-full border-2 border-black'>
                    <h1>Filtros</h1>    
                </div>
                <div className='w-full border-2 border-black flex'>
                    <div className="w-1/5 border-2 border-black h-10">
                        
                    </div>
                    <div className="w-1/5 border-2 border-black h-10">
                        
                    </div>
                    <div className="w-1/5 border-2 border-black h-10">
                        
                    </div>
                    <div className="w-1/5 border-2 border-black h-10">
                        
                    </div>
                    <div className="w-1/5 border-2 border-black h-10">
                        
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default BrowseCards;
