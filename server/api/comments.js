const router = require('express').Router();
const {
  models: { User, Comment, NnList },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({ include: User });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});
