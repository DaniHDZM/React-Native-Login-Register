import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Index from '../../app/index';
import { Alert } from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('Index', () => {
    it('renders correctly', () => {
        render(<Index />);
        expect(screen.getByPlaceholderText('Email: ')).toBeTruthy();
        expect(screen.getByPlaceholderText('Contraseña: ')).toBeTruthy();
        expect(screen.getByText('Iniciar sesión')).toBeTruthy();
        expect(screen.getByText('Ir a registro')).toBeTruthy();
        expect(screen.getByTestId('icon-image')).toBeTruthy();
    });

    it('validates email', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Email: ');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            "Error", "Por favor, introduce un email válido."
        );
    });

    it('validates password', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Email: ');
        const passwordInput = screen.getByPlaceholderText('Contraseña: ');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@gmail.com');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            "Error", "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
        );
    });

    it('submits the form', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Email: ');
        const passwordInput = screen.getByPlaceholderText('Contraseña: ');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@gmail.com');
        fireEvent.changeText(passwordInput, 'Password1@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            "Éxito", "Login correcto."
        );
    });
});