import React, { useState, useEffect } from 'react';
import { User } from '../types/User';
import getCurrentUser from '../scripts/getCurrentUser.ts';
import separateCollectionAndNumber from '../scripts/separateCollectionAndNumber.ts';
import getAmountOfCards from '../scripts/getAmountOfCard.ts';

interface ControlsProps {
  count: number;
  setCount: (count: number) => void;
  amountOfCard: number;
  setAmountOfCards: (amount: number) => void;
  centeredCard: string | null;
  setCenteredCard: (card: string | null) => void;
  setIsCardCentered: (centered: boolean) => void;
  insertIntoCollection: () => void;
  handleDecrement: (count: number, setCount: (count: number) => void, setAmountOfCards: (amount: number) => void) => void;
  handleIncrement: (count: number, setCount: (count: number) => void, setAmountOfCards: (amount: number) => void) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, setCount: (count: number) => void) => void;
  handleContainerClick: (centeredCard: string | null, setCenteredCard: (card: string | null) => void, removeControls: () => void, setIsCardCentered: (centered: boolean) => void) => void;
  removeControls: () => void; // Añadir removeControls como prop
}

const Controls: React.FC<ControlsProps> = ({
  count,
  setCount,
  amountOfCard,
  setAmountOfCards,
  centeredCard,
  setCenteredCard,
  setIsCardCentered,
  insertIntoCollection,
  handleDecrement,
  handleIncrement,
  handleChange,
  handleContainerClick,
  removeControls
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [amountOfCardInCollection, setAmountOfCardInCollection] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCardAmount = async () => {
      if (centeredCard && user) {
        const [collection, number] = separateCollectionAndNumber(centeredCard);
        const amount = await getAmountOfCards(collection, number, user);
        setAmountOfCardInCollection(amount);
      }
    };

    fetchCardAmount();
  }, [centeredCard, user]);

  useEffect(() => {
    if(amountOfCardInCollection && amountOfCardInCollection > 0) {
      setCount(amountOfCardInCollection)
    } else {
      setCount(1)
    }
  }, [amountOfCardInCollection])

  if (!user) {
    return (
      <div id='controls' className='fixed w-full h-full top-0'>
        <div className='absolute w-full h-full bg-black opacity-50 z-40' onClick={() => handleContainerClick(centeredCard, setCenteredCard, removeControls, setIsCardCentered)}></div>
      </div>
    );
  }

  return (
    <div id='controls' className='fixed w-full h-full top-0'>
      <div className='absolute w-full h-full bg-black opacity-50 z-40' onClick={() => handleContainerClick(centeredCard, setCenteredCard, removeControls, setIsCardCentered)}></div>
      <div className="absolute top-60 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50 margen60 ">
        <div className='h-80 w-80 ml-40 bg-red-300 p-10 rounded-md'>
          {amountOfCardInCollection && amountOfCardInCollection > 0 ? (
            <p className='mb-10 text-xl'>You already have {amountOfCardInCollection} of this card in your collection</p>
          ) : (
            <p className='mb-10 text-xl'>This card is not in your collection, add it!</p>
          )}
          <div className='w-full flex'>
            <button
              onClick={() => handleDecrement(count, setCount, setAmountOfCards)}
              className="bg-red-500 mr-2 hover:bg-red-600 active:bg-red-700 transition-colors text-white font-semibold py-2 px-4 border border-black rounded shadow">
              -
            </button>
            <input
              type="number"
              value={count}
              onChange={(e) => handleChange(e, setCount)}
              className='w-60 h-10 text-center bg-white border border-gray-300 rounded'
              min="1"
              max="99"
            />
            <button
              onClick={() => handleIncrement(count, setCount, setAmountOfCards)}
              className="bg-red-500 ml-2 hover:bg-red-600 active:bg-red-700 transition-colors text-white font-semibold py-2 px-4 border border-black rounded shadow">
              +
            </button>
          </div>
          <div className="w-full">
            <button 
              onClick={insertIntoCollection}
              className="bg-red-500 mt-2 hover:bg-red-600 active:bg-red-700 transition-colors text-white font-semibold py-2 px-20 border w-full border-black rounded shadow">
              Update
            </button>
          </div>
        </div>
        {/* 
        <div className="flex flex-row items-center mb-3">
          <div className='w-20 h-20 text-center'>
            
          </div>
          <div className='w-60 h-20 text-center'>
            
          </div>
          <div className='w-20 h-20 text-center'>
            
          </div>
        </div>
        <div className='w-50 h-10'>
          
        </div>
        */}
      </div>
    </div>
  );
};

export default Controls;
