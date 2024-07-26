import { FC } from 'react';

import { getYear } from '@/src/utils/helpers/getYear';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const StyledFooter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  p: '2rem',
};

const Footer: FC = () => {
  return (
    <Container component="footer" className="footer" sx={StyledFooter}>
      <Typography className="appName">TWIXER</Typography>
      <Typography className="copyrights">&copy; {getYear()}</Typography>
    </Container>
  );
};

export default Footer;
