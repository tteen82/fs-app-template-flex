const router = require('express').Router();
const {
  models: { User, Comment, NnList },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'nicePoint', 'naughtyPoint'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.get('/:name', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: { username: req.params.name },
      attributes: ['id', 'username', 'nicePoint', 'naughtyPoint'],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});
