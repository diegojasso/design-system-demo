"use client"

import {
  FileText,
  Shield,
  BookOpen,
  Bell,
  MessageSquare,
  HelpCircle,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    label: "Quotes",
    icon: FileText,
    active: true,
  },
  {
    label: "Policies",
    icon: Shield,
    active: false,
  },
  {
    label: "Book of Business",
    icon: BookOpen,
    active: false,
  },
  {
    label: "Tasks",
    icon: Bell,
    active: false,
    badge: 3,
  },
  {
    label: "Chat Hisotry",
    icon: MessageSquare,
    active: false,
  },
  {
    label: "Help Center",
    icon: HelpCircle,
    active: false,
  },
]

export function AppSidebar() {
  return (
    <div
      className="flex h-screen w-[240px] flex-col border-r border-sidebar-border bg-sidebar pb-4 pt-6"
    >
      {/* Logo Section */}
      <div className="mb-8 px-4">
        <div className="mb-2 flex h-5 items-center">
          <span className="text-xl font-bold leading-none tracking-tight text-sidebar-foreground">novo</span>
        </div>
        <p className="text-base font-semibold leading-[1.5] text-sidebar-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
          Canary
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-1 flex-col gap-0.5 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-5 rounded-md px-3 py-1.5 transition-colors",
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="h-5 w-5 shrink-0 text-sidebar-foreground" />
              <span
                className={cn(
                  "flex-1 text-base leading-[1.5] text-sidebar-foreground",
                  item.active ? "font-medium" : "font-normal"
                )}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.label}
              </span>
              {item.badge && (
                <div className="flex h-5 w-5 items-center justify-center rounded-[12px] bg-destructive px-[7px] py-0">
                  <span
                    className="text-sm font-medium leading-[1.5] text-destructive-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.badge}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* User Profile Section */}
      <div className="mt-auto px-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Kaiya Yehia" />
            <AvatarFallback className="bg-muted">KY</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p
              className="text-base font-normal text-sidebar-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Kaiya Yehia
            </p>
            <p
              className="text-sm font-normal text-sidebar-foreground/70"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.42 }}
            >
              CSR
            </p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-sidebar-accent/50">
            <ChevronRight className="h-5 w-5 text-sidebar-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}

