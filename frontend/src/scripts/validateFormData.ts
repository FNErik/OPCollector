export default function validateFormData(inputs) {
    const formInputs = {};

    inputs.forEach((input) => {
        if (input.type !== 'submit' && input.type !== 'reset') {
            formInputs[input.name] = {
                value: input.value,
                type: input.type,
                name: input.name,
            };
        }
    });

    type ErrorObject = { [key: string]: string };
    const errors: ErrorObject[] = [];

    for (let inputName in formInputs) {
        const input = formInputs[inputName];

        if (input.type === 'text' && input.name !== 'email') {
            const value = input.value.trim();
            if (value === '') errors.push({ [input.name]: "is empty" });

        } else if (input.type === 'text' && input.name === 'email') {
            const email = input.value;
            const isValidEmail = /\S+@\S+\.\S+/.test(email);

            if (!isValidEmail) errors.push({ "email": "not valid" });

        } else if (input.type === 'password') {
            const value = input.value.trim();
            if (value === '') errors.push({ [input.name]: "is empty" });
            //TODO: Añadir validaciones de contraseña compleja
        }
    }

    return errors.length > 0 ? errors : formInputs;
}
