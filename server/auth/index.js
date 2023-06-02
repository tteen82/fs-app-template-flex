const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const bcrypt = require('bcrypt');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    await User.update(req.body, { where: { id: req.params.id } });
    res.send(await User.findByPk(req.params.id));
  } catch (error) {
    console.log('Could not update the user ', error);
    next(error);
  }
});
