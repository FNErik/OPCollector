import React, { Fragment, useState, useEffect } from 'react';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import { User } from '../../types/User.ts';
import Header from '../../components/Header.tsx';
import MyCollection from '../../components/myCollection.tsx';
import AuthNeeded from '../../components/UserNotLogged/AuthNeeded.tsx';
import {
  useManageScroll,
  handleContainerClick,
  handleCardClick,
  setControls,
  removeControls,
} from '../../scripts/cardsControlls.ts';
import getUserCollectionObject from '../../scripts/getUserCollectionObject.ts';

const UserCollection = () => {
  const [collection, setCollection] = useState<any[]>([]);
  const [userCollection, setUserCollection] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [yAxis, setYAxis] = useState(0);
  const [centeredCard, setCenteredCard] = useState<string | null>(null);
  const [isCardCentered, setIsCardCentered] = useState(false);
  const [count, setCount] = useState(1); // eslint-disable-line
  const [amountOfCard, setAmountOfCards] = useState(Number); // eslint-disable-line
  const user: User | null = getCurrentUser();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        if (user === null) {
          setLoading(false);
          return;
        }
        const response = await fetch('http://localhost:4022/api/getCardsfromUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: user._id }),
        });
        if (response.ok) {
          const jsonData = await response.json();
          setCollection(jsonData.cards);
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchAllCards = async () => {
      try {
        const cardsResponse = await fetch('http://localhost:4022/api/card');
        if (cardsResponse.ok) {
          const jsonData = await cardsResponse.json();
          setCards(jsonData);
          setLoading(false);
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchCollection().then(() => fetchAllCards());
  }, []); // eslint-disable-line

  useManageScroll(isCardCentered, yAxis);
  
  useEffect(() => {
    setUserCollection(getUserCollectionObject(cards, collection));
  }, [cards]);  // eslint-disable-line
  console.log(collection);
  
  return (
    <Fragment>
      <Header user={user} />
      <main className='md:mt-40 mt-20 px-4 md:px-20 lg:px-40 flex flex-col items-center' onClick={() => handleContainerClick(centeredCard, setCenteredCard, removeControls, setIsCardCentered)}>
        {user === null ? (
          <AuthNeeded 
            page='my-collection'
          />
        ) : (
          loading ? (
            <p>Cargando...</p>
          ) : (
            <Fragment>
              <MyCollection
                cards={userCollection}
                centeredCard={centeredCard}
                handleCardClick={(collectionName: string, cardNumber: string) => handleCardClick(collectionName, cardNumber, setCenteredCard, setIsCardCentered, setControls, setYAxis)}
              />
            </Fragment>
          )
        )}
      </main>
    </Fragment>
  );
};

export default UserCollection;
