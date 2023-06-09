const router = require('express').Router();
const {
  models: { User, Comment, NnList },
} = require('../db');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { nnlistId: req.params.id },
      include: [User],
      order: [['updatedAt', 'DESC']],
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.post('/:listid/:userid', async (req, res, next) => {
  try {
    const newEntry = await Comment.create({
      ...req.body,
      userId: req.params.userid,
      nnlistId: req.params.listid,
    });
    const newComment = await Comment.findByPk(newEntry.id, { include: [User] });
    res.json(newComment);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const target = await Comment.findByPk(req.params.id);
    await target.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
