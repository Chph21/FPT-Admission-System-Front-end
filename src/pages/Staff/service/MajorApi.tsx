import type { Major } from "../model/Model";

// const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API URL
const API_BASE_URL = 'https://fpt-admission-system.onrender.com/api';

// Define the ChildMajor interface based on your API response structure

export interface ChildMajorResponse {
  id: string;
  name: string;
  description: string;
  timeCreated?: string;
  timeUpdatedLast?: string;
  deleted?: boolean;
  major?: {
    id: string;
    name: string;
    description?: string;
  };
}

export const majorApi = {

  // Get all majors
  getAllMajors: async (): Promise<Major[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/majors/parents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch majors: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching majors:', error);
      throw error;
    }
  },

  getChildrenByMajorId: async (majorId: string): Promise<ChildMajorResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/majors/${majorId}/children`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch children for major ${majorId}: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Children for major ${majorId}:`, data);

      // Return the data array (adjust based on your API response structure)
      return data.listData || data || [];
    } catch (error) {
      console.error('Error fetching children by major ID:', error);
      throw error;
    }
  },

  // Get major by ID
  getMajorById: async (id: string): Promise<Major> => {
    try {
      const response = await fetch(`${API_BASE_URL}/majors/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth

        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch major: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching major:', error);
      throw error;
    }
  },

  // Create new major
  createMajor: async (major: Major, idCampus: string): Promise<Major> => {
    try {
      console.log('Creating major:', major);

      // Build URL with idCampus as query parameter
      const url = `${API_BASE_URL}/majors?idCampus=${encodeURIComponent(idCampus)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: major.name,
          description: major.description,
          duration: major.duration,
          fee: major.fee
          // Note: idCampus is NOT in the body, it's in the URL parameter
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create major: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating major:', error);
      throw error;
    }
  },

  // Update major
  updateMajor: async (id: string, major: Major): Promise<Major> => {
    try {
      console.log('Updating major:', id, major);
      const response = await fetch(`${API_BASE_URL}/majors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth

        },
        body: JSON.stringify({
          name: major.name,
          description: major.description,
          duration: major.duration,
          fee: major.fee
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update major: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating major:', error);
      throw error;
    }
  },

  // Delete major
  deleteMajor: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/majors/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth

        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete major: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting major:', error);
      throw error;
    }
  },

  // Search majors
  searchMajors: async (keyword?: string): Promise<Major[]> => {
    try {
      const params = new URLSearchParams();
      if (keyword && keyword.trim()) {
        params.append('keyword', keyword.trim());
      }

      const url = `${API_BASE_URL}/majors/search${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Searching majors with URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth

        },
      });

      if (!response.ok) {
        throw new Error(`Failed to search majors: ${response.status}`);
      }

      const result = await response.json();
      console.log('Major search results:', result);
      return result;
    } catch (error) {
      console.error('Error searching majors:', error);
      throw error;
    }
  },
};




