export default function getUserCollectionObject(allCards, userCards){
    // Creación de un diccionario para las cartas del usuario
    const userCardsMap = userCards.reduce((map, card) => {
        const key = `${card.cardCollection}-${card.collectionNumber}`;
        map[key] = card.quantity;
        return map;
    }, {});

    // Generación del nuevo array con la información combinada
    const combinedCards = allCards.map(card => {
        const key = `${card.cardCollection}-${card.collectionNumber}`;
        const quantity = userCardsMap[key] || 0; // Si no está en la colección del usuario, la cantidad es 0
        return {
            ...card,
            hasCard: quantity > 0,
            quantity: quantity
        };
    });
    
    return combinedCards
}