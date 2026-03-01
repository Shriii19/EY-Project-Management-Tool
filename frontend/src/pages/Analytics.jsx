import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, PieChart, AlertCircle } from 'lucide-react';
import { getTaskStats } from '../services/task.service';
import { getProjectStats } from '../services/project.service';
import Loading from '../components/Loading';

const Analytics = () => {
  const [stats, setStats] = useState({
    completionRate: 0,
    activeProjects: 0,
    tasksCompleted: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [taskStatsData, projectStatsData] = await Promise.all([
          getTaskStats(),
          getProjectStats(),
        ]);

        const total = taskStatsData?.total || 0;
        const completed = taskStatsData?.completed || 0;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        setStats({
          completionRate,
          activeProjects: projectStatsData?.active || 0,
          tasksCompleted: completed,
        });
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            Analytics &amp; Insights
          </h1>
          <p className="text-slate-400 mt-2">Track your project metrics and team performance</p>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center mb-8">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stats.completionRate}%</h3>
                <p className="text-slate-400 text-sm">Completion Rate</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stats.activeProjects}</h3>
                <p className="text-slate-400 text-sm">Active Projects</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <PieChart className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stats.tasksCompleted}</h3>
                <p className="text-slate-400 text-sm">Tasks Completed</p>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
              <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics Coming Soon</h3>
              <p className="text-slate-400">Detailed charts, reports, and insights will be available here.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;

