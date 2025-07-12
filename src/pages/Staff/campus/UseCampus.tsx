// import { useState, useCallback } from 'react';
// import type { Campus, CampusFormData } from '../model/Model';

// // Mock data for demonstration
// const mockCampuses: Campus[] = [
//   {
//     id: '1',
//     name: 'Main Campus',
//     code: 'MAIN001',
//     address: '123 University Ave',
//     city: 'New York',
//     state: 'NY',
//     zipCode: '10001',
//     phone: '(555) 123-4567',
//     email: 'main@university.edu',
//     status: 'active',
//     capacity: 5000,
//     facilities: ['Library', 'Gymnasium', 'Cafeteria', 'Laboratory', 'Auditorium'],
//     establishedYear: 1985,
//     description: 'The main campus featuring state-of-the-art facilities and comprehensive academic programs.',
//     createdAt: new Date('2023-01-15'),
//     updatedAt: new Date('2024-01-15')
//   },
//   {
//     id: '2',
//     name: 'Downtown Campus',
//     code: 'DOWN002',
//     address: '456 Business District',
//     city: 'New York',
//     state: 'NY',
//     zipCode: '10002',
//     phone: '(555) 234-5678',
//     email: 'downtown@university.edu',
//     status: 'active',
//     capacity: 2500,
//     facilities: ['Computer Lab', 'Library', 'Cafeteria', 'Parking'],
//     establishedYear: 2010,
//     description: 'Modern downtown campus focused on business and technology programs.',
//     createdAt: new Date('2023-02-20'),
//     updatedAt: new Date('2024-01-10')
//   },
//   {
//     id: '3',
//     name: 'Riverside Campus',
//     code: 'RIVE003',
//     address: '789 Riverside Dr',
//     city: 'Albany',
//     state: 'NY',
//     zipCode: '12203',
//     phone: '(555) 345-6789',
//     email: 'riverside@university.edu',
//     status: 'inactive',
//     capacity: 1500,
//     facilities: ['Library', 'Sports Field', 'Dormitory', 'Medical Center'],
//     establishedYear: 1995,
//     description: 'Scenic riverside campus currently undergoing renovations.',
//     createdAt: new Date('2023-03-10'),
//     updatedAt: new Date('2023-12-05')
//   }
// ];

// export const useCampuses = () => {
//   const [campuses, setCampuses] = useState<Campus[]>(mockCampuses);

//   const addCampus = useCallback((data: CampusFormData) => {
//     const newCampus: Campus = {
//       ...data,
//       id: Date.now().toString(),
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };
//     setCampuses(prev => [...prev, newCampus]);
//   }, []);

//   const updateCampus = useCallback((id: string, data: CampusFormData) => {
//     setCampuses(prev => prev.map(campus => 
//       campus.id === id 
//         ? { ...campus, ...data, updatedAt: new Date() }
//         : campus
//     ));
//   }, []);

//   const deleteCampus = useCallback((id: string) => {
//     setCampuses(prev => prev.filter(campus => campus.id !== id));
//   }, []);

//   return {
//     campuses,
//     addCampus,
//     updateCampus,
//     deleteCampus
//   };
// };