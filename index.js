let inputDir = {x: 0,y: 0};
let foodSound = new Audio ('/music/food.mp3');
let gameOverSound = new Audio ('/music/gameover.mp3');
let moveSound = new Audio ('/music/move.mp3');
let musicSound = new Audio ('/music.mp3');
let speed =18;
let score =0;
let lastPaintTime=0;
let SnakeArr=[
    {x: 13, y: 16}
];
 food = {x: 6, y: 7};
 
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}


   function isCollide(SnakeArr)
   {
        for (let i=1;i<SnakeArr.length;i++){
        if(SnakeArr[i].x===SnakeArr[0].x && SnakeArr [i].y===SnakeArr[0].y ){
            return true;
        }}
        if(SnakeArr[0].x>=18 || SnakeArr[0].x<=0 ||  SnakeArr[0].y>=18 || SnakeArr[0].y<=0 ) {
            return true;
        }
       return false;
   }
function gameEngine(){

    //part 1  update the snake array and food
    //  display the snake and food 


    if(isCollide(SnakeArr))
    {
        score=0;

          gameOverSound.play();
          musicSound.pause();
          inputDir= { x: 0, y: 0};
          alert("Game Over  Press any key to contine the Game");
          SnakeArr = [{x: 13, y: 16}];
          musicSound.play();

    }

    // if you have eat the food then update the score and regreate the ball  
        if(SnakeArr[0].y===food.y &&  SnakeArr[0].x=== food.x)
        {
            foodSound.play();
            score+=1;
            scoreBox.innerHTML="Score"+":"+score;
            if(score> hiscoreval){
                hiscoreval=score;
                localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
                HighScoreBox.innerHTML="Hiscore: "+hiscoreval;
            }
            SnakeArr.unshift({x: SnakeArr[0].x +inputDir.x, y:SnakeArr[0].y +inputDir.y});
            let a=2;
            let b=16;
            food= {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
        }
      


  // move the Snake 

  for(let i=SnakeArr.length-2; i>=0;i--)
  {
               
        SnakeArr[i+1]={...SnakeArr[i]}; 
  }
  SnakeArr[0].x +=inputDir.x;
  SnakeArr[0].y +=inputDir.y;

    //  display the snake
    board.innerHTML=""; 
    SnakeArr.forEach((e,index)=>{
     let snakeElement =document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
        snakeElement.classList.add('head');
        }
        else 
        {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });
        //  display the foos

        foodElement =document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    HighScoreBox.innerHTML="HighScore: "+hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{

    inputDir={x:0,y:1} //Start the Game
    moveSound.play();


    switch(e.keyCode){
     // ye  key code hote hai jo btate hai ki kon si ki dbai hai
        case 38:
            console.log("ArrowUp")

            inputDir.x= 0;
            inputDir.y= -1;
            
            break;

            
        case 40:

            console.log("ArrowDown")

            inputDir.x= 0;
            inputDir.y= 1;
            

            break;
            
         case 37:
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            
            break;
 
            
        case 39:
            console.log("ArrowRight")

            inputDir.x= 1;
            inputDir.y= 0;
            // console.log( inputDir.x +" " +inputDir.y)
            break;

                   default:
                   break;
    }
})