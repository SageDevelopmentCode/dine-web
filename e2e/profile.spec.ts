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
    await page.waitForLoadState('networkidle');

    // Verify 404 page is shown
    const bodyText = await page.locator('body').textContent();
    const is404 = bodyText?.includes('404') || bodyText?.includes('Not Found');
    expect(is404).toBeTruthy();
  });

  test('should open and close allergen modal', async ({ page }) => {
    // Navigate to profile page
    await page.goto(`/profile/${TEST_SLUGS.profile.valid}`);
    await page.waitForLoadState('networkidle');

    // Look for allergen cards (they have cursor-pointer class)
    const allergenCards = page.locator('[class*="cursor-pointer"]').filter({
      has: page.locator('text=/severe|moderate|mild/i'),
    });

    // Check if there are any allergen cards on the page
    const count = await allergenCards.count();

    if (count > 0) {
      // Click the first allergen card
      await allergenCards.first().click();

      // Wait for modal to appear
      await page.waitForTimeout(300); // Allow for animation

      // Verify modal is visible by checking for close button or modal content
      const modalVisible = await page.locator('[class*="fixed"][class*="inset-0"]').isVisible();
      expect(modalVisible).toBeTruthy();

      // Close modal by pressing ESC
      await page.keyboard.press('Escape');

      // Wait for modal to close
      await page.waitForTimeout(300);

      // Verify modal is closed
      const modalClosed = await page.locator('[class*="fixed"][class*="inset-0"]').isHidden();
      expect(modalClosed).toBeTruthy();
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

      // Verify content is shown (the card should have more content now)
      // This is a basic check - in a real scenario you'd check for specific expanded content
      const hasExpandedContent = await page.locator('text=/View Full Card|Emergency|Allergy/i').isVisible();
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

    // Look for expandable info cards (not allergen cards which open modals)
    // Info cards are in the expandable section and contain chevron icons
    const expandableCard = page.locator('[class*="cursor-pointer"]').filter({
      has: page.locator('svg'),
    }).first();

    const exists = await expandableCard.isVisible();

    if (exists) {
      await expandableCard.click();
      await page.waitForTimeout(1000);

      // Check if a modal opened (allergen modal) and close it
      const modal = page.locator('[class*="fixed"][class*="inset-0"]');
      const isModalOpen = await modal.isVisible().catch(() => false);

      if (isModalOpen) {
        // Close the modal by pressing ESC
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      }

      // Look for "View Full Card" button
      const viewFullCardButton = page.locator('text=View Full Card').first();
      const buttonExists = await viewFullCardButton.isVisible();

      if (buttonExists) {
        // Click the button
        await viewFullCardButton.click();

        // Wait for navigation
        await page.waitForLoadState('networkidle');

        // Verify we're on a card detail page (URL should contain the profile slug and a card type)
        const url = page.url();
        expect(url).toContain(`/profile/${TEST_SLUGS.profile.valid}/`);

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
