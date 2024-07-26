import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { blue, grey } from '@mui/material/colors';

interface IAddNewPostProps {
  isFixed?: boolean;
}

const AddNewPost: FC<IAddNewPostProps> = ({ isFixed, onClick }) => {
  const StyledIconButton = {
    position: isFixed ? 'fixed' : 'static',
    bottom: '3rem',
    right: '1rem',
    height: '5rem',
    width: '5rem',
  };

  const StyledIcon = {
    color: grey['A100'],
    fontSize: '3rem',
    bgcolor: blue[700],
    borderRadius: '50%',
    p: 0,
  };
  const { t } = useTranslation();

  return (
    <Tooltip title={t('addPost')}>
      <IconButton aria-label={t('addPost')} role="button" sx={StyledIconButton} onClick={onClick}>
        <AddIcon sx={StyledIcon} />
      </IconButton>
    </Tooltip>
  );
};

export default AddNewPost;
