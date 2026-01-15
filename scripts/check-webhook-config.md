# Webhook Configuration Checker

## Step-by-Step Verification

### 1. Check Your Vercel Deployment URL

Your webhook endpoint should be:
```
https://your-vercel-domain.vercel.app/api/webhooks/stripe
```

**To find your domain:**
- Go to Vercel Dashboard → Your Project
- Check the "Domains" section
- Use the production domain (not preview)

### 2. Verify Webhook in Stripe Dashboard

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Look for your webhook endpoint
3. If it doesn't exist, create it:
   - Click "Add endpoint"
   - Endpoint URL: `https://your-vercel-domain.vercel.app/api/webhooks/stripe`
   - Select event: `checkout.session.completed`
   - Click "Add endpoint"

4. **Copy the Signing secret** (starts with `whsec_`)

### 3. Verify Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Check these variables exist:

   - `STRIPE_SECRET_KEY` = `sk_test_...` (your test key)
   - `STRIPE_WEBHOOK_SECRET` = `whsec_...` (from step 2)

3. **Important:** Make sure `STRIPE_WEBHOOK_SECRET` matches exactly what's in Stripe Dashboard

4. **Redeploy** after adding/updating environment variables:
   - Go to Deployments
   - Click "..." on latest deployment
   - Click "Redeploy"

### 4. Test the Webhook Endpoint

Run this PowerShell command to test if the endpoint is accessible:

```powershell
Invoke-WebRequest -Uri "https://your-vercel-domain.vercel.app/api/webhooks/stripe" -Method POST
```

You should get a 400 error (expected - we need a signature), but it confirms the endpoint exists.

### 5. Make a Test Purchase

1. Go to your site
2. Click "Buy Now"
3. Use test card: `4242 4242 4242 4242`
4. Expiry: Any future date (e.g., 12/34)
5. CVC: Any 3 digits (e.g., 123)
6. Complete the checkout

### 6. Check Webhook Delivery

1. Go to Stripe Dashboard → Webhooks
2. Click on your webhook endpoint
3. Click "Events" tab
4. Look for `checkout.session.completed` event
5. Check status:
   - ✅ **Succeeded** = Working!
   - ❌ **Failed** = Check error message

### 7. Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click "Deployments" → Latest deployment
3. Click "Functions" tab
4. Find `/api/webhooks/stripe`
5. Look for logs:
   - `"Checkout session completed:"` = Success!
   - `"Webhook signature verification failed:"` = Secret mismatch
   - `"STRIPE_WEBHOOK_SECRET environment variable is not set"` = Missing env var

## Quick Checklist

- [ ] Webhook endpoint exists in Stripe Dashboard
- [ ] Webhook URL is correct (matches your Vercel domain)
- [ ] `checkout.session.completed` event is selected
- [ ] `STRIPE_WEBHOOK_SECRET` is set in Vercel
- [ ] `STRIPE_WEBHOOK_SECRET` matches Stripe signing secret exactly
- [ ] Application redeployed after setting environment variables
- [ ] Test purchase completed
- [ ] Webhook event shows as "Succeeded" in Stripe
- [ ] Vercel logs show "Checkout session completed"

## Common Issues

### Issue: "Invalid signature"
**Solution:** 
- Copy signing secret from Stripe Dashboard
- Update `STRIPE_WEBHOOK_SECRET` in Vercel
- Redeploy

### Issue: No events showing
**Solution:**
- Verify webhook URL in Stripe matches your Vercel domain
- Make sure `checkout.session.completed` is selected
- Complete a test purchase

### Issue: "STRIPE_WEBHOOK_SECRET not set"
**Solution:**
- Add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables
- Redeploy

### Issue: Webhook shows "Failed" in Stripe
**Solution:**
- Check Vercel function logs for error details
- Verify endpoint is publicly accessible
- Check that signature verification is working
