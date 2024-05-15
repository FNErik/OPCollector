import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CardNameAutocomplete = ({ onChange }) => {
    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        const fetchCardNames = async () => {
            try {
                const response = await fetch('http://localhost:4022/api/card/names');
                if (response.ok) {
                    const jsonData = await response.json();
                    setOptions(jsonData.names);
                } else {
                    throw new Error('Error al obtener los nombres de las tarjetas');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCardNames();
    }, []);

    const handleInputChange = (event) => {
        const inputText = event.target.value;
        setValue(inputText);
        onChange({ name: inputText }); // Aquí se llama a la función onChange con el nuevo valor del input
    };

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue || '');
                onChange({ name: newValue || '' }); // Llamar a onChange cuando cambia la selección de Autocomplete
            }}
            disablePortal
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Card name"
                    variant="standard"
                    InputLabelProps={{ shrink: true, style: { fontSize: '18px', color: '#444444' } }}
                    id='cardNameInput'
                    onChange={handleInputChange}
                />
            )}
        />
    );
}

export default CardNameAutocomplete;
