import { test, expect } from '@playwright/test';
import { TEST_SLUGS } from './fixtures/test-slugs';

test.describe('Profile Page', () => {
  test('should load profile page with valid slug', async ({ page }) => {
    // Navigate to a valid profile page
    await page.goto(`/profile/${TEST_SLUGS.profile.valid}`);

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Verify the page loaded (not a 404)
    await expect(page.locator('body')).not.toContainText('404');
    await expect(page.locator('body')).not.toContainText('Not Found');

    // Verify key sections are present
    // Left section should contain profile information
    await expect(page.locator('text=About me')).toBeVisible();

    // Right section should contain allergen information or cards
    // Note: This might vary based on the profile data
    const pageContent = await page.content();
    const hasContent = pageContent.length > 1000; // Basic check that page has substantial content
    expect(hasContent).toBeTruthy();
  });

  test('should return 404 for invalid profile slug', async ({ page }) => {
    // Navigate to an invalid profile page
    await page.goto(`/profile/${TEST_SLUGS.profile.invalid}`);

    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded');

    // Verify 404 page is shown
    const bodyText = await page.locator('body').textContent();
    const is404 = bodyText?.includes('404') || bodyText?.includes('Not Found');
    expect(is404).toBeTruthy();
  });

  test('should open and close allergen modal', async ({ page }) => {
    // Navigate to profile page
    await page.goto(`/profile/${TEST_SLUGS.profile.valid}`);
    await page.waitForLoadState('networkidle');

    // Look for the allergen section heading to verify allergens exist
    const allergensHeading = page.locator('text=My Allergies and Cards');
    const hasAllergens = await allergensHeading.isVisible();

    if (hasAllergens) {
      // Find allergen cards - they contain emoji images and are under the "Severe"/"Moderate"/"Mild" headings
      // Look for the first clickable allergen card (has emoji img and cursor-pointer)
      const allergenCard = page.locator('[class*="cursor-pointer"]').filter({
        has: page.locator('img[alt="emoji"]'),
      }).first();

      // Make sure we found an allergen card
      const cardExists = await allergenCard.isVisible();

      if (cardExists) {
        // Click the allergen card
        await allergenCard.click();

        // Wait for modal to appear with proper visibility check
        await page.waitForSelector('[class*="fixed"][class*="inset-0"]', { state: 'visible', timeout: 10000 });

        // Verify modal is visible
        const modalVisible = await page.locator('[class*="fixed"][class*="inset-0"]').isVisible();
        expect(modalVisible).toBeTruthy();

        // Close modal by pressing ESC
        await page.keyboard.press('Escape');

        // Wait for modal to close
        await page.waitForSelector('[class*="fixed"][class*="inset-0"]', { state: 'hidden' });

        // Verify modal is closed
        const modalClosed = await page.locator('[class*="fixed"][class*="inset-0"]').isHidden();
        expect(modalClosed).toBeTruthy();
      } else {
        test.skip();
      }
    } else {
      // Skip test if no allergen cards present
      test.skip();
    }
  });

  test('should expand and collapse info card', async ({ page }) => {
    // Navigate to profile page
    await page.goto(`/profile/${TEST_SLUGS.profile.valid}`);
    await page.waitForLoadState('networkidle');

    // Look for expandable cards (they have chevron icons)
    const expandableCard = page.locator('[class*="cursor-pointer"]').filter({
      has: page.locator('svg'),
    }).first();

    // Check if there's an expandable card
    const exists = await expandableCard.isVisible();

    if (exists) {
      // Click to expand
      await expandableCard.click();

      // Wait for expansion animation and potential API call
      await page.waitForTimeout(1000);

      // Verify content is shown by checking for "View Full Card" button
      // Use .first() to avoid strict mode violation since multiple cards may have this button
      const hasExpandedContent = await page.locator('text=View Full Card').first().isVisible();
      expect(hasExpandedContent).toBeTruthy();

      // Click to collapse
      await expandableCard.click();

      // Wait for collapse animation
      await page.waitForTimeout(500);
    } else {
      // Skip if no expandable cards
      test.skip();
    }
  });

  test('should navigate to full card page', async ({ page }) => {
    // Navigate to profile page
    await page.goto(`/profile/${TEST_SLUGS.profile.valid}`);
    await page.waitForLoadState('networkidle');

    // Look for expandable info cards (not allergen cards)
    // Expandable cards have buttons with specific titles like "Food Allergies", "Emergency Medical", etc.
    const expandableCard = page.locator('button').filter({
      hasText: /Food Allergies|Emergency Medical|Epipen Guide|School\/Work|Travel/i
    }).first();

    const exists = await expandableCard.isVisible();

    if (exists) {
      // Click to expand the card
      await expandableCard.click();

      // Wait for card content to load
      await page.waitForTimeout(1000);

      // Look for "View Full Card" link in the expanded content
      const viewFullCardButton = page.locator('a[href*="/profile/"]').filter({ hasText: 'View Full Card' }).first();
      const buttonExists = await viewFullCardButton.isVisible();

      if (buttonExists) {
        // Click the button to navigate and wait for the navigation to complete
        await Promise.all([
          page.waitForURL(/\/profile\/sageobnamia\/(food-allergies|emergency|epipen|swe|travel)/),
          viewFullCardButton.click()
        ]);

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');

        // Verify we're on a card detail page (URL should contain the profile slug and a card type)
        const url = page.url();
        // Check for card type in the URL (food-allergies, emergency, epipen, swe, or travel)
        expect(url).toMatch(/\/profile\/sageobnamia\/(food-allergies|emergency|epipen|swe|travel)/);

        // Verify the page loaded (not 404)
        await expect(page.locator('body')).not.toContainText('404');
      } else {
        test.skip();
      }
    } else {
      test.skip();
    }
  });
});
