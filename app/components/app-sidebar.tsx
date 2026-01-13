"use client"

import * as React from "react"
import {
  House,
  Contact,
  Shield,
  BookUser,
  ClipboardCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const menuItems = [
  {
    label: "Overview",
    icon: House,
    active: false,
  },
  {
    label: "Quotes",
    icon: Contact,
    active: true,
  },
  {
    label: "Policies",
    icon: Shield,
    active: false,
  },
  {
    label: "Book of Business",
    icon: BookUser,
    active: false,
  },
  {
    label: "Tasks",
    icon: ClipboardCheck,
    active: false,
    badge: 3,
  },
]

export function AppSidebar() {
  const [isHovered, setIsHovered] = React.useState(false)
  const isExpanded = isHovered

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "group flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ease-linear",
          isExpanded ? "w-[240px]" : "w-[48px]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Menu */}
        <div className="flex flex-1 flex-col gap-0.5 px-2 pt-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            const menuItem = (
              <div
                key={item.label}
                className={cn(
                  "flex items-center rounded-md py-1.5 transition-colors",
                  isExpanded ? "gap-5 px-3" : "justify-center px-0",
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className="h-5 w-5 shrink-0 text-sidebar-foreground" />
                <span
                  className={cn(
                    "flex-1 text-base leading-[1.5] text-sidebar-foreground transition-opacity duration-200",
                    item.active ? "font-medium" : "font-normal",
                    isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-[12px] bg-destructive px-[7px] py-0 transition-opacity duration-200",
                      isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                    )}
                  >
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

            // Show tooltip when collapsed
            if (!isExpanded) {
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    {menuItem}
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    {item.label}
                    {item.badge && (
                      <span className="ml-2">({item.badge})</span>
                    )}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return menuItem
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}

