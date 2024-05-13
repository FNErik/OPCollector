import React, { useState, useEffect } from 'react';

const Collections = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await fetch('http://localhost:4022/api/card/collections');
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData.colecciones);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCollections();
    }, []);


    console.log(data);

    return (
        <main>
            {/* Renderiza tu componente con los datos, por ejemplo: */}
            {data ? (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>Cargando...</p>
            )}
        </main>
    );
};

export default Collections;
