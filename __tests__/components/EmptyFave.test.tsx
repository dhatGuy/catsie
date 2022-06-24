import { render } from "@testing-library/react-native";
import React from "react";
import EmptyFave from "../../components/EmptyFave";
import Wrapper from "../../utils/TestWrapper";

describe("<EmptyFave />", () => {
  const { getByText } = render(
    <Wrapper>
      <EmptyFave />
    </Wrapper>
  );

  it("should render correctly when fave is empty", () => {
    expect(getByText("No favourites 😿")).toBeDefined();
  });
});
