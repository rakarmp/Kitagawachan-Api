const Quote = require("../models/quote");

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
exports.getRandomQuoteByAnimeTitle = (req, res) => {
  const { animeTitle } = req.params;

  Quote.countDocuments({ anime: animeTitle }).exec((err, count) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const random = Math.floor(Math.random() * count);

    Quote.findOne({ anime: animeTitle })
      .skip(random)
      .then((quote) => {
        if (!quote) {
          return res.status(404).json({ message: "Quote tidak ditemukan" });
        }
        res.json(quote);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });
};

// Mendapatkan quote acak berdasarkan karakter anime
exports.getRandomQuoteByAnimeCharacter = (req, res) => {
  const { animeCharacter } = req.params;

  Quote.countDocuments({ character: animeCharacter }).exec((err, count) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const random = Math.floor(Math.random() * count);

    Quote.findOne({ character: animeCharacter })
      .skip(random)
      .then((quote) => {
        if (!quote) {
          return res.status(404).json({ message: "Quote tidak ditemukan" });
        }
        res.json(quote);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });
};

// Mendapatkan 5 quote acak
exports.getFiveRandomQuotes = (req, res) => {
  Quote.aggregate([{ $sample: { size: 5 } }])
    .then((quotes) => res.json(quotes))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Mendapatkan 5 quote acak berdasarkan judul anime
exports.getFiveRandomQuotesByAnimeTitle = (req, res) => {
  const { animeTitle } = req.params;

  Quote.aggregate([{ $match: { anime: animeTitle } }, { $sample: { size: 5 } }])
    .then((quotes) => res.json(quotes))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Mendapatkan 5 quote berdasarkan karakter anime
exports.getFiveQuotesByAnimeCharacter = (req, res) => {
  const { animeCharacter } = req.params;

  Quote.find({ character: animeCharacter })
    .limit(5)
    .then((quotes) => res.json(quotes))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Mendapatkan quote dengan pagination
exports.getQuotesWithPagination = (req, res) => {
  const { page, limit } = req.query;

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
  };

  Quote.paginate({}, options)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
};
