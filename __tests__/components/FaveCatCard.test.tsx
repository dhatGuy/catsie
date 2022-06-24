import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import FaveCatCard from "../../components/cards/FaveCatCard";
import TestWrapper, { UiKittenTestWrapper } from "../../utils/TestWrapper";

describe("Fave Cat Card Component", () => {
  it("should render a cat card", () => {
    const cat = {
      id: 1,
      name: "cat",
      image: {
        url: "https://placekitten.com/200/200",
      },
    };
    const { getByText } = render(
      <TestWrapper>
        <FaveCatCard cat={cat} />
      </TestWrapper>
    );
    expect(getByText(cat.name)).toBeDefined();
  });

  it("should call the toggle function", async () => {
    const mockedMutate = jest.fn();

    jest.mock("../../hooks/useToggleFave.tsx", () => ({
      useToggleFave: () => ({ mutate: mockedMutate }),
    }));

    const cat = {
      id: 1,
      name: "ginger cat",
      image: {
        url: "https://placekitten.com/200/200",
      },
    };

    const { getByLabelText, debug } = render(
      <UiKittenTestWrapper>
        <FaveCatCard cat={cat} />
      </UiKittenTestWrapper>
    );

    fireEvent.press(getByLabelText(/remove/i));

    expect(mockedMutate).toHaveBeenCalledTimes(1);
  });
});
