import React from "react"
import { Text } from "react-native"
import { act } from "react-test-renderer"
import { Button, Modal } from "react-native-paper"
import SettingsPanel from "../../src/components/Settings/SettingsPanel"
import { renderWithProviders, textContent } from "../utils/renderWithProviders"

const sections = [
  { heading: "First", body: "First body copy" },
  { heading: "Second", body: "Second body copy" }
]

const setup = (props: Partial<any> = {}) => {
  const onClose = jest.fn()
  const tree = renderWithProviders(
    <SettingsPanel
      isVisible
      title="About Tuneify"
      sections={sections}
      onClose={onClose}
      {...props}
    />
  )
  return { tree, onClose }
}

describe("SettingsPanel", () => {
  it("shows the panel title", () => {
    const { tree } = setup()
    expect(textContent(tree).join(" ")).toContain("About Tuneify")
  })

  it("renders every section heading", () => {
    const { tree } = setup()
    const text = textContent(tree).join(" ")
    expect(text).toContain("First")
    expect(text).toContain("Second")
  })

  it("renders every section body", () => {
    const { tree } = setup()
    const text = textContent(tree).join(" ")
    expect(text).toContain("First body copy")
    expect(text).toContain("Second body copy")
  })

  it("closes when the close button is pressed", () => {
    const { tree, onClose } = setup()
    const button = tree.root.findAllByType(Button)[0]
    act(() => {
      button.props.onPress()
    })
    expect(onClose).toHaveBeenCalled()
  })

  it("closes when the modal is dismissed", () => {
    const { tree, onClose } = setup()
    act(() => {
      tree.root.findAllByType(Modal)[0].props.onDismiss()
    })
    expect(onClose).toHaveBeenCalled()
  })

  it("is hidden when isVisible is false", () => {
    const { tree } = setup({ isVisible: false })
    expect(tree.root.findAllByType(Modal)[0].props.visible).toBe(false)
  })

  it("renders custom children alongside sections", () => {
    const { tree } = setup({
      sections: [],
      children: <Text>Custom control</Text>
    })
    expect(textContent(tree).join(" ")).toContain("Custom control")
  })

  it("renders with no sections at all", () => {
    expect(() => setup({ sections: [] })).not.toThrow()
  })
})
