import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

const gameIcons = ["😀", "👌", "👲", "☂️", "🌈", "🍉", "🚗", "⚠️"];

function App() {
  const [pieces, setPieces] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);

  const startGame = () => {
    const duplicateGameIcons = [...gameIcons, ...gameIcons];
    const newGameIcons = [];

    while (newGameIcons.length < gameIcons.length * 2) {
      const randomIndex = Math.floor(Math.random() * duplicateGameIcons.length);
      newGameIcons.push({
        emoji: duplicateGameIcons[randomIndex],
        flipped: false,
        solved: false,
        position: newGameIcons.length,
      });
      duplicateGameIcons.splice(randomIndex, 1);
    }

    setPieces(newGameIcons);
    setGameFinished(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleActive = (data) => {
    const flippedData = pieces.filter((piece) => piece.flipped && !piece.solved);
    if (flippedData.length === 2) return;

    const newPieces = pieces.map((piece) => {
      if (piece.position === data.position) {
        piece.flipped = !piece.flipped;
      }
      return piece;
    });

    setPieces(newPieces);
  };

  useEffect(() => {
    const gameLogicFORFlipped = () => {
      const flippedData = pieces.filter((piece) => piece.flipped && !piece.solved);
      if (flippedData.length === 2) {
        setTimeout(() => {
          if (flippedData[0].emoji === flippedData[1].emoji) {
            setPieces(
              pieces.map((piece) => {
                if (
                  piece.position === flippedData[0].position ||
                  piece.position === flippedData[1].position
                ) {
                  piece.solved = true;
                }
                return piece;
              })
            );
          } else {
            setPieces(
              pieces.map((piece) => {
                if (
                  piece.position === flippedData[0].position ||
                  piece.position === flippedData[1].position
                ) {
                  piece.flipped = false;
                }
                return piece;
              })
            );
          }
        }, 800);
      }
    };

    const checkIfGameFinished = () => {
      if (pieces.every((piece) => piece.solved)) {
        setGameFinished(true);
      }
    };

    if (pieces.length > 0) {
      gameLogicFORFlipped();
      checkIfGameFinished();
    }
  }, [pieces]);

  return (
    <main>
      <h1 style={{ fontSize: "32px", fontFamily: "" }}>Memory Game</h1>
      {gameFinished && (
        <div className="celebration">
          <Confetti />
          <div className="you-win">You Win!</div>
        </div>
      )}
      <div className="container">
        {pieces.map((data, index) => (
          <div
            className={`flip-card ${data.flipped ? "active" : ""}`}
            key={index}
            onClick={() => handleActive(data)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front" />
              <div className="flip-card-back">{data.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
