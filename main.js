// canvas로 캐릭터 만들기
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 공룡 캐릭터 canvas
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x ,this.y ,this.width ,this.height);
    }
}

// 장애물
class Cactus{
    constructor(){
        this.x = 500;
        this.y = 220;
        this.width = 30;
        this.height = 30;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x ,this.y ,this.width ,this.height);
    }
}

// 애니메이션
var timer = 0;
var cactusArr = [];
var JumpTimer = 0;
var animationMove;

function animation(){
    animationMove = requestAnimationFrame(animation);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    // 장애물 생성간격
    if(timer % 200 === 0){
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }

    // 장애물 이동기능
    cactusArr.forEach((a, i, o)=>{
        if( a.x < 0 ){
            o.splice(i,1);
        }
        a.x--;

        touch(dino, a);
        a.draw();
    });

    // 캐릭터 점프기능 if문
    if ( Jumping == true ){
        dino.y -= 3;
        JumpTimer++;
    }
    if ( JumpTimer > 50 ){
        Jumping = false;
        JumpTimer = 0;

    }
    if ( Jumping == false ){
        if( dino.y < 200 ){
            dino.y += 2;
        }
    }
    
    dino.draw();
}

animation();

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
document.addEventListener('keydown',function(e){
    if ( e.code === 'Space' ){
        Jumping = true;
    }
});
