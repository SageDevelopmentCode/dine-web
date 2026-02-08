#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const envContent = fs.readFileSync(envPath, "utf-8");
  const env = {};

  envContent.split("\n").forEach((line) => {
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
    console.log("Loading environment variables...");
    const env = loadEnv();

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
    }

    const projectId = getProjectId(supabaseUrl);
    if (!projectId) {
      throw new Error("Could not extract project ID from Supabase URL");
    }

    console.log(`Project ID: ${projectId}`);
    console.log("Generating types using Supabase CLI...");
    console.log(
      "\nNote: You need to be logged in to the correct Supabase account.",
    );
    console.log(
      "If you get an authentication error, run: npx supabase login\n",
    );

    const schemas =
      "public,core,travel,swe,emergency,epipen,allergies,web_profiles,family,restaurant,threads,monitoring";
    const outputPath = path.join(
      __dirname,
      "..",
      "lib",
      "supabase",
      "types.ts",
    );

    // Run the Supabase CLI command
    const command = `npx supabase gen types typescript --project-id ${projectId} --schema ${schemas}`;

    console.log(`Running: ${command}`);
    const types = execSync(command, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "inherit"], // Show errors in console
    });

    fs.writeFileSync(outputPath, types, "utf-8");

    console.log("\n✅ Types generated successfully!");
    console.log(`📁 Written to: ${outputPath}`);

    const stats = fs.statSync(outputPath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error("\n❌ Error generating types:", error.message);
    console.error("\n💡 Possible solutions:");
    console.error("   1. Run: npx supabase login");
    console.error(
      "   2. Make sure you are logged into the correct Supabase account",
    );
    console.error("   3. Check that your project ID is correct in .env.local");
    console.error("\n   Alternatively, you can:");
    console.error(
      "   - Use a Supabase access token: SUPABASE_ACCESS_TOKEN=your_token npm run types:generate",
    );
    console.error(
      "   - Get an access token from: https://supabase.com/dashboard/account/tokens",
    );
    process.exit(1);
  }
}

main();
