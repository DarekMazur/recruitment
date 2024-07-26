import { useTranslation } from 'react-i18next';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

interface IMenuLoginProps {
  isLogin?: boolean;
  handleLogout?: () => void;
  handleToggleModal?: () => void;
}

const MenuLogin: FC<IMenuLoginProps> = ({ isLogin, handleLogout, handleToggleModal }) => {
  const { t } = useTranslation();

  return (
    <MenuItem sx={{ mt: '3rem' }} onClick={isLogin ? handleToggleModal : handleLogout}>
      <ListItemIcon>
        {isLogin ? (
          <LoginIcon data-testid="LoginIcon" fontSize="small" />
        ) : (
          <LogoutIcon data-testid="LogoutIcon" fontSize="small" />
        )}
      </ListItemIcon>
      <ListItemText>{isLogin ? t('menu.log.in') : t('menu.log.out')}</ListItemText>
    </MenuItem>
  );
};

export default MenuLogin;
