const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const quoteSchema = new mongoose.Schema({
  anime: String,
  character: String,
  quote: String,
});

quoteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Quote", quoteSchema);
