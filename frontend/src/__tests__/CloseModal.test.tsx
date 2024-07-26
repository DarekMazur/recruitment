import React from 'react';

import CloseModal from '@/src/components/Atoms/CloseModal/CloseModal';
import { renderWithProviders } from '@/src/utils/providers/renderWithProviders';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';

describe('CloseModal Component', () => {
  it('renders CloseModal component correctly', () => {
    renderWithProviders(<CloseModal handleClose={() => {}} />);

    const iconButton = screen.getByRole('button');
    expect(iconButton).toBeInTheDocument();

    const closeIcon = screen.getByTestId('CloseIcon');
    expect(closeIcon).toBeInTheDocument();
  });

  it('calls handleClose function when button is clicked', () => {
    const handleClose = vi.fn();
    renderWithProviders(<CloseModal handleClose={handleClose} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    const tree = renderWithProviders(<CloseModal handleClose={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});
