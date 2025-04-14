//Game Board Object
const gameBoard = (function(){
    let board = [];
    //create new Board if there is no existing board
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
                this.showDialog();
            }
            else{
                if(this.checkWin(this.board)){
                    console.log(`${this.activePlayer.name} WON!`);
                    this.showDialog();
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
        display.boardDisplay(this.board);
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
    },
    resetGame: function(){
        display.resetDisplay();
        for(let i=0; i<3; i++){
            this.board.pop();
        }

        for(let i = 0; i < 3; i++){
            this.board[i]=[];
            for(let j = 0; j < 3; j++){
                this.board[i].push(" ");
            }
        }   
        console.log(this.board); 
        this.dialog.close();   
    },
    dialog: document.querySelector("dialog"),
    showDialog: function(){
        const winner = document.querySelector("#winner");
        const restart = document.querySelector("#restart");
        if(this.checkDraw()){
            winner.textContent = "DRAW!";
        }
        else{
            winner.textContent = `${this.activePlayer.name} WON!`;
        }
        this.dialog.showModal();
        restart.addEventListener('click', ()=>{this.resetGame()});
    }

}

//Object for displaying the board
const display = {
    tiles: document.querySelectorAll(".tiles"),
    oldBoard: new Array(9).fill(" "),
    boardDisplay: function(board){
        let newBoard = [];
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                newBoard.push(board[i][j])
            }
    
        }
        this.tiles.forEach((tile, index) => {
            if(newBoard[index] === "X" && this.oldBoard[index] === " "){
                const svgNS = "http://www.w3.org/2000/svg";
                const svg = document.createElementNS(svgNS, "svg"); 
                svg.setAttribute('height', '100');
                svg.setAttribute('width','100');
                const line1 = document.createElementNS(svgNS, "line"); 
                line1.classList.add("animated-line");
                line1.setAttribute('x1','0');
                line1.setAttribute('y1','0');
                line1.setAttribute('x2','100');
                line1.setAttribute('y2','100');
                line1.setAttribute('stroke', 'black');
                line1.setAttribute('stroke-width','5');
                const line2 = document.createElementNS(svgNS, "line"); 
                line2.classList.add("animated-line");
                line2.classList.add("animated-line2");
                line2.setAttribute('x1','100');
                line2.setAttribute('y1','0');
                line2.setAttribute('x2','0');
                line2.setAttribute('y2','100');
                line2.setAttribute('stroke', 'black');
                line2.setAttribute('stroke-width','5');
                svg.appendChild(line1);
                svg.appendChild(line2);
                tile.appendChild(svg);
            }
            else if(newBoard[index] === "O" && this.oldBoard[index] === " "){
                const svgNS = "http://www.w3.org/2000/svg";
                const svg = document.createElementNS(svgNS, "svg"); 
                svg.setAttribute('height', '100');
                svg.setAttribute('width','100');
                const circle = document.createElementNS(svgNS, "circle"); 
                circle.classList.add("animated-circle")
                circle.setAttribute('r','45');
                circle.setAttribute('cx','50');
                circle.setAttribute('cy','50');
                circle.setAttribute('fill','none');
                circle.setAttribute('stroke', 'black');
                circle.setAttribute('stroke-width','5');
                svg.appendChild(circle);
                tile.appendChild(svg);
            }
        })
        console.log(this.oldBoard);
        console.log(newBoard);
        this.oldBoard = newBoard;
    },
    resetDisplay: function(){
        for(let i=this.oldBoard.length; i>0; i--){
            this.oldBoard.pop();
        }
        for(let i=0; i<9; i++){
            this.oldBoard.push(" ");
        }
        this.tiles.forEach(tile => {
            if(tile.children.length > 0){
                tile.removeChild(tile.firstChild)
            }
        });
    }
}

const game = controlGame;

const buttonTile = document.querySelectorAll(".tiles")

buttonTile.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      game.play(row, col);
    });
  });
  