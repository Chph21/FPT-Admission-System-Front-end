export interface Major {
  id: string
  name: string
  description: string
}

export interface Campus {
  id: string
  name: string
  address: string
  email: String
  phone: String
}

export interface Specialization {
  specializationId: string
  name: string
  description: string
  major: Major
}

