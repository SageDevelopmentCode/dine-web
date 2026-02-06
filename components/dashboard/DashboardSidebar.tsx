"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  AlertCircle,
  Flag,
  BarChart3,
  Bug,
  Lightbulb,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { COLORS } from "@/constants/colors";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const navItems: NavItem[] = [
  {
    name: "Performance",
    href: "/dashboard/performance",
    icon: LayoutDashboard,
    color: COLORS.DOWNLOAD_SECTION_BLUE, // #65A9F2
  },
  {
    name: "Requested Allergens",
    href: "/dashboard/allergens",
    icon: AlertCircle,
    color: COLORS.MODERATE_BORDER, // #F1A665 (orange - allergy theme)
  },
  {
    name: "Post/Comment Reports",
    href: "/dashboard/reports",
    icon: Flag,
    color: COLORS.SEVERE_BORDER, // #F16565 (red - warning theme)
  },
  {
    name: "Statistics",
    href: "/dashboard/statistics",
    icon: BarChart3,
    color: COLORS.FOOD_ALLERGIES_BG, // #719C96 (teal)
  },
  {
    name: "Problems/Bugs Submitted",
    href: "/dashboard/bugs",
    icon: Bug,
    color: COLORS.MILD_BORDER, // #F1E065 (yellow - caution theme)
  },
  {
    name: "Ideas Submitted",
    href: "/dashboard/ideas",
    icon: Lightbulb,
    color: COLORS.EPIPEN_COLOR, // #7AC0E2 (light blue)
  },
  {
    name: "Feedback Submitted",
    href: "/dashboard/feedback",
    icon: MessageSquare,
    color: COLORS.TRAVEL_BG, // #55BEC1 (cyan)
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* Logo and Branding */}
      <div
        className="px-6 py-6 border-b"
        style={{ borderColor: COLORS.DASHBOARD_DARK_BORDER }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <Image
            src="/assets/Logo.png"
            alt="Dine Logo"
            width={80}
            height={80}
            priority
            className="object-contain w-auto h-12 mb-3"
            quality={100}
            unoptimized={true}
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 px-3 py-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-300 ease-in-out font-merriweather text-sm font-medium
                  ${isActive ? "shadow-md" : ""}
                `}
                style={
                  isActive
                    ? {
                        backgroundColor: COLORS.DASHBOARD_DARK_HOVER,
                        color: COLORS.DASHBOARD_DARK_TEXT,
                        borderLeft: `3px solid ${item.color}`,
                      }
                    : {
                        color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY,
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      COLORS.DASHBOARD_DARK_HOVER;
                    e.currentTarget.style.color = COLORS.DASHBOARD_DARK_TEXT;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color =
                      COLORS.DASHBOARD_DARK_TEXT_SECONDARY;
                  }
                }}
              >
                <Icon
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: item.color }}
                />
                <span>{item.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE }}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X
            className="w-6 h-6"
            style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}
          />
        ) : (
          <Menu
            className="w-6 h-6"
            style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}
          />
        )}
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/70 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed top-0 left-0 h-full w-64 z-40 shadow-2xl overflow-y-auto"
              style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block fixed top-0 left-0 h-full w-64 shadow-lg overflow-y-auto"
        style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
