"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarItem {
  icon: any;
  label: string;
  active: boolean;
  href: string;
}

interface SidebarProps {
  activeItem?: string;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

export function Sidebar({
  activeItem = "dashboard",
  isCollapsed: externalIsCollapsed,
  setIsCollapsed: externalSetIsCollapsed,
}: SidebarProps) {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isCollapsed =
    externalIsCollapsed !== undefined
      ? externalIsCollapsed
      : internalIsCollapsed;
  const setIsCollapsed = externalSetIsCollapsed || setInternalIsCollapsed;

  const sidebarItems: SidebarItem[] = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: activeItem === "dashboard",
      href: "/timeKeeper/dashboard",
    },
    {
      icon: Calendar,
      label: "Schedule Management",
      active: activeItem === "schedule",
      href: "/timeKeeper/schedule",
    },
    {
      icon: Clock,
      label: "Time Tracking",
      active: activeItem === "tracking",
      href: "/timeKeeper/time-tracking",
    },
    {
      icon: FileText,
      label: "Reports",
      active: activeItem === "reports",
      href: "/timeKeeper/reports",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      active: activeItem === "analytics",
      href: "/timeKeeper/analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      active: activeItem === "settings",
      href: "/timeKeeper/settings",
    },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-blue-800 text-white transition-all duration-300 ease-in-out flex flex-col h-screen fixed left-0 top-0 z-40`}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-blue-500 h-20 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            {!isCollapsed && (
              <div className="bg-blue-800 rounded-lg flex-shrink-0">
                <Image
                  src="/Busmate Lk.svg"
                  alt="Busmate LK Logo"
                  width={24}
                  height={24}
                  className="w-12 h-12"
                />
              </div>
            )}
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold">TimeKeeper</h2>
                <p className="text-sm text-blue-200">Schedule Manager</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-blue-500 rounded transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-3"
              } rounded-lg text-sm font-medium transition-all duration-200 group ${
                item.active
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-blue-100 hover:bg-blue-500 hover:text-white"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon
                className={`w-5 h-5 flex-shrink-0 ${
                  item.active ? "text-blue-800" : ""
                }`}
              />
              {!isCollapsed && (
                <span className="truncate ml-3">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
