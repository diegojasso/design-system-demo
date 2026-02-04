"use client"

import * as React from "react"
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@novo/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@novo/ui"
import { Button } from "@novo/ui"
import { cn } from "@/shared/utils"

interface AccountDropdownProps {
  userName?: string
  userEmail?: string
  userRole?: string
  avatarUrl?: string
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onLogoutClick?: () => void
  className?: string
}

export function AccountDropdown({
  userName = "Kaiya Yehia",
  userEmail,
  userRole = "CSR",
  avatarUrl = "/placeholder-avatar.jpg",
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  className,
}: AccountDropdownProps) {
  const handleProfileClick = () => {
    onProfileClick?.()
    // TODO: Navigate to profile page
    console.log("Navigate to profile")
  }

  const handleSettingsClick = () => {
    onSettingsClick?.()
    // TODO: Navigate to settings page
    console.log("Navigate to settings")
  }

  const handleLogoutClick = () => {
    onLogoutClick?.()
    // TODO: Implement logout
    console.log("Logout")
  }

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-auto gap-2 px-2 py-1.5 hover:bg-accent",
            className
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback className="bg-muted text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start text-left sm:flex">
            <span className="text-sm font-medium leading-none">
              {userName}
            </span>
            {userEmail && (
              <span className="text-xs text-muted-foreground">
                {userEmail}
              </span>
            )}
          </div>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            {userEmail && (
              <p className="text-xs leading-none text-muted-foreground">
                {userEmail}
              </p>
            )}
            {userRole && (
              <p className="text-xs leading-none text-muted-foreground">
                {userRole}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleProfileClick}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSettingsClick}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogoutClick}
          variant="destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
