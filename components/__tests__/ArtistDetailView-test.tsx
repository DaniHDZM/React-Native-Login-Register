import * as React from "react";
import { render, screen } from "@testing-library/react-native";
import ArtistDetailView from "@/app/artistDetailView";
import { useLocalSearchParams } from "expo-router";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

const mockParams = { name: "Artist One", image: "image1.jpg" };

describe("ArtistDetailView Component", () => {
  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue(mockParams);
  });

  it("renders the artist details", () => {
    render(<ArtistDetailView />);
    expect(screen.getByText("Detalles del Artista")).toBeTruthy();
    expect(screen.getByText("Nombre: Artist One")).toBeTruthy();
    expect(screen.getByText("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt perspiciatis harum sint labore dolore, architecto magni cumque eos alias fuga!")).toBeTruthy();
  });
});