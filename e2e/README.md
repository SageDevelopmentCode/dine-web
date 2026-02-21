# E2E Testing with Playwright

This directory contains end-to-end tests for the Dine web application, focusing on profile pages and restaurant pages.

## Setup

### Prerequisites
- Node.js installed
- Playwright installed (already included in devDependencies)

### First Time Setup
The Playwright browsers should already be installed. If you need to reinstall them:

```bash
npx playwright install chromium
```

## Configuration

### Test Data
Before running tests, you need to update the test slugs in `e2e/fixtures/test-slugs.ts`:

1. Open `e2e/fixtures/test-slugs.ts`
2. Replace the placeholder slugs with actual valid slugs from your database:
   - `profile.valid`: A valid profile slug
   - `restaurant.valid`: A valid restaurant slug

You can find valid slugs by:
- Querying your Supabase database
- Navigating to your app and copying slugs from the URL

### Environment Variables
Tests require the following environment variables (already configured in `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests with UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Run tests in debug mode
```bash
npm run test:e2e:debug
```

### View test report
After tests run, view the HTML report:
```bash
npm run test:e2e:report
```

## Test Coverage

### Profile Page Tests (`profile.spec.ts`)
- Load profile page with valid slug
- Return 404 for invalid slug
- Open and close allergen modal
- Expand and collapse info cards
- Navigate to full card detail pages

### Restaurant Page Tests (`restaurant.spec.ts`)
- Load restaurant page with valid slug
- Return 404 for invalid slug
- Display restaurant image carousel
- Toggle safety protocols view all/show less
- Display menu section
- Display reviews section
- Display restaurant information

## CI/CD Integration

Tests are automatically run on GitHub Actions for:
- Pushes to `main` branch
- Pull requests to `main` branch

### GitHub Secrets Required
Make sure these secrets are configured in your GitHub repository:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

To add secrets:
1. Go to your GitHub repository
2. Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add both secrets

## Test Results

Test results and artifacts are available in:
- **Local**: `playwright-report/` directory
- **CI**: Uploaded as GitHub Actions artifacts (retained for 30 days)

## Writing New Tests

To add new tests:

1. Create a new `.spec.ts` file in the `e2e/` directory
2. Import test utilities: `import { test, expect } from '@playwright/test';`
3. Import test fixtures if needed: `import { TEST_SLUGS } from './fixtures/test-slugs';`
4. Write your tests using Playwright's API

Example:
```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/my-page');
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## Troubleshooting

### Tests failing with "Profile not found"
- Update the test slugs in `e2e/fixtures/test-slugs.ts` with valid slugs from your database

### Tests timing out
- Increase timeout in `playwright.config.ts`
- Check your database connection and ensure data loads quickly

### Modal/interaction tests skipping
- These tests skip if the required elements aren't present on the page
- This is expected behavior if the test profile doesn't have allergens or expandable cards

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Next.js Testing Guide](https://nextjs.org/docs/app/building-your-application/testing/playwright)
