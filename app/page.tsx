import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppSidebar } from "./components/app-sidebar"
import { QuoteHeader } from "./components/quote-header"
import { QuoteProgress } from "./components/quote-progress"
import { ClientInfoForm } from "./components/client-info-form"
import { QuoteNavigation } from "./components/quote-navigation"

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-white">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-auto bg-white pb-0 pt-[88px]">
        <div className="mx-auto flex w-full max-w-[768px] flex-col gap-8 px-0">
          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList className="gap-1.5">
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base leading-[1.5] text-[#9fa6ad] hover:text-[#32383e]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#171a1c]" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base leading-[1.5] text-[#32383e] underline decoration-[#636b74] decoration-solid underline-offset-4 hover:text-[#32383e]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Quotes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#171a1c]" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className="text-base leading-[1.5] text-[#32383e]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  New Quote
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Header */}
          <QuoteHeader />

          {/* Progress Indicator */}
          <QuoteProgress />

          {/* Client Information Form */}
          <ClientInfoForm />

          {/* Navigation Buttons */}
          <QuoteNavigation />
        </div>
      </div>
    </div>
  )
}
