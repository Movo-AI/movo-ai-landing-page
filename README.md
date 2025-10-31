# Movo AI Landing Page

A modern landing page for Movo AI, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

The following environment variables are required for the application to function properly:

### `NEXT_PUBLIC_API_BASE_URL`

The base URL for the backend API server. This is used by the contact form to submit data to the backend endpoint.

**Required**: Yes  
**Type**: String (URL)  
**Example**: `http://localhost:3001` or `https://api.example.com`

**Usage**:
The contact form (`/interest-form`) uses this environment variable to POST form submissions to `${NEXT_PUBLIC_API_BASE_URL}/api/trigger-call`.

If not set, the form defaults to `https://movo-backend-jet.vercel.app`.

**Setup**:
Create a `.env.local` file in the root directory (optional, only if you want to override the default):

```env
NEXT_PUBLIC_API_BASE_URL=https://movo-backend-jet.vercel.app
```

For production, you can set this in your deployment platform's environment variables if you need to override the default URL.

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never include sensitive information like API keys or secrets in these variables.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── interest-form/     # Contact form page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   └── ...               # Feature components
├── lib/                   # Utility functions
│   ├── phone.ts          # Phone number normalization utilities
│   └── utils.ts          # General utilities
└── public/               # Static assets
```

## Features

### Contact Form (`/interest-form`)

A beautiful, accessible contact form that:
- Validates user input client-side using Zod
- Requires first name, last name, and message
- Requires at least one of email or phone number
- Normalizes phone numbers to E.164 format using `libphonenumber-js`
- Submits data to backend API endpoint `/api/trigger-call`
- Shows toast notifications for success/error states
- Handles server errors gracefully with user-friendly messages

**Form Validation Rules:**
- First name: Required, max 50 characters (trimmed)
- Last name: Required, max 50 characters (trimmed)
- Email: Optional, must be valid RFC 5322 format if provided
- Phone: Optional, will be normalized to E.164 format if provided (includes country code hint)
- Message: Required, max 1000 characters (trimmed)
- At least one of email or phone must be provided

## Testing

Run tests with Vitest:

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui
```

## API Integration

The contact form integrates with a backend API endpoint:

**Endpoint**: `POST https://movo-backend-jet.vercel.app/api/trigger-call` (or `${NEXT_PUBLIC_API_BASE_URL}/api/trigger-call` if env var is set)

**Request Body**:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email_address": "john@example.com",  // Optional
  "phone_number": "+15551234567",        // Optional (E.164 format with country code)
  "message": "User's message"
}
```

**Success Response** (200):
The form will show a success toast and reset.

**Error Responses**:
- **4xx (Validation Errors)**: Field-level errors will be displayed
- **5xx (Server Errors)**: Generic error toast will be shown

## Phone Number Normalization

The application uses `libphonenumber-js` to normalize phone numbers to E.164 format before submission. If normalization fails, the original input is sent to the server for validation.

See `lib/phone.ts` for implementation details.

## Accessibility

The contact form includes:
- Proper semantic HTML and ARIA labels
- `aria-invalid` attributes for error states
- `aria-describedby` for error messages and hints
- Keyboard navigation support
- Screen reader friendly error messages

## Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## License

Private - All rights reserved.

