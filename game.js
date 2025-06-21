const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 100, y: 100, size: 20, speed: 2 };
let monster = { x: 300, y: 300, size: 30, speed: 1 };
let gun = { x: 600, y: 200, size: 15, found: false };
let hasGun = false;
let gameOver = false;
let keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function movePlayer() {
  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;
}

function moveMonster() {
  let dx = player.x - monster.x;
  let dy = player.y - monster.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  monster.x += (dx / dist) * monster.speed;
  monster.y += (dy / dist) * monster.speed;
}

function drawPlayer() {
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawMonster() {
  ctx.fillStyle = 'red';
  ctx.fillRect(monster.x, monster.y, monster.size, monster.size);
}

function drawGun() {
  if (!gun.found) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(gun.x, gun.y, gun.size, gun.size);
  }
}

function checkCollision(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

function updateGame() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePlayer();
  moveMonster();
  drawPlayer();
  drawMonster();
  drawGun();

  if (checkCollision(player, gun)) {
    gun.found = true;
    hasGun = true;
    alert("You found the gun!");
  }

  if (checkCollision(player, monster)) {
    if (hasGun) {
      alert("You shot the monster and survived!");
    } else {
      alert("You were caught by the monster!");
    }
    gameOver = true;
  }

  requestAnimationFrame(updateGame);
}

setInterval(() => {
  monster.speed += 0.2;
}, 5000);

updateGame();
