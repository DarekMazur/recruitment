import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface ILoginDialogProps {
  open: boolean;
  isError?: boolean;
  closeDialog: () => void;
  handleLogin: () => void;
}

const LoginDialog: FC<ILoginDialogProps> = ({ open, closeDialog, handleLogin, isError }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      PaperProps={{
        component: 'form',
        onSubmit: handleLogin,
        role: 'form',
      }}
    >
      <DialogTitle>{t('login.dialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('login.dialog.message')}</DialogContentText>
        <TextField
          autoFocus
          required
          error={isError}
          margin="dense"
          id="email"
          name="email"
          label={t('login.dialog.email')}
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{t('login.dialog.button.cancel')}</Button>
        <Button type="submit">{t('login.dialog.button.login')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
