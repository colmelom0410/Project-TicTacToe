
//Create a single instance of the game board
const gameBoard = (function(){
    let board = [];
    const createNewBoard = () => {
        const row = 3;
        const column = 3;
        for(let i = 0; i < row; i++){
            board[i]=[];
            for(let j = 0; j < column; j++){
                board[i].push(" ");
            }
        }
        return board;
    }
    if(board.length === 0){
        board = createNewBoard()
    }
    return board;
})();

//Create function to check every winning conditions
function checkWin(board){
    let win = false;
    if(board[1][1] !== " "){
        if(board[0][0] === board[1][1] && board[1][1] == board[2][2]){
            win = true;
        }
        else if(board[0][2] === board[1][1] && board[1][1] == board[2][0]){
            win = true;
        }
    }
    for(let i=0; i<3; i++){
        if(board[i][0] !== " " && board[i][0] === board[i][1] && board[i][1] == board[i][2]){
            win = true;
        }
        else if(board[0][i] !== " " && board[0][i] === board[1][i] && board[1][i] == board[2][i]){
            win = true;
        }
        else if(board[0][0] === board[1][1] && board[1][1] == board[2][2]){
            win = true;
        }
        return win;
    }

    return win;
}


console.log(gameBoard);

function gameControl(){
    let board = gameBoard;
    const players = [
        {
            name:"Player X",
            token:"X"
        },
        {
            name:"Player O",
            token:"O"
        }
    ]
    let activePlayer = players[0];
    console.log(`${activePlayer.name}'s turn`)
    const switchTurn = (activePlayer, players) => {
        return activePlayer === players[0] ? players[1] : players[0];
    }
    const play = (row, col) =>{
        if(board[row][col]=== " "){
            board[row][col] = activePlayer.token;
            console.log(board);
            if(checkWin(board)){
                console.log(`${activePlayer.name} WON!`);
            }
            else{
                activePlayer = switchTurn(activePlayer, players);
                console.log(`${activePlayer.name}'s turn`)
            }  
        }
        else{
            console.log("Cell is already occupied");
            console.log(board);
        }
        
    }
    return {play};
}

const game = gameControl();

