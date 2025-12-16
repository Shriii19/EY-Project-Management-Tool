import React from 'react'
import { motion } from 'framer-motion'
import { Target, CheckCircle2, Clock, TrendingUp, Users, Zap } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal-Oriented",
      description: "Set clear objectives and track your progress towards achieving them."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Management",
      description: "Organize your tasks by priority and deadlines to maximize productivity."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor completion rates and celebrate your achievements."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics",
      description: "Get insights into your productivity patterns and improve over time."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User-Friendly",
      description: "Simple, intuitive interface designed for everyone."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Efficient",
      description: "Lightning-fast performance with instant updates and responses."
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">About Us</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ProTasker
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl">
            Your ultimate task management solution designed to boost productivity and help you achieve more.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            ProTasker was built with a simple mission: to help individuals and teams organize their work, 
            prioritize what matters, and accomplish their goals efficiently. We believe that productivity 
            shouldn't be complicated.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Our platform combines powerful features with an intuitive interface, making task management 
            accessible to everyone—from students managing assignments to professionals coordinating complex projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Why Choose ProTasker?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 w-fit mb-4">
                  <div className="text-cyan-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
            <div className="text-slate-400">Free to Use</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">Fast</div>
            <div className="text-slate-400">Performance</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-slate-400">Available</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Start organizing your tasks today and experience the difference that efficient task management can make.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
          >
            <Target className="w-5 h-5" />
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
