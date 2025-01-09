import './App.css';
import { useState } from 'react';

function Square({value, onSquareClick}){
  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  );
}

function calculateWinner(square){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if(square[a] && square[a] === square[b] && square[a] === square[c]){
      return square[a];
    }
  }
  return null;
}

function Board({isNext, square, onPlay}){

  function handleClick(i) {
    if (calculateWinner(square) || square[i]) {
      return;
    }
    const nextSquares = square.slice();
    if (isNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(square);
  let status;
  if(winner){
    status = 'Winner: ' + winner;
  }else{
    status = 'Next Player: ' + (isNext ? 'X' : 'O');
  }

  return (
    <div>
      <div style={{'font':'35px'}}>{status}</div>
      <div className='board-row'>
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function App(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isNext = currentMove%2 === 0;
  const currentSquare = history[currentMove];

  function handlePlay(nextSquare){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((square, move)=>{
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="App">
      <div>
        <Board isNext={isNext} square={currentSquare} onPlay={handlePlay} />
      </div>

      <div className="gameInfo">
        <h2>Game History</h2>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
