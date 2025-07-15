import React, {useState, useEffect} from 'react';
import { StatsCard } from './StatsCard';
import { GraduationCap, Building } from 'lucide-react';
import { majorApi } from '../service/MajorApi';
import { campusApi } from '../service/CampusApi';

export const DashboardOverview: React.FC = ({ }) => {

const [stats, setStats] = useState({
    totalMajors: 0,
    totalCampuses: 0,
    totalPosts: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));

        const majorsResponse = await majorApi.getAllMajors();
        const majorsCount = majorsResponse.length;

        const campusesResponse = await campusApi.getAllCampuses();
        const campusesCount = campusesResponse.length;

        const postsCount = 0; 

        setStats({
          totalMajors: majorsCount,
          totalCampuses: campusesCount,
          totalPosts: postsCount,
          loading: false
        });

      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <StatsCard
          title="Majors"
          value={stats.loading ? 'Loading...' : stats.totalMajors.toString()}
          icon={GraduationCap}
          color="green"
        />
        <StatsCard
          title="Campuses"
          value={stats.loading ? 'Loading...' : stats.totalCampuses.toString()}
          icon={Building}
          color="purple"
        />
      </div>
      </div>
  );
};