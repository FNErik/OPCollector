export default async function getAmountOfCards(collection, number, user) {
    let userCollection;
        try {
          const response = await fetch('http://localhost:4022/api/getCardsfromUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user._id }),
          });
          if (response.ok) {
            const jsonData = await response.json();
            userCollection = jsonData.cards;
          } else {
            throw new Error('Error al obtener los datos');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    const collectionFiltered = userCollection.filter(card => card.cardCollection === collection && card.collectionNumber === number)[0]
    if(collectionFiltered) {
        return collectionFiltered.quantity
    } else {
        return 0
        
    }
    
    
}