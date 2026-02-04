import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Middleware to track API performance metrics
export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { pathname } = request.nextUrl;

  // Skip tracking for dashboard routes, static files, and Next.js internals
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Only track API routes
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  let response: NextResponse;
  let statusCode = 200;
  let errorOccurred = false;
  let errorMessage = "";

  try {
    response = NextResponse.next();

    // Track the response
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Log metrics asynchronously (non-blocking)
    logMetrics({
      endpoint: pathname,
      method: request.method,
      statusCode: response.status,
      responseTime,
      userAgent: request.headers.get("user-agent") || "",
      ipAddress: request.ip || request.headers.get("x-forwarded-for") || "",
    }).catch((error) => {
      // Silent fail - don't break the request if logging fails
      console.error("Failed to log metrics:", error);
    });

    return response;
  } catch (error) {
    errorOccurred = true;
    errorMessage = error instanceof Error ? error.message : "Unknown error";
    statusCode = 500;

    // Log error asynchronously
    logError({
      endpoint: pathname,
      method: request.method,
      errorMessage,
      errorType: error instanceof Error ? error.name : "Error",
      stackTrace: error instanceof Error ? error.stack || "" : "",
      statusCode,
      userAgent: request.headers.get("user-agent") || "",
      ipAddress: request.ip || request.headers.get("x-forwarded-for") || "",
    }).catch((err) => {
      console.error("Failed to log error:", err);
    });

    throw error;
  }
}

// Async function to log metrics to Supabase
async function logMetrics(data: {
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  userAgent: string;
  ipAddress: string;
}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("monitoring.api_metrics").insert({
      endpoint: data.endpoint,
      method: data.method,
      status_code: data.statusCode,
      response_time_ms: data.responseTime,
      user_agent: data.userAgent,
      ip_address: data.ipAddress,
    });

    if (error) {
      console.error("Error inserting metrics:", error);
    }
  } catch (error) {
    console.error("Failed to log metrics:", error);
  }
}

// Async function to log errors to Supabase
async function logError(data: {
  endpoint: string;
  method: string;
  errorMessage: string;
  errorType: string;
  stackTrace: string;
  statusCode: number;
  userAgent: string;
  ipAddress: string;
}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("monitoring.error_logs").insert({
      endpoint: data.endpoint,
      method: data.method,
      error_message: data.errorMessage,
      error_type: data.errorType,
      stack_trace: data.stackTrace,
      status_code: data.statusCode,
      user_agent: data.userAgent,
      ip_address: data.ipAddress,
    });

    if (error) {
      console.error("Error inserting error log:", error);
    }
  } catch (error) {
    console.error("Failed to log error:", error);
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
