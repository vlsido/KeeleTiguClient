import "react-native-gesture-handler/jestSetup";

import { setUpTests as reanimatedSetUpTests } from "react-native-reanimated";

import { TextEncoder, TextDecoder } from "util";
import { ReadableStream } from "stream/web";

Object.assign(global, { TextDecoder, TextEncoder, ReadableStream });
global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
reanimatedSetUpTests();

jest.mock("expo-font", () => ({
  isLoaded: jest.fn(),
  forEach: jest.fn(),
  loadAsync: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
  MaterialIcons: "MaterialIcons",
  Icon: "Icon",
}));

jest.mock("firebase/functions", () => ({
  httpsCallable: jest.fn(() => Promise.resolve({ data: {} })),
  getFunctions: jest.fn(),
  connectFunctionsEmulator: jest.fn(),
}));

jest.mock("./components/util/FirebaseConfig", () => ({
  functions: jest.fn(),
  app: jest.fn(),
}));

global.self = global;
global.window = global;
