//Greetings recurse center person! Here is the "example code" I will be submitting for my pairing interview. I would like to add functionality for scorekeeping and adding an AI player in this interview.

//GAME MODEL ************************************

//initialize variables globally
const welcomeMessage = `TIC-TAC-TOE\n`;
const navigationHelp = `use the corresponding numbers to select a space.\nPlace number inside of the write(#) function!\n\n0|1|2\n-----\n3|4|5\n-----\n6|7|8\n`;
const spaceTakenMsg = `This space has been taken!`;
const notInRange = `Value must be a number between 0 & 8!`;
const gameOverMsg = `The game is over! Type reset() to play again`;
const xWin = `\nPlayer X wins!\nType reset() to start a new game`;
const oWin = `\nPlayer O wins!\nType reset() to start a new game`;
const tieGame = `The game is a tie! Type reset() to play again.`;

let playerList, playerBool, currentPlayer, currentPlayerMessage, gameData, gameBoard, currentSelection, spaceTaken, currentSpaceTaken, invalidEntry, gameOver, catCheck;

//set initial values
var init = function(){
  for(let i = 0 ; i == 0 ; i++){
  gameData = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
  catCheck = 0;
  spaceTaken = [0,0,0,0,0,0,0,0,0];
  gameOver, playerBool, invalidEntry, currentSpaceTaken = false;
  currentPlayer = "X";//
  currentPlayerMessage = `It is ${currentPlayer}s turn!\n`;
  winningCombo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  };
};

//GAME VIEW **************************************

var render = function(){
  console.clear();
  welcomeSequence();
  errorMessages();
  refreshBoard();
};

//GAME CONTROLLER ********************************

//creates an ASCII gameboard based on the gameData array
var refreshBoard = function(){
  gameBoard = ` ${gameData[0]} ███ ${gameData[1]} ███ ${gameData[2]} \n███████████████\n ${gameData[3]} ███ ${gameData[4]} ███ ${gameData[5]} \n███████████████\n ${gameData[6]} ███ ${gameData[7]} ███ ${gameData[8]} `;
  console.log(gameBoard);
};

//runs when the render function is called in order to display messages regarding errors or wins
var errorMessages = function(){
  if(currentSpaceTaken){
   console.log(spaceTakenMsg);
    currentSpaceTaken = false;
  };
  if(invalidEntry){
   console.log(notInRange);
   invalidEntry = false;
  };
  checkWin();
};

//allows player input. checks to see if the space is taken before placing a gamepiece. if an invalid character is inserted, a message is triggered for re-entry before moving to the next player. a gameover message is triggered if the gameOver variable has been set to true and the user tries using the write() command again
var write = function(x){
  if(!gameOver){
    if(x >= 0 && x <= 8){
      if(spaceTaken[x]){
        currentSpaceTaken = !currentSpaceTaken;
        render();
      }else{
        gameData[x] = currentPlayer;
        spaceTaken[x] = !currentSpaceTaken;
        setPlayer();
        render();
      };
    }else{
     invalidEntry = true;
     render();
    };
  }else
  console.log(gameOverMsg);
};

//sets player as "X" or "O" based on a *player boolean* and updates player message
var setPlayer = function(){
  if(!playerBool){
    currentPlayer = "O";
   playerBool = !playerBool;
   currentPlayerMessage = `It is ${currentPlayer}s turn!\n`;
  }else{
    currentPlayer = "X";
    playerBool = !playerBool;
    currentPlayerMessage = `It is ${currentPlayer}s turn!\n`;
  };
};

//this function iterates over a number of winning combinations and checks to see matches for both X and O players. if there is no win, the cat() function is ran to check for a tie
var checkWin = function(){
  for(var i = 0; i < winningCombo.length; i++){
    let rowCheckX = 0;
    let rowCheckO = 0;
    for(var j = 0; j < winningCombo[i].length; j++){
      if(gameData[winningCombo[i][j]] == "X"){
        rowCheckX++;
        if(rowCheckX == 3){
          console.log(xWin);
          gameOver = true;
        };
      };
      if(gameData[winningCombo[i][j]] == "O"){
        rowCheckO++;
        if(rowCheckO == 3){
          console.log(oWin);
          gameOver = true;
        };
      };
    };
  };
  cat();
};

//a function to check if all spaces have been filled without a win
var cat = function(){
 if(!gameOver){
   for(var i = 0; i < gameData.length; i++){
     if(gameData[i] !== " " ){
       catCheck++;
      };
    };
    if(catCheck == gameData.length){
      console.log(tieGame);
      gameOver = true;
    };
    catCheck = 0;
  };
};

//assembles all instructional text
var welcomeSequence = function(){
  console.log(welcomeMessage);
  console.log(navigationHelp);
  console.log(currentPlayerMessage);
};

//resets the game by running the initial function once again
var reset = function(){
  gameOver = false;
  init();
  render();
};

//initial run sequence
init();
render();
