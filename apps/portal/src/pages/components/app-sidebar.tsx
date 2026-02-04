"use client"

import * as React from "react"
import {
  House,
  Contact,
  Shield,
  BookUser,
  ClipboardCheck,
} from "lucide-react"
import { cn } from "@/shared/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@novo/ui"

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
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "group flex h-screen flex-col border-r border-sidebar-border bg-sidebar",
          isExpanded ? "w-[240px]" : "w-[48px]"
        )}
        style={{
          transition: isExpanded 
            ? "width 250ms cubic-bezier(0.4, 0, 0.2, 1)" 
            : "width 200ms cubic-bezier(0.4, 0, 1, 1)"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Menu */}
        <div className="flex flex-1 flex-col px-2 pt-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const menuItem = (
              <button
                key={item.label}
                type="button"
                className={cn(
                  "group/item flex h-10 w-full items-center rounded-md transition-colors duration-150 ease-out",
                  isExpanded ? "gap-3 px-3" : "justify-center px-0",
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground active:bg-sidebar-accent/70",
                  "mb-1 last:mb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2"
                )}
              >
                <Icon 
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors duration-150 ease-out",
                    item.active 
                      ? "text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground/70 group-hover/item:text-sidebar-foreground"
                  )} 
                />
                <span
                  className={cn(
                    "flex-1 min-w-0 text-left text-sm leading-[1.5] whitespace-nowrap",
                    item.active 
                      ? "font-medium text-sidebar-accent-foreground" 
                      : "font-normal text-sidebar-foreground/70"
                  )}
                  style={{ 
                    fontFamily: "Inter, sans-serif",
                    transition: isExpanded
                      ? "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, max-width 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms"
                      : "opacity 150ms cubic-bezier(0.4, 0, 1, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 1, 1) 0ms, max-width 150ms cubic-bezier(0.4, 0, 1, 1) 0ms",
                    opacity: isExpanded ? 1 : 0,
                    transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
                    maxWidth: isExpanded ? "100%" : "0",
                    overflow: "hidden"
                  }}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <div
                    className="flex shrink-0 items-center justify-center rounded-full bg-destructive"
                    style={{
                      transition: isExpanded
                        ? "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, width 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms"
                        : "opacity 150ms cubic-bezier(0.4, 0, 1, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 1, 1) 0ms, width 150ms cubic-bezier(0.4, 0, 1, 1) 0ms, padding 150ms cubic-bezier(0.4, 0, 1, 1) 0ms",
                      opacity: isExpanded ? 1 : 0,
                      transform: isExpanded ? "translateX(0)" : "translateX(8px)",
                      width: isExpanded ? "auto" : "0",
                      minWidth: isExpanded ? "20px" : "0",
                      padding: isExpanded ? "2px 6px" : "0",
                      overflow: "hidden",
                      pointerEvents: isExpanded ? "auto" : "none"
                    }}
                  >
                    <span
                      className="text-xs font-medium leading-none text-destructive-foreground whitespace-nowrap"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.badge}
                    </span>
                  </div>
                )}
              </button>
            )

            // Show tooltip when collapsed
            if (!isExpanded) {
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    {menuItem}
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    sideOffset={12}
                    className="bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
                          {item.badge}
                        </span>
                      )}
                    </div>
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

