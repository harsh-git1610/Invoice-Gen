# Project Status: Ongoing

## Implemented Features

### Authentication
- Initially implemented **custom authentication**
- Migrated to **Clerk**
- Supports **multiple authentication methods**:
  - Email verification / magic link
  - Email + password login

### Invoice Generation
- Created a **draft invoice generation page**
- Invoice creation flow is functional at a basic level

###  User Management
- Implemented **lazy user creation**
  - User records are created in the database only when required
  - Authentication handled by Clerk
  - User data synced from Clerk to the application database

## In Progress / Planned Features
- **Webhooks integration**
  - Planned flow: Clerk → Webhooks → Database
  - Will be used to sync user lifecycle events (sign-up, updates, etc.)

- **PDF Invoice Templates**
  - Currently designing and implementing PDF templates for invoices

## Tech Stack
- Next.js
- Clerk (Authentication)
- Database (TBD / PostgreSQL / MongoDB)
- PDF Generation (TBD)

## Current Focus
- Finalizing PDF invoice templates
- Improving authentication and user data synchronization logic

## Notes
- This project is under active development.
- Features and implementation details may change.
