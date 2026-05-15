<!-- @format -->

# Project Phases & Sprints — SplitTab

---

## Purpose of This Document

This document breaks SplitTab into small, clear development sprints. It is designed so each sprint can be copied into an AI coding assistant as context for focused implementation.

Each sprint includes:

- Goal
- Context
- Tasks
- Acceptance Criteria
- AI Iteration Prompt

---

## Project Summary

**SplitTab** is a mobile application for shared household expense tracking. Users scan grocery receipts with their phone camera, extract receipt details using OCR, identify the payer using the last 4 digits of the payment card, and split the expense among household members.

### Recommended Tech Stack

- **Mobile App:** React Native + Expo
- **Navigation:** Expo Router or React Navigation
- **Camera:** Expo Camera
- **OCR:** OCR API for MVP, Google ML Kit later
- **Backend:** Supabase
- **Database:** Supabase PostgreSQL
- **Storage:** Supabase Storage
- **Authentication:** Supabase Auth

---

# Phase 1 — Project Setup & Foundation

**Goal:** Create the base mobile app, repository, tooling, Supabase project, and folder structure.

---

## Sprint 1.1 — Repository & Expo Setup

### Goal

Create a working Expo React Native application with a clean project structure.

### Context

This is the foundation sprint. Do not add major business logic yet. The goal is to make sure the app runs locally and can be tested on a real phone using Expo Go.

### Tasks

- [x] Create GitHub repository
- [x] Create Expo app
- [x] Confirm app runs with `npx expo start`
- [x] Test app on phone using Expo Go
- [x] Add `.gitignore`
- [x] Add `README.md`
- [x] Add `.env.example`
- [x] Choose navigation approach: Expo Router or React Navigation
- [x] Create base folder layout:

```text
/app
/components
/lib
/hooks
/utils
/types
/assets
/docs
```

### Acceptance Criteria

- App runs successfully on phone
- Repository contains clean folder structure
- README explains how to start the app
- Environment variable example file exists

### AI Iteration Prompt

```text
I am building SplitTab, a React Native + Expo mobile app for scanning receipts and splitting household expenses. For this sprint, help me set up the base Expo project structure only. Do not implement receipt scanning yet. Create a clean folder structure, README, env example, and basic starter screen. Prioritize clarity and maintainability.
```

---

## Sprint 1.2 — Styling, Theme & Shared Components

### Goal

Create basic reusable UI components and app styling standards.

### Context

SplitTab should feel simple, clean, and mobile-first. The UI does not need to be perfect yet, but reusable components should reduce repeated code later.

### Tasks

- [ ] Define app colors
- [ ] Define spacing and typography constants
- [ ] Create reusable `Button` component
- [ ] Create reusable `Card` component
- [ ] Create reusable `ScreenContainer` component
- [ ] Create reusable `Input` component
- [ ] Create reusable `LoadingState` component
- [ ] Create reusable `ErrorMessage` component

### Acceptance Criteria

- App has consistent styling constants
- At least 5 reusable components exist
- Components are used on the starter screen

### AI Iteration Prompt

```text
I am building SplitTab in React Native + Expo. Help me create a simple design system with reusable components: Button, Card, ScreenContainer, Input, LoadingState, and ErrorMessage. Keep styling clean and mobile-first. Do not add backend logic yet.
```

---

## Sprint 1.3 — Supabase Project Setup

### Goal

Connect the mobile app to Supabase and prepare the backend foundation.

### Context

Supabase will handle authentication, database, and storage. This sprint should only establish the connection and configuration.

### Tasks

- [ ] Create Supabase project
- [ ] Add Supabase URL and anon key to environment variables
- [ ] Install Supabase client package
- [ ] Create `/lib/supabase.ts`
- [ ] Verify Supabase connection from app
- [ ] Document Supabase setup in README

### Acceptance Criteria

- Supabase client is configured
- App can import Supabase client without errors
- Environment variables are not hardcoded
- Setup steps are documented

### AI Iteration Prompt

```text
I am building SplitTab with React Native + Expo and Supabase. Help me configure Supabase safely using environment variables. Create a reusable Supabase client file and update the README with setup instructions. Do not create database tables yet unless needed for connection testing.
```

---

# Phase 2 — Authentication & Household Foundation

**Goal:** Add basic users, households, and member structure.

---

## Sprint 2.1 — Authentication Screens

### Goal

Create sign up, login, and logout flows using Supabase Auth.

### Context

Users need accounts so receipts and balances can be tied to the correct household. Keep the flow simple for MVP.

### Tasks

- [ ] Create login screen
- [ ] Create signup screen
- [ ] Add email/password authentication
- [ ] Add logout action
- [ ] Persist session
- [ ] Redirect authenticated users to dashboard
- [ ] Redirect unauthenticated users to login

### Acceptance Criteria

- User can sign up
- User can log in
- User can log out
- Session remains after app refresh
- Protected screens are not visible when logged out

### AI Iteration Prompt

```text
I am building SplitTab with React Native + Expo and Supabase Auth. Implement basic email/password signup, login, logout, session persistence, and protected routes. Keep UI simple and use the existing shared components.
```

---

## Sprint 2.2 — Database Schema v1

### Goal

Create the initial database tables for users, households, members, card mappings, receipts, and splits.

### Context

The database should support one household per user for MVP, but should not block future multi-household support.

### Tasks

- [ ] Create `profiles` table
- [ ] Create `households` table
- [ ] Create `household_members` table
- [ ] Create `card_mappings` table
- [ ] Create `receipts` table
- [ ] Create `receipt_splits` table
- [ ] Add foreign keys
- [ ] Add timestamps
- [ ] Add useful indexes
- [ ] Enable Row Level Security

### Suggested Tables

```sql
profiles
- id uuid primary key references auth.users(id)
- full_name text
- created_at timestamp

households
- id uuid primary key
- name text
- created_by uuid references profiles(id)
- created_at timestamp

household_members
- id uuid primary key
- household_id uuid references households(id)
- user_id uuid references profiles(id)
- display_name text
- created_at timestamp

card_mappings
- id uuid primary key
- household_id uuid references households(id)
- user_id uuid references profiles(id)
- card_last4 text
- nickname text
- created_at timestamp

receipts
- id uuid primary key
- household_id uuid references households(id)
- payer_user_id uuid references profiles(id)
- store_name text
- total_amount numeric
- purchase_date date
- card_last4 text
- image_url text
- raw_ocr_text text
- created_at timestamp

receipt_splits
- id uuid primary key
- receipt_id uuid references receipts(id)
- user_id uuid references profiles(id)
- amount_owed numeric
- created_at timestamp
```

### Acceptance Criteria

- Database tables exist
- Relationships are defined
- RLS is enabled
- Schema is documented in `/docs/database.md`

### AI Iteration Prompt

```text
I am building SplitTab with Supabase PostgreSQL. Help me create the MVP database schema for profiles, households, household_members, card_mappings, receipts, and receipt_splits. Include foreign keys, indexes, timestamps, and basic Row Level Security policies. Also create documentation for the schema.
```

---

## Sprint 2.3 — Household Member Management

### Goal

Allow a user to create a household and add household members.

### Context

For MVP, household members can be simple display names even if they do not have their own login yet. This makes testing easier.

### Tasks

- [ ] Create household setup screen
- [ ] Create add member form
- [ ] Display household member list
- [ ] Allow deleting a member if they have no receipt history
- [ ] Store members in Supabase
- [ ] Add simple empty state

### Acceptance Criteria

- User can create a household
- User can add members by display name
- User can view household members
- Member data is saved in Supabase

### AI Iteration Prompt

```text
I am building SplitTab. Implement household setup and household member management using Supabase. For MVP, members can be simple display names and do not need their own login. Create screens to add and list members. Use the existing app components and database schema.
```

---

# Phase 3 — Camera & Receipt Capture

**Goal:** Enable users to scan receipts using their phone camera.

---

## Sprint 3.1 — Camera Screen

### Goal

Create the receipt scanning screen using Expo Camera.

### Context

The first scanning version only needs to capture an image. Advanced edge detection can come later.

### Tasks

- [ ] Install Expo Camera
- [ ] Request camera permission
- [ ] Show camera preview
- [ ] Add capture button
- [ ] Show captured image preview
- [ ] Allow retake
- [ ] Allow continue to OCR step

### Acceptance Criteria

- Camera opens on real phone
- User can capture receipt image
- User can retake image
- Captured image can be passed to next screen

### AI Iteration Prompt

```text
I am building SplitTab in React Native + Expo. Implement a receipt camera screen using Expo Camera. It should request camera permission, show a camera preview, capture a receipt image, show a preview, allow retake, and allow continuing to the OCR step. Do not implement OCR yet.
```

---

## Sprint 3.2 — Image Handling & Storage

### Goal

Prepare captured receipt images for upload and storage.

### Context

Receipt images should not be stored directly in the database. Store image files in Supabase Storage and save URLs in the database.

### Tasks

- [ ] Compress image before upload
- [ ] Create Supabase Storage bucket
- [ ] Upload receipt image
- [ ] Return public or signed image URL
- [ ] Handle upload loading state
- [ ] Handle upload failure state

### Acceptance Criteria

- Captured image uploads to Supabase Storage
- Image URL can be saved for a receipt
- Upload errors are shown clearly

### AI Iteration Prompt

```text
I am building SplitTab. Help me upload captured receipt images from a React Native + Expo app to Supabase Storage. Compress images before upload if possible. Return a usable image URL and handle loading/error states. Do not implement OCR parsing yet.
```

---

# Phase 4 — OCR & Receipt Parsing

**Goal:** Convert receipt images into structured receipt data.

---

## Sprint 4.1 — OCR Integration

### Goal

Send a captured receipt image to an OCR service and get back raw text.

### Context

For MVP, use an OCR API because it is simpler than native on-device OCR. Later, this can be replaced with ML Kit.

### Tasks

- [ ] Choose OCR provider
- [ ] Create OCR helper function
- [ ] Send image to OCR provider
- [ ] Receive raw OCR text
- [ ] Store raw OCR text temporarily
- [ ] Display OCR text for debugging
- [ ] Handle OCR errors

### Acceptance Criteria

- Receipt image produces OCR text
- OCR text is visible in debug/dev mode
- OCR failure does not crash app

### AI Iteration Prompt

```text
I am building SplitTab. Implement OCR integration for a captured receipt image. Use a simple OCR API for MVP. Create a reusable OCR helper function that returns raw text. Show loading, success, and error states. Keep API keys out of the client if the provider requires secret keys.
```

---

## Sprint 4.2 — Receipt Parser v1

### Goal

Extract total amount, store name, purchase date, and card last-4 digits from raw OCR text.

### Context

Parsing should be rule-based for MVP. The user will confirm and correct the detected values before saving.

### Tasks

- [ ] Create `/utils/receiptParser.ts`
- [ ] Parse total amount
- [ ] Parse card last-4 digits
- [ ] Parse possible date
- [ ] Parse possible store name
- [ ] Add confidence or warning flags
- [ ] Create parser test examples

### Suggested Parsing Rules

- Prefer lines containing `TOTAL`, `AMOUNT`, `BALANCE`, or `SALE`
- Ignore lines containing `SUBTOTAL` when detecting final total
- Detect card patterns like `****1234`, `VISA 1234`, `CARD 1234`
- Use first few non-empty lines as store name candidates

### Acceptance Criteria

- Parser returns structured object:

```ts
{
  storeName?: string;
  totalAmount?: number;
  purchaseDate?: string;
  cardLast4?: string;
  warnings: string[];
}
```

- Parser works on at least 5 sample OCR texts
- Parser never crashes on bad text

### AI Iteration Prompt

```text
I am building SplitTab. Create a TypeScript receipt parser that takes raw OCR text and extracts storeName, totalAmount, purchaseDate, and cardLast4. Use rule-based parsing and regex. Include warnings when fields are missing or uncertain. Add sample test cases with realistic receipt text.
```

---

## Sprint 4.3 — Receipt Confirmation Screen

### Goal

Allow users to review and correct parsed receipt data before saving.

### Context

OCR and parsing will not always be accurate. A confirmation screen is essential for trust and usability.

### Tasks

- [ ] Create receipt confirmation screen
- [ ] Show parsed store name
- [ ] Show parsed total amount
- [ ] Show parsed date
- [ ] Show parsed card last-4
- [ ] Allow manual editing
- [ ] Show parser warnings
- [ ] Continue to payer mapping/splitting step

### Acceptance Criteria

- User can correct all parsed fields
- Missing fields are clearly shown
- App does not save receipt until user confirms

### AI Iteration Prompt

```text
I am building SplitTab. Implement a receipt confirmation screen that receives parsed OCR results and allows the user to edit store name, total amount, purchase date, and card last-4 before saving. Show parser warnings clearly. Do not finalize split logic yet.
```

---

# Phase 5 — Card Mapping & Payer Detection

**Goal:** Map card last-4 digits to household members and identify who paid.

---

## Sprint 5.1 — Card Mapping System

### Goal

Create a system that links card last-4 digits to household members.

### Context

Only store the last 4 digits. Never store full card numbers.

### Tasks

- [ ] Create card mapping screen
- [ ] Add new card mapping form
- [ ] Select household member
- [ ] Store `card_last4`
- [ ] Validate exactly 4 digits
- [ ] Display saved mappings
- [ ] Allow deleting mappings

### Acceptance Criteria

- User can map card last-4 to a member
- App validates card last-4 format
- Mapping is saved in Supabase
- Full card numbers are never requested

### AI Iteration Prompt

```text
I am building SplitTab. Implement card mapping where a household member can be linked to a card's last 4 digits only. Add validation, list existing mappings, create mappings, and delete mappings. Do not request or store full card numbers.
```

---

## Sprint 5.2 — Unknown Card Mapping Flow

### Goal

When a scanned card last-4 is unknown, ask the user who it belongs to and save the mapping.

### Context

This makes the app smarter over time. The user should only need to map a card once.

### Tasks

- [ ] Check scanned `cardLast4` against existing mappings
- [ ] Auto-select payer if known
- [ ] Show unknown card prompt if not known
- [ ] Let user choose household member
- [ ] Save mapping after confirmation
- [ ] Allow user to skip mapping
- [ ] Always allow payer override

### Acceptance Criteria

- Known card last-4 auto-selects payer
- Unknown card last-4 asks for owner
- Saved unknown mapping works next time
- Payer can always be changed manually

### AI Iteration Prompt

```text
I am building SplitTab. Implement the payer detection flow. If a scanned card last-4 matches a saved card mapping, auto-select the payer. If it is unknown, prompt the user to choose a household member and optionally save the mapping. Always allow manual payer override.
```

---

# Phase 6 — Expense Splitting & Receipt Saving

**Goal:** Split confirmed receipts among selected members and save the final expense.

---

## Sprint 6.1 — Equal Split Calculator

### Goal

Create utilities for equal expense splitting.

### Context

MVP only supports equal splitting. Item-level splitting will come later.

### Tasks

- [ ] Create `/utils/splitCalculator.ts`
- [ ] Accept total amount and selected members
- [ ] Calculate amount owed per member
- [ ] Handle rounding to cents
- [ ] Ensure split amounts add up to total
- [ ] Add test cases

### Acceptance Criteria

- Split calculator works for 2+ members
- Rounding errors are handled
- Total of split amounts equals receipt total

### AI Iteration Prompt

```text
I am building SplitTab. Create a TypeScript equal split calculator that takes a total amount and selected household members and returns exact per-member amounts. Handle cents rounding so the split amounts always add up to the original total. Add test examples.
```

---

## Sprint 6.2 — Split Selection Screen

### Goal

Allow users to choose who participates in a receipt split.

### Context

Sometimes not every household member shares a receipt. The user should be able to include or exclude people.

### Tasks

- [ ] Create split selection screen
- [ ] Display all household members
- [ ] Default all members selected
- [ ] Allow selecting/deselecting members
- [ ] Show calculated amount per person
- [ ] Require at least 1 selected member
- [ ] Show payer clearly

### Acceptance Criteria

- User can choose split participants
- Per-person amount updates correctly
- User cannot save invalid split

### AI Iteration Prompt

```text
I am building SplitTab. Implement the split selection screen. Show household members with checkboxes/toggles, default everyone selected, calculate equal split amounts, and clearly show who paid. Prevent saving if no members are selected.
```

---

## Sprint 6.3 — Save Receipt & Splits

### Goal

Save confirmed receipt data and calculated split records to Supabase.

### Context

Receipt saving should be reliable. Receipt and split records should stay consistent.

### Tasks

- [ ] Insert receipt record
- [ ] Insert receipt split records
- [ ] Save payer user ID
- [ ] Save image URL if available
- [ ] Save raw OCR text if available
- [ ] Handle save loading state
- [ ] Handle save errors
- [ ] Redirect to receipt detail or dashboard after save

### Acceptance Criteria

- Receipt is saved in Supabase
- Split records are saved correctly
- Receipt history updates after save
- Failed save does not create partial confusing UI state

### AI Iteration Prompt

```text
I am building SplitTab. Implement saving a confirmed receipt and its split records to Supabase. Insert the receipt first, then insert receipt_splits. Include payer_user_id, household_id, total, store, date, card_last4, image_url, and raw_ocr_text. Add loading and error handling.
```

---

# Phase 7 — Dashboard, History & Balances

**Goal:** Let users view previous receipts and understand who owes whom.

---

## Sprint 7.1 — Receipt History

### Goal

Create a receipt history screen that lists saved receipts.

### Context

Users need to review past grocery purchases and verify saved splits.

### Tasks

- [ ] Fetch receipts for current household
- [ ] Display store name, total, payer, and date
- [ ] Sort newest first
- [ ] Add empty state
- [ ] Add receipt detail navigation
- [ ] Add basic loading/error states

### Acceptance Criteria

- Saved receipts appear in history
- New receipts appear after saving
- User can tap a receipt to view details

### AI Iteration Prompt

```text
I am building SplitTab. Implement receipt history using Supabase. Fetch receipts for the current household, sort newest first, display store name, total, payer, and date, and allow navigation to a receipt detail screen.
```

---

## Sprint 7.2 — Receipt Detail Screen

### Goal

Show full details for one receipt.

### Context

Users should be able to inspect how a receipt was split.

### Tasks

- [ ] Fetch receipt by ID
- [ ] Fetch associated split records
- [ ] Display store, total, date, payer
- [ ] Display each member's owed amount
- [ ] Display receipt image if available
- [ ] Display raw OCR text in developer/debug mode if needed

### Acceptance Criteria

- Receipt detail screen shows correct data
- Split records are easy to understand
- Image preview works if image exists

### AI Iteration Prompt

```text
I am building SplitTab. Implement a receipt detail screen that fetches a receipt and its split records from Supabase. Show store, date, total, payer, each member's owed amount, and the receipt image if available.
```

---

## Sprint 7.3 — Balance Calculation

### Goal

Calculate household balances from saved receipts and splits.

### Context

The dashboard should show who owes whom. For MVP, this can be calculated from receipts and receipt_splits instead of stored permanently.

### Balance Logic

For each receipt:

- Payer paid the full total
- Each split participant owes their assigned amount
- If participant is not the payer, they owe the payer their split amount

### Tasks

- [ ] Create balance calculation utility
- [ ] Fetch receipts and splits
- [ ] Calculate net balances by member
- [ ] Display who owes whom
- [ ] Handle zero-balance state

### Acceptance Criteria

- Dashboard shows accurate balances
- Payer is not shown as owing themselves
- Multiple receipts combine correctly

### AI Iteration Prompt

```text
I am building SplitTab. Create a balance calculation utility. Given receipts, payers, and receipt_splits, calculate who owes whom across the household. Then display this on the dashboard in a simple readable format.
```

---

# Phase 8 — Hardening, Testing & Documentation

**Goal:** Make the MVP stable, understandable, and ready to demo.

---

## Sprint 8.1 — Error Handling & Edge Cases

### Goal

Improve the app experience when OCR, parsing, uploads, or database calls fail.

### Tasks

- [ ] Add friendly OCR failure message
- [ ] Add manual receipt entry fallback
- [ ] Add upload retry option
- [ ] Add missing total handling
- [ ] Add missing card last-4 handling
- [ ] Add unknown payer handling
- [ ] Add empty household handling

### Acceptance Criteria

- App does not crash on expected failures
- User can still manually enter receipt if OCR fails
- Error messages explain what to do next

### AI Iteration Prompt

```text
I am building SplitTab. Improve error handling for OCR failure, image upload failure, parsing failure, missing total, missing card last-4, unknown payer, and empty household states. Add a manual receipt entry fallback.
```

---

## Sprint 8.2 — Security & Privacy Review

### Goal

Review app security and privacy before using real data.

### Tasks

- [ ] Confirm full card numbers are never requested
- [ ] Confirm only last 4 digits are stored
- [ ] Review Supabase RLS policies
- [ ] Confirm users can only access their household data
- [ ] Move secret API keys out of client app
- [ ] Add privacy note to README

### Acceptance Criteria

- No full payment card data is stored
- Household data is protected
- Secret keys are not exposed in frontend code

### AI Iteration Prompt

```text
I am building SplitTab. Review the app for privacy and security. Make sure full card numbers are never requested or stored, only card last-4 is saved, Supabase RLS protects household data, and secret API keys are not exposed in the client app.
```

---

## Sprint 8.3 — Testing & Demo Readiness

### Goal

Prepare the app for a working demo.

### Tasks

- [ ] Test on physical phone
- [ ] Test login/signup
- [ ] Test household setup
- [ ] Test adding members
- [ ] Test scanning receipt
- [ ] Test OCR output
- [ ] Test parser corrections
- [ ] Test card mapping
- [ ] Test split saving
- [ ] Test receipt history
- [ ] Test dashboard balances
- [ ] Update README with demo steps

### Acceptance Criteria

- Full MVP flow works end-to-end
- README explains how to run and demo the app
- Known limitations are documented

### AI Iteration Prompt

```text
I am building SplitTab. Help me prepare the MVP for a demo. Create a testing checklist for authentication, household setup, receipt scanning, OCR parsing, card mapping, split saving, receipt history, and balance dashboard. Update the README with demo instructions and known limitations.
```

---

# Future Phase — Optional Enhancements

These are not required for MVP.

## Future Sprint 9.1 — Item-Level Splitting

- Parse individual items
- Select which person used each item
- Split only shared items

## Future Sprint 9.2 — AI-Assisted Parsing

- Send OCR text to an AI parser
- Return structured JSON
- Compare AI output with rule-based parser

## Future Sprint 9.3 — Notifications & Settlements

- Remind users to settle balances
- Add Venmo/Zelle note generation
- Mark balances as settled

## Future Sprint 9.4 — On-Device OCR

- Replace OCR API with Google ML Kit
- Improve privacy and reduce OCR costs
- Support offline scanning

---

# Reusable Full-Context AI Prompt

Use this when starting a new AI-assisted development session.

```text
I am building SplitTab, a React Native + Expo mobile app for shared household expense tracking.

Core idea:
Users scan grocery receipts with their phone camera. The app uses OCR to extract receipt text, parses the total amount, store name, date, and card last-4 digits, maps the card last-4 to a household member, splits the total among selected household members, and tracks balances.

Current recommended stack:
- React Native + Expo
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Expo Camera
- OCR API for MVP, Google ML Kit later

Important privacy rule:
Never request or store full card numbers. Only store the last 4 digits.

MVP features:
- Auth
- Household setup
- Household members
- Camera receipt capture
- OCR text extraction
- Receipt parser
- Card last-4 mapping
- Equal splitting
- Receipt history
- Balance dashboard

Please help me work only on the sprint I provide next. Keep the code simple, explain file placement, and avoid adding unrelated features.
```

---

# End of Document
