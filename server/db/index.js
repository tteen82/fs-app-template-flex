//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Comment = require('./models/Comment');
const NnList = require('./models/NnList');

//associations could go here!

NnList.belongsTo(User);
User.hasMany(NnList);
Comment.belongsTo(NnList);
NnList.hasMany(Comment);
Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = {
  db,
  models: {
    User,
    Comment,
    NnList,
  },
};
