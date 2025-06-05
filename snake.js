let inputDir = { x:0 , y:0 };
const foodSound = new Audio('food.mp3');
const gameOverSound =new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const music = new Audio('music.mp3');
let lastUpdataeTime = 0;
let snake=[{x:10 , y:10}];
food={x:13,y:15};
let score=0;



function main(ctime)
{
    window.requestAnimationFrame(main);
    
    if((ctime-lastUpdataeTime)/1000<0.2)
    {
        return;
    }
    lastUpdataeTime=ctime;
    gameEnine();
}

function isCollide(snake)
{
    for (let i = 1; i < snake.length; i++) 
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        {
            return true;
        }
    }
    if(snake[0].x>20 || snake[0].x<0 || snake[0].y>20 || snake[0].y<0)
    {
        return true;
    }
}

function gameEnine()
{
    if(isCollide(snake))
    {
        gameOverSound.play();
        music.pause();
        inputDir = { x:0 , y:0 };
        alert("Game Over");
        snake=[{x:10 , y:10}];
        music.play();
        score=0;
    }


    if(snake[0].x==food.x && snake[0].y==food.y)
    {
        foodSound.play();
        score++;
        scorebox.innerHTML="Score : "+ score;
        snake.unshift({x : snake[0].x+inputDir.x , y : snake[0].y+inputDir.y});
        food = {x:Math.round(2+16*Math.random()),y:Math.round(2+16*Math.random())};
    }


    for (let i =snake.length-2;i>=0;i--) 
    {
        snake[i+1]={...snake[i]};
    }
    snake[0].x+=inputDir.x;
    snake[0].y+=inputDir.y;




    board.innerHTML="";
    snake.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        if(index==0)
            {
                snakeElement.classList.add('mc');
            }
            else
            {
                snakeElement.classList.add('snakebody');
            }
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        board.appendChild(snakeElement);
    })
        foodElement=document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        board.appendChild(foodElement);
}























window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir= {x:0,y:1};
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:break;
    }
})
