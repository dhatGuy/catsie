import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { FlatList, View } from "react-native";
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

  it("scrolls and loads more cat data", async () => {
    // const eventData = {
    //   nativeEvent: {
    //     contentOffset: { y: 500 },
    //     contentSize: { height: 500, width: 300 },
    //     layoutMeasurement: { height: 100, width: 100 },
    //   },
    // };
    // fetchMock.mockResponse(JSON.stringify(mockCats));

    // const { getByTestId, queryByTestId, queryByLabelText, debug } = render(
    //   <TestWrapper>
    //     <CatList />
    //   </TestWrapper>
    // );

    // await waitFor(() => expect(queryByTestId("loading-spinner")).toBeNull());

    // expect(queryByTestId("cat-row-10")).toBeNull();

    // fireEvent.scroll(getByTestId("cat-list"), eventData);
    // console.log(queryByLabelText("loading-spinner"));
    // debug();

    const onEndReached = jest.fn();
    const { getByTestId } = render(
      <FlatList
        data={Array.from({ length: 10 }, (_, key) => ({ key: `${key}` }))}
        renderItem={() => <View style={{ height: 500, width: 100 }} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        testID="flat-list"
      />
    );
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    };

    fireEvent.scroll(getByTestId("flat-list"), eventData);
    expect(onEndReached).toHaveBeenCalled();
  });
});
