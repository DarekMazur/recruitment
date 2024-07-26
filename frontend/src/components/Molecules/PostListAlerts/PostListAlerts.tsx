import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';

interface IAlertsPros {
  open: boolean;
  authorAlert: boolean;
  alert: boolean;
  isSuccess: boolean;
  handleClose: () => void;
  handleAlertClose: () => void;
  handleCloseSnackbar: () => void;
  handleConfirmDelete: () => void;
}

const PostListAlerts: FC<IAlertsPros> = ({
  open,
  handleClose,
  handleAlertClose,
  authorAlert,
  alert,
  handleCloseSnackbar,
  handleConfirmDelete,
  isSuccess,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('delete.confirm.confirmHeader')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('delete.confirm.confirmMessage')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('delete.confirm.button.cancel')}</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            {t('delete.confirm.button.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={authorAlert} onClose={handleClose}>
        <DialogTitle>{t('delete.authorDelete')}</DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertClose}>{t('delete.button.close')}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={alert} autoHideDuration={6000}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={isSuccess ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isSuccess ? t('delete.alert.success') : t('delete.alert.error')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostListAlerts;
