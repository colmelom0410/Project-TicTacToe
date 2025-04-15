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
        name: "X",
        token: "X",
    },
    playerO: {
        name: "O",
        token: "O",
    },
    scoreOname: document.querySelector("#scoreOname"),
    scoreXname: document.querySelector("#scoreXname"),
    switchPlayer: function(activePlayer){
        return activePlayer === this.playerX ? this.playerO : this.playerX ;
    },
    enterName: function (){
        const startDialog = document.querySelector("#startDialog");
        const playerXinput = startDialog.querySelector("#playerX");
        const playerOinput = startDialog.querySelector("#playerO");
        const startBtn = startDialog.querySelector("#startBtn > button");
        startDialog.showModal();
        startBtn.addEventListener('click',()=>{
            this.playerX.name = !playerXinput.value ? this.playerX.name : playerXinput.value; 
            this.playerO.name = !playerOinput.value ? this.playerO.name : playerOinput.value;
            scoreXname.textContent = this.playerX.name;
            scoreOname.textContent = this.playerO.name;
            controlGame.displayPlayerTurn.textContent = controlGame.activePlayer.name;
            startDialog.close(); 
        })
    }
}
//Object for Controlling the Game
const controlGame = {
    board: gameBoard,
    activePlayer: player.playerX,
    displayPlayerTurn: document.querySelector("#currentPlayer"),
    playerXscore: 0,
    playerOscore: 0,
    scoreO: document.querySelector("#scoreO"),
    scoreX: document.querySelector("#scoreX"),
    resetScoreBtn: document.querySelector("#resetScore > button"),
    play: function(row, col){
        if(this.board[row][col]=== " "){
            this.board[row][col] = this.activePlayer.token;
            console.log(this.board);
            display.boardDisplay(this.board);
            const winCombo = this.checkWin();
            if(winCombo){
                console.log(`Player ${this.activePlayer.name} WON!`);
                this.score();
                this.highlightWin(winCombo);
                this.showDialog();
            }
            else if(this.checkDraw(this.board)){
                console.log("DRAW!!");
                this.showDialog();
            }
            else{
                this.activePlayer = player.switchPlayer(this.activePlayer);
                console.log(`${this.activePlayer.name}'s turn`)
            }  
        }
        else{
            console.log("Cell is already occupied");
            console.log(this.board);
        }
        this.displayPlayerTurn.textContent = this.activePlayer.name;  
    },
    checkWin: function(){
        // Check diagonals
        if(this.board[1][1] !== " "){
            if(this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]){
                return [[0,0], [1,1], [2,2]];
            }
            else if(this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]){
                return [[0,2], [1,1], [2,0]];
            }
        }
    
        // Check rows and columns
        for(let i = 0; i < 3; i++){
            if(this.board[i][0] !== " " && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]){
                return [[i,0], [i,1], [i,2]];
            }
            if(this.board[0][i] !== " " && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]){
                return [[0,i], [1,i], [2,i]];
            }
        }
    
        return null;
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
        this.resultDialog.close();   
    },
    resultDialog: document.querySelector("#resultDialog"),
    showDialog: function(){
        const winner = document.querySelector("#winner");
        const restart = document.querySelector("#restart");
        if(this.checkWin()){
            winner.textContent = `Player ${this.activePlayer.name} WON!`;
        }
        else{
            winner.textContent = "DRAW!";
        }
        this.resultDialog.showModal();
        restart.addEventListener('click', ()=>{this.resetGame()});
    },
    //highlight winning combinations
    highlightWin: function(combo){
        combo.forEach(([row, col]) => {
            const index = row * 3 + col;
            const tile = display.tiles[index];
            
            // Check if the tile has an SVG (i.e., it contains an X or O)
            const svg = tile.querySelector("svg");
            if (svg) {
                const shapes = svg.querySelectorAll("line, circle");
                shapes.forEach(shape => {
                    shape.setAttribute("stroke", "red"); // Set the color to red
                });
            }
        });
    },
    score: function(){
        if(this.activePlayer.token === "X"){
            this.playerXscore += 1;
            this.scoreX.textContent = this.playerXscore;
        }
        else if(this.activePlayer.token === "O"){
            this.playerOscore += 1;
            this.scoreO.textContent = this.playerOscore;
        }
        this.resetScoreBtn.addEventListener('click', () =>{
            this.playerOscore = 0;
            this.playerXscore = 0;
            this.scoreX.textContent = this.playerXscore;
            this.scoreO.textContent = this.playerOscore;
        })
    },
    resetScore: function(){
        
        
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
            tile.style.backgroundColor = "";
            if(tile.children.length > 0){
                tile.removeChild(tile.firstChild)
            }
        });
    }
}

player.enterName();
const game = controlGame;

const buttonTile = document.querySelectorAll(".tiles")

buttonTile.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      game.play(row, col);
    });
  });
  