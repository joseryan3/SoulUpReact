import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home navigation', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /entrar/i });
  expect(linkElement).toBeInTheDocument();
});
