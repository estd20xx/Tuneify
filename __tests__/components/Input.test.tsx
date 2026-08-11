import React from "react"
import { act } from "react-test-renderer"
import { Searchbar } from "react-native-paper"
import Input from "../../src/components/Search/Input"
import { renderWithProviders } from "../utils/renderWithProviders"

const query = { p: 1, q: "", n: 50 }

const setup = (q = query) => {
  const updateQuery = jest.fn()
  const tree = renderWithProviders(
    <Input updateQuery={updateQuery} searchQuery={q} />
  )
  return { tree, updateQuery, bar: tree.root.findAllByType(Searchbar)[0] }
}

describe("Search Input", () => {
  it("renders a Material search bar", () => {
    const { tree } = setup()
    expect(tree.root.findAllByType(Searchbar)).toHaveLength(1)
  })

  it("shows the current query", () => {
    const { bar } = setup({ ...query, q: "arijit" })
    expect(bar.props.value).toBe("arijit")
  })

  it("reports typed text without losing the other params", () => {
    const { bar, updateQuery } = setup({ p: 3, q: "ab", n: 50 })
    act(() => {
      bar.props.onChangeText("abc")
    })
    expect(updateQuery).toHaveBeenCalledWith({ p: 3, q: "abc", n: 50 })
  })

  it("clears the query when the clear icon is pressed", () => {
    const { bar, updateQuery } = setup({ ...query, q: "something" })
    act(() => {
      bar.props.onClearIconPress()
    })
    expect(updateQuery).toHaveBeenCalledWith({ p: 1, q: "", n: 50 })
  })

  it("uses a search return key", () => {
    const { bar } = setup()
    expect(bar.props.returnKeyType).toBe("search")
  })

  it("renders an empty query without throwing", () => {
    expect(() => setup()).not.toThrow()
  })
})
