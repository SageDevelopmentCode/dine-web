/**
 * Test slugs for E2E testing
 *
 * These slugs should point to existing data in your Supabase database.
 * Update these values with actual slugs from your production/staging environment.
 */

export const TEST_SLUGS = {
  profile: {
    // Replace with a valid profile slug from your database
    valid: "sageobnamia",
    // This should not exist in the database
    invalid: "non-existent-profile-12345",
  },
  restaurant: {
    // Replace with a valid restaurant slug from your database
    valid: "red-robin",
    // This should not exist in the database
    invalid: "non-existent-restaurant-12345",
  },
};

/**
 * TODO: Before running tests, update the valid slugs above with actual slugs from your database.
 * You can find valid slugs by:
 * 1. Querying your Supabase profiles table: SELECT slug FROM profiles LIMIT 1;
 * 2. Querying your Supabase restaurants table: SELECT slug FROM restaurants LIMIT 1;
 * 3. Or by navigating to your app and copying slugs from the URL
 */
