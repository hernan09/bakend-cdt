const mongoose = require('mongoose');

const Schemaa = mongoose.Schema;

const News = new Schemaa({
  title: { type: String },
  img: { type: String },
  autor: { type: String },
  date: { type: Date },
  body: { type: String },
  source: { type: String }
});

module.exports = mongoose.model('news', News);
