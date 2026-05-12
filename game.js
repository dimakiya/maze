// Получаем канвас и контекст для рисования
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Настройки игры
const tileSize = 40; // Размер клетки (увеличен для лучшей видимости)
const cols = Math.floor(canvas.width / tileSize); // Колонки лабиринта
const rows = Math.floor(canvas.height / tileSize); // Строки лабиринта

// Генерируем лабиринт, который точно помещается в канвас
const maze = Array(rows).fill().map(() => Array(cols).fill(1));

// Создаём проходы в лабиринте (упрощённый вариант)
for (let y = 1; y < rows - 1; y += 2) {
    for (let x = 1; x < cols - 1; x += 2) {
        maze[y][x] = 0; // проход
        if (y > 1) maze[y - 1][x] = 0; // соединяем с предыдущей строкой
        if (x > 1) maze[y][x - 1] = 0; // соединяем с предыдущим столбцом
    }
}

// Позиция игрока (зелёный квадрат) — стартовая точка в левом верхнем углу (после стены)
let playerX = 1;
let playerY = 1;

// Скорость движения
const speed = 1;

// Функция отрисовки лабиринта
function drawMaze() {
    ctx.fillStyle = 'black';
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) { // Если стена
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Функция отрисовки игрока
function drawPlayer() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX * tileSize, playerY * tileSize, tileSize - 2, tileSize - 2); // -2 для отступа
}

// Проверка на столкновение со стеной или выход за границы
function checkCollision(x, y) {
    // Проверяем границы карты
    if (x < 0 || x >= cols || y < 0 || y >= rows) return true;
    return maze[y][x] === 1; // Если стена — столкновение
}

// Обработка клавиш
document.addEventListener('keydown', function(e) {
    let newX = playerX;
    let newY = playerY;

    switch (e.key) {
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

    // Проверяем, не сталкивается ли игрок со стеной или границей
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
