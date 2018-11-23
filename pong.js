let canvas = document.querySelector('canvas');

let width = window.innerWidth - 3.05;
let height = window.innerHeight - 3.05;

canvas.width = width;
canvas.height = height;
canvas.style.backgroundColor = 'red';

let c = canvas.getContext('2d');

// SCORE VALUES

let scoreLeft = 0;
let scoreRight = 0;

// POSITION AND VELOCITY FOR BALL
let positionX = width/2;
let velocityX = 4;


let positionY = height/2;
let velocityY = 4;

// POSITION FOR PADDLE
let leftY = height/3;
let rightY = height/3;

const distance = (x1, y1, x2, y2) =>{
    let xDistance = x1 - x2;
    let yDistance = y1 - y2;
    let distance = Math.sqrt((Math.pow(xDistance,2)+(Math.pow(yDistance,2))));
    return distance;
};

const gameOver = () =>{
    if(positionX + 25 > width){
        scoreLeft++;
        alert('player on the left wins!!');
    }else if(positionX - 25 < 0){
        scoreRight++;
        alert('player on the right wins!!');
    };
    positionX = width/2;
    positiony = height/2;
    velocityX = 4;
    velocityY = 4;
};

const animate = () => {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, width, height);

    // CIRCLE / BALL
    c.beginPath();
    c.arc(positionX, positionY, 25, 0, Math.PI * 2, false);
    c.fillStyle = 'gold';
    c.fill();

    if(positionX + 25 > width || positionX - 25 < 0){
        
        gameOver();

    };
        
    
    if(positionY + 25 > height || positionY - 25 < 0){
        velocityY = -velocityY;
    };

    positionX+=velocityX;
    positionY+=velocityY;

    // TEXT / SCORE
    c.font = "60px Arial";
    c.strokeText(scoreLeft,60,50);

    c.font = "60px Arial";
    c.strokeText(scoreRight,width-100,50);

    // BOUNDRIES
    c.fillStyle = 'black';

    c.fillRect(0,0,10,height);

    c.fillRect(width-10,0,10,height);

    // c.fillRect(1,1,50,height);

    // RECT / PADDLE
    c.fillStyle = 'black';

    c.fillRect(50, leftY, 50, 150);

    c.fillRect(width - 100, rightY, 50, 150);

    if(positionX + 25 === 50 + 25|| positionX + 25 === 50 - 25){
        velocityX = -velocityX;
    };
        
    
    if(positionY + 25 === leftY + 75 || positionY + 25 === leftY - 75){
        velocityY = -velocityY;
    };
// paddle left
    if(distance(positionX, positionY, 50 + 25, leftY + 75) < 25 + (75/2)){
        velocityX = -velocityX * 1.01;
        velocityY = velocityY  * 1.01;
    };
//paddle right 
    if(distance(positionX, positionY, (width - 100) + 25, rightY + 75) < 25 + (75/2)){
        velocityX = -velocityX * 1.01;
        velocityY = velocityY * 1.01;
    };
};


window.addEventListener('keydown', (e)=>{
    e.preventDefault();
    if (e.which == 87){
        console.log('upl');
        leftY-= 50;
        if(leftY > height - 150){
            leftY = height-149
        }else if(leftY < 0){
            leftY = 1;
        }else{
            leftY -= 50;
        };
    }else if (e.which == 83){
        console.log('downl');
        if(leftY > height - 150){
            leftY = height-151;
        }else if(leftY < 0){
            leftY = 1;
        }else{
            leftY += 50;
        };
    };
});

window.addEventListener('keydown', (e)=>{
    e.preventDefault();
    if (e.which == 38){
        console.log('upr');
        if(rightY > height - 150){
            rightY = height-149;
        }else if(rightY < 0){
            rightY = 1;
        }else{
            rightY -= 50;
        };
    }else if (e.which == 40){
        console.log('downr');
        if(rightY > height - 150){
            rightY = height - 151;
        }else if(rightY < 0){
            rightY = 1;
        }else{
            rightY += 50;
        };
    };
});

animate();

