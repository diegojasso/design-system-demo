"use client"

import { usePathname } from "next/navigation"

export interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

/**
 * Route to breadcrumb label mapping
 * This allows for easy customization and maintenance of breadcrumb labels
 */
const routeLabels: Record<string, string> = {
  "/": "Home",
  "/quotes": "Quotes",
  "/import": "Import",
  "/import/ezlynx": "Import Ezlynx",
}

/**
 * Generates breadcrumbs from the current pathname
 * Automatically creates breadcrumb items based on the route segments
 */
export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname()
  
  // Split pathname into segments
  const segments = pathname.split("/").filter(Boolean)
  
  // Build breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Always start with Home
  breadcrumbs.push({
    label: routeLabels["/"] || "Home",
    href: "/",
    isActive: pathname === "/",
  })
  
  // Build path incrementally for each segment
  let currentPath = ""
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1
    
    // Check if we have a specific label for this route
    const label = routeLabels[currentPath] || 
                  segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    
    breadcrumbs.push({
      label,
      href: currentPath,
      isActive: isLast,
    })
  })
  
  return breadcrumbs
}
