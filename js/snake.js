$(document).ready(function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const gridSize = 20;
    const canvasSize = 400;

    let snake = [{ x: 160, y: 160, angle: 0 }];
    let direction = "RIGHT";
    let food = { x: 100, y: 100, mega: false };
    let score = 0;
    let gameInterval;
    let foodInterval;

    let speed = 150;
    let speedIncrement = 20;

    function startGame() {
        snake = [{ x: 160, y: 160, angle: 0 }];
        direction = "RIGHT";
        score = 0;
        food = generateFood();
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, speed);
        generateMegaFoodInterval();
    }

    function drawSnake() {
        snake.forEach((segment, index) => {
            const isHead = index === 0;
            const isTail = index === snake.length - 1;
            ctx.fillStyle = isHead ? "green" : "lightgreen";
            ctx.save();
            ctx.translate(segment.x + gridSize / 2, segment.y + gridSize / 2);
            ctx.rotate(segment.angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, gridSize / 2, gridSize * 0.6 / 2, 0, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            ctx.beginPath();
            if (isHead) {
ctx.arc(segment.x + gridSize / 4, segment.y + gridSize / 4, 3, 0, Math.PI * 2); 
ctx.arc(segment.x + 3 * gridSize / 4, segment.y + gridSize / 4, 3, 0, Math.PI * 2); 
ctx.fillStyle  =  "white";
ctx.fill();
            }
        });
    }

    function drawFood() {
        ctx.fillStyle = food.mega ? "gold" : "red";
        ctx.beginPath();
        ctx.arc(food.x + gridSize / 2, food.y + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    function updateGame() {
        const head = { ...snake[0] };

        switch (direction) {
            case "LEFT":
                head.x -= gridSize;
                head.angle = Math.PI;
                break;
            case "RIGHT":
                head.x += gridSize;
                head.angle = 0;
                break;
            case "UP":
                head.y -= gridSize;
                head.angle = -Math.PI / 2;
                break;
            case "DOWN":
                head.y += gridSize;
                head.angle = Math.PI / 2;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            if (food.mega) {
                score += 5;
            } else {
                score += 1;
            }
            food = generateFood();

            if (score % speedIncrement === 0) {
                speed -= 10;
                clearInterval(gameInterval);
                gameInterval = setInterval(updateGame, speed);
            }
        } else {
            snake.pop();
        }

        if (
            head.x < 0 ||
            head.x >= canvasSize ||
            head.y < 0 ||
            head.y >= canvasSize ||
            snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
        ) {
            clearInterval(gameInterval);
            alert("Game Over! Score: " + score);
            startGame();
        }

        ctx.clearRect(0, 0, canvasSize, canvasSize);
        drawSnake();
        drawFood();
        document.getElementById("score").textContent = "Score: " + score;
    }

    function generateFood() {
        const mega = Math.random() < 0.1;
        const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
        const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;

        return { x, y, mega };
    }

    function generateMegaFoodInterval() {
        foodInterval = setInterval(() => {
            food = generateFood();
        }, Math.random() * 5000 + 3000);
    }

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowLeft":
                if (direction !== "RIGHT") direction = "LEFT";
                break;
            case "ArrowRight":
                if (direction !== "LEFT") direction = "RIGHT";
                break;
            case "ArrowUp":
                if (direction !== "DOWN") direction = "UP";
                break;
            case "ArrowDown":
                if (direction !== "UP") direction = "DOWN";
                break;
        }
    });

    startGame();

    $('#closeOverlay').click(function() {
        $('#overlay').fadeOut(300);
        $('#gameContainer').empty();
        clearInterval(gameInterval);
        clearInterval(foodInterval);
        snake = [{ x: 160, y: 160, angle: 0 }];
        score = 0;
        food = generateFood();
    });
});
