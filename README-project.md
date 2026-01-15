# API Routes - Project Issues & Documentation

This file tracks issues, problems, and notes for the API routes in this project.

## Issues Log

### Issue 1: PostHog Installation
**Status:** ✅ Resolved
**Problem:** pnpm not available, needed to install `posthog-js`
**Fix:** Used `npm install posthog-js` instead. Package installed successfully.

---

### Issue 2: Vercel Build Error - useSearchParams() Needs Suspense
**Status:** ✅ Resolved
**Problem:** Vercel build failed with `useSearchParams() should be wrapped in a suspense boundary at page "/success"`
**Fix:** Split `app/success/page.tsx` into `SuccessContent` (uses `useSearchParams()`) and `SuccessPage` (wraps it in `<Suspense>`). Next.js 15 requirement for static generation.

---

## Future Issues

Add new issues below using this format:

### Issue [Number]: [Brief Title]
**Date:** YYYY-MM-DD
**Status:** 🔴 Open | 🟡 In Progress | ✅ Resolved
**Description:** 
- Detailed description of the issue
- Steps to reproduce if applicable

**Notes:**
- Any additional notes or context
- Related files or components

---

## API Routes Overview

### `/api/checkout`
- **Purpose:** Creates Stripe checkout sessions
- **Method:** POST
- **Features:**
  - Server-side product pricing
  - Discount code support (SAVE10, WELCOME20)
  - Server-side validation

### `/api/webhooks/stripe`
- **Purpose:** Handles Stripe webhook events
- **Method:** POST
- **Features:**
  - Signature verification
  - Processes `checkout.session.completed` events
  - Server-side validation

---

## Environment Variables Required

- `STRIPE_SECRET_KEY` - Stripe secret API key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
