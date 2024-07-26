import { ReactNode } from 'react';

import AppProviders from '@/src/utils/providers/AppProviders';
import { render } from '@testing-library/react';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <AppProviders>{children}</AppProviders>;
};

const customRender = (ui, options?) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
