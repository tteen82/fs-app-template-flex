const Sequelize = require('sequelize');
const db = require('../db');

const NnList = db.define('nnlist', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  nnTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '../../no-image-icon.png',
    allowNull: true,
  },
  isNice: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  isNaughty: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = NnList;
