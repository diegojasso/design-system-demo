export type Incident = {
  id: string
  incidentType: string
  incidentDate: string
  source: string
  driverId: string
  totalDamagesOver1000: boolean
  atFault: boolean
  policeReportFiled: boolean
}

export const INCIDENT_TYPE_OPTIONS = [
  "Accident",
  "Violation",
  "Claim",
  "Other",
]

export const INCIDENT_SOURCE_OPTIONS = [
  "Self Reported",
  "Police Report",
  "Carrier Reported",
  "Other",
]

export function createEmptyIncident(): Incident {
  return {
    id: `incident-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    incidentType: "",
    incidentDate: "",
    source: "Self Reported",
    driverId: "",
    totalDamagesOver1000: false,
    atFault: false,
    policeReportFiled: false,
  }
}
