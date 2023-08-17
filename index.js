const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Express installation
const app = express();
// app.use(cors());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://rakarmp12:rakarmp12@cluster0.htim4l5.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error to connect MongoDB", err));

// Middleware untuk parsing body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import controller
const quoteController = require("./controllers/quoteController");

// Home route
app.get("/", quoteController.home);

// Mendapatkan quote acak
app.get("/quotes/random", quoteController.getRandomQuote);

// Mendapatkan quote acak berdasarkan judul anime
app.get(
  "/quotes/random/:animeTitle",
  quoteController.getRandomQuoteByAnimeTitle
);

// Mendapatkan quote acak berdasarkan karakter anime
app.get(
  "/quotes/random/character/:animeCharacter",
  quoteController.getRandomQuoteByAnimeCharacter
);

// Mendapatkan 5 quote acak
app.get("/quotes/random/5", quoteController.getFiveRandomQuotes);

// Mendapatkan 5 quote acak berdasarkan judul anime
app.get(
  "/quotes/random/5/:animeTitle",
  quoteController.getFiveRandomQuotesByAnimeTitle
);

// Mendapatkan 5 quote berdasarkan karakter anime
app.get(
  "/quotes/character/:animeCharacter",
  quoteController.getFiveQuotesByAnimeCharacter
);

// Mendapatkan quote dengan pagination
app.get("/quotes", quoteController.getQuotesWithPagination);

app.post("/quotes", quoteController.createQuote);

// Menjalankan server pada port 3000
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
