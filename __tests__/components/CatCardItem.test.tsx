import { fireEvent, render } from "@testing-library/react-native";
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
    const { getByText } = render(
      <TestWrapper>
        <CatCardItem item={item} index={0} />
      </TestWrapper>
    );
    expect(getByText(item.name)).toBeDefined();
  });

  it("should render a cat card with a placeholder image if image is undefined", () => {
    const item = {
      id: 1,
      name: "cat",
      image: {},
    };
    const { getByText, getByLabelText } = render(
      <TestWrapper>
        <CatCardItem index={0} item={item} />
      </TestWrapper>
    );
    expect(getByText(item.name)).toBeDefined();
    expect(getByLabelText(/image/i)).not.toBeNull();
  });

  it("should toggle the favourite status", () => {
    const item = {
      id: 1,
      name: "cat",
      image: {
        url: "https://placekitten.com/200/200",
      },
    };
    const { getByLabelText } = render(
      <TestWrapper>
        <CatCardItem index={0} item={item} />
      </TestWrapper>
    );

    expect(getByLabelText(/add/i)).toBeDefined();

    fireEvent.press(getByLabelText(/add/i));

    expect(getByLabelText(/remove/i)).toBeDefined();
  });
});
