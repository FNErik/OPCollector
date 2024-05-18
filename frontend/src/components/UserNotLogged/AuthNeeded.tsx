import React from 'react';

interface Props {
    page: string;
}

const AuthNeeded = ({page} : Props) => {
    return (
        <div className='w-full'>
            <h1>Register to use {page}</h1>
        </div>
    );
};

export default AuthNeeded;