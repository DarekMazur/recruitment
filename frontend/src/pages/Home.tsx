import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import LoginModal from '@/src/components/Molecules/LoginModal/LoginModal';
import BaseView from '@/src/components/Templates/BaseView/BaseView';
import { setLogin, useGetPostsQuery, RootState } from '@/src/store';
import { Alert, Snackbar } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const user = useSelector<RootState>((state) => state.user);
  const login = useSelector<RootState>((state) => state.login);
  const wasHomeModalShown = !!localStorage.getItem('wasHomeModalShown');
  const { data: posts, isLoading, isError } = useGetPostsQuery();
  const [openLogin, setOpenLogin] = useState(!wasHomeModalShown && !user);
  const [postsError, setPostsError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setOpenLogin(!wasHomeModalShown && !user);
  }, [wasHomeModalShown, user]);

  useEffect(() => {
    setPostsError(isError);
  }, [isError]);

  const handleClose = () => {
    setOpenLogin(false);
    localStorage.setItem('wasHomeModalShown', true);
  };

  const handleSnackbar = (isOpen) => {
    dispatch(setLogin(isOpen));
    if (isError) {
      setPostsError(false);
    }
  };

  return (
    <Box>
      <LoginModal isOpen={openLogin} handleClose={handleClose} handleSnackbar={handleSnackbar} />
      <BaseView posts={posts} />
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={!!login} autoHideDuration={6000}>
        <Alert onClose={() => handleSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          {user ? t('login.confirmLogin', { user: user }) : t('login.confirmLogout')}
        </Alert>
      </Snackbar>
      <Snackbar open={postsError} autoHideDuration={6000}>
        <Alert onClose={() => handleSnackbar(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
          {t('error')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
