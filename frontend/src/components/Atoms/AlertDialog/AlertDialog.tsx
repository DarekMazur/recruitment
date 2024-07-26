import { FC } from 'react';

import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface IAlertDialogProps {
  title: string;
  label: string;
  open: boolean;
  closeDialog: () => void;
}

const AlertDialog: FC<IAlertDialogProps> = ({ title, label, open, closeDialog }) => {
  return (
    <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button onClick={closeDialog}>{label}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
