# Stripe Webhook Troubleshooting Guide

## How to Check if Your Webhook is Working

### 1. **Check Stripe Dashboard Webhook Logs**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **Webhooks**
3. Find your webhook endpoint (should be: `https://your-vercel-domain.com/api/webhooks/stripe`)
4. Click on it to view the **Events** tab
5. Look for `checkout.session.completed` events
6. Check the delivery status:
   - ✅ **Succeeded** (green) = Webhook is working!
   - ❌ **Failed** (red) = Check the error message

### 2. **Verify Webhook Configuration**

**In Stripe Dashboard:**
- Go to **Developers** → **Webhooks**
- Click on your webhook endpoint
- Check the **Signing secret** (starts with `whsec_`)
- Make sure it's listening for: `checkout.session.completed`

**In Vercel:**
- Go to your project → **Settings** → **Environment Variables**
- Verify `STRIPE_WEBHOOK_SECRET` matches the signing secret from Stripe
- Make sure it's set for the correct environment (Production/Preview)

### 3. **Test the Complete Flow**

1. **Make a test purchase:**
   - Go to your site
   - Click "Buy Now" on the product
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date (e.g., 12/34)
   - Any 3-digit CVC (e.g., 123)
   - Any ZIP code (e.g., 12345)

2. **Complete the checkout:**
   - Complete the payment in Stripe Checkout
   - You'll be redirected to `/success?session_id=...`

3. **Check webhook delivery:**
   - Go back to Stripe Dashboard → Webhooks
   - You should see a `checkout.session.completed` event
   - Check if it was delivered successfully

### 4. **Common Issues & Solutions**

#### ❌ **"Invalid signature" error**
- **Cause:** Webhook secret mismatch
- **Solution:** 
  - Copy the signing secret from Stripe Dashboard
  - Update `STRIPE_WEBHOOK_SECRET` in Vercel
  - **Redeploy** your application (important!)

#### ❌ **"Missing stripe-signature header"**
- **Cause:** Request not coming from Stripe
- **Solution:** Verify the webhook URL is correct in Stripe Dashboard

#### ❌ **"STRIPE_WEBHOOK_SECRET environment variable is not set"**
- **Cause:** Environment variable missing
- **Solution:** Add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables

#### ❌ **Webhook not receiving events**
- **Cause:** Webhook endpoint not configured or wrong URL
- **Solution:**
  - Verify webhook URL in Stripe: `https://your-domain.com/api/webhooks/stripe`
  - Make sure the endpoint is publicly accessible
  - Check that you've selected `checkout.session.completed` event

### 5. **Check Vercel Logs**

1. Go to Vercel Dashboard → Your Project
2. Click on **Deployments** → Latest deployment
3. Click **Functions** tab
4. Look for `/api/webhooks/stripe` function logs
5. Check for:
   - `"Checkout session completed:"` logs (success)
   - `"Webhook signature verification failed:"` (signature issue)
   - `"Webhook error:"` (general errors)

### 6. **Test Webhook Locally (Optional)**

If you want to test locally with real Stripe webhooks:

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will:
- Give you a webhook secret (add to `.env.local`)
- Forward Stripe events to your local server
- Show you real-time webhook events

### 7. **Verify Payment Performance**

To see payment performance in Stripe:
1. Go to **Payments** in Stripe Dashboard
2. You should see test payments listed
3. Each payment should have:
   - Status: "Succeeded"
   - Amount: $1,299.00
   - Customer email (if provided)

## Quick Checklist

- [ ] Webhook endpoint created at `/api/webhooks/stripe`
- [ ] Webhook configured in Stripe Dashboard
- [ ] `STRIPE_WEBHOOK_SECRET` set in Vercel (matches Stripe signing secret)
- [ ] Application redeployed after adding webhook secret
- [ ] Webhook listening for `checkout.session.completed` event
- [ ] Test purchase completed successfully
- [ ] Webhook event shows as "Succeeded" in Stripe Dashboard
- [ ] Console logs show "Checkout session completed" message

## Next Steps

Once webhooks are working:
- Add business logic in the webhook handler (send emails, update database, etc.)
- Set up success/cancel pages (`/success` and `/checkout`)
- Add error handling and retry logic
- Monitor webhook delivery rates in Stripe Dashboard
