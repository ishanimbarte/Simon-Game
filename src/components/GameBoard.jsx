import { useState } from "react";
import SimonButton from "./SimonButton";
import axios from "axios";

const colors = ["red", "green", "yellow", "blue"];

export default function GameBoard() {

  const [gameSeq,setGameSeq] = useState([]);
const [userSeq,setUserSeq] = useState([]);
const [level,setLevel] = useState(0);
const [flashColor,setFlashColor] = useState(null);   // ⭐ NEW

  const startGame = () => {
    setLevel(1);
    nextLevel([]);
  };

  const nextLevel = (seq) => {

    const randColor = colors[Math.floor(Math.random() * 4)];

    const newSeq = [...seq, randColor];

    setGameSeq(newSeq);
    setUserSeq([]);

    // flash animation
    setFlashColor(randColor);

    setTimeout(() => {
      setFlashColor(null);
    }, 100);
  };

  const saveScore = async (score) => {
    try {
      await axios.post("http://localhost:5000/api/score", {
        username: "player1",
        score: score
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (color) => {

    const newUser = [...userSeq, color];
    setUserSeq(newUser);

    if (newUser[newUser.length - 1] !== gameSeq[newUser.length - 1]) {

      alert("Game Over");

      saveScore(level);

      resetGame();
      return;
    }

    if (newUser.length === gameSeq.length) {
      setLevel(prev => prev + 1);
      nextLevel(gameSeq);
    }
  };

  const resetGame = () => {
    setGameSeq([]);
    setUserSeq([]);
    setLevel(0);
  };

  return (

  <div className="flex flex-col items-center justify-center min-h-screen">

    <h1 className="text-3xl font-bold mb-4">
      Simon Says Game
    </h1>

    <h2 className="mb-6">
      Level: {level}
    </h2>

    {/* Game Board */}
    <div className="border-2 border-gray-300 p-6 rounded-xl">

      <div className="grid grid-cols-2 gap-6">

        {colors.map((color)=>(
          <SimonButton
            key={color}
            color={color}
            flash={flashColor === color}
            onClick={handleClick}
          />
        ))}

      </div>

    </div>

    <button
      onClick={startGame}
      className="mt-6 px-6 py-2 bg-black text-white rounded"
    >
      Start Game
    </button>

  </div>

);
}