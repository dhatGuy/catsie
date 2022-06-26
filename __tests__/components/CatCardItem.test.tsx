import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import CatCardItem from "../../components/cards/CatCardItem";
import TestWrapper from "../../utils/TestWrapper";

describe("Cat Card Component", () => {
  it("should render a cat card", () => {
    const item = {
      id: 1,
      name: "cat",
      image: {
        url: "https://placekitten.com/200/200",
      },
    };

    const toggleFave = jest.fn();

    const { getByText } = render(
      <TestWrapper>
        <CatCardItem toggleFave={toggleFave} item={item} index={0} />
      </TestWrapper>
    );
    expect(getByText(item.name));
  });

  it("should render a cat card with a placeholder image if image is undefined", () => {
    const item = {
      id: 1,
      name: "cat",
      image: {},
    };

    const toggleFave = jest.fn();

    const { getByText, getByLabelText } = render(
      <TestWrapper>
        <CatCardItem toggleFave={toggleFave} index={0} item={item} />
      </TestWrapper>
    );
    expect(getByText(item.name));
    expect(getByLabelText(/image/i));
  });

  it("should toggle the favourite status", async () => {
    const item = {
      id: 1,
      name: "cat",
      image: {
        url: "https://placekitten.com/200/200",
      },
    };

    await waitFor(() => {
      AsyncStorage.setItem("fave", JSON.stringify([item]));
    });

    const toggleFave = jest.fn(async () => {
      await AsyncStorage.setItem("fave", JSON.stringify([]));
    });

    const { getByLabelText, debug } = render(
      <TestWrapper>
        <CatCardItem toggleFave={toggleFave} index={0} item={item} />
      </TestWrapper>
    );

    expect(getByLabelText(/add/i));

    await waitFor(() => fireEvent.press(getByLabelText(/add/i)));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "fave",
      JSON.stringify([])
    );
    expect(toggleFave).toHaveBeenCalled();
    expect(getByLabelText(/remove/i));
  });
});
