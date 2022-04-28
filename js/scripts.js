(function readyJS(win, doc){
    'use strict';

    // VARIABLES
    let timerGame;
    let player;
    let enemy;
    let jumpTimer;
    let checkJumper = false;

    // SELECTORS
    let btnPlayGame = document.querySelector(".btnPlayGame")
    let mainGame = document.querySelector(".mainGame")

    // LISTENERS
    btnPlayGame.addEventListener("click", () => {
        Start()
    }, false)

    window.addEventListener("keydown", (e) => {
        PlayerJump(e);
    }, false)


    // FUNCTIONS
    // Start Game
    function Start(){

        btnPlayGame.style.display = "none"
        mainGame.style.backgroundImage = "url('../img/background.png')"

        CreatePlayer();
        CreateEnemy();
        LoopGame();
    }

    // Game Over
    function GameOver(){

    }

    // Loop Game
    function LoopGame(){
        timerGame = setInterval(() => {
            MoveBackground();
        }, 30)
    }

    // Move Background
    function MoveBackground(){
        let posicaoX = parseInt(getComputedStyle(mainGame).backgroundPosition)
        mainGame.style.backgroundPosition = posicaoX - 18 + "px"
    }


    // Create Player
    function CreatePlayer(){
        player = document.createElement("img");
        player.classList.add("player")
        player.src = "img/dino.png"
        
        mainGame.appendChild(player)

    }

    // Player Jump
    function PlayerJump(e){
        if(e.key == "ArrowUp" || e.key == "w"){
            
            if(checkJumper == false){
                checkJumper = true;
                jumpTimer = setInterval(() => {
                    let posicaoY = parseInt(getComputedStyle(player).top);
                    player.style.top = posicaoY - 10 + "px";
    
                    if(posicaoY  <= 0){
                        clearInterval(jumpTimer)
                        
                        jumpTimer = setInterval(() => {
                            let posicaoY = parseInt(getComputedStyle(player).top);
                            player.style.top = posicaoY + 14 + "px";
    
                            if(posicaoY  >= 140){
                                clearInterval(jumpTimer)
                                checkJumper = false;
                            }
                        }, 30)
                    }
                }, 30)
            }
        }
    }

    // Create Enemy
    function CreateEnemy(){
        enemy = document.createElement("img")
        enemy.src = "img/cactus.png"
        enemy.classList.add("enemy")

        mainGame.appendChild(enemy)
        
    }

    // Generate Random Enemy
    function GenerateRandomEnemy(){

    }

    // Checa Colisao
    function CheckColision(){

    }

    // Colisao Player -> Enemy
    function ColisionPlayerEnemy(){

    }

    // Colisao Enemy -> Final Map
    function ColisionEnemyFinalMap(){
        
    }

})(window, document);