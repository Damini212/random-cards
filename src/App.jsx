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
  const [count, setCount] = useState(0);

  useEffect(() => {
    reStartGame();
  }, []);

  useEffect(() => {
    if (correctCards.length === cards.length && cards.length > 0) {
      alert("Game Over");
      reStartGame();
    }
  }, [cards, correctCards]);

  function showCard(index) {
    if (showCards.length === 2 || correctCards.includes(index)) {
      return;
    }
    const newShowCard = showCards.concat(index);
    setShowCards(newShowCard);

    if (newShowCard.length === 2) {
      setCount(count + 1);
      if (cards[newShowCard[0]] === cards[newShowCard[1]]) {
        setCorrectCards(correctCards.concat(newShowCard));
        setShowCards([]);
      } else {
        setTimeout(() => setShowCards([]), 500);
      }
    }
  }

  function reStartGame() {
    const myShuffle = arrayShuffle(emoji.concat(emoji));
    setCards(myShuffle);
    setCorrectCards([]);
    setShowCards([]);
    setCount(0);
  }

  return (
    <div className="App">
      <h1>Random Cards Game</h1>
      <h2>How to play?</h2>
      <h4 className="text">
        Click the cards to find two pairs of the same emoji, two clicks are
        counted as one move. You should complete the game in minimum number of
        moves.
      </h4>
      <h2>Number of Moves {count}</h2>
      <br />
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
      <br />
      <button className="restart-btn" onClick={reStartGame}>
        Restart
      </button>
    </div>
  );
}

export default App;
