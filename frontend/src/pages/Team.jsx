import React, { useState } from 'react';
import { Users, UserPlus, Mail, MoreVertical, Shield, Star, Coffee } from 'lucide-react';

const Team = () => {
  // State for team members - ready for API integration
  const [teamMembers] = useState([]);

  const roleColors = {
    Admin:    { badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: Shield },
    Manager:  { badge: 'bg-blue-500/20   text-blue-300   border-blue-500/30',   icon: Star   },
    Developer:{ badge: 'bg-green-500/20  text-green-300  border-green-500/30',  icon: Coffee },
    Designer: { badge: 'bg-pink-500/20   text-pink-300   border-pink-500/30',   icon: Star   },
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in-down">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2.5 bg-purple-500/20 rounded-xl">
                <Users className="w-7 h-7 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold gradient-text-animated">Team Members</h1>
            </div>
            <p className="text-slate-400 ml-[3.25rem]">
              Manage your team and collaborate effectively
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:scale-95">
            <UserPlus className="w-5 h-5" />
            Invite Member
          </button>
        </div>

        {/* ── Member Cards / Empty State ───────────────────────── */}
        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => {
              const roleStyle = roleColors[member.role] ?? roleColors.Developer;
              const RoleIcon = roleStyle.icon;
              return (
                <div
                  key={member.id}
                  className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* subtle top gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-200">
                        {member.avatar || member.name?.[0] || '?'}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900" title="Online" />
                    </div>
                    <button className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${roleStyle.badge} mb-3`}>
                    <RoleIcon className="w-3 h-3" />
                    {member.role}
                  </span>

                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Empty State ──────────────────────────────────────── */
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-16 flex flex-col items-center text-center gradient-border-top">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-purple-400/60" />
              </div>
              {/* orbiting dots */}
              <span className="absolute top-1 right-1 w-4 h-4 bg-purple-500/40 rounded-full animate-ping" />
              <span className="absolute bottom-2 left-0 w-3 h-3 bg-pink-500/40 rounded-full animate-ping [animation-delay:0.4s]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No team members yet</h3>
            <p className="text-slate-400 text-sm mb-8 max-w-sm leading-relaxed">
              Build your dream team by inviting colleagues. Collaborate, assign tasks, and ship faster together.
            </p>
            <button className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:scale-95">
              <UserPlus className="w-5 h-5" />
              Invite Your First Team Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
