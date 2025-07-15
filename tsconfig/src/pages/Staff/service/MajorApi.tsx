const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API URL

// Define the ChildMajor interface based on your API response structure
export interface ChildMajor {
  id: string;
  name: string;
  description?: string;
  duration?: number;
  fee?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MajorApiResponse {
  id: string;
  name: string;
  description: string;
  duration: number;
  fee: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MajorFormData {
  name: string;
  description: string;
  duration: number;
  fee: number;
}

export const majorApi = {

  // Get all majors
  getAllMajors: async (): Promise<MajorApiResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/majors/parents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

  // Get major by ID
  getMajorById: async (id: string): Promise<MajorApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/majors/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
  createMajor: async (major: MajorFormData): Promise<MajorApiResponse> => {
    try {
      console.log('Creating major:', major);
      const response = await fetch(`${API_BASE_URL}/majors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        throw new Error(`Failed to create major: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating major:', error);
      throw error;
    }
  },

  // Update major
  updateMajor: async (id: string, major: MajorFormData): Promise<MajorApiResponse> => {
    try {
      console.log('Updating major:', id, major);
      const response = await fetch(`${API_BASE_URL}/majors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
  searchMajors: async (keyword?: string): Promise<MajorApiResponse[]> => {
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