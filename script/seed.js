'use strict';

const {
  db,
  models: { User, Comment, NnList },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
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
    }),
    NnList.create({
      nnTitle: 'messy room',
      description: 'made her room so messy',
      isNaughty: true,
      userId: ariel.id,
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

  console.log(`seeded users`);
  console.log(`seeded successfully`);
  return {
    // users: {
    //   cody: users[0],
    //   murphy: users[1]
    // }
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
