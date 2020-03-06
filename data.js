// var apiKeys = ['foo', 'bar', 'baz'];

// var repos = [
//   { name: 'express', url: 'https://github.com/expressjs/express' },
//   { name: 'stylus', url: 'https://github.com/learnboost/stylus' },
//   { name: 'cluster', url: 'https://github.com/learnboost/cluster' }
// ];

// var users = [{ name: 'tobi' }, { name: 'loki' }, { name: 'jane' }];

// module.exports = { apiKeys, repos, users };



const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// this will be our data base's data structure
const DataSchema = new Schema(
  {
    id: String,
    message: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);