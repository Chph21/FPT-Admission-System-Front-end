
const API_BASE_URL = 'http://localhost:8080/api';

export interface ChildMajorFormData {
  name: string;
  description: string;
  duration: number;
  fee: number;
  parentMajorId: string;
}

export interface ChildMajorApiResponse {
  id: string;
  name: string;
  description: string;
  duration: number;
  fee: number;
  parentMajorId?: {
    id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const childMajorApi = {
  // CREATE
  createChildMajor: async (childMajor: ChildMajorFormData): Promise<ChildMajorApiResponse> => {
    try {
      console.log('Creating child major:', childMajor);
      const response = await fetch(`${API_BASE_URL}/majors/child`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
        body: JSON.stringify(childMajor),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create child major: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating child major:', error);
      throw error;
    }
  },

  // READ - Get all child majors
  getAllChildMajors: async (): Promise<ChildMajorApiResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/majors/children`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch child majors: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching child majors:', error);
      throw error;
    }
  },

  // READ - Get child major by ID
  getChildMajorById: async (id: string): Promise<ChildMajorApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/child-majors/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch child major: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching child major:', error);
      throw error;
    }
  },

  // READ - Get child majors by parent major ID
  getChildMajorsByParentId: async (parentMajorId: string): Promise<ChildMajorApiResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/child-majors/parent/${parentMajorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch child majors: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching child majors:', error);
      throw error;
    }
  },

   // UPDATE - Fixed endpoint and payload
  updateChildMajor: async (id: string, childMajor: ChildMajorFormData): Promise<ChildMajorApiResponse> => {
    try {
      console.log('Updating child major:', id, childMajor);
      
      // Get current child major to preserve parentMajorId if needed
      let updateData = { ...childMajor };
      
      // If parentMajorId is missing, get it from current data
      if (!updateData.parentMajorId || updateData.parentMajorId.trim() === '') {
        try {
          const currentData = await childMajorApi.getChildMajorById(id);
          updateData.parentMajorId = currentData.parentMajorId?.id ?? '';
          console.log('Retrieved current parentMajorId:', currentData.parentMajorId?.id);
        } catch (error) {
          console.warn('Could not fetch current child major data:', error);
        }
      }
      
      const response = await fetch(`${API_BASE_URL}/majors/child/${id}`, { // Fixed: consistent endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
        body: JSON.stringify({
          name: updateData.name,
          description: updateData.description,
          duration: updateData.duration,
          fee: updateData.fee,
          parentMajorId: updateData.parentMajorId
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update child major: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating child major:', error);
      throw error;
    }
  },

  // DELETE
  deleteChildMajor: async (id: string): Promise<void> => {
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
        throw new Error(`Failed to delete child major: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting child major:', error);
      throw error;
    }
  },

  // SEARCH
  searchChildMajors: async (keyword?: string): Promise<ChildMajorApiResponse[]> => {
    try {
      const params = new URLSearchParams();
      if (keyword && keyword.trim()) {
        params.append('keyword', keyword.trim());
      }
      
      const url = `${API_BASE_URL}/child-majors/search${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to search child majors: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching child majors:', error);
      throw error;
    }
  },
};