(function readyJS(win, doc){
    'use strict';

    // VARIABLES
    let timerGame;
    let player;
    let enemy;
    let enemyRandom;
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
        mainGame.style.backgroundImage = "url('img/background.png')"

        CreatePlayer();
        CreateEnemy();
        GenerateRandomEnemy();
        LoopGame();
    }

    // Game Over
    function GameOver(){
        clearInterval(timerGame);
        clearInterval(jumpTimer);
        clearInterval(enemyRandom);

        setTimeout(() => {
            player.remove();
        
            if(enemy){
                enemy.forEach(element => {
                    element.remove();
                });    
            }

            mainGame.style.backgroundImage = "none";

            btnPlayGame.textContent = "Voce Perdeu! Jogue novamente"
            btnPlayGame.style.display = "block";

        }, 2500)

        

    }

    // Loop Game
    function LoopGame(){
        timerGame = setInterval(() => {
            MoveBackground();
            MoveEnemy();
            CheckColision();
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
                    let posicaoY = parseInt(getComputedStyle(player).marginTop);
                    player.style.marginTop = posicaoY - 10 + "px";
    
                    if(posicaoY  <= 0){
                        clearInterval(jumpTimer)
                        
                        jumpTimer = setInterval(() => {
                            let posicaoY = parseInt(getComputedStyle(player).marginTop);
                            player.style.marginTop = posicaoY + 14 + "px";
    
                            if(posicaoY  >= 130){
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

        enemy = document.querySelectorAll(".enemy")

    }

    // Generate Random Enemy
    function GenerateRandomEnemy(){

        let value;
            enemyRandom = setInterval(() => {
                value = Math.floor(Math.random() * 10)

                if(value > 3){
                    CreateEnemy();
                }
            }, 1000)
    }

    // Move Enemy
    function MoveEnemy(){
        if(enemy){
            enemy.forEach(element => {
                let posicaoX = parseInt(getComputedStyle(element).left)
                element.style.left = posicaoX - 18 + "px" 
            });    
        }
        
    }

    // Checa Colisao
    function CheckColision(){
        ColisionEnemyFinalMap()
        ColisionPlayerEnemy()
    }

    // Colisao Player -> Enemy
    function ColisionPlayerEnemy(){
        enemy.forEach(element => {
            let enemyPosicaoX = parseInt(getComputedStyle(element).left)
            let playerPosicaoY = parseInt(getComputedStyle(player).marginTop)

            if(enemyPosicaoX <= 141 && enemyPosicaoX >= 20 && playerPosicaoY >= 150){
                GameOver();
            }
        });   
    }

    // Colisao Enemy -> Final Map
    function ColisionEnemyFinalMap(){
        if(enemy){
            enemy.forEach(element => {
                let posicaoX = parseInt(getComputedStyle(element).left)

                if(posicaoX <= 0){
                    element.remove();
                }
            });   
        }
    }

})(window, document);