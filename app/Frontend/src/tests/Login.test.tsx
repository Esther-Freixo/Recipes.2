import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithLoginContext from './RenderWithLoginContext';

describe(('Teste renderização tela de Login'), () => {
  const testEmail = 'emailtest@gmail.com';

  test('Tela de Login', async () => {
    RenderWithLoginContext(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const disabledBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    await waitFor(() => {
      userEvent.type(emailInput, testEmail);
      userEvent.type(passwordInput, 'teste');

      expect(disabledBtn).toBeDisabled();
    });

    await waitFor(() => {
      userEvent.type(emailInput, 'emailtest@');
      userEvent.type(passwordInput, 'tes');

      expect(disabledBtn).toBeDisabled();
    });

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, 'teste123');

    await waitFor(() => {
      expect(disabledBtn).toHaveAttribute('disabled', '');
      userEvent.click(disabledBtn);
    });
  });

  test('Renderiza troca de Rota', async () => {
    RenderWithLoginContext(<App />);

    const emailInput = screen.getByTestId('email-input');

    const passwordInput = screen.getByTestId('password-input');
    const disabledBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, 'teste123');
    await userEvent.click(disabledBtn);

    await waitFor(() => {
      expect(localStorage.getItem('user')).toEqual(JSON.stringify({ email: testEmail }));
      expect(screen.queryByText('Meals')).toBeInTheDocument();
    });
  });
});
