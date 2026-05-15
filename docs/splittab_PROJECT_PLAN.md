# Project Plan — SplitTab

---

## Table of Contents

1. Overview
2. Project Goals
3. Deliverables
4. Timeline & Milestones
5. Phases Breakdown
6. Tasks by Role
7. Dependencies
8. Risks & Mitigations
9. Scalability Considerations
10. Glossary

---

# 1. Overview

This project plan defines the schedule, deliverables, and implementation phases required to build the SplitTab mobile application.

SplitTab is a mobile-first household expense tracking application that allows users to scan receipts, automatically identify the payer using card last-4 digits, and split shared expenses among household members.

The project focuses on delivering a clean MVP with scalable foundations for future growth.

---

# 2. Project Goals

- Build a fast mobile-first receipt scanning workflow
- Reduce manual household expense tracking
- Automatically identify receipt payer using card last-4 mapping
- Enable equal shared expense splitting
- Provide household balance tracking
- Build scalable architecture for future enhancements

---

# 3. Deliverables

## Mobile Application

- React Native + Expo mobile app
- Camera-based receipt scanning
- OCR receipt text extraction
- Receipt parsing workflow
- Household member management
- Balance tracking dashboard
- Receipt history screen

## Backend & Database

- Supabase authentication
- PostgreSQL database schema
- Secure household data access
- Receipt storage
- Card mapping system

## OCR Integration

- OCR API integration
- Receipt parsing logic
- Error handling workflows

## Hardening

- Error handling
- Security rules
- Testing and debugging
- Documentation

---

# 4. Timeline & Milestones

| Phase | Estimated Duration | Key Deliverables |
|---|---|---|
| Phase 1 | 3–5 days | Planning, setup, architecture |
| Phase 2 | 5–7 days | Mobile app foundation |
| Phase 3 | 5–7 days | Camera + OCR integration |
| Phase 4 | 5–7 days | Receipt parsing and mapping |
| Phase 5 | 5–7 days | Expense splitting + balances |
| Phase 6 | 3–5 days | Testing and polish |
| Total | ~4–6 weeks | MVP application |

---

# 5. Phases Breakdown

## Phase 1 — Planning & Project Setup

### Goals

- Finalize project planning
- Create development environment
- Configure Supabase
- Define folder structure
- Prepare database schema

### Tasks

- [ ] Finalize PRD
- [ ] Finalize project plan
- [ ] Finalize sprint planning
- [ ] Create Expo app
- [ ] Create GitHub repository
- [ ] Configure ESLint + Prettier
- [ ] Create Supabase project
- [ ] Configure environment variables
- [ ] Create initial DB schema

### Deliverable

- Running mobile app skeleton with connected backend

---

## Phase 2 — Mobile App Foundation

### Goals

Build the foundational mobile app structure and navigation.

### Tasks

- [ ] Setup React Navigation or Expo Router
- [ ] Create screen structure
- [ ] Create reusable UI components
- [ ] Create dashboard screen
- [ ] Create receipt history screen
- [ ] Create settings screen
- [ ] Create household member screens
- [ ] Configure app theme and styling

### Deliverable

- Functional mobile app navigation and UI skeleton

---

## Phase 3 — Camera & OCR Integration

### Goals

Enable receipt scanning and OCR extraction.

### Tasks

- [ ] Integrate Expo Camera
- [ ] Request camera permissions
- [ ] Capture receipt image
- [ ] Compress and optimize images
- [ ] Upload image to OCR service
- [ ] Extract OCR text
- [ ] Handle OCR loading/error states

### Deliverable

- Receipt image scanning with OCR text extraction

---

## Phase 4 — Receipt Parsing & Card Mapping

### Goals

Extract structured data from OCR text and identify the payer.

### Tasks

- [ ] Detect total amount
- [ ] Detect store name
- [ ] Detect purchase date
- [ ] Detect card last-4 digits
- [ ] Build regex parsing utilities
- [ ] Create payer confirmation screen
- [ ] Create card mapping workflow
- [ ] Save card mappings to database

### Deliverable

- Parsed receipt data with automatic payer detection

---

## Phase 5 — Expense Splitting & Balances

### Goals

Implement household expense splitting and balance tracking.

### Tasks

- [ ] Create split calculation utilities
- [ ] Implement equal split workflow
- [ ] Add member inclusion/exclusion
- [ ] Save receipt split records
- [ ] Calculate balances between users
- [ ] Create receipt detail screen
- [ ] Create household balance dashboard

### Deliverable

- Functional shared expense tracking system

---

## Phase 6 — Hardening, Testing & Cleanup

### Goals

Prepare MVP for stable usage.

### Tasks

- [ ] Handle OCR failures gracefully
- [ ] Add duplicate receipt protection
- [ ] Improve loading states
- [ ] Optimize image uploads
- [ ] Add form validation
- [ ] Test on Android and iOS
- [ ] Clean codebase
- [ ] Finalize documentation

### Deliverable

- Stable MVP application

---

# 6. Tasks by Role

## Frontend Developer

- Build mobile UI
- Implement navigation
- Handle camera integration
- Connect frontend to Supabase
- Build receipt confirmation workflows

## Backend / Database

- Design database schema
- Configure Supabase
- Create row-level security rules
- Store receipts and splits
- Handle authentication

## OCR & Parsing

- Integrate OCR service
- Create parsing logic
- Handle parsing edge cases
- Improve extraction reliability

---

# 7. Dependencies

- Expo account
- Supabase account
- OCR API provider
- GitHub repository
- Android/iPhone testing device
- Stable internet connection for OCR requests

---

# 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| OCR inaccuracies | High | Add confirmation screen and manual edits |
| Missing card digits on receipts | Medium | Allow manual payer selection |
| Different receipt formats | High | Use flexible parsing rules |
| Large image uploads | Medium | Compress images before upload |
| OCR API costs | Medium | Move to ML Kit on-device OCR later |
| Duplicate receipts | Medium | Add duplicate detection logic |
| Privacy concerns | High | Store only card last-4 digits |

---

# 9. Scalability Considerations

## Storage

- Store images separately from database
- Use cloud storage for receipt images
- Compress uploads before storage

## OCR Scalability

- Move toward on-device OCR for lower cost
- Cache OCR results
- Avoid repeated processing

## Database Scalability

- Use indexed relational tables
- Separate household data securely
- Use row-level security

## Future Backend Scaling

Potential future additions:

- Node.js backend
- OCR processing queues
- Analytics pipeline
- Notification system

---

# 10. Glossary

- OCR: Optical Character Recognition
- MVP: Minimum Viable Product
- CRUD: Create, Read, Update, Delete
- API: Application Programming Interface
- RLS: Row Level Security

---

_End of Project Plan_

