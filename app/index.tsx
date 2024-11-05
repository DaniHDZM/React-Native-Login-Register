import React, { useState } from "react";
import { View, TextInput, Image, Button, Alert } from "react-native";
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
`;

const SytledImage = styled(Image)`
width: 200px;
height: 200px;
`;

const StyledButton = styled(Button)`
  margin: 10px;
`;


// Función de validación de email
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función de validación de contraseña (mínimo un número, una mayúscula y un carácter especial)
const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};

export default function Index() {
    const router = useRouter();
    const onPressLearnMore = () => {
      router.push({
        pathname: "./register",
      });
    }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validations = () => {
    if (!validateEmail(email)) {
      Alert.alert("Error", "Por favor, introduce un email válido.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
      );
      return;
    }
    Alert.alert("Éxito", "Login correcto.");
  };

  return (
    <MainContainer>
      <SytledImage source={require('./src/react.png')} testID="icon-image"/>
      <StyledTextInput 
        placeholder="Email: " 
        autoComplete="email" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <StyledTextInput 
        placeholder="Contraseña: " 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <StyledButton 
        onPress={validations} 
        title="Iniciar sesión"
      />
      <StyledButton 
        onPress={onPressLearnMore} 
        title="Ir a registro"
      />
    </MainContainer>
  );
}