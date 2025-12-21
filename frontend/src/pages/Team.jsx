import React from 'react';
import { Users, UserPlus, Mail, MoreVertical } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Project Manager', email: 'john@example.com', avatar: 'JD', color: 'purple' },
    { id: 2, name: 'Jane Smith', role: 'Developer', email: 'jane@example.com', avatar: 'JS', color: 'pink' },
    { id: 3, name: 'Mike Johnson', role: 'Designer', email: 'mike@example.com', avatar: 'MJ', color: 'blue' },
    { id: 4, name: 'Sarah Williams', role: 'QA Engineer', email: 'sarah@example.com', avatar: 'SW', color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              Team Members
            </h1>
            <p className="text-slate-400 mt-2">Manage your team and collaborate effectively</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
            <UserPlus className="w-5 h-5" />
            Invite Member
          </button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${member.color}-500 to-${member.color}-600 rounded-full flex items-center justify-center text-white font-bold`}>
                  {member.avatar}
                </div>
                <button className="text-slate-400 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-purple-400 text-sm mb-3">{member.role}</p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
