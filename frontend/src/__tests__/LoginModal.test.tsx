import { Provider } from 'react-redux';

import LoginModal from '@/src/components/Molecules/LoginModal/LoginModal';
import { store } from '@/src/store/index';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('LoginModal Component', () => {
  const handleClose = vi.fn();
  const handleSnackbar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <Provider store={store}>
        <LoginModal isOpen={true} handleClose={handleClose} handleSnackbar={handleSnackbar} />
      </Provider>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('login.header')).toBeInTheDocument();
    expect(screen.getByText('login.email')).toBeInTheDocument();
    expect(screen.getByText('login.button')).toBeInTheDocument();
  });

  it('calls handleClose and handleSnackbar on successful login and updates the store', async () => {
    render(
      <Provider store={store}>
        <LoginModal isOpen={true} handleClose={handleClose} handleSnackbar={handleSnackbar} />
      </Provider>,
    );

    const emailInput = screen.getByRole('textbox', { name: /login\.email/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(screen.getByText('login.button'));

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledWith(true);
      expect(handleSnackbar).toHaveBeenCalledWith(true);
      expect(sessionStorage.getItem('user')).toBe('test@example.com');
    });

    const state = store.getState();
    expect(state.user).toBe('test@example.com');
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <LoginModal isOpen={true} handleClose={handleClose} handleSnackbar={handleSnackbar} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
