import { Provider } from 'react-redux';

import PostListAlerts from '@/src/components/Molecules/PostListAlerts/PostListAlerts';
import { store } from '@/src/store';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('PostListAlerts Component', () => {
  const handleClose = vi.fn();
  const handleAlertClose = vi.fn();
  const handleCloseSnackbar = vi.fn();
  const handleConfirmDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders confirmation dialog correctly', () => {
    render(
      <Provider store={store}>
        <PostListAlerts
          open={true}
          authorAlert={false}
          alert={false}
          isSuccess={false}
          handleClose={handleClose}
          handleAlertClose={handleAlertClose}
          handleCloseSnackbar={handleCloseSnackbar}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Provider>,
    );

    expect(screen.getByText('delete.confirm.confirmHeader')).toBeInTheDocument();
    expect(screen.getByText('delete.confirm.confirmMessage')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete.confirm.button.cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete.confirm.button.confirm/i })).toBeInTheDocument();
  });

  it('handles confirmation dialog actions', async () => {
    render(
      <Provider store={store}>
        <PostListAlerts
          open={true}
          authorAlert={false}
          alert={false}
          isSuccess={false}
          handleClose={handleClose}
          handleAlertClose={handleAlertClose}
          handleCloseSnackbar={handleCloseSnackbar}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /delete.confirm.button.cancel/i }));
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByRole('button', { name: /delete.confirm.button.confirm/i }));
    await waitFor(() => {
      expect(handleConfirmDelete).toHaveBeenCalled();
    });
  });

  it('renders author alert dialog correctly', () => {
    render(
      <Provider store={store}>
        <PostListAlerts
          open={false}
          authorAlert={true}
          alert={false}
          isSuccess={false}
          handleClose={handleClose}
          handleAlertClose={handleAlertClose}
          handleCloseSnackbar={handleCloseSnackbar}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Provider>,
    );

    expect(screen.getByText('delete.authorDelete')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete.button.close/i })).toBeInTheDocument();
  });

  it('handles author alert actions', async () => {
    render(
      <Provider store={store}>
        <PostListAlerts
          open={false}
          authorAlert={true}
          alert={false}
          isSuccess={false}
          handleClose={handleClose}
          handleAlertClose={handleAlertClose}
          handleCloseSnackbar={handleCloseSnackbar}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /delete.button.close/i }));
    await waitFor(() => {
      expect(handleAlertClose).toHaveBeenCalled();
    });
  });

  it('renders snackbar correctly', () => {
    render(
      <Provider store={store}>
        <PostListAlerts
          open={false}
          authorAlert={false}
          alert={true}
          isSuccess={true}
          handleClose={handleClose}
          handleAlertClose={handleAlertClose}
          handleCloseSnackbar={handleCloseSnackbar}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Provider>,
    );

    expect(screen.getByText('delete.alert.success')).toBeInTheDocument();
  });

  it('handles snackbar close action', async () => {
    render(
      <Provider store={store}>
        <PostListAlerts
          open={false}
          authorAlert={false}
          alert={true}
          isSuccess={true}
          handleClose={handleClose}
          handleAlertClose={handleAlertClose}
          handleCloseSnackbar={handleCloseSnackbar}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(handleCloseSnackbar).toHaveBeenCalled();
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <PostListAlerts
          open={true}
          authorAlert={true}
          alert={true}
          isSuccess={true}
          handleClose={handleClose}
          handleAlertClose={handleAlertClose}
          handleCloseSnackbar={handleCloseSnackbar}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
