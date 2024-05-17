import { useCallback, useEffect } from 'react';

export const useManageScroll = (isCardCentered: boolean, yAxis: number) => {
  const manageScroll = useCallback(() => {
    if (isCardCentered) {
      window.scrollTo(0, yAxis);
    }
  }, [isCardCentered, yAxis]);

  useEffect(() => {
    if (isCardCentered) {
      window.addEventListener('scroll', manageScroll);
    } else {
      window.removeEventListener('scroll', manageScroll);
    }
    return () => {
      window.removeEventListener('scroll', manageScroll);
    };
  }, [isCardCentered, manageScroll]);
};

export const handleContainerClick = (
  centeredCard: string | null,
  setCenteredCard: (card: string | null) => void,
  removeControls: () => void,
  setIsCardCentered: (centered: boolean) => void
) => {
  if (centeredCard !== null) {
    setCenteredCard(null);
    removeControls();
    setIsCardCentered(false);
  }
  console.log("Contenedor");
};

export const handleCardClick = (
  cardNumber: string,
  setCenteredCard: (card: string) => void,
  setIsCardCentered: (centered: boolean) => void,
  setControls: (card: string) => void,
  setYAxis: (y: number) => void
) => {
  setCenteredCard(cardNumber);
  setIsCardCentered(true);
  setControls(cardNumber);
  setYAxis(window.scrollY);
  console.log("Carta");
};

export const setControls = (cardNumber: string) => {
  const controls = document.getElementById('controls');
  controls?.classList.remove('hidden');
};

export const removeControls = () => {
  const controls = document.getElementById('controls');
  controls?.classList.add('hidden');
};

export const handleDecrement = (count: number, setCount: (count: number) => void, setAmountOfCards: (amount: number) => void) => {
  if (count > 1) {
    setCount(count - 1);
    setAmountOfCards(count - 1 < 1 ? 1 : count - 1);
  }
};

export const handleIncrement = (count: number, setCount: (count: number) => void, setAmountOfCards: (amount: number) => void) => {
  if (count < 99) {
    setCount(count + 1);
    setAmountOfCards(count + 1);
  }
};

export const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setCount: (count: number) => void) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value) && value >= 1 && value <= 99) {
    setCount(value);
  } else if (value > 99) {
    setCount(99);
  }
};
