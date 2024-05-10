const rutaCartas = "./Cards"
    try {
        // Obtener lista de carpetas dentro de Cards
        const carpetas = fs.readdirSync(rutaCartas, { withFileTypes: true });

        // Recorrer cada carpeta
        for (const carpeta of carpetas) {
            if (carpeta.isDirectory()) {
                const coleccion = carpeta.name;
                const rutaColeccion = path.join(rutaCartas, coleccion);

                // Obtener lista de archivos dentro de la carpeta
                const archivos = fs.readdirSync(rutaColeccion);

                // Recorrer cada archivo
                for (const archivo of archivos) {
                    console.log(`Carpeta: ${coleccion}, Archivo: ${archivo}`);
                    const regex = /(?:OP|ST)?(\w{2}-\d{3})\.png/;

                    function obtenerTresDigitos(cadena) {
                        const matches = cadena.match(regex);
                        if (matches && matches.length > 1) {
                            return matches[1].split("-")[1];
                        } else {
                            return null;
                        }
                    }
                    console.log(obtenerTresDigitos(archivo));
                    const newCard = new Card(); 

                    newCard.name = "placeholder";
                    newCard.cardCollection = coleccion;
                    newCard.collectionNumber = obtenerTresDigitos(archivo);
                    newCard.color = "placeholder";
                    newCard.rarity = "placeholder";

                    try {
                        const cardStore = await newCard.save();

                        if (!cardStore) {
                            console.log("Error");
                        } else {
                            console.log("Puta madre");
                        }
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error al leer las carpetas y archivos:', error);
    }