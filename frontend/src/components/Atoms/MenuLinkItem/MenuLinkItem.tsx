import { Link } from 'react-router-dom';

import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

interface IMenuLinkItemProps {
  target?: string;
  label: string;
}

const MenuLinkItem: FC<IMenuLinkItemProps> = ({ target, label }) => {
  return (
    <MenuItem>
      <Link to={target} className="menuItem">
        <ListItemText>{label}</ListItemText>
      </Link>
    </MenuItem>
  );
};

export default MenuLinkItem;
