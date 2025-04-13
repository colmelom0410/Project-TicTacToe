//Game Board Object
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

//Player Object
const player = {
    playerX: {
        name: "Player X",
        token: "X",
    },
    playerO: {
        name: "Player O",
        token: "O",
    },
    switchPlayer: function(activePlayer){
        return activePlayer === this.playerX ? this.playerO : this.playerX ;
    }
}
//Object for Controlling the Game
const controlGame = {
    board: gameBoard,
    activePlayer: player.playerX,
    play: function(row, col){
        if(this.board[row][col]=== " "){
            this.board[row][col] = this.activePlayer.token;
            console.log(this.board);
            if(this.checkDraw(this.board)){
                console.log("DRAW!!");
            }
            else{
                if(this.checkWin(this.board)){
                    console.log(`${this.activePlayer.name} WON!`);
                }
                else{
                    this.activePlayer = player.switchPlayer(this.activePlayer);
                    console.log(`${this.activePlayer.name}'s turn`)
                }  
            }
        }
        else{
            console.log("Cell is already occupied");
            console.log(this.board);
        } 
        display.boardDisplay(gameBoard);
    },
    checkWin: function(){
        let win = false;

        //Check Diagonally
        if(this.board[1][1] !== " "){
            if(this.board[0][0] === this.board[1][1] && this.board[1][1] == this.board[2][2]){
                win = true;
            }
            else if(this.board[0][2] === this.board[1][1] && this.board[1][1] == this.board[2][0]){
                win = true;
            }
        }
        //Check Horizontally and Vertically
        for(let i=0; i<3; i++){
            if(this.board[i][0] !== " " && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]){
                win = true;
            }
            else if(this.board[0][i] !== " " && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]){
                win = true;
            }
        }

        return win;
    },
    checkDraw: function(){
        let draw = true;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(this.board[i][j] === " "){
                    draw = false;
                    return draw;
                }
            }
        }
        return draw;
    }

}

//Object for displaying the board
const display = {
    tiles: document.querySelectorAll(".tiles"),
    boardDisplay: function(board){
        let newBoard = [];
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                newBoard += board[i][j]
            }
        }
        this.tiles.forEach((tile, index) => {
            tile.textContent = newBoard[index];
        })
    }
}

const game = controlGame;