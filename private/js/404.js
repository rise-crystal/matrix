const countDate = new Date("Dec 31, 2024 00:00:00").getTime(); // Ganti dengan tanggal yang sesuai

function countDown() {
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.getElementById("day").innerText = d;
    document.getElementById("hour").innerText = h;
    document.getElementById("minute").innerText = m;
    document.getElementById("second").innerText = s;

    // Jika countdown selesai
    if (gap < 0) {
        clearInterval(interval);
        document.querySelector('.content').innerHTML = "<h3>Countdown Finished</h3>";
    }
}

// Memanggil fungsi countdown setiap detik
let interval = setInterval(countDown, 1000);

const notify = document.getElementById('Notify');

notify.addEventListener('click', () => {
    const phoneNumber = "+6285179841140";
    const language = navigator.language || navigator.userLanguage;
    const isIndonesian = language === 'id' || language.startsWith('id-');
    const message = isIndonesian ? "Hai, saya ingin menghubungi Anda." : "Hi, I would like to contact you.";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(url);
    alert('Message Sent Successfully');
});
// Nonaktifkan klik kanan
document.addEventListener('contextmenu', (event) => event.preventDefault());

// Nonaktifkan F12 (Developer Tools) dan Ctrl+Shift+I (Inspect)
document.addEventListener('keydown', (event) => {
  if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
    event.preventDefault();
  }
});

Object.defineProperty(window, 'fetch', {
    configurable: false,
    enumerable: false,
    value: () => {
        throw new Error('fetch is disabled');
    },
    writable: false,
});
Object.defineProperty(window, 'XMLHttpRequest', {
    configurable: false,
    enumerable: false,
    value: () => {
        throw new Error('XMLHttpRequest is disabled');
    },
    writable: false,
});
Object.defineProperty(window, 'axios', {
    configurable: false,
    enumerable: false,
    value: () => {
        throw new Error('axios is disabled');
    },
    writable: false,
});

// Nonaktifkan inspect elemen
document.addEventListener('contextmenu', event => event.preventDefault());
// Nonaktifkan shortcut
document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey) {
        if (event.key === 'i' || event.key === 'I' || event.key === 'c' || event.key === 'C' || event.key === 'Meta' || event.key === 'Command') {
            event.preventDefault();
        }
    }
});

// Nonaktifkan mengubah apapun dengan cara apapun
window.addEventListener('beforeunload', event => {
    event.preventDefault();
    event.returnValue = '';
});

Object.freeze(window);
Object.freeze(document);

