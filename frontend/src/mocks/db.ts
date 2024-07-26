import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';

faker.seed(123);

export const db = factory({
  post: {
    data: {
      body: () => faker.lorem.paragraphs({ min: 1, max: 6 }),
      author: () => faker.internet.email(),
      created: () => faker.date.past().getTime(),
      edited: () => faker.date.recent().getTime(),
      postId: () => faker.string.uuid(),
    },
    id: primaryKey(() => faker.number.int()),
  },
});

let counter = 1;

const users = [];

const createUsers = () => {
  for (let i = 0; i < faker.number.int({ min: 2, max: 10 }); i += 1) {
    users.push(faker.internet.email());
  }
};

createUsers();

const createPosts = () => {
  for (let i = 0; i < faker.number.int({ min: 15, max: 100 }); i += 1) {
    db.post.create({
      data: {
        author: users[faker.number.int({ min: 0, max: users.length - 1 })],
      },
      id: counter,
    });
    counter += 1;
  }
};

createPosts();
