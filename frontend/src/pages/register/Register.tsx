import React, { Fragment } from 'react';
import Input from '../../components/Input.tsx';

const Register = () => {
    return (
        <form>
            <h1>Registro</h1>
            <Input 
            title="Nombre"
            type="text"
            id="name"
            name="name"
            />
            <Input 
            title="Contraseña"
            type="password"
            id="pass"
            name="pass"
            />
        </form>
    );
};

export default Register;