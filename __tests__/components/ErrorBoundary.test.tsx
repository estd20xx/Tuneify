import React from "react"
import { Text } from "react-native"
import ErrorBoundary from "../../src/components/Common/ErrorBoundary"
import { renderWithProviders, textContent } from "../utils/renderWithProviders"

const Boom = (): React.ReactElement => {
  throw new Error("kaboom")
}

describe("ErrorBoundary", () => {
  const original = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  afterAll(() => {
    console.error = original
  })

  it("renders children when nothing fails", () => {
    const tree = renderWithProviders(
      <ErrorBoundary>
        <Text>All good</Text>
      </ErrorBoundary>
    )
    expect(textContent(tree).join(" ")).toContain("All good")
  })

  it("shows a recovery screen when a child throws", () => {
    const tree = renderWithProviders(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(textContent(tree).join(" ")).toContain("Something went wrong")
  })

  it("reassures the user their library is safe", () => {
    const tree = renderWithProviders(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(textContent(tree).join(" ")).toContain("playlists are safe")
  })

  it("offers a retry action", () => {
    const tree = renderWithProviders(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(textContent(tree).join(" ")).toContain("Try again")
  })

  it("does not leak the raw error message to the user", () => {
    const tree = renderWithProviders(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(textContent(tree).join(" ")).not.toContain("kaboom")
  })
})
