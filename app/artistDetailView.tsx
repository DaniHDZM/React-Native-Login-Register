import { Text, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import styled from "styled-components/native";

const Container = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: #f8f9fa;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const ImageStyled = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  align-self: center;
  margin-bottom: 16px;
  border-width: 2px;
  border-color: #ccc;
`;

const Description = styled(Text)`
  font-size: 16px;
  color: #555;
  line-height: 24px;
  text-align: justify;
  margin-top: 16px;
`;

const ArtistName = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #444;
  text-align: center;
  margin-top: 8px;
`;

export default function ArtistDetailView() {
  const { name, image } = useLocalSearchParams() as { name: string; image: string };

  return (
    <Container>
      <Title>Detalles del Artista</Title>
      <ImageStyled source={{ uri: image }} />
      <ArtistName>Nombre: {name}</ArtistName>
      <Description>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt perspiciatis harum sint labore dolore, architecto magni cumque eos alias fuga!</Description>
    </Container>
  );
}
