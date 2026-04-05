import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, PieChart, AlertCircle, CheckCircle2, Flame } from 'lucide-react';
import { getTaskStats } from '../services/task.service';
import { getProjectStats } from '../services/project.service';
import Loading from '../components/Loading';

/** SVG circular progress ring */
const CircleProgress = ({ value, size = 88, stroke = 7, color = '#a855f7' }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  );
};

/** Animated mini bar chart (CSS only) */
const MiniBarChart = ({ bars = [] }) => (
  <div className="flex items-end gap-1.5 h-14">
    {bars.map((h, i) => (
      <div
        key={i}
        className="flex-1 rounded-t bg-gradient-to-t from-purple-600 to-pink-500 opacity-80 hover:opacity-100 transition-all duration-300"
        style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }}
        title={`${h}%`}
      />
    ))}
  </div>
);

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
    <div className="min-h-screen bg-slate-950 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold gradient-text-animated flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-400 flex-shrink-0" />
              Analytics &amp; Insights
            </h1>
            <p className="text-slate-400 mt-2">Track your project metrics and team performance</p>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-semibold self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live data
          </span>
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

              {/* Completion Rate – with circular ring */}
              <div className="relative overflow-hidden bg-gradient-to-br from-green-900/40 to-slate-900/80 border border-green-500/20 rounded-2xl p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 group gradient-border-top">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Completion Rate</p>
                    <h3 className="text-4xl font-extrabold text-white">{stats.completionRate}<span className="text-2xl text-green-400">%</span></h3>
                    <p className="text-xs text-green-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Goal: 85%</p>
                  </div>
                  <div className="relative flex-shrink-0">
                    <CircleProgress value={stats.completionRate} color="#4ade80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: `${stats.completionRate}%`, transition: 'width 1.2s ease' }} />
                </div>
              </div>

              {/* Active Projects */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/40 to-slate-900/80 border border-blue-500/20 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 group gradient-border-top">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Active Projects</p>
                    <h3 className="text-4xl font-extrabold text-white">{stats.activeProjects}</h3>
                    <p className="text-xs text-blue-400 mt-1 flex items-center gap-1"><Activity className="w-3 h-3" /> In progress</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <MiniBarChart bars={[40, 65, 50, 80, 55, 90, 70, 85, 60, 75, 95, 65]} />
                <p className="text-xs text-slate-500 mt-2">Monthly project activity</p>
              </div>

              {/* Tasks Completed */}
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/40 to-slate-900/80 border border-purple-500/20 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group gradient-border-top">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Tasks Completed</p>
                    <h3 className="text-4xl font-extrabold text-white">{stats.tasksCompleted}</h3>
                    <p className="text-xs text-purple-400 mt-1 flex items-center gap-1"><Flame className="w-3 h-3" /> Keep it up!</p>
                  </div>
                  <div className="relative flex-shrink-0">
                    <CircleProgress value={Math.min(stats.tasksCompleted * 5, 100)} color="#a855f7" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${Math.min(stats.tasksCompleted * 5, 100)}%`, transition: 'width 1.2s ease' }} />
                </div>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-purple-900/20 border border-slate-700/60 rounded-2xl p-12 text-center gradient-border-top">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />
              <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-70" />
              <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics Coming Soon</h3>
              <p className="text-slate-400 mb-6">Detailed charts, burndown reports, velocity tracking and team insights.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Burndown Chart', 'Velocity Tracker', 'Sprint Reports', 'Team Heatmap', 'Forecast'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;

