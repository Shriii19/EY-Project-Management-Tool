import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, PieChart, AlertCircle, Zap, Target, Clock } from 'lucide-react';
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

  const statCards = [
    {
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      glow: 'hover:shadow-green-500/20',
      bar: stats.completionRate,
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      icon: Activity,
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      glow: 'hover:shadow-blue-500/20',
      bar: Math.min(stats.activeProjects * 12, 100),
    },
    {
      label: 'Tasks Completed',
      value: stats.tasksCompleted,
      icon: PieChart,
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      glow: 'hover:shadow-purple-500/20',
      bar: Math.min(stats.tasksCompleted * 5, 100),
    },
  ];

  const upcomingFeatures = [
    { icon: BarChart3, title: 'Velocity Charts', desc: 'Sprint velocity and burn-down reports', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Target,   title: 'Goal Tracking',  desc: 'OKR and milestone progress visualization', color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
    { icon: Clock,    title: 'Time Reports',   desc: 'Time-tracking breakdowns per project',     color: 'text-green-400',  bg: 'bg-green-500/10'  },
    { icon: Zap,      title: 'Team Insights',  desc: 'Workload and productivity heatmaps',       color: 'text-pink-400',   bg: 'bg-pink-500/10'   },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="mb-10 animate-fade-in-down">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-purple-500/20 rounded-xl">
              <BarChart3 className="w-7 h-7 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold gradient-text-animated">
              Analytics &amp; Insights
            </h1>
          </div>
          <p className="text-slate-400 ml-[3.25rem]">
            Track your project metrics and team performance in real time
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center mb-8 flex flex-col items-center gap-3">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-1 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* ── Stats Grid ──────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className={`relative overflow-hidden ${card.bg} ${card.border} border backdrop-blur-xl rounded-2xl p-6 hover:scale-[1.04] hover:-translate-y-1 hover:shadow-2xl ${card.glow} transition-all duration-300 group animate-fade-in-up stagger-${i + 1}`}
                  >
                    {/* gradient top accent */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.gradient} rounded-t-2xl`} />
                    <div className="flex items-start justify-between mb-5">
                      <div className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-4xl font-extrabold text-white animate-count-up">
                        {card.value}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">
                      {card.label}
                    </p>
                    {/* mini progress bar */}
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-700`}
                        style={{ width: `${card.bar}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Upcoming Features Grid ──────────────────────── */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 gradient-border-top">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Advanced Analytics</h2>
                <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 tracking-wide">
                  Coming Soon
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-8 ml-[2.625rem]">
                Detailed charts, reports, and insights coming to your workspace.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingFeatures.map((feat) => {
                  const FIcon = feat.icon;
                  return (
                    <div
                      key={feat.title}
                      className="flex flex-col gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-purple-500/30 hover:bg-slate-800/70 transition-all duration-200 group/feat"
                    >
                      <div className={`w-10 h-10 ${feat.bg} rounded-lg flex items-center justify-center group-hover/feat:scale-110 transition-transform duration-200`}>
                        <FIcon className={`w-5 h-5 ${feat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white mb-0.5">{feat.title}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;

