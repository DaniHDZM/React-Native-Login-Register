import * as React from "react";
import { render, screen } from "@testing-library/react-native";
import ArtistBox from "@/components/ArtistBox";

describe("ArtistBox Component", () => {
  const mockArtist = {
    name: "Artist One",
    image: "https://example.com/image1.jpg",
  };

  it("renders the artist's name and image", () => {
    render(<ArtistBox artist={mockArtist} />);

    // Verificar que el nombre del artista se renderiza
    expect(screen.getByText(mockArtist.name)).toBeTruthy();

    // Verificar que la imagen del artista se renderiza correctamente
    const image = screen.getByTestId("artist-image");
    expect(image.props.source).toEqual({ uri: mockArtist.image });
  });
});
