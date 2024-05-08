import React, { Fragment, useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4022/api/user/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, pass: password }),
            });
            const data = await response.json();
            // Manejar la respuesta del servidor si es necesario
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <Fragment>
            <h1>OP Collector</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                    Contraseña
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Login" />
            </form>
            {error && <p>{error}</p>} {/* Mostrar error si existe */}
        </Fragment>
    )
}

export default Login;
