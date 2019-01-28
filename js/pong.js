var canvas, context;

var ballX = 32,
    ballY = 32,
    ballSize = 16,
    ballSpeed = 2,
    right = true,
    down = false,
    lastHit = 0;

var paddle1X = 32,
    paddle1Y, paddle2X = 568,
    paddle2Y, paddleSpeed = 3,
    paddleSize = 96;

var lup = false,
    ldwn = false,
    rup = false,
    rdwn = false,
    psd = false;

var player1Score = 0,
    player2Score = 0,
    paused = true,
    finalScore = 0,
    lastWin = 0;

function init() {
	console.log(document.getElementById("winningNumber").value);

    canvas = document.getElementById("canvas");
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
    paddle1Y = 600 / 2;
    paddle2Y = 600 / 2;

    document.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 87:
                lup = true;
                break;

            case 83:
                ldwn = true;
                break;

            case 38:
                rup = true;
                break;

            case 40:
                rdwn = true;
                break;

            case 13:
                psd = true;
                break;
        }
    })

    document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
            case 87:
                lup = false;
                break;

            case 83:
                ldwn = false;
                break;

            case 38:
                rup = false;
                break;

            case 40:
                rdwn = false;
                break;

            case 13:
                psd = false;
                break;
        }
    })


    context = canvas.getContext("2d");
    setInterval(update, 2);
}

function update() {
    play();
    if (paused != true) {
    	finalScore = (document.getElementById("winningNumber").value - 1);
        moveBall();
        movePaddle();
    }
    render();
}

function reloatInitVariables() {
    paddle1Y = 600 / 2;
    paddle2Y = 600 / 2;
    ballX = 32;
    ballY = 32;
    right = true;
    down = false;
    lastHit = 0;
    player1Score = 0;
    player2Score = 0;
}

function play() {
    if (paused) {
        if (psd) {
            player1Score = 0;
            player2Score = 0;
            paused = false;
        }
    }
}

function reset(winner) {
    if (player1Score == finalScore) {
        paused = true;
        reloatInitVariables();
        lastWin = 1;
    } else if (player2Score == finalScore) {
        paused = true;
        reloatInitVariables();
        lastWin = 1;
    }

    if (winner == 1) {
        player1Score += 1;
        ballX = paddle1X + 16;
        ballY = paddle1Y;
        right = true;
    } else {
        player2Score += 1;
        ballX = paddle2X - 16;
        ballY = paddle2Y;
        right = false;
    }
}

function movePaddle() {
    if (lup) {
        if (paddle1Y > 16) {
            paddle1Y -= paddleSpeed;
        }
    } else if (ldwn) {
        if (paddle1Y + paddleSize < canvas.height - 16) {
            paddle1Y += paddleSpeed;
        }
    }

    if (rup) {
        if (paddle2Y > 16) {
            paddle2Y -= paddleSpeed;
        }
    } else if (rdwn) {
        if (paddle2Y + paddleSize < canvas.height - 16) {
            paddle2Y += paddleSpeed;
        }
    }
}


function checkEdges() {
    var fullBallSize = ballX + ballSize;
    if (fullBallSize >= paddle2X) {
        if (ballY >= paddle2Y) {
            if (ballY < (paddle2Y + paddleSize)) {
                right = false;
                lastHit = 2;
            }
        }
    }

    if (ballX <= (paddle1X + 16)) {
        if (ballY >= paddle1Y) {
            if (ballY < (paddle1Y + paddleSize)) {
                right = true;
                lastHit = 1;
            }
        }
    }

    if (ballX + ballSize >= canvas.width) {
        reset(1);
    } else if (ballX <= 0) {
        reset(2);
    }

    if (ballY + ballSize >= canvas.height - 17) {
        down = false;
    } else if (ballY <= 17) {
        down = true;
    }

}

function moveBall() {

    checkEdges();

    if (right) {
        ballX += ballSpeed;
    } else {
        ballX -= ballSpeed;
    }

    if (down) {
        ballY += ballSpeed;
    } else {
        ballY -= ballSpeed;
    }
}

function render() {
    clearScreen();
    renderBackground();
    renderScore();
    renderBall();
    renderPaddle(1);
    renderPaddle(2);
}

function renderScore() {
    context.font = "42px Arial";
    context.fillStyle = "#FF0000";
    context.fillText(player1Score, canvas.width / 2 - (45 + 22.5), 50);
    context.fillStyle = "#00FF00";
    context.fillText(player2Score, canvas.width / 2 + 45, 50);
    context.fillStyle = "#000000";
}

function renderBackground() {
    context.fillStyle = "#d7d7d7";
    context.fillRect(0, canvas.height - 16, canvas.width, 16);
    context.fillRect(0, 0, canvas.width, 16);
    context.fillRect(canvas.width / 2 - 8, 0, 16, canvas.height);
    context.fillStyle = "#FFFFFF";
}

function clearScreen() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function getRandomNumber() {
	return (Math.random() * 256);
}

function renderBall() {

    	if (lastHit == 0) {
        	context.fillStyle = "#FFFFFF";
    	} else if (lastHit == 1) {
        	context.fillStyle = "#FF0000";
    	} else if (lastHit == 2) {
       	 	context.fillStyle = "#00FF00";
    
}

    context.fillRect(ballX, ballY, ballSize, ballSize);
    context.fillStyle = "#000000";
}

function renderPaddle(paddleNumber) {
    if (paddleNumber == 1) {
        context.fillStyle = "#FF0000";
        context.fillRect(paddle1X, paddle1Y, 16, paddleSize);
    } else {
        context.fillStyle = "#00FF00";
        context.fillRect(paddle2X, paddle2Y, 16, paddleSize);
    }
    context.fillStyle = "#000000";
}