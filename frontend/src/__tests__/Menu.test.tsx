import React from 'react';

import Menu from '@/src/components/Molecules/Menu/Menu';
import { store } from '@/src/store';
import { setUser } from '@/src/store';
import { renderWithProviders } from '@/src/utils/providers/renderWithProviders';
import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor } from '@testing-library/react';

describe('Menu', () => {
  const handleResponse = vi.fn();
  const toggleMenu = vi.fn();

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

  it('renders correctly when open', () => {
    renderWithProviders(<Menu open={true} toggleMenu={toggleMenu} handleResponse={handleResponse} />);

    expect(screen.getByRole('button', { name: /addPost/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /User/i })).toBeInTheDocument();
  });

  it('opens and closes the login modal correctly', async () => {
    renderWithProviders(<Menu open={true} toggleMenu={toggleMenu} handleResponse={handleResponse} />);

    fireEvent.click(screen.getByRole('menuitem', { name: /menu.log.in/i }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('CloseIcon'));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('displays user email when logged in and shows the correct menu items', () => {
    store.dispatch(setUser('test@example.com'));

    renderWithProviders(<Menu open={true} toggleMenu={toggleMenu} handleResponse={handleResponse} />);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('menu.profile')).toBeInTheDocument();
    expect(screen.queryByText('menu.home')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('menuitem', { name: /menu.log.out/i }));
  });

  it('calls handleLogout and updates store on logout', () => {
    store.dispatch(setUser('test@example.com'));

    renderWithProviders(<Menu open={true} toggleMenu={toggleMenu} handleResponse={handleResponse} />);

    fireEvent.click(screen.getByRole('menuitem', { name: /menu.log.out/i }));

    expect(toggleMenu).toHaveBeenCalledWith(false);

    const state = store.getState();
    expect(state.user).toBeNull();
  });

  it('should match snapshot', () => {
    const { asFragment } = renderWithProviders(
      <Menu open={true} toggleMenu={toggleMenu} handleResponse={handleResponse} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
