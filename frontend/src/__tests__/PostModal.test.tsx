import React from 'react';

import PostModal from '@/src/components/Molecules/PostModal/PostModal';
import { db } from '@/src/mocks/db';
import { setUser, store } from '@/src/store';
import { screen, fireEvent, waitFor, render } from '@/src/test-utils';
import '@testing-library/jest-dom';

const postsCount = db.post.count();

describe('PostModal', () => {
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

  const close = vi.fn();
  const response = vi.fn();

  it('renders correctly when open', () => {
    render(<PostModal open={true} close={close} response={response} initialPost={null} postsCount={postsCount} />);

    expect(screen.getByText('create.header')).toBeInTheDocument();
    expect(screen.getByText('create.inputLabel')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create.button.cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create.button.send/i })).toBeInTheDocument();
  });

  it('handles form submission with valid post content', async () => {
    store.dispatch(setUser('test@example.com'));

    render(<PostModal open={true} close={close} response={response} initialPost={null} postsCount={postsCount} />);

    const postInput = screen.getByRole('textbox', { name: /create\.inputLabel/i });

    fireEvent.change(postInput, { target: { value: 'Test post content' } });

    const sendButton = screen.getByRole('button', { name: /create.button.send/i });

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(close).toHaveBeenCalled();
    });
  });

  it('shows login dialog when user is not logged in and form is submitted', async () => {
    store.dispatch(setUser(null));
    render(<PostModal open={true} close={close} response={response} />);

    const postInput = screen.getByRole('textbox', { name: /create\.inputLabel/i });

    fireEvent.change(postInput, { target: { value: 'Test post content' } });

    const sendButton = screen.getByRole('button', { name: /create.button.send/i });

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('login.dialog.title')).toBeInTheDocument();
    });
  });

  it('handles closing login dialog and reopening post modal', async () => {
    render(<PostModal open={true} close={close} response={response} />);

    const postInput = screen.getByRole('textbox', { name: /create\.inputLabel/i });

    fireEvent.change(postInput, { target: { value: 'Test post content' } });

    const sendButton = screen.getByRole('button', { name: /create.button.send/i });

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('login.dialog.title')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /login.dialog.button.cancel/i }));
    await waitFor(() => {
      expect(screen.queryByText('login.dialog.title')).not.toBeInTheDocument();
    });

    expect(screen.getByText('create.header')).toBeInTheDocument();
  });

  it('renders and handles alert dialog', async () => {
    store.dispatch(setUser('test@example.com'));
    render(
      <PostModal
        open={true}
        close={close}
        response={response}
        initialPost={{
          data: {
            author: 'Edgardo71@hotmail.com',
            body: 'Textor tabella carcer somnus delego vestrum dapifer tui. Suspendo animus patria est solitudo decumbo. Somnus solitudo inflammatio denuncio acsi decerno addo tergo.\nAbduco suffragium amitto vitiosus incidunt utor demulceo delibero. Quidem vigilo defluo teres. Consequuntur cotidie temptatio amet.\nSophismata libero aureus patria demo ater volaticus turba. Verto argentum asperiores. Tego vilis volutabrum ver votum.\nTertius vomica curtus tandem. Harum careo vicinus. Utrum vacuus crinis.',
            created: 1704510700018,
            edited: 1721943708413,
            postId: '8a6502a7-2485-48fb-974a-658f5a53213f',
          },
          id: 1,
        }}
      />,
    );

    const postInput = screen.getByRole('textbox', { name: /create\.inputLabel/i });

    fireEvent.change(postInput, { target: { value: 'Test post content' } });

    const sendButton = screen.getByRole('button', { name: /create.button.send/i });

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('create.authorEdit')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /create.button.close/i }));
    await waitFor(() => {
      expect(screen.queryByText('create.authorEdit')).not.toBeInTheDocument();
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<PostModal open={true} close={close} response={response} initialPost={null} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
