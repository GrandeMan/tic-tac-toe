//Gameboard
const gameBoard = (() =>{
    const board = ['','','','','','','','',''];
    
    const getBoard = () => board;

    const markCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };

    return {getBoard, markCell};
})();

//Player
const Player = (name, marker) => {
    return {name, marker};
};

//Display Controller
const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const messageDiv = document.getElementById("message");
})();