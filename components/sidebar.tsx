"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { ImageIcon, HistoryIcon, SettingsIcon } from 'lucide-react'
import { UserButton } from "@clerk/nextjs"

const navItems = [
  { href: '/', icon: ImageIcon, label: 'Generate' },
  { href: '/history', icon: HistoryIcon, label: 'History' },
  { href: '/settings', icon: SettingsIcon, label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.href} className="rounded-sm">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center p-2 space-x-3 rounded-md",
                    pathname === item.href ? "bg-gray-700" : "hover:bg-gray-700"
                  )}
                >
                  <item.icon className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-100">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}