import React from 'react';

import AddNewPost from '@/src/components/Atoms/AddNewPost/AddNewPost';
import { renderWithProviders } from '@/src/utils/providers/renderWithProviders';
import { blue, grey } from '@mui/material/colors';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('AddNewPost', () => {
  it('renders AddNewPost component', () => {
    renderWithProviders(<AddNewPost />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders with tooltip', () => {
    renderWithProviders(<AddNewPost />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'addPost');
  });

  it('calls onClick when button is clicked', async () => {
    const handleClick = vi.fn();
    renderWithProviders(<AddNewPost onClick={handleClick} />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => expect(handleClick).toHaveBeenCalledTimes(1));
  });

  it('applies fixed positioning when isFixed is true', () => {
    renderWithProviders(<AddNewPost isFixed />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      position: 'fixed',
      bottom: '3rem',
      right: '1rem',
      height: '5rem',
      width: '5rem',
    });
  });

  it('applies static positioning when isFixed is false', () => {
    renderWithProviders(<AddNewPost isFixed={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      position: 'static',
      bottom: '3rem',
      right: '1rem',
      height: '5rem',
      width: '5rem',
    });
  });

  it('renders AddIcon with correct styles', () => {
    renderWithProviders(<AddNewPost />);

    const icon = screen.getByRole('button').firstChild;
    expect(icon).toHaveStyle({
      color: grey['A100'],
      fontSize: '3rem',
      backgroundColor: blue[700],
      borderRadius: '50%',
      padding: 0,
    });
  });

  it('should match snapshot', () => {
    const snapshot = renderWithProviders(<AddNewPost />);
    expect(snapshot).toMatchSnapshot();
  });
});
