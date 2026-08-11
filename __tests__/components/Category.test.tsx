import React from "react"
import { act } from "react-test-renderer"
import { Chip } from "react-native-paper"
import Category, {
  SEARCH_CATEGORIES
} from "../../src/components/Search/Category"
import { renderWithProviders, textContent } from "../utils/renderWithProviders"

const setup = (selected: any = "top", onSelect = jest.fn()) => {
  const tree = renderWithProviders(
    <Category categoryData={null} selected={selected} onSelect={onSelect} />
  )
  return { tree, onSelect }
}

describe("Search Category chips", () => {
  it("renders one chip per category", () => {
    const { tree } = setup()
    expect(tree.root.findAllByType(Chip)).toHaveLength(
      SEARCH_CATEGORIES.length
    )
  })

  it("labels every category", () => {
    const { tree } = setup()
    const text = textContent(tree).join(" ").toLowerCase()
    SEARCH_CATEGORIES.forEach((c) => expect(text).toContain(c))
  })

  it("marks the selected chip as selected", () => {
    const { tree } = setup("albums")
    const chips = tree.root.findAllByType(Chip)
    const selected = chips.filter((c) => c.props.selected)
    expect(selected).toHaveLength(1)
    expect(selected[0].props.children).toBe("albums")
  })

  it("reports the chip the user taps", () => {
    const { tree, onSelect } = setup("top")
    const chips = tree.root.findAllByType(Chip)
    act(() => {
      chips[2].props.onPress()
    })
    expect(onSelect).toHaveBeenCalledWith("artists")
  })

  it("uses an outlined chip when not selected", () => {
    const { tree } = setup("top")
    const chips = tree.root.findAllByType(Chip)
    expect(chips[1].props.mode).toBe("outlined")
  })

  it("uses a flat chip when selected", () => {
    const { tree } = setup("top")
    const chips = tree.root.findAllByType(Chip)
    expect(chips[0].props.mode).toBe("flat")
  })

  it("renders without any dynamic data", () => {
    expect(() => setup()).not.toThrow()
  })
})
