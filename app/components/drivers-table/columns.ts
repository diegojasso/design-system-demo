import { ColumnDef } from './types'

// US States for license state dropdown
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

export const DRIVER_FIELDS: ColumnDef[] = [
  {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    editable: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    editable: true,
  },
  {
    id: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    required: true,
    editable: true,
  },
  {
    id: 'gender',
    label: 'Gender',
    type: 'dropdown',
    options: ['Male', 'Female', 'Other'],
    editable: true,
  },
  {
    id: 'maritalStatus',
    label: 'Marital Status',
    type: 'dropdown',
    options: ['Single', 'Married', 'Divorced', 'Widowed'],
    editable: true,
  },
  {
    id: 'relationship',
    label: 'Relation to primary Insured',
    type: 'dropdown',
    options: ['Self', 'Spouse', 'Child', 'Other'],
    required: true,
    editable: true,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    editable: true,
  },
  {
    id: 'phone',
    label: 'Phone',
    type: 'text',
    editable: true,
  },
  {
    id: 'includeInPolicy',
    label: 'Include in Policy?',
    type: 'boolean',
    editable: true,
  },
  {
    id: 'licenseNumber',
    label: "Driver's License",
    type: 'text',
    editable: true,
  },
  {
    id: 'licenseState',
    label: "Driver's License State",
    type: 'dropdown',
    options: US_STATES,
    editable: true,
  },
  {
    id: 'yearsLicensed',
    label: 'How long since driver license was obtained',
    type: 'dropdown',
    options: ['Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'],
    editable: true,
  },
  {
    id: 'licenseStatus',
    label: "Driver's License Status",
    type: 'dropdown',
    options: ['Valid', 'Suspended', 'Expired'],
    editable: true,
  },
  {
    id: 'homeOwnership',
    label: 'Does the client own or rent their home?',
    type: 'dropdown',
    options: ['Own', 'Rent', 'Other'],
    editable: true,
  },
  {
    id: 'employmentStatus',
    label: 'Employment Status',
    type: 'dropdown',
    options: ['Employed', 'Self-Employed', 'Unemployed', 'Retired', 'Student'],
    editable: true,
  },
  {
    id: 'educationLevel',
    label: 'Highest Education Level',
    type: 'dropdown',
    options: ['High School', 'Some College', "Bachelor's", "Master's", 'Doctorate'],
    editable: true,
  },
]

