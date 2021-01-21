class grid{
    makeGrid(rows, cols){
        let htmlLines = '';
        for(let i = 0; i<cols; i++){
            htmlLines += `<div class="cols" data-col id=col${i}>`;
            for(let j = rows-1; j>=0; j--){
                htmlLines += `<div class="cell" id="cell${i}${j}"></div>`;
            }
            htmlLines += '</div>';
        }
        document.getElementById('container').innerHTML = htmlLines;
    }
}

class game{
    constructor(player, board){
        this.player = player;
        this.board = board;
    }

    playerChange(){
        if(this.player === 'red'){
            this.player = 'blue'
        }else{this.player = 'red'}
    }

    winCheck(turn, row, column){
        
        for(let i=0; i<4; i++){
            //horizontal check
            if(column-i >=0 && column-i+3<=6){
                let first = this.board[column - i][row];
                let second = this.board[column - i + 1][row];
                let third = this.board[column - i + 2][row];
                let fourth = this.board[column - i + 3][row];

                if(first===second && second===third && third==fourth){
                    console.log('h')
                    this.winningMessage();
                    return;
                }
            }
            //vertical check
            if(row-i >=0){
                let first = this.board[column][row];
                let second = this.board[column][row-1];
                let third = this.board[column][row-2];
                let fourth = this.board[column][row-3];

                if(first===second && second===third && third==fourth){
                    console.log('v')
                    this.winningMessage();
                    return;
                }
                
            }
            //diagonal 1 check
            if(column-i >=0 && column-i+3<=6 && row-i>=0 && row-i+3<=6){
                let first = this.board[column-i][row-i];
                let second = this.board[column-i+1][row-i+1];
                let third = this.board[column-i+2][row-i+2];
                let fourth = this.board[column-i+3][row-i+3];

                if(first===second && second===third && third==fourth){
                    console.log('d1')
                    this.winningMessage();
                    return;
                }
            }
            //diagonal 2 check
            if(column-i >=0 && column-i+3<=6 && row+i-3>=0 && row+i+3<=6){
                let first = this.board[column - i][row+i];
                let second = this.board[column - i + 1][row+i-1];
                let third = this.board[column - i + 2][row+i-2];
                let fourth = this.board[column - i + 3][row+i-3];

                if(first===second && second===third && third==fourth){
                    console.log('d2')
                    this.winningMessage();
                    return;
                }
            }
        }

    }

    displayDisc(column, row){
        document.getElementById(`cell${column}${row}`).innerHTML = `<div class="${this.player}"></div>`;
    }

    winningMessage(){
        const text = `winner:<br>${this.player}`
        const resultContainer = document.getElementById('result-container');
        resultContainer.style.visibility = 'visible';
        resultContainer.style.backgroundColor = (this.player==='red')?'rgba(255, 51, 51, 55%)':'rgba(102, 102, 255, 55%)';
        document.getElementById('message').innerHTML=text;
    }

    restart(){
        this.board = [[],[],[],[],[],[],[]];
        console.log(this.board);
        let x=document.querySelectorAll('.cell');
        x.forEach(elem=>{
            elem.innerHTML = '';
        })
        document.getElementById('result-container').style.visibility = 'hidden';
    }
}

const connect4grid = new grid();

connect4grid.makeGrid(6,7);

const Arr = [[],[],[],[],[],[],[]];
const connect4 = new game('red', Arr);
let turn = 0;

const cols = document.querySelectorAll("[data-col]");

cols.forEach(elem => {
    elem.addEventListener('click', ()=>{
        let columnNO = parseInt(elem.id.slice(-1))
        let rowNO = connect4.board[columnNO].length;
            if(connect4.board[columnNO].length <= 5){
                turn++;
                connect4.board[columnNO].push(connect4.player);
                
                    connect4.winCheck(turn, rowNO, columnNO);
                
                connect4.displayDisc(columnNO, rowNO);
                connect4.playerChange();
            }
    })
})

document.getElementsByClassName('restart')[0].addEventListener('click', ()=>{connect4.restart()});