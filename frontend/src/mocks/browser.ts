import { setupWorker } from 'msw/browser';

import { faker } from '@faker-js/faker';

import { db } from './db.ts';
import { handlers } from './handlers';

declare global {
  interface Window {
    mocks: unknown;
  }
}

export const worker = setupWorker(...handlers);

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
        body: faker.lorem.paragraphs({ min: 1, max: 6 }),
        created: faker.date.past().getTime(),
        edited: faker.date.recent().getTime(),
        postId: faker.number.int(),
      },
      id: counter,
    });
    counter += 1;
  }
};

createPosts();

window.mocks = {
  createPosts,
  getPosts: () => db.post.getAll(),
};
