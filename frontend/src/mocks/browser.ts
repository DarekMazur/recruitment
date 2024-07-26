import { setupWorker } from 'msw/browser';

import { db } from './db.ts';
import { handlers } from './handlers';

declare global {
  interface Window {
    mocks: unknown;
  }
}

export const worker = setupWorker(...handlers);

window.mocks = {
  getPosts: () => db.post.getAll(),
};
