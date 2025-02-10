import "react-native-gesture-handler/jestSetup";

import { setUpTests as reanimatedSetUpTests } from "react-native-reanimated";

reanimatedSetUpTests();

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
