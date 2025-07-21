export interface LoginResponse {
  id: string,
  name: string,
  email: string,
  role: 'USER' | 'STAFF' | 'ADMIN',
  phone: string | null,
  avata: string | null,
  token: string
}

export interface Accounts {
  id?: string,
  username: string,
  email: string,
  enable?: boolean,
  phoneNumber?: string | null,
  firebaseUid?: string | null,
  verificationCode?: string | null,
  timeCreated?: Date,
  timeUpdatedLast?: Date,
  deleted?: boolean,
  role?: 'ADMIN' | 'STAFF' | 'USER',
}

export interface Account {
  id: string,
  name: string,
  email: string,
  phone: string | null,
  role: 'USER' | 'STAFF' | 'ADMIN',
  plan: string,
  enable: boolean
}

export interface UserProfile {
  uuid: string,
  fullName: string,
  userName: string,
  email: string,
  phone: string,
  address: string,
  role: string,
  image: string,
}

export interface User {
  id: string,
  name: string,
  email: string,
  phone: string | null,
  avata: string | null
}

export interface Response<T> {
  message: string,
  httpStatus: string,
  data: T
}

export interface ModalProps<T> {
  isOpen: boolean,
  onClose: () => void,
  onSave: (data: T) => void,
  initialData?: T,
  title?: string,
  isLoading?: boolean,
}

export interface EditFormData {
  id: string,
  type: 'Phone' | 'Name',
  content: string
}

export interface RegisterRequest {
  name: string,
  password: string,
  email: string,
}

export interface Application {
  deleted?: boolean,
  id: string,
  campus: Campus,
  major: Major,
  scholarship: string,
  accounts: Accounts,
  applicationStatus: 'PENDING' | 'APPROVED' | 'REJECTED',
  timeCreated?: Date,
  timeUpdatedLast?: Date,
}

export interface Campus {
  id: string,
  name: string,
  address: string,
  phone: string,
  email: string,
  timeCreated?: Date,
  timeUpdatedLast?: Date,
  deleted?: boolean,
  major_campuses?: Major_Campus[]
}

export interface Major {
  id: string,
  name: string,
  description: string,
  duration: number,
  fee: number,
  timeCreated?: Date,
  timeUpdatedLast?: Date,
  deleted?: boolean,
  major_campuses?: Major_Campus[]
}

export interface Major_Campus {
  timeCreated?: Date,
  timeUpdatedLast?: Date,
  deleted?: boolean,
  id: string
}
