import React from 'react';

import PostsList from '@/src/components/Organisms/PostsList/PostsList';
import { store, setUser } from '@/src/store';
import { IPost } from '@/src/store';
import { render, screen, fireEvent, waitFor } from '@/src/test-utils';
import '@testing-library/jest-dom';

const mockPosts: IPost[] = [
  {
    id: 1,
    data: {
      author: 'test@example.com',
      body: 'Test post content 1',
      created: Date.now(),
      edited: Date.now(),
    },
  },
  {
    id: 2,
    data: {
      author: 'another@example.com',
      body: 'Test post content 2',
      created: Date.now(),
      edited: Date.now(),
    },
  },
];

describe('PostsList', () => {
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

  beforeEach(() => {
    store.dispatch(setUser('test@example.com'));
  });

  it('renders posts when there are posts', () => {
    render(<PostsList posts={mockPosts} handleEdit={vi.fn()} />);

    expect(screen.getByText('Test post content 1')).toBeInTheDocument();
    expect(screen.getByText('Test post content 2')).toBeInTheDocument();
  });

  it('renders no posts message when there are no posts', () => {
    render(<PostsList posts={[]} handleEdit={vi.fn()} />);

    expect(screen.getByText('noPosts')).toBeInTheDocument();
  });

  it('calls handleEdit when the edit button is clicked', () => {
    const handleEdit = vi.fn();

    render(<PostsList posts={mockPosts} handleEdit={handleEdit} />);

    const editButtons = screen.getAllByTestId('EditIcon');

    expect(editButtons[0]).not.toBeDisabled();

    fireEvent.click(editButtons[0]);

    expect(handleEdit).toHaveBeenCalledWith(mockPosts[0]);
  });

  it('calls removePost mutation when confirm delete', async () => {
    render(<PostsList posts={mockPosts} handleEdit={vi.fn()} />);

    const deleteButton = screen.getAllByTestId('DeleteForeverIcon')[0];
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /delete.confirm.button.confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText(/delete.alert/i)).toBeInTheDocument();
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<PostsList posts={mockPosts} handleEdit={vi.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
