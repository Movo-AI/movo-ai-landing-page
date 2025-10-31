import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InterestFormPage from "./page";

// Mock sonner toast
const mockToastSuccess = vi.fn();
const mockToastError = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    success: (...args: any[]) => mockToastSuccess(...args),
    error: (...args: any[]) => mockToastError(...args),
  },
}));

// Mock phone normalization
vi.mock("@/lib/phone", () => ({
  normalizePhoneNumber: (phone: string) => {
    // Simple mock - return phone as-is or add +1 if not present
    if (phone && !phone.startsWith("+")) {
      return `+1${phone.replace(/\D/g, "")}`;
    }
    return phone;
  },
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("InterestFormPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it("prevents submit when both email and phone are empty", async () => {
    const user = userEvent.setup();
    render(<InterestFormPage />);

    // Fill required fields but leave email and phone empty
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/message/i), "Test message");

    // Try to submit
    const submitButton = screen.getByRole("button", { name: /send message/i });
    await user.click(submitButton);

    // Form should not submit (no fetch call)
    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });

    // Error message should be shown
    expect(
      screen.getByText(/at least one of email or phone number is required/i)
    ).toBeInTheDocument();
  });

  it("sends POST when email is present", async () => {
    const user = userEvent.setup();
    render(<InterestFormPage />);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    // Fill all fields including email
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Test message");

    const submitButton = screen.getByRole("button", { name: /send message/i });
    await user.click(submitButton);

    // Wait for form submission
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://movo-backend-jet.vercel.app/api/trigger-call",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: "John",
          last_name: "Doe",
          email_address: "john@example.com",
          message: "Test message",
        }),
      })
    );
  });

  it("sends POST when phone is present", async () => {
    const user = userEvent.setup();
    render(<InterestFormPage />);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    // Fill all fields including phone
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/phone number/i), "+15551234567");
    await user.type(screen.getByLabelText(/message/i), "Test message");

    const submitButton = screen.getByRole("button", { name: /send message/i });
    await user.click(submitButton);

    // Wait for form submission
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://movo-backend-jet.vercel.app/api/trigger-call",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: "John",
          last_name: "Doe",
          phone_number: "+15551234567",
          message: "Test message",
        }),
      })
    );
  });

  it("disables button while awaiting response", async () => {
    const user = userEvent.setup();
    render(<InterestFormPage />);

    // Mock a delayed response
    let resolveFetch: () => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = () =>
        resolve({
          ok: true,
          status: 200,
          json: async () => ({}),
        });
    });

    mockFetch.mockReturnValueOnce(fetchPromise);

    // Fill all fields
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Test message");

    const submitButton = screen.getByRole("button", { name: /send message/i });
    await user.click(submitButton);

    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
    });

    // Resolve the fetch
    resolveFetch!();

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("handles 5xx server errors", async () => {
    const user = userEvent.setup();
    render(<InterestFormPage />);

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ message: "Internal server error" }),
    });

    // Fill all fields
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Test message");

    const submitButton = screen.getByRole("button", { name: /send message/i });
    await user.click(submitButton);

    // Wait for error handling
    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        "Something went wrong—please try again."
      );
    });
  });

  it("handles validation errors (4xx) with field-level errors", async () => {
    const user = userEvent.setup();
    render(<InterestFormPage />);

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({
        errors: {
          email: "Email is already in use",
        },
      }),
    });

    // Fill all fields
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Test message");

    const submitButton = screen.getByRole("button", { name: /send message/i });
    await user.click(submitButton);

    // Wait for error to be set on field
    await waitFor(() => {
      expect(screen.getByText("Email is already in use")).toBeInTheDocument();
    });
  });
});

