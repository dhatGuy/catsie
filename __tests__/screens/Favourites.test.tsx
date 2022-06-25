import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import Favourites from "../../screens/Favourites";
import TestWrapper from "../../utils/TestWrapper";

const mockCats = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  name: `Cat ${index}`,
  image: {
    url: "https://placekitten.com/200/200",
  },
}));

describe("Favourites", () => {
  afterEach(() => {
    fetchMock.resetMocks();
    AsyncStorage.clear();
  });

  it("renders a spinner initially", async () => {
    const { getByLabelText } = render(
      <TestWrapper>
        <Favourites />
      </TestWrapper>
    );

    expect(getByLabelText("loading-spinner"));
  });

  it("renders a text if empty", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    const { queryByText, getByText, debug } = render(
      <TestWrapper>
        <Favourites />
      </TestWrapper>
    );

    debug();

    await waitFor(() => queryByText(/No favourites/i));

    expect(getByText(/No favourites/i)).toBeTruthy();
  });

  it("renders a list of cats", async () => {
    await waitFor(() => AsyncStorage.setItem("fave", JSON.stringify(mockCats)));

    const { getByTestId, queryByTestId, debug } = render(
      <TestWrapper>
        <Favourites />
      </TestWrapper>
    );

    expect(queryByTestId("cat-row-0")).toBeNull();

    await waitFor(() => {
      return queryByTestId("cat-row-0");
    });

    expect(getByTestId("cat-row-0"));
  });
});
