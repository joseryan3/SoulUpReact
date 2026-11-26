import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import GlobalBackButton from './components/GlobalBackButton';

test('renders home navigation', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /entrar/i });
  expect(linkElement).toBeInTheDocument();
});

test('global back button falls back to the parent route without history', () => {
  window.history.replaceState({}, '', '/');
  render(
    <MemoryRouter initialEntries={['/resetarsenha']}>
      <GlobalBackButton />
      <Routes>
        <Route path="/resetarsenha" element={<p>Redefinir senha</p>} />
        <Route path="/login" element={<p>Entrar</p>} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /voltar à página anterior/i }));

  expect(screen.getByText('Entrar')).toBeInTheDocument();
});

test('global back button uses in-app history when available', () => {
  window.history.replaceState({ idx: 2 }, '', '/recursos');
  render(
    <MemoryRouter initialEntries={['/', '/recursos']} initialIndex={1}>
      <GlobalBackButton />
      <Routes>
        <Route path="/" element={<p>Início</p>} />
        <Route path="/recursos" element={<p>Recursos</p>} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /voltar à página anterior/i }));

  expect(screen.getByText('Início')).toBeInTheDocument();
});
