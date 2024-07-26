import { v4 as uuidv4 } from 'uuid';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IPost {
  data: {
    body: string;
    author: string;
    created: number;
    edited: number;
    postId: string;
  };
  id: number;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/posts',
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost>({
      query: () => ({
        url: '/',
      }),
      providesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PUT',
        body: {
          data: {
            body: body.data.body,
            author: body.data.author,
            created: body.data.created,
            edited: Date.now(),
            postId: body.data.postId,
          },
          id: body.id,
        },
      }),
      invalidatesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: `/`,
        method: 'POST',
        body: {
          data: {
            body: body.data.body,
            author: body.data.author,
            created: Date.now(),
            edited: Date.now(),
            postId: uuidv4(),
          },
          id: body.id,
        },
      }),
      invalidatesTags: ['Posts'],
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation, useRemovePostMutation } = postsApi;
