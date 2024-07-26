import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';

import MenuLinkItem from '@/src/components/Atoms/MenuLinkItem/MenuLinkItem';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('MenuLinkItem Component', () => {
  it('renders MenuLinkItem component correctly', () => {
    render(
      <MemoryRouter>
        <MenuLinkItem target="/home" label="Home" />
      </MemoryRouter>,
    );

    const menuItem = screen.getByRole('menuitem');
    expect(menuItem).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveClass('menuItem');

    const listItemText = screen.getByText('Home');
    expect(listItemText).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const tree = create(
      <MemoryRouter>
        <MenuLinkItem target="/home" label="Home" />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
