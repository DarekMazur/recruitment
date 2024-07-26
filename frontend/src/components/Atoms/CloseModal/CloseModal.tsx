import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const CloseModal = ({ handleClose }) => {
  return (
    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseModal;
