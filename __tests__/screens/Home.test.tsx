import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import CatList from "../../screens/Home";
import TestWrapper from "../../utils/TestWrapper";

const mockCats = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  name: `Cat ${index}`,
  image: {
    url: "https://placekitten.com/200/200",
  },
}));

describe("Home", () => {
  afterEach(() => fetchMock.resetMocks());

  it("renders a spinner initially", async () => {
    const { getByLabelText, debug } = render(
      <TestWrapper>
        <CatList />
      </TestWrapper>
    );

    expect(getByLabelText("loading-spinner"));
  });

  it("renders a list of cats", async () => {
    fetchMock.mockResponse(JSON.stringify(mockCats));

    const { getByTestId, queryByTestId, debug } = render(
      <TestWrapper>
        <CatList />
      </TestWrapper>
    );

    expect(queryByTestId("cat-row-0")).toBeNull();

    await waitFor(() => {
      return queryByTestId("cat-row-0");
    });

    expect(getByTestId("cat-row-0"));
  });
});
