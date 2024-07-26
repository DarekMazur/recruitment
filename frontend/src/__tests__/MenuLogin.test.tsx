import { MemoryRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';

import { vi } from 'vitest';

import MenuLogin from '@/src/components/Atoms/MenuLogin/MenuLogin';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('MenuLogin Component', () => {
  it('renders correctly when logged in', () => {
    render(
      <MemoryRouter>
        <MenuLogin isLogin handleToggleModal={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('menuitem')).toBeInTheDocument();

    expect(screen.getByTestId('LoginIcon')).toBeInTheDocument();
    expect(screen.getByText('menu.log.in')).toBeInTheDocument();
  });

  it('renders correctly when logged out', () => {
    render(
      <MemoryRouter>
        <MenuLogin handleLogout={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('menuitem')).toBeInTheDocument();

    expect(screen.getByTestId('LogoutIcon')).toBeInTheDocument();
    expect(screen.getByText('menu.log.out')).toBeInTheDocument();
  });

  it('calls handleToggleModal when logged in and clicked', () => {
    const handleToggleModal = vi.fn();
    render(
      <MemoryRouter>
        <MenuLogin isLogin handleToggleModal={handleToggleModal} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('menuitem'));
    expect(handleToggleModal).toHaveBeenCalledTimes(1);
  });

  it('calls handleLogout when logged out and clicked', () => {
    const handleLogout = vi.fn();
    render(
      <MemoryRouter>
        <MenuLogin handleLogout={handleLogout} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('menuitem'));
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    const tree = create(
      <MemoryRouter>
        <MenuLogin isLogin={true} handleToggleModal={vi.fn()} />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
