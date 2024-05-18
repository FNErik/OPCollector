import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CollectionCards.css';
import getCurrentUser from '../../scripts/getCurrentUser.ts';
import { User } from '../../types/User.ts';
import Header from '../../components/Header.tsx';
import CardsScroll from '../../components/CardsScroll.tsx';
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

  const insertIntoCollection = async() => {
    if(!user || !centeredCard){
      console.log("FALTA USUARIO O CARTA");
    } else {
      console.log("Num carta: " + centeredCard);
      console.log("Cantidad de cartas:" + amountOfCard);
      console.log("id de usuario: " + user._id);
      console.log("Coleccion: " + collectionName);
      if(amountOfCard === 1){
        setAmountOfCards(1);
      }
      try {
        const response = await fetch('http://localhost:4022/api/addCardToUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id,
            cardCollection: collectionName,
            collectionNumber: centeredCard,
            cardQuantity: amountOfCard
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
      <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center' onClick={() => handleContainerClick(centeredCard, setCenteredCard, removeControls, setIsCardCentered)}>
        <CardsScroll
          cards={cards}
          centeredCard={centeredCard}
          handleCardClick={(collectionName: string, cardNumber: string) => handleCardClick(collectionName, cardNumber, setCenteredCard, setIsCardCentered, setControls, setYAxis)}
        />
        {isCardCentered && <div className="overlay"></div>}
      </main>
      <div id='controls' className='fixed w-full h-full top-0 hidden'>
        <div className='absolute w-full h-full bg-black opacity-50 z-40' onClick={() => handleContainerClick(centeredCard, setCenteredCard, removeControls, setIsCardCentered)}></div>
        <div className="absolute w-full top-60 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50 margen60">
          <div className="flex flex-row items-center mb-3">
            <div className='w-20 h-20 text-center'>
              <button
                onClick={() => handleDecrement(count, setCount, setAmountOfCards)}
                className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-black rounded shadow">
                -
              </button>
            </div>
            <div className='w-60 h-20 text-center'>
              <input
                type="number"
                value={count}
                onChange={(e) => handleChange(e, setCount)}
                className='w-60 h-10 text-center bg-white border border-gray-300 rounded'
                min="1"
                max="99"
              />
            </div>
            <div className='w-20 h-20 text-center'>
              <button
                onClick={() => handleIncrement(count, setCount, setAmountOfCards)}
                className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-black rounded shadow">
                +
              </button>
            </div>
          </div>
          <div className='w-50 h-10'>
            <button 
              onClick={insertIntoCollection}
              className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-20 border border-black rounded shadow">
              Añadir
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CollectionCards;
