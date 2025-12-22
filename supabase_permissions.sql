-- Grant public access to web_profiles schema and tables
-- Run this in your Supabase SQL Editor

-- Grant usage on the web_profiles schema to anonymous users
GRANT USAGE ON SCHEMA web_profiles TO anon;

-- Grant SELECT (read) permissions on user_web_profiles table
GRANT SELECT ON web_profiles.user_web_profiles TO anon;

-- Grant SELECT (read) permissions on user_web_profile_urls table
GRANT SELECT ON web_profiles.user_web_profile_urls TO anon;

-- Optional: If you want authenticated users to also have access
GRANT USAGE ON SCHEMA web_profiles TO authenticated;
GRANT SELECT ON web_profiles.user_web_profiles TO authenticated;
GRANT SELECT ON web_profiles.user_web_profile_urls TO authenticated;
