import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import Favourites from "../../screens/Favourites";
import TestWrapper from "../../utils/TestWrapper";

describe("Favourites", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
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
});
