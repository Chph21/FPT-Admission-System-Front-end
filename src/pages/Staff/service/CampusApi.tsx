const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API URL

export interface CampusApiResponse {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CampusFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export const campusApi = {
  // Get all campuses
  getAllCampuses: async (): Promise<CampusApiResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/campuses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },

      });

      if (!response.ok) {
        throw new Error('Failed to fetch campuses');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching campuses:', error);
      throw error;
    }
  },

  // Create new campus
  createCampus: async (campus: CampusFormData): Promise<CampusApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/campuses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
        body: JSON.stringify(campus),
      });
      if (!response.ok) {
        throw new Error('Failed to create campus');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating campus:', error);
      throw error;
    }
  },

  // Update campus
  updateCampus: async (id: string, campus: CampusFormData): Promise<CampusApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/campuses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
        body: JSON.stringify(campus),
      });
      if (!response.ok) {
        throw new Error('Failed to update campus');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating campus:', error);
      throw error;
    }
  },

  // Delete campus
  deleteCampus: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/campuses/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete campus');
      }
    } catch (error) {
      console.error('Error deleting campus:', error);
      throw error;
    }
  },

    // Search campuses
  searchCampuses: async (keyword?: string): Promise<CampusApiResponse[]> => {
    try {
      const params = new URLSearchParams();
      if (keyword && keyword.trim()) {
        params.append('keyword', keyword.trim());
      }
      
      const url = `${API_BASE_URL}/campuses/search${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Searching campuses with URL:', url); // Debug log
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based auth
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to search campuses: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Search results:', result); // Debug log
      return result;
    } catch (error) {
      console.error('Error searching campuses:', error);
      throw error;
    }
  },
};