const {
  db,
  models: { User, Comment, NnList },
} = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const seed = require('../script/seed');

const init = async () => {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log('db synced!');

    // Creating Users
    const [santa, ariel] = await Promise.all([
      User.create({
        username: 'santa',
        password: 'jingle',
        isAdmin: true,
        nicePoint: 10000,
      }),
      User.create({ username: 'ariel', password: '123', nicePoint: 5 }),
    ]);

    const [Nice, Naughty] = await Promise.all([
      NnList.create({
        nnTitle: 'cleaned room',
        description: 'well clean her room',
        isNice: true,
        userId: ariel.id,
        imageUrl: '../../cleaned.jpeg',
      }),
      NnList.create({
        nnTitle: 'cleaned room',
        description: 'well clean her room',
        isNice: true,
        userId: ariel.id,
        imageUrl: '../../cleaned.jpeg',
      }),
      NnList.create({
        nnTitle: 'messy room',
        description: 'made her room so messy',
        isNaughty: true,
        userId: ariel.id,
        imageUrl: '../../messy.jpeg',
      }),
      NnList.create({
        nnTitle: 'cleaned room',
        description: 'well clean her room',
        isNice: true,
        userId: ariel.id,
        imageUrl: '../../cleaned.jpeg',
      }),
      NnList.create({
        nnTitle: 'messy room',
        description: 'made her room so messy',
        isNaughty: true,
        userId: ariel.id,
        imageUrl: '../../messy.jpeg',
      }),

      NnList.create({
        nnTitle: 'messy room',
        description: 'made her room so messy',
        isNaughty: true,
        userId: ariel.id,
        imageUrl: '../../messy.jpeg',
      }),
      NnList.create({
        nnTitle: 'cleaned room',
        description: 'well clean her room',
        isNice: true,
        userId: ariel.id,
        imageUrl: '../../cleaned.jpeg',
      }),
      NnList.create({
        nnTitle: 'cleaned room',
        description: 'well clean her room',
        isNice: true,
        userId: ariel.id,
        imageUrl: '../../cleaned.jpeg',
      }),
      NnList.create({
        nnTitle: 'cleaned room',
        description: 'well clean her room',
        isNice: true,
        userId: ariel.id,
        imageUrl: '../../cleaned.jpeg',
      }),
      NnList.create({
        nnTitle: 'cleaned room',
        description: 'well clean her room',
        isNice: true,
        userId: ariel.id,
        imageUrl: '../../cleaned.jpeg',
      }),
    ]);
    await Promise.all([
      Comment.create({
        comment: 'love what she did!',
        userId: ariel.id,
        nnlistId: Nice.id,
      }),
      Comment.create({
        comment: 'she deserves this Christmas',
        userId: santa.id,
        nnlistId: Nice.id,
      }),
    ]);
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    // start listening (and create a 'server' object representing our server)
    console.log(ex);
  }
};

init();
