// document.addEventListener('keydown', function(e){
//     if ( e.code === 'Enter' ){
//         start.className = start.className !== 'show' ? 'show' : 'hide';
//             if (start.className === 'show') {
//                 start.style.display = 'block';
//                 window.setTimeout(function(){
//                     start.style.opacity = 1;
//                     start.style.transform = 'scale(1)';
//             },0);
//         }
//         if (start.className === 'hide') {
//             start.style.opacity = 0;
//             start.style.transform = 'scale(0)';
//             window.setTimeout(function(){
//                 start.style.display = 'none';
//             },700); // timed to match animation-duration
//         }
//     }
// });

// canvas로 캐릭터 만들기
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 400;
canvas.height = window.innerHeight - 400;

// 공룡 캐릭터 canvas
var imgDino = new Image();
var i = 0;

var intervalId = setInterval(function () {
    i++;
    if( i%2 == 0 ){
        imgDino.src = 'img/dinoLeft.png';
    } else if( i%2 == 1 ){
        imgDino.src = 'img/dinoRight.png';
        }
    }, 500);

var dino = {
    x : 10,
    y : 300,
    width : 50,
    height : 50,
    draw(){
        ctx.drawImage(imgDino, this.x, this.y, this.width, this.height)
    }
}

// 장애물
var imgCactus = new Image();
imgCactus.src = 'img/cactus.png';

class Cactus{
    constructor(){
        this.x = window.innerWidth;
        this.y = 300;
        this.width = 35;
        this.height = 50;
    }
    draw(){
        ctx.drawImage(imgCactus, this.x, this.y, this.width, this.height)
    }
}

// 배경
var imgBg = new Image();
imgBg.src = 'img/bg.png';

class Bg{
    constructor(){
        this.x = 0;
        this.y = 348;
        this.width = window.innerWidth;
        this.height = 200;
    }
    draw(){
        ctx.drawImage(imgBg, this.x, this.y, this.width, this.height)
    }
}


// 애니메이션
var timer = 0;
var cactusArr = [];
var bgArr = [];
var JumpTimer = 0;
var animationMove;

function animation(){
    
    animationMove = requestAnimationFrame(animation);
    timer++;
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // 장애물 생성간격
    var random = Math.floor(Math.random() * 1200);
    if(timer % random === 0){
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }

    // 장애물 이동기능
    cactusArr.forEach((a, i, o)=>{
        if( a.x < 0 ){
            o.splice(i,1);
        }
        a.x -=5;

        touch(dino, a);
        a.draw();
    });

    // 배경 무한반복
    if (timer % 50 === 0){
        var bg = new Bg();
        bgArr.push(bg);
    }

    bgArr.forEach((a)=>{
        a.x -= 5;
        a.draw();
    });
    
    // 캐릭터 점프기능 if문
    if ( Jumping == true ){
        dino.y -= 8;
        JumpTimer++;
    }
    if ( JumpTimer > 20 ){
        Jumping = false;
        JumpTimer = 0;
    }
    if ( Jumping == false ){
        if( dino.y < 300 ){
            dino.y += 6;
        }
    }
    dino.draw();
}



// 캐릭터 장애물 충돌요소
function touch( dino, cactus ){
    var Xgap = cactus.x - (dino.x + dino.width);
    var Ygap = cactus.y - (dino.y + dino.height);
    if ( Xgap < 0 && Ygap < 0 ){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animationMove);
    };
}

// 캐릭터 점프 addEventListener
var Jumping = false;
var JumpDelay = 2;
    document.addEventListener('keydown',function(e){
        if( Jumping === false && JumpDelay === 2 ){
            if ( e.code === 'Space' ){
                Jumping = true;
                JumpDelay = 1;
                setTimeout(function(){
                    JumpDelay = 2;
                },800)
            }
        }
    });

// 게임스타트

var start = document.getElementById('canvas');
var startgame = false;

document.getElementById('start').addEventListener('click', function(e){
    document.getElementById('intro').style.display = 'none';
    start.style.display = 'block';
            window.setTimeout(function(){
                start.style.opacity = 1;
                start.style.transform = 'scale(1)';
                startgame = true;
                if( startgame == true ){
                    animation();
                }
        },0);
});