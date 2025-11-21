import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ClientInfoForm() {
  return (
    <Card className="mb-8 w-full border border-[#cdd7e1] bg-[#fbfcfe] rounded-[12px] shadow-sm gap-0">
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex flex-col gap-1">
          <CardTitle
            className="text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-[#0a0a0a]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Client Information
          </CardTitle>
          <CardDescription
            className="text-base font-normal leading-[1.5] text-[#737373]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Enter the primary insured's basic information
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-6 pb-6 pt-6">
        {/* First Name, Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-medium leading-[1.5] text-[#0a0a0a] tracking-[0.21px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              First Name
            </Label>
            <Input
              defaultValue="James"
              className="h-10 text-base leading-[1.5]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-medium leading-[1.5] text-[#0a0a0a] tracking-[0.21px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Last Name
            </Label>
            <Input
              defaultValue="McNulty"
              className="h-10 text-base leading-[1.5]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1">
          <Label
            className="text-sm font-medium leading-[1.5] text-[#0a0a0a] tracking-[0.21px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Date of Birth
          </Label>
          <Input
            placeholder="MM/DD/YYYY"
            className="h-10 text-base leading-[1.5]"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* Driver's License, Driver's License State */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-medium leading-[1.5] text-[#0a0a0a] tracking-[0.21px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Driver's License (optional)
            </Label>
            <Input
              placeholder="Driver's License"
              className="h-10 text-base leading-[1.5]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-medium leading-[1.5] text-[#0a0a0a] tracking-[0.21px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Driver's License State
            </Label>
            <Input
              placeholder="Driver's License State"
              className="h-10 text-base leading-[1.5]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        {/* Email, Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-medium leading-[1.5] text-[#0a0a0a] tracking-[0.21px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Email
            </Label>
            <Input
              type="email"
              defaultValue="john@example.com"
              className="h-10 text-base leading-[1.5]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-medium leading-[1.5] text-[#0a0a0a] tracking-[0.21px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Phone
            </Label>
            <Input
              type="tel"
              defaultValue="(555) 123-4567"
              className="h-10 text-base leading-[1.5]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <Label
            className="text-sm font-medium leading-[1.5] text-[#0a0a0a] tracking-[0.21px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Address
          </Label>
          <Input
            defaultValue="5211 S McQueen Rd, Chandler, AZ 85249"
            className="h-10 text-base leading-[1.5]"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

