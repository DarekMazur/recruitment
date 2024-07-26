import React from 'react';

import BaseView from '@/src/components/Templates/BaseView/BaseView';
import { IPost, setUser, store } from '@/src/store';
import { render, screen, fireEvent } from '@/src/test-utils';
import '@testing-library/jest-dom';

const mockPosts: IPost[] = [
  {
    id: 1,
    data: {
      author: 'test@example.com',
      body: 'Test post content 1',
      created: 1722025907990,
      edited: 1722025907990,
    },
  },
  {
    id: 2,
    data: {
      author: 'test2@example.com',
      body: 'Test post content 2',
      created: 1722025907990,
      edited: 1722025907990,
    },
  },
];

beforeEach(() => {
  store.dispatch(setUser('test@example.com'));
});

describe('BaseView', () => {
  vi.mock('react-i18next', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useTranslation: () => ({
        t: (key: string) => key,
      }),
      I18nextProvider: ({ children }) => <div>{children}</div>,
    };
  });

  it('renders posts when there are posts', () => {
    render(<BaseView posts={mockPosts} />);

    const postItems = screen.getAllByTestId(/EditIcon/);
    expect(postItems).toHaveLength(mockPosts.length);
  });

  it('renders no posts message when there are no posts', () => {
    render(<BaseView posts={[]} />);

    expect(screen.getByText('noPosts')).toBeInTheDocument();
  });

  it('calls handleEdit when the edit button is clicked', () => {
    render(<BaseView posts={mockPosts} />);

    const editButtons = screen.getAllByTestId(/EditIcon/);
    fireEvent.click(editButtons[0]);

    expect(screen.getByText('create.header')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<BaseView posts={mockPosts} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
