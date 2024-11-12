// MATRIX effect in canvas2D
const canvas2D = document.getElementById('canvas2D');
const context = canvas2D.getContext('2d');

function resizeCanvas() {
    canvas2D.width = window.innerWidth;
    canvas2D.height = window.innerHeight;
    drops = Array.from({ length: Math.floor(canvas2D.width / fontSize) }, () => 0);
    console.log('Canvas resized:', canvas2D.width, canvas2D.height);
}

const fontSize = 16;
let drops = [];
resizeCanvas();

function getRandomCharacter() {
    const characters = 'アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロ';
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

function draw() {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas2D.width, canvas2D.height);

    context.fillStyle = 'rgba(0, 255, 0, 0.80)';  // Warna teks hijau dengan transparansi 0.8
    context.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        context.fillText(getRandomCharacter(), x, y);

        if (y > canvas2D.height && Math.random() > 0.975) {
            drops[i] = 0;
        } else {
            drops[i]++;
        }
    }

    console.log('Drawing on canvas2D'); // Debugging log
}

setInterval(draw, 50);
window.addEventListener('resize', resizeCanvas);
