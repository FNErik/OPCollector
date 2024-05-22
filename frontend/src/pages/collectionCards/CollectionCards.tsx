import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CollectionCards.css';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import { User } from '../../types/User.ts';
import Header from '../../components/Header.tsx';
import CardsScroll from '../../components/CardsScroll.tsx';
import Controls from '../../components/AddToCollectionControls.tsx';
import {
  useManageScroll,
  handleContainerClick,
  handleCardClick,
  setControls,
  removeControls,
  handleDecrement,
  handleIncrement,
  handleChange
} from '../../scripts/cardsControlls.ts';
import separateCollectionAndNumber from '../../scripts/separateCollectionAndNumber.ts';

const CollectionCards = () => {
  const { collectionName } = useParams();
  const [cards, setCards] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [yAxis, setYAxis] = useState(0);
  const [centeredCard, setCenteredCard] = useState<string | null>(null);
  const [isCardCentered, setIsCardCentered] = useState(false);
  const [count, setCount] = useState(1);
  const [amountOfCard, setAmountOfCards] = useState(Number);
  const user: User | null = getCurrentUser();

  useEffect(() => {
    const fetchCardsByCollection = async () => {
      try {
        const response = await fetch('http://localhost:4022/api/card/filterCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cardCollection: collectionName }),
        });
        if (response.ok) {
          const jsonData = await response.json();
          setCards(jsonData);
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardsByCollection();
  }, [collectionName]);

  useManageScroll(isCardCentered, yAxis);

  const insertIntoCollection = async () => {
    if (!user || !centeredCard) {
      console.log("FALTA USUARIO O CARTA");
    } else {
      console.log("Num carta: " + centeredCard);
      console.log("Cantidad de cartas:" + amountOfCard);
      console.log("id de usuario: " + user._id);
      console.log("Coleccion: " + collectionName);
      const [collection, number] = separateCollectionAndNumber(centeredCard)
      let cardQuantity = amountOfCard < 1 ? 1 : amountOfCard;
      console.log(typeof cardQuantity);
      
      if (amountOfCard <= 1) {
        setAmountOfCards(1);
        console.log("Cantidad actualizada: "+amountOfCard)
      }
      try {
        const response = await fetch('http://localhost:4022/api/addCardToUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id,
            cardCollection: collection,
            collectionNumber: number,
            cardQuantity: cardQuantity
          }),
        });
        if (response.ok) {
          await response.json();
          setAmountOfCards(count);
        } else {
          console.log("Error en el if response");
          console.log(response);
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Fragment>
      <Header user={user} />
      <main className='md:mt-40 mt-20 px-4 md:px-20 lg:px-40 flex flex-col items-center' onClick={() => handleContainerClick(centeredCard, setCenteredCard, removeControls, setIsCardCentered)}>
        <CardsScroll
          cards={cards}
          centeredCard={centeredCard}
          handleCardClick={(collectionName: string, cardNumber: string) => handleCardClick(collectionName, cardNumber, setCenteredCard, setIsCardCentered, setControls, setYAxis)}
        />
        {isCardCentered && <div className="overlay"></div>}
      </main>
      {isCardCentered && (
        <Controls
          count={count}
          setCount={setCount}
          amountOfCard={amountOfCard}
          setAmountOfCards={setAmountOfCards}
          centeredCard={centeredCard}
          setCenteredCard={setCenteredCard}
          setIsCardCentered={setIsCardCentered}
          insertIntoCollection={insertIntoCollection}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handleChange={handleChange}
          handleContainerClick={handleContainerClick}
          removeControls={removeControls}
        />
      )}
    </Fragment>
  );
};

export default CollectionCards;
