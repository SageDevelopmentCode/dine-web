#!/usr/bin/env node

/**
 * Generate Supabase types using an access token
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN=your_token node scripts/generate-types-with-token.js
 *
 * Get your access token from:
 *   https://supabase.com/dashboard/account/tokens
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};

  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.+)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      env[key] = value;
    }
  });

  return env;
}

// Extract project ID from Supabase URL
function getProjectId(url) {
  const match = url.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match ? match[1] : null;
}

// Main function
async function main() {
  try {
    const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

    if (!accessToken) {
      console.error('❌ Error: SUPABASE_ACCESS_TOKEN environment variable is required\n');
      console.error('Usage:');
      console.error('  SUPABASE_ACCESS_TOKEN=your_token npm run types:generate:token\n');
      console.error('Get your access token from:');
      console.error('  https://supabase.com/dashboard/account/tokens\n');
      process.exit(1);
    }

    console.log('Loading environment variables...');
    const env = loadEnv();

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL in .env.local');
    }

    const projectId = getProjectId(supabaseUrl);
    if (!projectId) {
      throw new Error('Could not extract project ID from Supabase URL');
    }

    console.log(`Project ID: ${projectId}`);
    console.log('Generating types using Supabase CLI with access token...');

    const schemas = 'public,core,travel,swe,emergency,epipen,allergies,web_profiles,family,restaurant,threads,monitoring';
    const outputPath = path.join(__dirname, '..', 'lib', 'supabase', 'types.ts');

    // Run the Supabase CLI command with access token
    const command = `npx supabase gen types typescript --project-id ${projectId} --schema ${schemas}`;

    const types = execSync(command, {
      encoding: 'utf-8',
      env: {
        ...process.env,
        SUPABASE_ACCESS_TOKEN: accessToken
      },
      stdio: ['pipe', 'pipe', 'inherit']
    });

    fs.writeFileSync(outputPath, types, 'utf-8');

    console.log('\n✅ Types generated successfully!');
    console.log(`📁 Written to: ${outputPath}`);

    const stats = fs.statSync(outputPath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error('\n❌ Error generating types:', error.message);
    console.error('\nMake sure:');
    console.error('  1. Your SUPABASE_ACCESS_TOKEN is valid');
    console.error('  2. Your access token has permission to access this project');
    console.error('  3. Your project ID is correct in .env.local');
    process.exit(1);
  }
}

main();
