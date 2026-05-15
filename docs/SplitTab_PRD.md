# Product Requirements Document (PRD)

# SplitTab

---

## Table of Contents

1. Overview
2. Objectives
3. Scope
4. User Personas
5. Features
6. UI/UX Requirements
7. Technical Architecture
8. Content & Data Requirements
9. Non-Functional Requirements
10. Assumptions & Constraints
11. Milestones & Phases
12. API Requirements
13. Analytics & Monitoring
14. Security & Privacy
15. Future Enhancements
16. Appendix

---

# 1. Overview

**Product Name:** SplitTab  
**Type:** Mobile application for shared household expense tracking using receipt scanning  
**Target Users:** Households, roommates, couples, and shared grocery groups  
**Launch Version:** Minimum Viable Product (MVP)

SplitTab allows users to scan grocery receipts using their phone camera, automatically extract receipt details, identify the payer using the last 4 digits of the payment card, and split expenses among household members.

The goal of the MVP is to reduce manual expense entry and simplify household expense tracking.

---

# 2. Objectives

- Reduce manual expense entry for shared groceries
- Automatically identify who paid for a purchase
- Simplify equal expense splitting among household members
- Track balances between users
- Provide a fast mobile-first scanning workflow
- Maintain privacy by storing only the last 4 digits of cards

---

# 3. Scope

## In Scope

- Mobile app for iOS and Android
- Camera-based receipt scanning
- OCR text extraction
- Receipt parsing
- Card last-4 detection
- Household member management
- Expense splitting
- Receipt history
- Balance tracking
- Card-to-user mapping

## Out of Scope (MVP)

- Bank integrations
- Direct payment integrations (Venmo/Zelle)
- AI-based item categorization
- Item-level splitting
- Multi-household organizations
- Desktop/web application
- App store deployment

---

# 4. User Personas

## Persona 1 — Household Member

- Buys shared groceries
- Wants quick receipt scanning
- Wants automatic splitting
- Uses phone frequently
- Does not want manual calculations

## Persona 2 — Household Organizer

- Tracks balances across members
- Reviews receipt history
- Verifies who paid for purchases
- Wants spending transparency

---

# 5. Features

## Core MVP Features

### Receipt Scanning

- Open phone camera
- Capture receipt image
- Auto-crop and optimize receipt image
- Upload image for OCR processing

### OCR Extraction

Extract:

- Store name
- Total amount
- Date
- Last 4 card digits

### Card Mapping

- Map last 4 digits to household members
- Save mappings for future scans
- Allow manual override of payer

### Expense Splitting

- Equal split among selected household members
- Automatic balance calculations
- Exclude members if needed

### Receipt History

- View previous receipts
- View payer information
- View split details
- View totals and timestamps

### Balance Tracking

- Track who owes whom
- Running household balance summary
- Monthly spending totals

---

# 6. UI/UX Requirements

## Design Principles

- Mobile-first layout
- Fast scanning workflow
- Minimal manual typing
- Simple navigation
- Clean financial dashboard

## Core Screens

### Home Dashboard

- Current balances
- Recent receipts
- Quick scan button

### Scan Screen

- Live camera preview
- Capture button
- OCR loading state

### Receipt Confirmation Screen

- Store name
- Total amount
- Detected payer
- Household member selection
- Confirm split button

### Receipt History Screen

- List of receipts
- Filter by month/user
- View split details

### Settings Screen

- Household members
- Card mappings
- User preferences

---

# 7. Technical Architecture

```text
React Native + Expo (Mobile App)
   ↓
Supabase API + Authentication
   ↓
PostgreSQL Database
   ↓
Supabase Storage (Receipt Images)
   ↓
OCR Service / ML Kit
```

## Frontend

- React Native
- Expo
- Expo Router or React Navigation

## Backend Services

- Supabase
- PostgreSQL
- Supabase Storage

## OCR Options

### MVP

- OCR.space API or Google Vision API

### Future Improvement

- Google ML Kit on-device OCR

---

# 8. Content & Data Requirements

## User

- id
- name
- email

## Household

- id
- household_name

## Household Member

- id
- household_id
- user_id

## Card Mapping

- id
- user_id
- card_last4

## Receipt

- id
- household_id
- image_url
- store_name
- total_amount
- purchase_date
- payer_user_id
- created_at

## Receipt Split

- id
- receipt_id
- user_id
- amount_owed

---

# 9. Non-Functional Requirements

## Performance

- Receipt scan flow under 10 seconds
- Fast dashboard loading
- Optimized image uploads

## Scalability

- Support multiple households
- Handle thousands of receipts
- Separate storage from database

## Reliability

- Prevent duplicate receipts
- Graceful OCR failure handling
- Offline-safe UI states where possible

## Maintainability

- Modular folder structure
- Reusable components
- Clear API separation

---

# 10. Assumptions & Constraints

- Users scan physical receipts using mobile phones
- Receipts usually contain card last-4 digits
- Equal splitting is sufficient for MVP
- OCR accuracy will vary across stores
- Internet connection required for initial OCR implementation

---

# 11. Milestones & Phases

## Phase 1 — Planning & Setup

- PRD
- Project plan
- Sprint planning
- Expo project setup
- Supabase setup

## Phase 2 — Camera & OCR

- Camera integration
- Receipt capture
- OCR integration
- Text extraction

## Phase 3 — Receipt Parsing

- Detect total amount
- Detect card last 4
- Extract store name
- Extract date

## Phase 4 — Household Features

- Add household members
- Card mapping system
- Payer assignment

## Phase 5 — Expense Splitting

- Equal split calculations
- Balance tracking
- Receipt history

## Phase 6 — Hardening & Cleanup

- Error handling
- UI polish
- Testing
- Documentation

---

# 12. API Requirements

## OCR Service

### Input

- Receipt image

### Output

- OCR text
- confidence score

## Internal App Logic

### Receipt Parsing

- Detect totals
- Detect card digits
- Detect store names

---

# 13. Analytics & Monitoring

## Metrics

- Number of scans
- OCR success rate
- Receipt confirmation rate
- Active households

## Error Monitoring

- OCR failures
- Upload failures
- Parsing failures

---

# 14. Security & Privacy

## Privacy Rules

- Never store full card numbers
- Store only last 4 digits
- Restrict household data access
- Use authenticated requests

## Security

- Supabase authentication
- Secure API keys
- HTTPS enforcement
- Row-level security policies

---

# 15. Future Enhancements

## Future Features

- Item-level splitting
- AI-assisted receipt parsing
- Settlement reminders
- Venmo/Zelle integrations
- Budget analytics
- Multi-household support
- Shared notifications
- Offline OCR

---

# 16. Appendix

## Glossary

- OCR: Optical Character Recognition
- MVP: Minimum Viable Product
- CRUD: Create, Read, Update, Delete
- API: Application Programming Interface

---

_End of PRD_

