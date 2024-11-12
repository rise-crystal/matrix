import express from "express";
import path from "path";
import helmet from "helmet";

const app = express();
const port = 8080;

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https://i.postimg.cc"], // Allow images from postimg.cc
            styleSrc: ["'self'", "https://fonts.googleapis.com"], // Izinkan style dari Google Fonts
            fontSrc: ["'self'", "https://fonts.gstatic.com"], // Izinkan font dari Google Fonts CDN
            
            // Add other directives as needed
        }
    })
);

console.clear();

// Atur middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(path.resolve(), "public")));
app.use("/private", express.static(path.join(path.resolve(), "private")));

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
