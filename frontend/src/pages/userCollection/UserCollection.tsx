import React, { Fragment, useState, useEffect } from 'react';
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

const UserCollection = () => {
  const [collection, setCollection] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [yAxis, setYAxis] = useState(0);
  const [centeredCard, setCenteredCard] = useState<string | null>(null);
  const [isCardCentered, setIsCardCentered] = useState(false);
  const [count, setCount] = useState(1);
  const [amountOfCard, setAmountOfCards] = useState(Number); // eslint-disable-line
  const user: User | null = getCurrentUser();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        if (!user) {
          // handle no user case
        } else {
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
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchAllCards();
    fetchCollection();
  }, []); // eslint-disable-line
  // AQUI HABIA UN WARNING
  // EXPLICACION: ESTE ARRAY VACIO [] QUE SE DECLARA AQUI SON LAS DEPENDENCIAS DE USE EFFECT LO QUE SIGNIFICA
  // QUE ESTA FUNCION SE EJECUTA CADA VEZ QUE CAMBIA UNA VARIABLE DE LAS QUE PASAS EN EL ARRAY, EN NUESTRO CASO
  // LE ESTABAMOS PASANDO USER Y SE ESTABA RALLANDO Y METIA UN BUCLE INFINITO

  useManageScroll(isCardCentered, yAxis);

  console.log(collection);
  console.log(cards);

  return (
    <Fragment>
      <Header user={user} />
      <main className='mt-40 px-4 md:px-20 lg:px-40 flex flex-col items-center' onClick={() => handleContainerClick(centeredCard, setCenteredCard, removeControls, setIsCardCentered)}>
        <h1 className="text-3xl mb-5">My collection</h1>
        <CardsScroll
          cards={collection}
          centeredCard={centeredCard}
          handleCardClick={(cardNumber: string) => handleCardClick(cardNumber, setCenteredCard, setIsCardCentered, setControls, setYAxis)}
        />
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
              className="bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-20 border border-black rounded shadow">
              Añadir
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCollection;
