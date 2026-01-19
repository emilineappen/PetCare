## Packages
framer-motion | For smooth page transitions and micro-interactions
react-hook-form | Form state management
@hookform/resolvers | Zod integration for forms
clsx | Conditional class names utility
tailwind-merge | Utility for merging tailwind classes

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}
Authentication is simulated via localStorage.
Data persistence for profile and bookings is simulated via localStorage.
AI Chat connects to /api/chat endpoint.
