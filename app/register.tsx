import React from "react";
import { useState } from "react";
import { View, TextInput, Alert, Button} from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

const MainContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const StyledTextInput = styled(TextInput)`
  width: 80%;
  padding: 10px;
  margin: 10px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`
const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateUserName = (name: string) => {
    return name !== "";
}

const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
};

const validateRepeatedPassword = (repeatedPassword: string, password: string) => {
    return repeatedPassword === password;
};

export default function Register() {
    const router = useRouter();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState(""); 
    const [userName, setUserName] = useState("");

    const validations = () => {
        if (!validateEmail(email)) {
          Alert.alert("Error", "Por favor, introduce un email válido.");
          return;
        }
        if (!validateUserName(userName)) {
            Alert.alert(
                "Error",
                "El nombre de usuario no debe estar vacio"
            )
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert(
              "Error",
              "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
            );
            return;
        }
        if (!validateRepeatedPassword(repeatedPassword, password)) {
            Alert.alert(
                "Error",
                "Las contraseñas no coinciden"
            );
            return;
        }
          Alert.alert('Éxito', `Correo: ${email}\nNombre: ${userName} \nContraseña: ${'*'.repeat(password.length)}`);
          router.push({
            pathname: "./",
          });
        };

    return (
        <MainContainer>
            <StyledTextInput 
                placeholder="Email: " 
                autoComplete="email" 
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <StyledTextInput
                placeholder="Nombre: "
                autoComplete="name"
                value={userName}
                onChangeText={setUserName}
            />
            <StyledTextInput
                placeholder="Contraseña: " 
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <StyledTextInput
                placeholder="Confirmar Contraseña: "
                secureTextEntry
                value={repeatedPassword}
                onChangeText={setRepeatedPassword}
            />
            <Button 
                onPress={validations} 
                title="Iniciar sesión"
            />
        </MainContainer>
    )   
}