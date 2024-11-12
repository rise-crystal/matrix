const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const port = 4545;

// Middleware to prevent scraping using axios, fetch, etc.
Object.defineProperty(global, 'fetch', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: () => {
        throw new Error('fetch is disabled');
    }
});
Object.defineProperty(global, 'axios', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: () => {
        throw new Error('axios is disabled');
    }
});

// Atur middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(path.resolve(), "public"), {
    setHeaders: (res, path) => {
        res.set('X-Frame-Options', 'DENY');
        res.set('X-XSS-Protection', '1; mode=block');
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self';");
    }
}));
app.use("/private", express.static(path.join(path.resolve(), "private"), {
    setHeaders: (res, path) => {
        res.set('X-Frame-Options', 'DENY');
        res.set('X-XSS-Protection', '1; mode=block');
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self';");
    }
}));

// Rute untuk halaman utama
app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public", "404.html"));
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


