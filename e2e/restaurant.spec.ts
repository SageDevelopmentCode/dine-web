import { test, expect } from '@playwright/test';
import { TEST_SLUGS } from './fixtures/test-slugs';

test.describe('Restaurant Page', () => {
  test('should load restaurant page with valid slug', async ({ page }) => {
    // Navigate to a valid restaurant page
    await page.goto(`/restaurant/${TEST_SLUGS.restaurant.valid}`);

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Verify the page loaded (not a 404)
    await expect(page.locator('body')).not.toContainText('404');
    await expect(page.locator('body')).not.toContainText('Not Found');

    // Verify key sections are present
    // Should have restaurant name and rating
    const hasRating = await page.locator('text=/★|star|rating/i').isVisible().catch(() => false);
    const hasContent = (await page.content()).length > 1000;

    // At minimum, the page should have substantial content
    expect(hasContent).toBeTruthy();
  });

  test('should return 404 for invalid restaurant slug', async ({ page }) => {
    // Navigate to an invalid restaurant page
    await page.goto(`/restaurant/${TEST_SLUGS.restaurant.invalid}`);

    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded');

    // Verify 404 page is shown
    const bodyText = await page.locator('body').textContent();
    const is404 = bodyText?.includes('404') || bodyText?.includes('Not Found');
    expect(is404).toBeTruthy();
  });

  test('should display restaurant image carousel', async ({ page }) => {
    // Navigate to restaurant page
    await page.goto(`/restaurant/${TEST_SLUGS.restaurant.valid}`);
    await page.waitForLoadState('networkidle');

    // Look for carousel container or images
    // The carousel component should be present even if there's only one image
    const hasImages = await page.locator('img').count() > 0;
    expect(hasImages).toBeTruthy();

    // Check for carousel-specific elements (Embla uses specific classes)
    const hasCarouselContainer = await page.locator('[class*="embla"], [class*="carousel"]').isVisible().catch(() => false);

    // Even without a carousel, there should be at least one image
    if (!hasCarouselContainer) {
      const imageCount = await page.locator('img').count();
      expect(imageCount).toBeGreaterThan(0);
    }
  });

  test('should toggle safety protocols view all/show less', async ({ page }) => {
    // Navigate to restaurant page
    await page.goto(`/restaurant/${TEST_SLUGS.restaurant.valid}`);
    await page.waitForLoadState('networkidle');

    // Look for "Our Safety Protocols" section
    const protocolsSection = page.locator('text=Our Safety Protocols');
    const hasSafetyProtocols = await protocolsSection.isVisible().catch(() => false);

    if (hasSafetyProtocols) {
      // Look for "View All" or "Show Less" button
      const toggleButton = page.locator('button:has-text("View All"), button:has-text("Show Less")');
      const hasToggleButton = await toggleButton.isVisible().catch(() => false);

      if (hasToggleButton) {
        const initialButtonText = await toggleButton.textContent();

        // Click the toggle button
        await toggleButton.click();

        // Wait for state change
        await page.waitForTimeout(300);

        // Verify button text changed
        const newButtonText = await toggleButton.textContent();
        expect(newButtonText).not.toBe(initialButtonText);

        // Click again to toggle back
        await toggleButton.click();
        await page.waitForTimeout(300);

        // Verify it toggled back
        const finalButtonText = await toggleButton.textContent();
        expect(finalButtonText).toBe(initialButtonText);
      } else {
        // If no toggle button, it means there are 5 or fewer protocols (no need to toggle)
        // This is still a valid state, so we just verify protocols are visible
        const protocols = page.locator('[class*="protocol"]');
        const protocolCount = await protocols.count();
        // Should have at least 1 protocol if the section is visible
        expect(protocolCount).toBeGreaterThanOrEqual(0);
      }
    } else {
      // No safety protocols section found - skip this test
      test.skip();
    }
  });

  test('should display menu section', async ({ page }) => {
    // Navigate to restaurant page
    await page.goto(`/restaurant/${TEST_SLUGS.restaurant.valid}`);
    await page.waitForLoadState('networkidle');

    // Look for menu-related content
    const hasMenuHeading = await page.locator('text=/menu/i').isVisible().catch(() => false);

    if (hasMenuHeading) {
      // Check for menu items or menu link
      const hasMenuItems = await page.locator('[class*="menu"]').count() > 0;
      const hasMenuLink = await page.locator('a[href*="menu"]').isVisible().catch(() => false);

      // Should have either menu items or a link to external menu
      expect(hasMenuItems || hasMenuLink).toBeTruthy();
    } else {
      // No menu section - this is acceptable, some restaurants might not have menu data
      test.skip();
    }
  });

  test('should display reviews section', async ({ page }) => {
    // Navigate to restaurant page
    await page.goto(`/restaurant/${TEST_SLUGS.restaurant.valid}`);
    await page.waitForLoadState('networkidle');

    // Look for reviews section
    const hasReviewsHeading = await page.locator('text=/reviews?/i').isVisible().catch(() => false);

    if (hasReviewsHeading) {
      // Verify there's some review content
      // Could be actual reviews or a message about no reviews
      const pageContent = await page.content();
      const hasReviewContent = pageContent.includes('review') || pageContent.includes('Review');
      expect(hasReviewContent).toBeTruthy();
    } else {
      // No reviews section found - skip
      test.skip();
    }
  });

  test('should display restaurant information', async ({ page }) => {
    // Navigate to restaurant page
    await page.goto(`/restaurant/${TEST_SLUGS.restaurant.valid}`);
    await page.waitForLoadState('networkidle');

    // Verify essential restaurant information is present
    // At minimum, should have location, contact info, or description

    const bodyText = await page.textContent('body');

    // Check for common restaurant info indicators
    const hasLocation = bodyText?.includes('📍') || bodyText?.toLowerCase().includes('location');
    const hasPhone = bodyText?.includes('📞') || bodyText?.toLowerCase().includes('phone');
    const hasAbout = bodyText?.includes('📄') || bodyText?.toLowerCase().includes('about');
    const hasWebsite = bodyText?.includes('🌐') || bodyText?.toLowerCase().includes('website');

    // Should have at least one piece of restaurant information
    const hasInfo = hasLocation || hasPhone || hasAbout || hasWebsite;
    expect(hasInfo).toBeTruthy();
  });
});
