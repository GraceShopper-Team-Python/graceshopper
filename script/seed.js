'use strict';

const {
  db,
  models: { User, Order, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'robert', password: '123', isAdmin: true }),
  ]);

  //Creating Orders
  const orders = await Promise.all([
    Order.create(),
    Order.create(),
    Order.create(),
  ]);

  //Creating Snakes
  const products = await Promise.all([
    Product.create({
      name: 'python',
      description: 'a slithery boi',
      price: 2000,
      quantity: 5,
    }),
    Product.create({
      name: 'monty',
      description: '-the python, get it?',
      price: 1599,
      quantity: 1969
    }),
    Product.create({
      name: 'king cobra',
      description: 'the king of all cobras',
      price: 9999,
      quantity: 1
    }),
    Product.create({
      name: 'grass snake',
      description: 'no venom, just vibes',
      price: 420,
      quantity: 7000
    }),
  ]);

  await users[0].addOrder(orders[0]);
  await users[1].addOrder(orders[1]);
  await users[2].addOrder(orders[2]);
  await orders[0].addProduct(products[0]);
  await orders[0].addProduct(products[1]);
  await orders[0].addProduct(products[3]);
  await orders[1].addProduct(products[1]);
  await orders[1].addProduct(products[2]);
  await orders[2].addProduct(products[3]);

  // console.log(orders[0].__proto__);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
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
