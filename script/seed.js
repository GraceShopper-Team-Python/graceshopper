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
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'robert', password: '123', isAdmin: true }),
    User.create({ username: 'nathan', password: '123', isAdmin: true }),
    User.create({ username: 'denise', password: '123', isAdmin: true }),
    User.create({ username: 'mohammad', password: '123', isAdmin: true }),
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
      quantity: 1969,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsDSv23hpIz4WnIX8QwSwYHnZe-yz71XJQ1A&usqp=CAU',
    }),
    Product.create({
      name: 'king cobra',
      description: 'the king of all cobras',
      price: 9999,
      quantity: 1,
      imageUrl:
        'https://www.worldatlas.com/upload/2a/7a/b5/shutterstock-616080827.jpg',
    }),
    Product.create({
      name: 'grass snake',
      description: 'no venom, just vibes',
      price: 420,
      quantity: 7000,
      imageUrl: 'https://i.ytimg.com/vi/PdXbkMZ30UU/maxresdefault.jpg',
    }),
    Product.create({
      name: 'plane snakes',
      description: 'they have a flight to catch',
      price: 99,
      quantity: 999999,
      imageUrl: 'https://live.staticflickr.com/49/110659441_94f8cd4a93_b.jpg',
    }),
    Product.create({
      name: 'viper',
      description: 'fun fact: a vipers injection of venom is a choice',
      price: 1799,
      quantity: 999999,
      imageUrl:
        'https://66.media.tumblr.com/0b684890081021031d69d28abcae2aa1/tumblr_inline_pl8a55KDcl1ql75n8_1280.jpg',
    }),
    Product.create({
      name: 'boa',
      description: 'he works part time as a constrictor',
      price: 950,
      quantity: 5000,
      imageUrl:
        'https://www.newsobserver.com/latest-news/fkst65/picture213832404/alternates/FREE_1140/36064447_1749172631841698_4255675973103517696_n.jpg',
    }),
    Product.create({
      name: 'black mamba',
      description: 'just 2 drops of its venom can kill an adult',
      price: 2400,
      quantity: 2400000,
      imageUrl:
        'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2017/06/e539a9a1a906c2ceba4dc2bfee5d4b20-1498739501.jpg',
    }),
    Product.create({
      name: 'rattlesnake',
      description: 'rattle sold seperately',
      price: 1100,
      quantity: 110000,
      imageUrl:
        'https://i.natgeofe.com/k/7f52bf68-4538-4195-894c-342bd89b187d/rattlesnake-tongue.jpg',
    }),
    Product.create({
      name: 'jörmungandr',
      description: 'a norse serpant that will herald the end of the world',
      price: 10000000,
      quantity: 1,
      imageUrl:
        'https://comicvine1.cbsistatic.com/uploads/original/11135/111356858/7031245-8712b2241c69c0dc89df139b654aaef4.jpg',
    }),
    Product.create({
      name: 'solid-snake',
      description: 'metal gear solid is too complicated to joke about',
      price: 1998,
      quantity: 99,
      imageUrl: 'https://i.ebayimg.com/images/g/SMIAAOSw0c9fKMoc/s-l400.jpg',
    }),
    Product.create({
      name: 'sekiro-snake',
      description: 'you know the one',
      price: 400,
      quantity: 2,
      imageUrl:
        'https://i.pinimg.com/originals/80/d5/f3/80d5f36d1233a49019fb8437a77a20e3.jpg',
    }),
    Product.create({
      name: 'blue racer',
      description: 'a really cool looking snake!',
      price: 7777,
      quantity: 9999999,
      imageUrl:
        'https://images.fineartamerica.com/images-medium-large/blue-racer-snake-jeramie-curtice.jpg',
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
