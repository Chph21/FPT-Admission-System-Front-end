import type { DashboardStats, Major, Campus, Post } from '../types';

export const mockStats: DashboardStats = {
  totalStudents: 15240,
  totalMajors: 24,
  totalCampuses: 8,
  totalPosts: 142,
  activeApplications: 3420,
  pendingReviews: 156
};

export const mockMajors: Major[] = [
  {
    id: '1',
    name: 'Software Engineering',
    code: 'SE',
    description: 'Comprehensive program covering software development, algorithms, and system design.',
    duration: 4,
    tuitionFee: 15000,
    capacity: 200,
    enrolled: 185,
    status: 'active',
    campus: 'FPT Ho Chi Minh',
    createdAt: '2023-01-15',
    updatedAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'Information Technology',
    code: 'IT',
    description: 'Focus on IT infrastructure, networking, and system administration.',
    duration: 4,
    tuitionFee: 14000,
    capacity: 180,
    enrolled: 165,
    status: 'active',
    campus: 'FPT Ha Noi',
    createdAt: '2023-02-01',
    updatedAt: '2024-01-08'
  },
  {
    id: '3',
    name: 'Artificial Intelligence',
    code: 'AI',
    description: 'Advanced program in machine learning, deep learning, and AI applications.',
    duration: 4,
    tuitionFee: 18000,
    capacity: 120,
    enrolled: 118,
    status: 'active',
    campus: 'FPT Da Nang',
    createdAt: '2023-03-10',
    updatedAt: '2024-01-12'
  },
  {
    id: '4',
    name: 'Cybersecurity',
    code: 'CS',
    description: 'Specialized program in information security and cyber defense.',
    duration: 4,
    tuitionFee: 16000,
    capacity: 100,
    enrolled: 92,
    status: 'active',
    campus: 'FPT Ho Chi Minh',
    createdAt: '2023-04-05',
    updatedAt: '2024-01-09'
  },
  {
    id: '5',
    name: 'Digital Marketing',
    code: 'DM',
    description: 'Modern marketing strategies and digital business development.',
    duration: 3,
    tuitionFee: 12000,
    capacity: 150,
    enrolled: 0,
    status: 'inactive',
    campus: 'FPT Can Tho',
    createdAt: '2023-05-20',
    updatedAt: '2024-01-05'
  }
];

export const mockCampuses: Campus[] = [
  {
    id: '1',
    name: 'FPT University Ho Chi Minh',
    code: 'FPT-HCM',
    address: '778/B1 Nguyen Kem, Ward 7, District 3',
    city: 'Ho Chi Minh City',
    phone: '+84 28 3829 7520',
    email: 'hcm@fpt.edu.vn',
    capacity: 5000,
    established: '1999',
    status: 'active',
    facilities: ['Library', 'Computer Labs', 'Sports Center', 'Cafeteria', 'Auditorium', 'Parking']
  },
  {
    id: '2',
    name: 'FPT University Ha Noi',
    code: 'FPT-HN',
    address: 'Hoa Lac Hi-Tech Park, Km29, Thang Long Highway',
    city: 'Ha Noi',
    phone: '+84 24 7300 1866',
    email: 'hanoi@fpt.edu.vn',
    capacity: 8000,
    established: '2006',
    status: 'active',
    facilities: ['Modern Library', 'Innovation Lab', 'Gymnasium', 'Student Center', 'Research Facilities']
  },
  {
    id: '3',
    name: 'FPT University Da Nang',
    code: 'FPT-DN',
    address: '137 Nguyen Thien Thuat, Nai Hien Dong Ward, Son Tra District',
    city: 'Da Nang',
    phone: '+84 236 3735 366',
    email: 'danang@fpt.edu.vn',
    capacity: 3000,
    established: '2009',
    status: 'active',
    facilities: ['Ocean View Library', 'Tech Labs', 'Beach Access', 'Conference Center']
  },
  {
    id: '4',
    name: 'FPT University Can Tho',
    code: 'FPT-CT',
    address: '600 Nguyen Van Cu, An Binh Ward, Ninh Kieu District',
    city: 'Can Tho',
    phone: '+84 292 7300 468',
    email: 'cantho@fpt.edu.vn',
    capacity: 2500,
    established: '2012',
    status: 'active',
    facilities: ['Riverside Campus', 'Computer Labs', 'Student Dormitory', 'Recreation Center']
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Enrollment Open for Fall 2024 Semester',
    content: 'We are excited to announce that enrollment for the Fall 2024 semester is now open. Students can apply for various programs across all our campuses. Early bird discounts available until March 31st.',
    type: 'admission',
    status: 'published',
    author: 'Admin Team',
    publishDate: '2024-01-15',
    featured: true,
    views: 2840,
    tags: ['enrollment', 'fall-2024', 'admission', 'early-bird']
  },
  {
    id: '2',
    title: 'New AI Laboratory Opens at FPT Da Nang',
    content: 'State-of-the-art Artificial Intelligence laboratory facility is now operational at our Da Nang campus, featuring the latest GPU clusters and research equipment for AI students and faculty.',
    type: 'news',
    status: 'published',
    author: 'Marketing Team',
    publishDate: '2024-01-12',
    featured: false,
    views: 1560,
    tags: ['AI', 'laboratory', 'da-nang', 'facilities']
  },
  {
    id: '3',
    title: 'Career Fair 2024 - Connect with Top Employers',
    content: 'Join us for the annual Career Fair where students can meet with representatives from leading technology companies and explore internship and job opportunities.',
    type: 'event',
    status: 'published',
    author: 'Career Services',
    publishDate: '2024-01-10',
    featured: true,
    views: 3220,
    tags: ['career-fair', 'jobs', 'internship', 'employers']
  },
  {
    id: '4',
    title: 'Academic Calendar Updates',
    content: 'Important updates to the academic calendar for the upcoming semester. Please review the new schedule for examinations and holidays.',
    type: 'announcement',
    status: 'published',
    author: 'Academic Office',
    publishDate: '2024-01-08',
    featured: false,
    views: 890,
    tags: ['calendar', 'academic', 'schedule', 'exams']
  },
  {
    id: '5',
    title: 'Draft: Scholarship Program Launch',
    content: 'New merit-based scholarship program for outstanding students. Details and application process to be announced soon.',
    type: 'announcement',
    status: 'draft',
    author: 'Financial Aid',
    publishDate: '2024-01-20',
    featured: false,
    views: 0,
    tags: ['scholarship', 'financial-aid', 'students']
  }
];