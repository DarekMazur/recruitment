import LoginDialog from '@/src/components/Molecules/LoginDialog/LoginDialog';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('LoginDialog', () => {
  const handleLogin = vi.fn();
  const closeDialog = vi.fn();

  it('renders correctly when open', () => {
    render(<LoginDialog open={true} closeDialog={closeDialog} handleLogin={handleLogin} isError={false} />);

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByText('login.dialog.title')).toBeInTheDocument();
    expect(screen.getByText('login.dialog.message')).toBeInTheDocument();
    expect(screen.getByText('login.dialog.email')).toBeInTheDocument();
    expect(screen.getByText('login.dialog.button.cancel')).toBeInTheDocument();
    expect(screen.getByText('login.dialog.button.login')).toBeInTheDocument();
  });

  it('calls handleLogin on form submit', async () => {
    render(<LoginDialog open={true} closeDialog={closeDialog} handleLogin={handleLogin} isError={false} />);

    const form = screen.getByRole('form');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalledTimes(1);
    });
  });

  it('calls closeDialog when cancel button is clicked', () => {
    render(<LoginDialog open={true} closeDialog={closeDialog} handleLogin={handleLogin} isError={false} />);

    fireEvent.click(screen.getByText('login.dialog.button.cancel'));

    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    const tree = render(
      <LoginDialog open={true} closeDialog={closeDialog} handleLogin={handleLogin} isError={false} />,
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
