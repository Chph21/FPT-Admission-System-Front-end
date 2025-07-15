export interface LoginResponse {
  id: string,
  name: string,
  email: string,
  role: 'USER' | 'STAFF' | 'ADMIN',
  phone: string | null,
  avata: string | null,
  token: string
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
    uuid: string;
    fullName: string;
    userName: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    image: string;
}

export interface User {
  name: string,
  email: string,
  id: string,
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
