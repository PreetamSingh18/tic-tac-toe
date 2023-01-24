import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [InputItem, setInputItem] = useState("");
  const [user, setUser] = useState("");
  const [cells, setCell] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const [Empty,setEmpty]=useState(8);
  const InputEvent = (event) => {
    setInputItem(event.target.value);
  };
  const EnterUser = () => {
    if (InputItem != "") {
      setUser(() => {
        return InputItem;
      });
      setInputItem("");
      alert("UserName Submitted");
    }
  };

  const checkWinner = (square) => {
    let combos = {
      rows: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      cols: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      dia: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          square[pattern[0]] === "" ||
          square[pattern[1]] === "" ||
          square[pattern[2]] === ""
        ) {
        } else if (
          square[pattern[0]] === square[pattern[1]] &&
          square[pattern[1]] === square[pattern[2]]
        ) {
          setWinner(square[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    //  alert(num);
    if(user.length==0){
      alert("Enter UserName to Play Game");
      return;
    }
    if (cells[num] !== "") {
      alert("this column is already filled");
      return;
    }
    let square = [...cells];
    square[num] = "X";
    // checkWinner(square);
    setCell(square);
    console.log(square);
    let emptyCell = [];
    for (let i = 0; i < 9; i++) {
      if (square[i] == "") {
        emptyCell.push(i);
      }
    }
    setEmpty(emptyCell.length);
    let random = Math.floor(Math.random() * emptyCell.length);
    square[emptyCell[random]] = "O";
    emptyCell = [];
    for (let i = 0; i < 9; i++) {
      if (square[i] == "") {
        emptyCell.push(i);
      }
    }
    setEmpty(emptyCell.length);
    setCell(square);
    checkWinner(square);
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };
  const RestartGame = () => {
    setEmpty(9);
    setWinner(null);
    setUser("");
    setCell(Array(9).fill(""));
  };
  return (
    <>
      <h1 className="heading">Tic Tac Toe</h1>
      <div className="Inputdata">
        <input
          type="text"
          placeholder="Enter your Name"
          value={InputItem}
          onChange={InputEvent}
        />
        <button className="btn1" onClick={EnterUser}>
          Enter
        </button>
      </div>
    
      <div className={winner ? "lock Container" : "Container"}>
        <table>
          {/* <h2>Turn:{turn}</h2> */}
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </table>
      </div>
      <div className="WinnerName">
        {winner==null && Empty==0 &&(
          <>
         <h4>Match Draw , Enter Restart</h4>
          <button
              onClick={() => {
                RestartGame();
              }}
            >
              Restart
            </button>

          </>
        )}
      </div>
      <div className="WinnerName">

        {winner && (
          <>
            <h4>{winner=='X'? "Wow "+user+ " you won" :"oops you lose game, Computer won"} the Game !</h4>
            <button
              onClick={() => {
                RestartGame();
              }}
            >
              Restart
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default App;
