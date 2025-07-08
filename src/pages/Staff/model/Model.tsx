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

// export interface Major {
//   id: string;
//   name: string;
//   code: string;
//   description: string;
//   duration: number;
//   tuitionFee: number;
//   capacity: number;
//   enrolled: number;
//   status: 'active' | 'inactive';
//   campus: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface Campus {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  capacity: number;
  established: string;
  status: 'active' | 'inactive';
  facilities: string[];
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

export interface Major {
  id: string;
  name: string;
  code: string;
  description: string;
  childMajors: ChildMajor[];
}

export interface ChildMajor {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface MajorFormData {
  name: string;
  code: string;
  description: string;
  childMajors: Omit<ChildMajor, 'id'>[];
}