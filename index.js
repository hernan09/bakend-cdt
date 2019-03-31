const express = require('express');
const mongoose = require('mongoose');
const News = require('./schema/news');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Content-Type', 'application/json');

  next();
});

const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/news', { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  console.log('connected to database');
  app.listen(port, (error) => {
    if (err) console.log(error);
    console.log(`http://localhost:${port}`);
  });
});
app.get('/news', (req, res) => {
  const { page, limit } = req.query;
  console.log({ page, limit });
  News.find({}, {}, { skip: limit * (page - 1), limit: parseInt(limit) }, (err, news) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json({
      news
    });
  });
});
