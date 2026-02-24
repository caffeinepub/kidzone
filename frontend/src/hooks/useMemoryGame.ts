import { useState, useCallback, useEffect } from 'react';

export type CardState = {
  id: number;
  animalIndex: number;
  animalName: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const ANIMALS = [
  { name: 'Cat', emoji: '🐱' },
  { name: 'Dog', emoji: '🐶' },
  { name: 'Frog', emoji: '🐸' },
  { name: 'Rabbit', emoji: '🐰' },
  { name: 'Bear', emoji: '🐻' },
  { name: 'Duck', emoji: '🦆' },
  { name: 'Owl', emoji: '🦉' },
  { name: 'Fox', emoji: '🦊' },
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCards(): CardState[] {
  const pairs = [...ANIMALS, ...ANIMALS];
  const shuffled = shuffle(pairs);
  return shuffled.map((animal, index) => ({
    id: index,
    animalIndex: ANIMALS.indexOf(animal),
    animalName: animal.name,
    emoji: animal.emoji,
    isFlipped: false,
    isMatched: false,
  }));
}

export function useMemoryGame() {
  const [cards, setCards] = useState<CardState[]>(createCards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const totalPairs = ANIMALS.length;

  const flipCard = useCallback((id: number) => {
    if (isChecking) return;
    if (flippedIds.length >= 2) return;
    if (flippedIds.includes(id)) return;

    const card = cards.find(c => c.id === id);
    if (!card || card.isMatched || card.isFlipped) return;

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);
    }
  }, [isChecking, flippedIds, cards]);

  useEffect(() => {
    if (flippedIds.length !== 2) return;

    const [id1, id2] = flippedIds;
    const card1 = cards.find(c => c.id === id1);
    const card2 = cards.find(c => c.id === id2);

    if (!card1 || !card2) return;

    if (card1.animalIndex === card2.animalIndex) {
      // Match!
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === id1 || c.id === id2 ? { ...c, isMatched: true } : c
        ));
        const newMatched = matchedPairs + 1;
        setMatchedPairs(newMatched);
        setFlippedIds([]);
        setIsChecking(false);
        if (newMatched === totalPairs) {
          setIsWon(true);
        }
      }, 600);
    } else {
      // No match
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
        ));
        setFlippedIds([]);
        setIsChecking(false);
      }, 1000);
    }
  }, [flippedIds, cards, matchedPairs, totalPairs]);

  const resetGame = useCallback(() => {
    setCards(createCards());
    setFlippedIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsChecking(false);
    setIsWon(false);
  }, []);

  return {
    cards,
    moves,
    matchedPairs,
    totalPairs,
    isWon,
    isChecking,
    flipCard,
    resetGame,
  };
}
