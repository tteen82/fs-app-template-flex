const Sequelize = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Comment;
