import { useState } from "react";
import arrayShuffle from "array-shuffle";
import "./App.css";
import { useEffect } from "react";

function App() {
  const emoji = [
    "🥰",
    "😀",
    "😁",
    "😆",
    "🤪",
    "🤨",
    "🥸",
    "🥳",
    "🎈",
    "📕",
    "🎎",
    "🎊",
  ];

  const [cards, setCards] = useState([]);
  const [showCards, setShowCards] = useState([]);
  const [correctCards, setCorrectCards] = useState([]);

  useEffect(() => {
    const myShuffle = arrayShuffle(emoji.concat(emoji));
    setCards(myShuffle);
  }, []);

  function showCard(index) {
    if (showCards.length === 2 || correctCards.includes(index)) {
      return;
    }
    const newShowCard = showCards.concat(index);
    setShowCards(newShowCard);
    if (newShowCard.length === 2) {
      if (cards[newShowCard[0]] === cards[newShowCard[1]]) {
        setCorrectCards(correctCards.concat(newShowCard));
        setShowCards([]);
      } else {
        setTimeout(() => setShowCards([]), 500);
      }
    }
  }

  return (
    <div className="App">
      <h1>Random Cards Game</h1>
      <div className="card-container">
        {cards.map((card, index) => {
          return (
            <div className={"card-wrapper"} onClick={() => showCard(index)}>
              {showCards.includes(index) || correctCards.includes(index)
                ? card
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
