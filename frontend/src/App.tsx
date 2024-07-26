import { FC } from 'react';

import Root from '@/src/pages/Root';
import AppProviders from '@/src/utils/providers/AppProviders';

import './styles/main.scss';

const App: FC = () => {
  return (
    <AppProviders>
      <Root />
    </AppProviders>
  );
};

export default App;
