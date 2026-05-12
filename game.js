// Получаем канвас и контекст для рисования
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Настройки игры
const tileSize = 20; // Размер клетки (и игрока)
const cols = canvas.width / tileSize; // Колонки лабиринта
const rows = canvas.height / tileSize; // Строки лабиринта

// Карта лабиринта (1 — стена, 0 — проход)
const maze = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];

// Позиция игрока (зелёный квадрат)
let playerX = 1;
let playerY = 1;

// Скорость движения
const speed = 1;

// Функция отрисовки лабиринта
function drawMaze() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) { // Если стена
                ctx.fillStyle = 'black';
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Функция отрисовки игрока
function drawPlayer() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX * tileSize, playerY * tileSize, tileSize, tileSize);
}

// Проверка на столкновение со стеной
function checkCollision(x, y) {
    return maze[y][x] === 1;
}

// Обработка клавиш
document.addEventListener('keydown', function(e) {
    let newX = playerX;
    let newY = playerY;

    switch(e.key) {
        case 'ArrowUp':
            newY -= speed;
            break;
        case 'ArrowDown':
            newY += speed;
            break;
        case 'ArrowLeft':
            newX -= speed;
            break;
        case 'ArrowRight':
            newX += speed;
            break;
    }

    // Проверяем, не сталкивается ли игрок со стеной
    if (!checkCollision(newX, newY)) {
        playerX = newX;
        playerY = newY;
    }
});

// Игровой цикл
function gameLoop() {
    // Очищаем канвас
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовываем лабиринт и игрока
    drawMaze();
    drawPlayer();

    // Запускаем цикл снова
    requestAnimationFrame(gameLoop);
}

// Запускаем игру
gameLoop();
