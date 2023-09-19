//Gameboard
const gameBoard = (() =>{
    const board = ['','','','','','','','',''];
    
    const getBoard = () => board;


})();

//Player
const Player = (name, marker) => {
    return {name, marker};
}