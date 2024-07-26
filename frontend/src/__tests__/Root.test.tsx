import Root from '@/src/pages/Root';
import { renderWithProviders } from '@/src/utils/providers/renderWithProviders';
import '@testing-library/jest-dom';

describe('Root', () => {
  it('should match snapshot', () => {
    const snapshot = renderWithProviders(<Root />);
    expect(snapshot).toMatchSnapshot();
  });
});
