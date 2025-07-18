export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'admission' | 'event' | 'news';
  status: 'draft' | 'published' | 'archived';
  author: string;
  publishDate: string;
  featured: boolean;
  views: number;
  tags: string[];
}

export interface DashboardStats {
  totalStudents: number;
  totalMajors: number;
  totalCampuses: number;
  totalPosts: number;
  activeApplications: number;
  pendingReviews: number;
}

export interface Campus {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CampusFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Major {
  timeCreated?: Date,
  timeUpdatedLast?: Date | null,
  deleted?: boolean,
  id?: string,
  name: string,
  description: string,
  duration: number,
  fee: number,
  parentMajors?: Major | null,
  major_campuses?: Major_Campus[]
}

interface Major_Campus {
  timeCreated: Date,
  timeUpdatedLast: Date | null,
  deleted: boolean,
  id: string
}