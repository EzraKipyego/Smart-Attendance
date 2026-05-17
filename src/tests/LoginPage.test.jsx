import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage"

describe("Login Page", () => {

  test("renders google login button", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    expect(
      screen.getByText(/Sign in with Google/i)
    ).toBeInTheDocument()
  })

})