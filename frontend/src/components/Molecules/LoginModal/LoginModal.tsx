import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import CloseModal from '@/src/components/Atoms/CloseModal/CloseModal';
import { setUser } from '@/src/store';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const StyledModal = {
  width: 300,
  bgcolor: 'background.paper',
};

interface ILoginModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSnackbar: () => void;
}

const LoginModal: FC<ILoginModalProps> = ({ isOpen, handleClose, handleSnackbar }) => {
  const dispatch = useDispatch();
  const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(true);
  const { t } = useTranslation();

  const submitLogin = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email: string = formJson.email;

    if (!emailRegex.test(email)) {
      setIsEmailCorrect(false);
      return;
    }

    handleClose(true);
    handleSnackbar(true);
    localStorage.removeItem('wasHomeModalShown');
    sessionStorage.setItem('user', email);

    return dispatch(setUser(email));
  };

  return (
    <Modal open={isOpen}>
      <>
        <Box sx={StyledModal} className="modal" role="dialog">
          <CloseModal handleClose={handleClose} />
          <Typography variant="h6" component="h2">
            {t('login.header')}
          </Typography>
          <Container sx={{ mt: 2 }}>
            <Container
              component="form"
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '0 !important' }}
              onSubmit={submitLogin}
            >
              <TextField
                error={!isEmailCorrect}
                required
                inputProps={{
                  type: 'email',
                }}
                helperText={isEmailCorrect ? ' ' : t('login.incorrect')}
                label={t('login.email')}
                name="email"
                variant="standard"
              />{' '}
              <Button type="submit" variant="outlined">
                {t('login.button')}
              </Button>
            </Container>
          </Container>
        </Box>
      </>
    </Modal>
  );
};

export default LoginModal;
