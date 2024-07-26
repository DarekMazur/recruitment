import React from 'react';

import AlertDialog from '@/src/components/Atoms/AlertDialog/AlertDialog';
import { renderWithProviders } from '@/src/utils/providers/renderWithProviders';
import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor } from '@testing-library/react';

describe('AlertDialog', () => {
  it('renders AlertDialog component when open is true', () => {
    renderWithProviders(<AlertDialog title="Test Title" label="Close" open={true} closeDialog={() => {}} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: 'Test Title' });
    expect(title).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Close' });
    expect(button).toBeInTheDocument();
  });

  it('does not render AlertDialog when open is false', () => {
    renderWithProviders(<AlertDialog title="Test Title" label="Close" open={false} closeDialog={() => {}} />);

    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });

  it('calls closeDialog function when button is clicked', async () => {
    const handleClose = vi.fn();
    renderWithProviders(<AlertDialog title="Test Title" label="Close" open={true} closeDialog={handleClose} />);

    const button = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(button);

    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));
  });

  it('should match snapshot', () => {
    const { asFragment } = renderWithProviders(
      <AlertDialog title="Test Title" label="Close" open={true} closeDialog={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
