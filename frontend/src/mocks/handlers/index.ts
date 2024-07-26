import { http, HttpResponse } from 'msw';

import { db } from '../db';

export const handlers = [
  http.get('http://localhost:3000/api/posts/', () => {
    return HttpResponse.json(db.post.getAll());
  }),
  http.put('http://localhost:3000/api/posts/:postId', async ({ request, params }) => {
    const updatedPost = await request.json();
    const { postId } = params;

    if (updatedPost) {
      console.log('Updating post "%s" with:', postId, updatedPost);
      db.post.update({
        where: {
          id: {
            equals: postId,
          },
        },
        data: {
          data: {
            body: updatedPost.data.body,
            edited: Date.now(),
          },
        },
      });
      return HttpResponse.json(updatedPost, { status: 201 });
    }
  }),
  http.post('http://localhost:3000/api/posts/', async ({ request }) => {
    const newPost = await request.json();
    db.post.create({
      data: {
        body: newPost.data.body,
        author: newPost.data.author,
        created: Date.now(),
        edited: Date.now(),
        postId: newPost.data.postId,
      },
      id: newPost.id,
    });
    return HttpResponse.json(newPost, { status: 201 });
  }),
  http.delete('http://localhost:3000/api/posts/:postId', async ({ params }) => {
    const { postId } = params;
    if (!isNaN(Number(postId))) {
      db.post.delete({
        where: {
          id: {
            equals: Number(postId),
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
