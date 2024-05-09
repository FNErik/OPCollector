import React from 'react';

const Input: React.FC<{
    title: string;
    type: string;
    name: string;
    id: string;
    placeholder?: string | undefined;
    value?: string | number | undefined;
}> = ({ title, type, name, id, placeholder, value }) => {
    return (
        <label htmlFor={id}>
            <p>{title}</p>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
            />
        </label>
    );
};

export default Input;
