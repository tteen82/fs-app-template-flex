const router = require('express').Router();
const {
  models: { User, Comment, NnList },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const nnLists = await NnList.findAll({ include: [Comment] });
    res.json(nnLists);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const newEntry = await NnList.create({
      ...req.body,
      userId: req.params.id,
    });
    res.json(newEntry);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const nnLists = await NnList.findAll({
      where: { userId: req.params.id },
      include: [Comment],
    });
    res.json(nnLists);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const target = await NnList.findByPk(req.params.id);
    await target.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
