import React from 'react';
import { useLocation } from 'react-router-dom';

import { vi } from 'vitest';

import Header from '@/src/components/Organisms/Header/Header';
import { setUser, store } from '@/src/store';
import { getInitials } from '@/src/utils/helpers/getInitials';
import { renderWithProviders } from '@/src/utils/providers/renderWithProviders';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

const mockToggleMenu = vi.fn();

describe('Header', () => {
  const renderComponent = (pathname = '/') => {
    (useLocation as vi.Mock).mockReturnValue({ pathname });

    return renderWithProviders(<Header toggleMenu={mockToggleMenu} />);
  };

  it('renders logo if not on profile page', () => {
    renderComponent();

    expect(screen.getByLabelText(/logo/i)).toBeInTheDocument();
  });

  it('does not render logo if on profile page', () => {
    store.dispatch(setUser('test@example.com'));
    renderComponent('/profile');

    expect(screen.queryByLabelText(/logo/i)).not.toBeInTheDocument();
  });

  it('renders user avatar if user is logged in', () => {
    store.dispatch(setUser('test@example.com'));
    renderComponent();

    expect(screen.getByAltText('User').getAttribute('src')).toMatch(/userIcon.svg/);
  });

  it('renders unknown icon if user is not logged in', () => {
    store.dispatch(setUser(null));
    renderComponent();

    expect(screen.getByAltText('User').getAttribute('src')).toMatch(/noUserIcon.svg/);
  });

  it('displays user initials on profile page', () => {
    store.dispatch(setUser('test@example.com'));
    const user = 'test@example.com';
    renderComponent('/profile');

    expect(screen.getByText(getInitials(user))).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('calls toggleMenu when avatar button is clicked', () => {
    store.dispatch(setUser(null));
    renderComponent();

    fireEvent.click(screen.getByRole('button'));

    expect(mockToggleMenu).toHaveBeenCalledWith(true);
  });

  it('should match snapshot', () => {
    const snapshot = renderWithProviders(<Header toggleMenu={mockToggleMenu} />);
    expect(snapshot).toMatchSnapshot();
  });
});
