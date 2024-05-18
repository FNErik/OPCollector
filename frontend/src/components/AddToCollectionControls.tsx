import React from 'react';

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
  removeControls // Recibir removeControls como prop
}) => {
  return (
    <div id='controls' className='fixed w-full h-full top-0'>
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
  );
};

export default Controls;
