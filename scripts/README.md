# Type Generation Scripts

This directory contains scripts to generate Supabase TypeScript types without authentication issues.

## Available Commands

### Option 1: Using Your Current Supabase CLI Login

```bash
npm run types:generate
```

**Requirements:**
- You must be logged in to the correct Supabase account in your terminal
- Run `npx supabase login` if you get authentication errors

### Option 2: Using an Access Token (Recommended for Multiple Accounts)

```bash
SUPABASE_ACCESS_TOKEN=your_token npm run types:generate:token
```

**How to get an access token:**
1. Go to https://supabase.com/dashboard/account/tokens
2. Generate a new access token
3. Copy the token and use it in the command above

**Tip:** You can add the token to your `.env.local` file for easier usage:

```bash
# Add to .env.local (DO NOT commit this file)
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxxxxxxxxxxx
```

Then you can create a simple wrapper script or just remember to use:
```bash
SUPABASE_ACCESS_TOKEN=$(grep SUPABASE_ACCESS_TOKEN .env.local | cut -d '=' -f2) npm run types:generate:token
```

Or even simpler, add this to your shell profile (`.zshrc` or `.bashrc`):
```bash
alias gen-types='SUPABASE_ACCESS_TOKEN=sbp_your_token npm run types:generate:token'
```

## How It Works

Both scripts:
1. Read the project ID from your `.env.local` file
2. Use the Supabase CLI to generate types
3. Write the types to `lib/supabase/types.ts`

The difference is in authentication:
- `generate-types.js` uses your current CLI login
- `generate-types-with-token.js` uses an access token (better for multiple accounts)

## Troubleshooting

### "Your account does not have the necessary privileges"

This means you're logged into the wrong Supabase account. Either:
1. Run `npx supabase login` and login with the correct account
2. Use the access token method instead

### "JWT failed verification"

Your access token is invalid or expired. Generate a new one from:
https://supabase.com/dashboard/account/tokens

### Types file is empty

The command failed but didn't show an error. Check:
1. Your project ID in `.env.local` is correct
2. You have internet connection
3. The Supabase API is accessible

You can restore from git if needed:
```bash
git checkout HEAD~1 -- lib/supabase/types.ts
```
