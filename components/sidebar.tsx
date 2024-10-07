"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ImageIcon, HistoryIcon, SettingsIcon } from 'lucide-react'

const navItems = [
  { href: '/', icon: ImageIcon, label: 'Generate' },
  { href: '/history', icon: HistoryIcon, label: 'History' },
  { href: '/settings', icon: SettingsIcon, label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-gray-100 dark:bg-gray-800 border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold">AI Image Gen</h1>
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="px-2">
              <Link href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-gray-200 dark:bg-gray-700"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}