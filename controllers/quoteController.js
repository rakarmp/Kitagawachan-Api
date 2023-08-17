const Quote = require("../models/quote");

exports.home = (req, res) => {
  res.send("Welcome to Quote API");
};

// Mendapatkan quote acak
exports.getRandomQuote = async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);

    const quote = await Quote.findOne().skip(random);

    if (!quote) {
      return res.status(404).json({ message: "Quote tidak ditemukan" });
    }

    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new quote
exports.createQuote = (req, res) => {
  const { anime, character, quote } = req.body;

  const newQuote = new Quote({
    anime,
    character,
    quote,
  });

  newQuote
    .save()
    .then((quote) => res.status(201).json(quote))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Mendapatkan quote acak berdasarkan judul anime
exports.getRandomQuoteByAnimeTitle = async (req, res) => {
  try {
    const { animeTitle } = req.params;

    const count = await Quote.countDocuments({ anime: animeTitle });
    const random = Math.floor(Math.random() * count);

    const quote = await Quote.findOne({ anime: animeTitle }).skip(random);

    if (!quote) {
      return res.status(404).json({ message: "Quote tidak ditemukan" });
    }

    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan quote acak berdasarkan karakter anime
exports.getRandomQuoteByAnimeCharacter = async (req, res) => {
  try {
    const { animeCharacter } = req.params;

    const count = await Quote.countDocuments({ character: animeCharacter });
    const random = Math.floor(Math.random() * count);

    const quote = await Quote.findOne({ character: animeCharacter }).skip(
      random
    );

    if (!quote) {
      return res.status(404).json({ message: "Quote tidak ditemukan" });
    }

    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan 5 quote acak
exports.getFiveRandomQuotes = async (req, res) => {
  try {
    const quotes = await Quote.aggregate([{ $sample: { size: 5 } }]);

    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan 5 quote acak berdasarkan judul anime
exports.getFiveRandomQuotesByAnimeTitle = async (req, res) => {
  try {
    const { animeTitle } = req.params;

    const quotes = await Quote.aggregate([
      { $match: { anime: animeTitle } },
      { $sample: { size: 5 } },
    ]);

    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan 5 quote berdasarkan karakter anime
exports.getFiveQuotesByAnimeCharacter = async (req, res) => {
  try {
    const { animeCharacter } = req.params;

    const quotes = await Quote.find({ character: animeCharacter }).limit(5);

    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan quote dengan pagination
exports.getQuotesWithPagination = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const result = await Quote.paginate({}, options);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
