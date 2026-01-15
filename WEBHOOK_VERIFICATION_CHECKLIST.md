# Webhook Verification Checklist

Use this checklist to verify your Stripe webhook is working correctly.

## Pre-Deployment Checks

### ✅ Code Setup
- [x] Webhook endpoint created at `/app/api/webhooks/stripe/route.ts`
- [x] Success page created at `/app/success/page.tsx`
- [x] "Buy Now" button calls Stripe checkout API
- [x] Checkout API route configured correctly

### ✅ Stripe Dashboard Configuration

1. **Webhook Endpoint:**
   - [ ] Go to: https://dashboard.stripe.com/test/webhooks
   - [ ] Create endpoint if it doesn't exist:
     - URL: `https://YOUR-VERCEL-DOMAIN.vercel.app/api/webhooks/stripe`
     - Events: Select `checkout.session.completed`
   - [ ] Copy the **Signing secret** (starts with `whsec_`)

2. **Verify Test Mode:**
   - [ ] Make sure you're in **Test mode** (toggle in top right)
   - [ ] All keys should start with `sk_test_` and `whsec_`

### ✅ Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - [ ] Navigate to: Your Project → Settings → Environment Variables

2. **Add/Verify Variables:**
   - [ ] `STRIPE_SECRET_KEY` = `sk_test_...` (your test secret key)
   - [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_...` (from Stripe webhook signing secret)
   - [ ] Both set for **Production** environment (or All Environments)

3. **Redeploy:**
   - [ ] After adding/updating variables, **redeploy** your application
   - [ ] Go to Deployments → Click "..." → "Redeploy"

## Testing Steps

### Step 1: Test Checkout Flow
1. [ ] Go to your deployed site
2. [ ] Click "Buy Now" on the product
3. [ ] Verify you're redirected to Stripe Checkout
4. [ ] Use test card: `4242 4242 4242 4242`
5. [ ] Complete the payment
6. [ ] Verify redirect to `/success` page

### Step 2: Check Stripe Dashboard
1. [ ] Go to: https://dashboard.stripe.com/test/webhooks
2. [ ] Click on your webhook endpoint
3. [ ] Click "Events" tab
4. [ ] Look for `checkout.session.completed` event
5. [ ] Check status:
   - ✅ **Succeeded** = Working!
   - ❌ **Failed** = See error below

### Step 3: Check Vercel Logs
1. [ ] Go to Vercel Dashboard → Your Project
2. [ ] Click "Deployments" → Latest deployment
3. [ ] Click "Functions" tab
4. [ ] Find `/api/webhooks/stripe`
5. [ ] Look for log: `"Checkout session completed:"`
6. [ ] Verify it shows session details

### Step 4: Verify Payment
1. [ ] Go to: https://dashboard.stripe.com/test/payments
2. [ ] You should see your test payment
3. [ ] Status should be "Succeeded"
4. [ ] Amount should be $1,299.00

## Troubleshooting

### ❌ Webhook shows "Failed" in Stripe

**Check Vercel Logs:**
- Look for error message in function logs
- Common errors:
  - `"Invalid signature"` → Secret mismatch
  - `"STRIPE_WEBHOOK_SECRET not set"` → Missing env var
  - `"Missing stripe-signature header"` → Wrong URL

**Solutions:**
1. Verify `STRIPE_WEBHOOK_SECRET` in Vercel matches Stripe signing secret
2. Make sure you redeployed after adding the secret
3. Verify webhook URL in Stripe matches your Vercel domain

### ❌ No events showing in Stripe

**Check:**
1. Webhook endpoint URL is correct
2. `checkout.session.completed` event is selected
3. You completed a test purchase
4. You're looking at the correct webhook endpoint

### ❌ "Invalid signature" error

**Solution:**
1. Copy signing secret from Stripe Dashboard (Webhooks → Your endpoint → Signing secret)
2. Update `STRIPE_WEBHOOK_SECRET` in Vercel
3. **Redeploy** your application
4. Test again

## Success Indicators

✅ **Everything is working if:**
- Test purchase completes successfully
- Redirected to `/success` page
- Stripe Dashboard shows `checkout.session.completed` event as "Succeeded"
- Vercel logs show `"Checkout session completed:"` with session details
- Payment appears in Stripe Dashboard → Payments

## Next Steps After Verification

Once webhooks are working:
- [ ] Add business logic in webhook handler (send emails, update database)
- [ ] Set up production webhook (use live mode keys)
- [ ] Monitor webhook delivery rates
- [ ] Add error handling and retry logic
