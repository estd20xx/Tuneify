import React from "react"
import { PaperProvider } from "react-native-paper"
import { Provider } from "react-redux"
import renderer, { ReactTestRenderer, act } from "react-test-renderer"
import store from "../../src/store/store"

export const renderWithProviders = (ui: React.ReactElement): ReactTestRenderer => {
  let tree: ReactTestRenderer | undefined
  act(() => {
    tree = renderer.create(
      <Provider store={store}>
        <PaperProvider>{ui}</PaperProvider>
      </Provider>
    )
  })
  return tree as ReactTestRenderer
}

export const findByType = (tree: ReactTestRenderer, type: any) =>
  tree.root.findAllByType(type)

export const textContent = (tree: ReactTestRenderer): string[] => {
  const out: string[] = []
  const walk = (node: any) => {
    if (typeof node === "string") {
      out.push(node)
      return
    }
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (node && node.children) node.children.forEach(walk)
  }
  walk(tree.toJSON())
  return out
}
