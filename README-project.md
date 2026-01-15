# API Routes - Project Issues & Documentation

This file tracks issues, problems, and notes for the API routes in this project.

## Issues Log

### Issue 1: PostHog Installation
**Date:** 2025-01-XX
**Status:** ✅ Resolved
**Description:** 
- Installed `posthog-js` package using npm (pnpm was not available)
- Package successfully added to project dependencies

**Notes:** 
- pnpm command not recognized, used npm instead
- Package installed without errors
- Integration pending (needs PostHog API key and configuration)

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
