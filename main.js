const displayController = (() => {
    const message = (message) => {
      document.querySelector("#message").innerHTML = message;
    };
    return {
      message,
    };
  })();
  
  // 2nd
  const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
  
    // 3rd
    const render = () => {
      let boardHTML = "";
      gameboard.forEach((squr, index) => {
        boardHTML =
          boardHTML + `<div class="squr" id="squr-${index}">${squr}</div>`;
      });
      document.querySelector("#gameboard").innerHTML = boardHTML;
      const box = document.querySelectorAll(".squr");
      box.forEach((squr) => {
        squr.addEventListener("click", Game.handleClick);
      });
    };
  
    const update = (index, value) => {
      gameboard[index] = value;
      render();
    };
  
    const getgameBoard = () => gameboard;
    // 4th
    return {
      render,
      update,
      getgameBoard,
    };
  })();
  
  // 6th
  const createPlayer = (name, mark) => {
    return {
      name,
      mark,
    };
  };
  
  // 5th
  const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
  
    const start = () => {
      players = [
        createPlayer(document.querySelector("#player1").value, "X"),
        createPlayer(document.querySelector("#player2").value, "O"),
      ];
      // 7th
      currentPlayerIndex = 0;
      gameOver = false;
      gameBoard.render();
      const box = document.querySelectorAll(".squr");
      box.forEach((squr) => {
        squr.addEventListener("click", handleClick);
      });
    };
    // 9th
    const handleClick = (event) => {
      if (gameOver) {
        return;
      }
      let index = parseInt(event.target.id.split("-")[1]);
      if (gameBoard.getgameBoard()[index] !== "") return;
      gameBoard.update(index, players[currentPlayerIndex].mark);
  
      if (
        checkForWin(gameBoard.getgameBoard(), players[currentPlayerIndex].mark)
      ) {
        gameOver = true;
        displayController.message(`${players[currentPlayerIndex].name} wins`);
      } else if (checkForTie(gameBoard.getgameBoard())) {
        gameOver = true;
        displayController.message("It's tie");
      }
  
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };
  
    const restart = () => {
      for (let i = 0; i < 9; i++) {
        gameBoard.update(i, "");
      }
      gameBoard.render();
      gameOver = false;
      document.querySelector("#message").innerHTML = "";
    };
  
    return {
      start,
      restart,
      handleClick,
    };
  })();
  
  function checkForWin(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }
  
  function checkForTie(board) {
    return board.every((cell) => cell !== "");
  }
  
  const restartbtn = document.querySelector("#restart-btn");
  restartbtn.addEventListener("click", () => {
    Game.restart();
  });
  
  
  
  // if (player1 == "" && player2 == "") {
  //     restartbtn
  // } else {
      
  // }
  
  const startbtn = document.querySelector("#start-btn");
      startbtn.addEventListener("click", () => {
          Game.start();
      });