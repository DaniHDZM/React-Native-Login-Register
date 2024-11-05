import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Register from '@/app/register';
import { Alert } from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

describe('Register', () => {
    it('renders correctly', () => {
        render(<Register />);
        expect(screen.getByPlaceholderText('Email: ')).toBeTruthy();
        expect(screen.getByPlaceholderText('Nombre: ')).toBeTruthy();
        expect(screen.getByPlaceholderText('Contraseña: ')).toBeTruthy();
        expect(screen.getByPlaceholderText('Confirmar Contraseña: ')).toBeTruthy();
        expect(screen.getByText('Iniciar sesión')).toBeTruthy();
    });

    it('validates email', () => {
        render(<Register />);
        const emailInput = screen.getByPlaceholderText('Email: ');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            "Error", "Por favor, introduce un email válido."
        );
    });

    it('validates name', () => {
        render(<Register />);
        const emailInput = screen.getByPlaceholderText('Email: ');
        const nameInput = screen.getByPlaceholderText('Nombre: ');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@gmail.com');
        fireEvent.changeText(nameInput, '');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            "Error", "El nombre de usuario no debe estar vacio"
        );
    });

    it('validates password', () => {
        render(<Register />);
        const emailInput = screen.getByPlaceholderText('Email: ');
        const nameInput = screen.getByPlaceholderText('Nombre: ');
        const passwordInput = screen.getByPlaceholderText('Contraseña: ');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@gmail.com');
        fireEvent.changeText(nameInput, 'Juan');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            "Error", "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
        );
    });

    it('confirm password', () => {
        render(<Register />);
        const emailInput = screen.getByPlaceholderText('Email: ');
        const nameInput = screen.getByPlaceholderText('Nombre: ');
        const passwordInput = screen.getByPlaceholderText('Contraseña: ');
        const confirmPassword = screen.getByPlaceholderText('Confirmar Contraseña: ');
        const button = screen.getByText('Iniciar sesión');
        fireEvent.changeText(emailInput, 'user@gmail.com');
        fireEvent.changeText(nameInput, 'Juan');
        fireEvent.changeText(passwordInput, 'Password1@');
        fireEvent.changeText(confirmPassword, 'Password1');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            "Error", "Las contraseñas no coinciden"
        );
    });
});
