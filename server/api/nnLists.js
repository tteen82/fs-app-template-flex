const router = require('express').Router();
const {
  models: { User, Comment, NnList },
} = require('../db');
module.exports = router;
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.get('/', async (req, res, next) => {
  try {
    const nnLists = await NnList.findAll({
      include: [{ model: Comment }, { model: User }],
      order: [['updatedAt', 'DESC']],
    });
    res.json(nnLists);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', upload.single('myImage'), async (req, res, next) => {
  try {
    let imageName = '';
    if (req.file) {
      imageName = req.file.filename;
    } else {
      imageName = 'no-image-icon.png';
    }
    // const imageName = req.file.filename || 'no-image-icon.png';
    const newEntry = await NnList.create({
      ...req.body,
      userId: req.params.id,
      imageUrl: '../../' + imageName,
    });
    const user = await User.findByPk(req.params.id);
    if (req.body.isNaughty === 'true') {
      user.naughtyPoint += 1;
      user.save();
    } else if (req.body.isNice === 'true') {
      user.nicePoint += 1;
      user.save();
    }
    res.json(newEntry);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const nnLists = await NnList.findAll({
      where: { userId: req.params.id },
      include: [{ model: Comment }, { model: User }],
      order: [['updatedAt', 'DESC']],
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
