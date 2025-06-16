import React from "react";
import {
  render,
  RenderOptions
} from "@testing-library/react-native";
import { Provider } from 'react-redux';
import { Provider as JotaiProvider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import {
  AppStore,
  RootState,
  setupStore
} from '../components/store/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  atomsState?: unknown
}

function HydrateAtoms({ initialValues, children }) {
  useHydrateAtoms(initialValues);
  return children;
}

function AtomsProvider({ initialValues, children }) {
  return (
    <JotaiProvider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </JotaiProvider>
  )
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    atomsState = [],
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {

  function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {

    return (
      <Provider store={store}>
        <AtomsProvider initialValues={atomsState}>
          {children}
        </AtomsProvider>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react-native'
