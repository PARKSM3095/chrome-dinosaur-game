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
    y : 400,
    width : 50,
    height : 50,
    draw(){
        ctx.drawImage(imgDino, this.x, this.y, this.width, this.height)
    }
}

// 장애물
var imgCactus1 = new Image();
imgCactus1.src = 'img/cactus1.png';

class Cactus1{
    constructor(){
        this.x = window.innerWidth;
        this.y = 400;
        this.width = 35;
        this.height = 50;
    }
    draw(){
        ctx.drawImage(imgCactus1, this.x, this.y, this.width, this.height)
    }
}

var imgCactus2 = new Image();
imgCactus2.src = 'img/cactus2.png';

class Cactus2{
    constructor(){
        this.x = window.innerWidth;
        this.y = 417;
        this.width = 49;
        this.height = 33;
    }
    draw(){
        ctx.drawImage(imgCactus2, this.x, this.y, this.width, this.height)
    }
}

// 바닥배경
var imgBg = new Image();
imgBg.src = 'img/bg.png';

class Bg{
    constructor(){
        this.x = 0;
        this.y = 448;
        this.width = window.innerWidth;
        this.height = 200;
    }
    draw(){
        ctx.drawImage(imgBg, this.x, this.y, this.width, this.height)
    }
}

// 구름배경
var imgcloud = new Image();
imgcloud.src = 'img/cloud.png';

class Cloud{
    constructor(){
        this.x = window.innerWidth;
        this.y = Math.random() * (100 - 150 + 1) + 150;
        this.width = 96;
        this.height = 52;
    }
    draw(){
        ctx.drawImage(imgcloud, this.x, this.y, this.width, this.height)
    }
}

// 점수판
function score() {
    const ctx = document.getElementById("canvas").getContext("2d");
    ctx.font = "bold 24px Nanum Gothic";
    ctx.fillText("점수 : " + timer, 20 , 40);
}

// 게임오버
var imggameover = new Image();
imggameover.src = 'img/gameover.jpg';

var gameover = {
    x : 150,
    y : 0,
    width : canvas.width - 300,
    height : canvas.height,
    zIndex : 5,
    draw(){
        ctx.drawImage(imggameover, this.x, this.y, this.width, this.height)
    }
}
// function retry() {
//     const ctx = document.getElementById("canvas").getContext("2d");
//     ctx.font = "bold 24px Nanum Gothic";
//     ctx.fillText("다시 도전하기!!", 40, 170);
// }

// 애니메이션
var timer = 0;
var cactusArr = [];
var bgArr = [];
var cloudArr = [];
var JumpTimer = 0;
var animationMove;

function animation(){
    animationMove = requestAnimationFrame(animation);
    timer++;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    // 장애물 생성간격
    var random = Math.floor(Math.random() * 2000);
    if(timer % random === 0){
        var cactus1 = new Cactus1();
        cactusArr.push(cactus1);
    }

    if(timer % random === 1){
        var cactus2 = new Cactus2();
        cactusArr.push(cactus2);
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

    // 바닥배경
    if (timer % 50 === 0){
        var bg = new Bg();
        bgArr.push(bg);
    }

    bgArr.forEach((a)=>{
        a.x -= 5;
        a.draw();
    });

    // 구름배경
    var randomCloud = Math.floor(Math.random() * 1200);

    if (timer % randomCloud === 0){
        var cloud = new Cloud();
        cloudArr.push(cloud);
    }
    cloudArr.forEach((a)=>{
        a.x -= 4;
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
        if( dino.y < 400 ){
            dino.y += 6;
        }
    }
    dino.draw();
    score()
}



// 캐릭터 장애물 충돌요소
function touch( dino, cactus ){
    var Xgap = cactus.x - (dino.x + dino.width);
    var Ygap = cactus.y - (dino.y + dino.height);
    if ( Xgap < 0 && Ygap < 0 ){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animationMove);
        gameover.draw();
        document.addEventListener('click',function(){
            location.reload();
        });
        }
    };

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

// 재도전