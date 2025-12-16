import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, CheckCircle2, Filter, BarChart3, BookOpen } from 'lucide-react'

const HowToUse = () => {
  const steps = [
    {
      number: "01",
      icon: <Plus className="w-6 h-6" />,
      title: "Create Your First Task",
      description: "Click on any task card to edit and add your project details. Enter a title, description, set priority (High, Medium, Low), and choose a due date.",
      tips: [
        "Be specific with task titles",
        "Set realistic deadlines",
        "Use descriptions for additional context"
      ]
    },
    {
      number: "02",
      icon: <Edit2 className="w-6 h-6" />,
      title: "Organize & Prioritize",
      description: "Use the priority levels to categorize your tasks. High priority for urgent items, Medium for important tasks, and Low for tasks that can wait.",
      tips: [
        "Review priorities regularly",
        "Focus on high-priority items first",
        "Don't overload with high-priority tasks"
      ]
    },
    {
      number: "03",
      icon: <Filter className="w-6 h-6" />,
      title: "Filter Your Tasks",
      description: "Use the filter options to view specific task categories: All, Today, This Week, or filter by priority level to focus on what matters most.",
      tips: [
        "Use 'Today' filter for daily planning",
        "Weekly view for long-term planning",
        "Priority filters for focused work sessions"
      ]
    },
    {
      number: "04",
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Track Your Progress",
      description: "Mark tasks as complete by clicking the checkbox. Watch your completion rate grow and celebrate your productivity wins!",
      tips: [
        "Update task status regularly",
        "Review completed tasks weekly",
        "Celebrate small wins"
      ]
    },
    {
      number: "05",
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Monitor Analytics",
      description: "Check your dashboard statistics to see total tasks, completed items, and your overall completion rate. Use these insights to improve productivity.",
      tips: [
        "Track completion trends",
        "Identify productivity patterns",
        "Set personal improvement goals"
      ]
    }
  ]

  const quickTips = [
    "Use keyboard shortcuts for faster navigation",
    "Review and update tasks at the start of each day",
    "Break large projects into smaller, manageable tasks",
    "Set due dates for everything to stay on track",
    "Use the sidebar to quickly switch between views"
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Tutorial</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">How to Use </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ProTasker
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl">
            Follow this step-by-step guide to master task management and boost your productivity.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-6">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-cyan-400">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <div className="text-cyan-400">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>

                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <div className="text-sm font-semibold text-cyan-400 mb-2">Pro Tips:</div>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
            </div>
            Quick Productivity Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickTips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 rounded-lg p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Ready to start managing your tasks?</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

export default HowToUse
