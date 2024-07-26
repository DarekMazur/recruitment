import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Unknown from '@/src/assets/noUserIcon.svg';
import Avt from '@/src/assets/userIcon.svg';
import AddNewPost from '@/src/components/Atoms/AddNewPost/AddNewPost';
import MenuLinkItem from '@/src/components/Atoms/MenuLinkItem/MenuLinkItem';
import MenuLogin from '@/src/components/Atoms/MenuLogin/MenuLogin';
import LoginModal from '@/src/components/Molecules/LoginModal/LoginModal';
import PostModal from '@/src/components/Molecules/PostModal/PostModal';
import { setLogin, setUser, RootState } from '@/src/store';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';

interface IMenuProps {
  open: boolean;
  toggleMenu: () => void;
  handleResponse: () => void;
  postsCount: number;
}

const Menu: FC<IMenuProps> = ({ open, toggleMenu, handleResponse, postsCount }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user: string = useSelector<RootState>((state) => state.user);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setOpenLogin((prevState) => !prevState);
  };

  const handleTogglePostModal = () => {
    setOpenPostModal((prevState) => !prevState);
  };

  const handleSnackbar = (isOpen) => {
    dispatch(setLogin(isOpen));
  };

  const handleLogout = () => {
    toggleMenu(false);
    handleSnackbar(true);
    localStorage.setItem('wasHomeModalShown', true);
    sessionStorage.removeItem('user');
    dispatch(setUser(null));
  };

  return (
    <Drawer component="aside" open={open} onClose={toggleMenu}>
      <LoginModal isOpen={openLogin} handleClose={handleToggleModal} handleSnackbar={handleSnackbar} />
      <Box className="sideMenu">
        <Container className="menuHeader" maxWidth="xl">
          <Avatar alt="User" src={user ? Avt : (Unknown as string)} />
          <AddNewPost onClick={handleTogglePostModal} />
        </Container>
        <Container maxWidth="xl" sx={{ mb: '1rem' }}>
          <Typography color="text.secondary" sx={{ fontWeight: '700' }}>
            {user}
          </Typography>
        </Container>

        <Box component="nav">
          <MenuList>
            <MenuLinkItem target="/" label={t('menu.home')} />
            {user ? <MenuLinkItem target="/profile" label={t('menu.profile')} /> : null}
            {user ? (
              <MenuLogin handleLogout={handleLogout} />
            ) : (
              <MenuLogin isLogin handleToggleModal={handleToggleModal} />
            )}
          </MenuList>
        </Box>
        <PostModal
          open={openPostModal}
          close={handleTogglePostModal}
          response={handleResponse}
          postsCount={postsCount}
        />
      </Box>
    </Drawer>
  );
};

export default Menu;
