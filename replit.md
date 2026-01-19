# PetBuddy - Pet Care Web Application

## Overview

PetBuddy is a beginner-friendly pet care web application designed for demo and academic purposes. It provides pet owners with features to shop for pet products, consult an AI veterinarian, book appointments with real vets, and manage multiple pet profiles. The application uses simulated authentication via localStorage rather than a real backend auth system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript (ESM modules)
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **API Design**: RESTful endpoints defined in shared routes file

### Authentication Strategy
- **Demo-only approach**: No real authentication system
- **Session Storage**: localStorage stores user object `{ name, loggedIn: true }`
- **Protected Routes**: React components check localStorage for user presence
- **Rationale**: Academic/demo project requiring simplicity over security

### Data Persistence
- **User Data**: localStorage for user session, pet profiles, bookings, and cart
- **Database Schema**: Drizzle ORM with PostgreSQL configured but used minimally
- **Migration**: Drizzle Kit for schema management when needed

### API Structure
- Single mock endpoint: `POST /api/chat` for AI veterinarian feature
- Response returns random pre-defined veterinary advice
- Shared route definitions with Zod schemas for type safety

### Key Design Patterns
- **Shared Types**: `/shared` directory contains schemas and route definitions used by both client and server
- **Component Library**: shadcn/ui components in `/client/src/components/ui`
- **Path Aliases**: `@/` for client source, `@shared/` for shared code

## External Dependencies

### UI Components
- Radix UI primitives (dialog, popover, select, tabs, etc.)
- Lucide React for icons
- Embla Carousel for carousels
- cmdk for command palette

### Database (Configured but minimal usage)
- PostgreSQL via `DATABASE_URL` environment variable
- Drizzle ORM for type-safe database operations
- connect-pg-simple for session storage capability

### Development
- Vite dev server with HMR
- Replit-specific plugins for error overlay and dev banner
- TypeScript with strict mode enabled

### Currency
- All product prices displayed in Indian Rupees (₹)