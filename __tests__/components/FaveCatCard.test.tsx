import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
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
        <FaveCatCard index={0} cat={cat} />
      </TestWrapper>
    );

    expect(getByText(cat.name));
  });

  it("should call the toggle function", async () => {
    const cat = {
      id: 1,
      name: "ginger cat",
      image: {
        url: "https://placekitten.com/200/200",
      },
    };

    const { getByLabelText } = render(
      <UiKittenTestWrapper>
        <FaveCatCard index={0} cat={cat} />
      </UiKittenTestWrapper>
    );

    fireEvent.press(getByLabelText(/remove/i));

    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalled());

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("fave");

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "fave",
      JSON.stringify([cat])
    );
  });
});
