import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import TabNavigator from "../../navigation/TabNavigator";
import ReactQueryWrapper from "../../utils/TestWrapper";

describe("Testing react navigation", () => {
  test("should render All Cats tab", async () => {
    const component = (
      <ReactQueryWrapper>
        <TabNavigator />
      </ReactQueryWrapper>
    );

    const { findByTestId } = render(component);

    const allCats = await findByTestId("all-cats-tab");
    const favouriteCats = await findByTestId("favourites-tab");

    expect(allCats).toBeTruthy();
    expect(favouriteCats).toBeTruthy();
  });

  test('clicking on the "Cats I Like" button takes you to the favourites screen', async () => {
    const component = (
      <ReactQueryWrapper>
        <TabNavigator />
      </ReactQueryWrapper>
    );

    const { findByTestId, queryAllByText } = render(component);
    const oldScreen = queryAllByText("All Cats");
    const button = await findByTestId("all-cats-tab");

    expect(oldScreen).not.toHaveLength(0);
    await waitFor(() => {
      fireEvent.press(button);
    });

    const newScreen = await findByTestId("favourites-tab");

    expect(newScreen).toBeTruthy();
  });
});
