import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import fetchMock from "jest-fetch-mock";
// import "react-native-gesture-handler/jestSetup";
import { setLogger } from "react-query";

// jest.mock("react-native-reanimated", () => {
//   const Reanimated = require("react-native-reanimated/mock");

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
});

fetchMock.enableMocks();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
