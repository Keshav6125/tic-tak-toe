const boxes = document.querySelectorAll(".box");
const info = document.querySelector(".player-info");
const button = document.querySelector(".btn");

let current;
let gameGrid;

const winningPositions = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6]
];
// let initialise a function to initialise the game
function gameinit(){
    current="X";
    gameGrid = ["","","","","","","","",""];
    button.classList.remove("active");
    // ui mai bhi change krna HOGA 
    boxes.forEach((box, index) => {
         box.innerText="";
         boxes[index].style.pointerEvents="all";
         box.classList.remove("win");
    });
    
    info.innerText = `Current Player - ${current}`;
}
gameinit();
function swapTurn(){
    if(current==="X"){
        current="O";    
    }
    else{
        current="X";
    }
    info.innerText=`Current Player - ${current}`;
}

function gameOver(){
    let answer="";
    // all 3 boxes should be non empty and exactly same value
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

            // check if winner is X
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }
            
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            // make background green for winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    // it means we have a winner
    if(answer!==""){
        info.innerText=`WINNER - ${answer}`;
        button.classList.add("active")
    }

    // let check weather game is tie
    let count=0;
    
    gameGrid.forEach((position)=>{
         if(position !== "")
         count++;
    });
    if(count===9){
        info.innerText=`GAME TIED`;
        button.classList.add("active"); 
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = current;
        gameGrid[index] = current;
        boxes[index].style.pointerEvents="none";
        // swap kro trun
        swapTurn();
        // check kro koi jeet toh nhi gya 
        gameOver();
    }
}


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

button.addEventListener("click" , gameinit);
