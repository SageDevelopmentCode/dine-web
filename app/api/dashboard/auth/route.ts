import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const dashboardPassword = process.env.DASHBOARD_PASSWORD;

    if (!dashboardPassword) {
      return NextResponse.json(
        { error: "Dashboard password not configured on server" },
        { status: 500 }
      );
    }

    if (password !== dashboardPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Set authentication cookie
    const cookieStore = await cookies();
    cookieStore.set("dashboard_auth", dashboardPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dashboard auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("dashboard_auth");

  return NextResponse.json({ success: true });
}
