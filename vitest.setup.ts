import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/interest-form",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock environment variable - can be overridden in tests if needed
process.env.NEXT_PUBLIC_API_BASE_URL = "https://movo-backend-jet.vercel.app";

