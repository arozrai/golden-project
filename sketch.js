var player
var enemy1, enemy2, enemy3
var Enemy1, Enemy2, Enemy3
var bigEnemy
var spear
var arrow
var stone
var sheild, punch
var on1, on2, on3
var ON1, ON2, ON3
var face1, face2, face3
var num, dead
var enemiesLeft
var level

var ene1Group
var ene2Group
var ene3Group

var lives = 3
var def=0

function preload() {
    back1 = loadImage("images/back1.jpg")
    back2 = loadImage("images/back2.gif")
    back3 = loadImage("images/back3.gif")

    ninja = loadImage("images/ninja.png")
    left = loadImage("images/runLeft.png")
    right = loadImage("images/runRight.png")
    leftA = loadImage("images/attackLeft.png")
    rightA = loadImage("images/rightAttack.png")

    pro = loadImage("images/shield.png")

    blueR = loadImage("images/blueEnemyR.png")
    blueL = loadImage("images/blueEnemyL.png")

    redR = loadImage("images/redEnemyR.png")
    redL = loadImage("images/redEnemyL.png")

    blackR = loadImage("images/blackEnemyR.png")
    blackL = loadImage("images/blackEnemyL.png")

    sL1 = loadImage("images/slash1L.png")
    sR1 = loadImage("images/slash1R.png")

    sL2 = loadImage("images/slash2L.png")
    sR2 = loadImage("images/slash2R.png")

    sL3 = loadImage("images/slash3L.png")
    sR3 = loadImage("images/slash3R.png")

    bot1L = loadImage("images/bot1L.png")
    bot1R = loadImage("images/bot1R.png")

    bot2L = loadImage("images/bot2L.png")
    bot2R = loadImage("images/bot2R.png")

    bot3L = loadImage("images/bot3L.png")
    bot3R = loadImage("images/bot3R.png")

    attackL = loadImage("images/chargeL.png")
    attackR = loadImage("images/chargeR.png")
}
function setup() {
    createCanvas(displayWidth - 100, displayHeight - 120)

    player = createSprite(500, height - 150, 50, 50)
    player.addImage(ninja)

    Enemy1 = createSprite(width + 200, height - 170, 50, 50)
    Enemy2 = createSprite(width + 200, height - 170, 50, 50)
    Enemy3 = createSprite(width + 200, height - 170, 50, 50)

    dead = 0
    on1 = 1
    on2 = 1
    on3 = 1

    enemiesLeft = 3

    level = 1

    ene1Group = new Group()
    ene2Group = new Group()
    ene3Group = new Group()
}

function draw() {
    if (level === 1) {
        background(back1)
    }
    if (level === 2) {
        background(back2)
    }

    player.scale = 0.5
    player.addImage(ninja)
    if (level !== 3){
        if (dead === 0) {
            if (keyDown(LEFT_ARROW)) {
                player.addImage(left)
                player.scale = 1.5
                player.x = player.x - 5
            }
            if (keyDown(RIGHT_ARROW)) {
                player.addImage(right)
                player.scale = 1.3
                player.x = player.x + 5
            }
            if (keyDown("a") || keyDown("d")) {
                if (keyDown("a")) {
                    player.addImage(leftA)
                }
                if (keyDown("d")) {
                    player.addImage(rightA)
                }
                player.scale = 1.5
                if (player.isTouching(ene1Group)) {
                    ene1Group.destroyEach()
                    on1 = 0
                    enemiesLeft = enemiesLeft - 1
                } if (player.isTouching(ene2Group)) {
                    ene2Group.destroyEach()
                    on2 = 0
                    enemiesLeft = enemiesLeft - 1
                } if (player.isTouching(ene3Group)) {
                    ene3Group.destroyEach()
                    on3 = 0
                    enemiesLeft = enemiesLeft - 1
                }
            }
            if (keyDown("s")) {
                protect = createSprite(player.x, player.y, 60, 60)
                protect.addImage(pro)
                protect.scale = 0.1
                protect.lifetime = 1
                def = 1
            }
            if (keyWentUp("s")) {
                def = 0
            }
        }
    }
    if (enemiesLeft === 0) {
        if (level === 1){
            level = 2
            enemiesLeft = 5
        }
        if (level === 2){
            level = 3
        }
        if (level === 3 && lives > 0){
            textSize(45)
            fill("green")
            strokeWeight(4)
            stroke("red")
            text("game ended", width/2, height/2)
            player.velocityX=0
            destroyEach(ene1Group)
            destroyEach(ene2Group)
            destroyEach(ene3Group)
        }
    }
    if (level === 3 && lives <= 0){
        textSize(45)
        fill("green")
        strokeWeight(4)
        stroke("red")
        text("game ended", width/2, height/2)
        player.velocityX=0
        destroyEach(ene1Group)
        destroyEach(ene2Group)
        destroyEach(ene3Group)
    }
    fill("blue")
    textSize(30)
    text("enemies left to kill: " + enemiesLeft, 50, 50)

    text("lives: " + lives ,width - 150 ,50)
    
    if (lives===0){
        level=3
    }

    if (level < 3){
        spawnEnemy()
        enemyAttack()
    }
    drawSprites()
}

function spawnEnemy() {
    var rand = Math.round(random(1, 3))
    if (frameCount % 250 === 0) {
        if (rand === 1) {
            enemy1 = createSprite(width + 200, height - 170, 50, 50)
            enemy1.scale = 0.6
            on1 = 1
            if (Math.round(random(1, 2)) === 1) {
                enemy1.addImage(blueL)
                enemy1.velocityX = -5
                enemy1.x = width + 50
                face1 = 1
            }
            else {
                enemy1.addImage(blueR)
                enemy1.velocityX = 5
                enemy1.x = -50
                face1 = 2
            }
            num = 1
            enemy1.lifetime = 300
            ene1Group.add(enemy1)
        } else if (rand === 2) {
            enemy2 = createSprite(width + 200, height - 170, 50, 50)
            enemy2.scale = 0.6
            on2 = 1
            if (Math.round(random(1, 2)) === 1) {
                enemy2.addImage(redL)
                enemy2.velocityX = -5
                enemy2.x = width + 50
                face2 = 1
            }
            else {
                enemy2.addImage(redR)
                enemy2.velocityX = 5
                enemy2.x = -50
                face2 = 2
            }
            num = 2
            enemy2.lifetime = 300
            ene2Group.add(enemy2)
        } else {
            enemy3 = createSprite(width + 200, height - 170, 50, 50)
            enemy3.scale = 0.8
            on3 = 1
            if (Math.round(random(1, 2)) === 1) {
                enemy3.addImage(blackL)
                enemy3.velocityX = -5
                enemy3.x = width + 50
                face3 = 1
            }
            else {
                enemy3.addImage(blackR)
                enemy3.velocityX = 5
                enemy3.x = -50
                face3 = 2
            }
            num = 3
            enemy3.lifetime = 300
            ene3Group.add(enemy3)
        }
    }
}

function enemyAttack() {
    if (frameCount % 50 === 0) {
        if (num === 1 && on1 === 1) {
            if (face1 === 1) {
                oof1 = createSprite(enemy1.x - 50, enemy1.y, 150, 150)
                oof1.scale = 0.6
                oof1.addImage(sL1)
                oof1.lifetime = 30
                if (oof1.isTouching(player) && def === 0) {
                    lives = lives - 1
                }
            }
            if (face1 === 2) {
                oof1 = createSprite(enemy1.x + 50, enemy1.y, 150, 150)
                oof1.scale = 0.6
                oof1.addImage(sR1)
                oof1.lifetime = 30
                if (oof1.isTouching(player) && def === 0) {
                    lives = lives - 1
                }
            }
        }
        if (num === 2 && on2 === 1) {
            if (face2 === 1) {
                oof2 = createSprite(enemy2.x - 50, enemy2.y, 150, 150)
                oof2.addImage(sL2)
                oof2.lifetime = 30
                if (oof2.isTouching(player) && def === 0) {
                    lives = lives - 1
                }
            }
            if (face2 === 2) {
                oof2 = createSprite(enemy2.x + 50, enemy2.y, 150, 150)
                oof2.addImage(sR2)
                oof2.lifetime = 30
                if (oof2.isTouching(player) && def === 0) {
                    lives = lives - 1
                }
            }
        }
        if (num === 3 && on3 === 1) {
            if (face3 === 1) {
                oof3 = createSprite(enemy3.x - 50, enemy3.y, 150, 150)
                oof3.addImage(sL3)
                oof3.lifetime = 30
                if (oof3.isTouching(player) && def === 0) {
                    lives = lives - 1
                }
            }
            if (face3 === 2) {
                oof3 = createSprite(enemy3.x + 50, enemy3.y, 150, 150)
                oof3.addImage(sR3)
                oof3.lifetime = 30
                if (oof3.isTouching(player) && def === 0) {
                    lives = lives - 1
                }
            }
        }
    }
}