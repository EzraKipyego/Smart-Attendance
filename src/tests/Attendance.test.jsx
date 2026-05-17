import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { vi } from "vitest"

import Attendance from "../pages/Attendance"

// MOCK CUSTOM HOOK
vi.mock("../hooks/useFetch", () => ({
  default: () => ({
    data: [
      {
        id: 1,
        sessionId: 1,
        studentName: "Ezra",
        date: "5/17/2026",
        time: "02:32 PM"
      }
    ],
    loading: false,
    error: null
  })
}))

describe("Attendance Page", () => {

  test("renders attendance title", () => {
    render(
      <BrowserRouter>
        <Attendance />
      </BrowserRouter>
    )

    expect(
      screen.getAllByText(/Attendance History/i)[0]
    ).toBeInTheDocument()
  })

  test("renders attendance record", () => {
    render(
      <BrowserRouter>
        <Attendance />
      </BrowserRouter>
    )

    expect(
      screen.getByText(/Ezra/i)
    ).toBeInTheDocument()
  })

})