import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { vi } from "vitest"

import Dashboard from "../pages/Dashboard"

// MOCK FIREBASE
vi.mock("../services/firebase", () => ({
  auth: {
    currentUser: {
      email: "test@gmail.com",
      displayName: "Test User"
    }
  }
}))

// MOCK FETCH
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: "React Session",
          status: "open"
        }
      ])
  })
)

describe("Dashboard Page", () => {

  test("renders dashboard title", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(
      await screen.findByText(/Available Sessions/i)
    ).toBeInTheDocument()
  })

})