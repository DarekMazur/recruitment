import Footer from '@/src/components/Organisms/Footer/Footer';
import { getYear } from '@/src/utils/helpers/getYear';
import { renderWithProviders } from '@/src/utils/providers/renderWithProviders';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

vi.mock('@/src/utils/helpers/getYear');

describe('Footer', () => {
  it('renders app name and current year', () => {
    (getYear as jest.Mock).mockReturnValue(2024);

    render(<Footer />);

    expect(screen.getByText('TWIXER')).toBeInTheDocument();
    expect(screen.getByText('© 2024')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const snapshot = renderWithProviders(<Footer />);
    expect(snapshot).toMatchSnapshot();
  });
});
