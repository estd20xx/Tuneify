import React from "react"
import { act } from "react-test-renderer"
import { IconButton, List } from "react-native-paper"
import SongRow from "../../src/components/Common/SongRow"
import { renderWithProviders, textContent } from "../utils/renderWithProviders"

const setup = (props: Partial<any> = {}) => {
  const onPress = jest.fn()
  const tree = renderWithProviders(
    <SongRow
      title="Rab Kare"
      subtitle="Sajid-Wajid"
      artwork="https://cdn.test/art.jpg"
      onPress={onPress}
      {...props}
    />
  )
  return { tree, onPress, item: tree.root.findAllByType(List.Item)[0] }
}

describe("SongRow", () => {
  it("shows the song title", () => {
    const { tree } = setup()
    expect(textContent(tree).join(" ")).toContain("Rab Kare")
  })

  it("shows the artist as the description", () => {
    const { tree } = setup()
    expect(textContent(tree).join(" ")).toContain("Sajid-Wajid")
  })

  it("keeps the title on one line", () => {
    const { item } = setup()
    expect(item.props.titleNumberOfLines).toBe(1)
  })

  it("calls onPress when tapped", () => {
    const { item, onPress } = setup()
    act(() => {
      item.props.onPress()
    })
    expect(onPress).toHaveBeenCalled()
  })

  it("highlights the row that is currently playing", () => {
    const { item } = setup({ isActive: true })
    expect(item.props.style.backgroundColor).not.toBe("transparent")
  })

  it("leaves an inactive row unhighlighted", () => {
    const { item } = setup({ isActive: false })
    expect(item.props.style.backgroundColor).toBe("transparent")
  })

  it("hides the overflow menu when no handler is given", () => {
    const { tree } = setup()
    expect(tree.root.findAllByType(IconButton)).toHaveLength(0)
  })

  it("shows an overflow menu when a handler is given", () => {
    const { tree } = setup({ onMenuPress: jest.fn() })
    expect(tree.root.findAllByType(IconButton)).toHaveLength(1)
  })

  it("fires the overflow handler", () => {
    const onMenuPress = jest.fn()
    const { tree } = setup({ onMenuPress })
    act(() => {
      tree.root.findAllByType(IconButton)[0].props.onPress()
    })
    expect(onMenuPress).toHaveBeenCalled()
  })

  it("can be disabled", () => {
    const { item } = setup({ disabled: true })
    expect(item.props.disabled).toBe(true)
  })

  it("renders with a missing artwork url", () => {
    expect(() => setup({ artwork: "" })).not.toThrow()
  })
})
