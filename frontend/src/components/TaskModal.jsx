import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEFAULT_TASK } from '../assets/dummy'
import { AlignLeft, Calendar, CheckCircle, Flag, Save, X } from 'lucide-react'

const API_BASE = 'http://localhost:4000/api/tasks'

const TaskModal = ({ isOpen, onClose, taskToEdit, onSave }) => {
    const [taskData, setTaskData] = useState(DEFAULT_TASK)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (!isOpen) return;
        if (taskToEdit) {
            const normalized = taskToEdit.completed === 'Yes' || taskToEdit.completed === true ? 'Yes' : 'No';
            setTaskData({
                ...DEFAULT_TASK,
                title: taskToEdit.title || '',
                description: taskToEdit.description || '',
                priority: taskToEdit.priority || 'Low',
                dueDate: taskToEdit.dueDate?.split('T')[0] || '',
                completed: normalized,
                id: taskToEdit._id,
            });
        } else {
            setError('Task creation has been disabled');
            setTimeout(() => onClose(), 1000);
            return;
        }
        setError(null);
    }, [isOpen, taskToEdit, onClose]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    }, [])

    const getHeaders = useCallback(() => {
        return {
            'Content-Type': 'application/json',
        }
    }, [])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!taskData.id) {
            setError('Task creation has been disabled');
            return;
        }

        if (taskData.dueDate < today) {
            setError("Due Date cannot be in the past");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const url = `${API_BASE}/${taskData.id}/gp`;
            const resp = await fetch(url, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(taskData)
            });
            if (!resp.ok) {
                const err = await resp.json();
                throw new Error(err.message || 'Failed to save task');
            }
            const saved = await resp.json();
            onSave?.(saved);
            onClose();
        } catch (err) {
            console.error(err)
            setError(err.message || 'An error occurred while saving the task');
        } finally {
            setLoading(false);
        }
    }, [taskData, today, getHeaders, onSave, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 backdrop-blur-sm bg-black/60 z-50 flex items-center justify-center p-6'
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className='glass-dark border border-purple-500/30 rounded-3xl max-w-2xl w-full shadow-2xl relative p-8 overflow-hidden'
                        style={{
                            boxShadow: '0 0 60px rgba(168, 85, 247, 0.3)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='relative z-10'>
                            <div className='flex justify-between items-center mb-8'>
                                <div className='flex items-center gap-4'>
                                    <motion.div
                                        animate={{
                                            boxShadow: [
                                                '0 0 20px rgba(168, 85, 247, 0.5)',
                                                '0 0 30px rgba(236, 72, 153, 0.5)',
                                                '0 0 20px rgba(168, 85, 247, 0.5)'
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className='p-3 rounded-xl bg-purple-500/20 border border-purple-400/40'
                                    >
                                        <Save className='text-purple-400 w-6 h-6' />
                                    </motion.div>
                                    <div>
                                        <h2 className='text-3xl font-black text-white'>
                                            Edit Task
                                        </h2>
                                        <p className='text-gray-400 text-sm font-medium'>Update your task details</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className='p-2.5 rounded-xl transition-all text-gray-400 hover:text-purple-300 border border-transparent hover:border-purple-500/30'
                                >
                                    <X className='w-6 h-6' />
                                </motion.button>
                            </div>

                            <form onSubmit={handleSubmit} className='space-y-6'>
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className='glass border border-red-500/40 p-4 rounded-2xl text-red-400 text-sm font-bold'
                                            style={{
                                                boxShadow: '0 0 24px rgba(239, 68, 68, 0.2)'
                                            }}
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-6">
                                    <div>
                                        <label className='block text-sm font-bold text-white mb-3'>Task Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            value={taskData.title}
                                            onChange={handleChange}
                                            className='w-full glass border border-purple-500/30 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-500 font-medium'
                                            placeholder='Enter your task title...'
                                        />
                                    </div>

                                    <div>
                                        <label className='flex items-center gap-2 text-sm font-bold text-white mb-3'>
                                            <AlignLeft className='w-4 h-4 text-purple-400' />
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            rows="4"
                                            onChange={handleChange}
                                            value={taskData.description}
                                            className='w-full glass border border-purple-500/30 rounded-xl px-5 py-3.5 text-white resize-none focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-500 font-medium'
                                            placeholder='Add details about your task...'
                                        />
                                    </div>

                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label className='flex items-center gap-2 text-sm font-bold text-white mb-3'>
                                                <Flag className='w-4 h-4 text-purple-400' />
                                                Priority
                                            </label>
                                            <select
                                                name="priority"
                                                value={taskData.priority}
                                                onChange={handleChange}
                                                className='w-full glass border border-purple-500/30 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium'
                                            >
                                                <option value="Low" className='bg-gray-900'>Low Priority</option>
                                                <option value="Medium" className='bg-gray-900'>Medium Priority</option>
                                                <option value="High" className='bg-gray-900'>High Priority</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className='flex items-center gap-2 text-sm font-bold text-white mb-3'>
                                                <Calendar className='w-4 h-4 text-purple-400' />
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                name="dueDate"
                                                required
                                                min={today}
                                                value={taskData.dueDate}
                                                onChange={handleChange}
                                                className='w-full glass border border-purple-500/30 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className='flex items-center gap-2 text-sm font-bold text-white mb-3'>
                                            <CheckCircle className='w-4 h-4 text-purple-400' />
                                            Task Status
                                        </label>
                                        <div className='flex gap-3'>
                                            {[
                                                { val: 'Yes', label: 'Completed', color: 'green', icon: '✅' },
                                                { val: 'No', label: 'In Progress', color: 'amber', icon: '⏳' }
                                            ].map(({ val, label, color, icon }) => (
                                                <label
                                                    key={val}
                                                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${taskData.completed === val
                                                            ? color === 'green' ? 'border-green-500/50 glass' : 'border-amber-500/50 glass'
                                                            : 'border-purple-500/20 glass hover:border-purple-400/40'
                                                        }`}
                                                    style={taskData.completed === val ? {
                                                        boxShadow: color === 'green' ? '0 0 20px rgba(34, 197, 94, 0.2)' : '0 0 20px rgba(245, 158, 11, 0.2)'
                                                    } : {}}
                                                >
                                                    <input
                                                        type='radio'
                                                        name='completed'
                                                        value={val}
                                                        checked={taskData.completed === val}
                                                        onChange={handleChange}
                                                        className={`h-5 w-5 border-2 rounded-full accent-purple-500`}
                                                    />
                                                    <div>
                                                        <span className='text-white font-black flex items-center gap-2'>
                                                            <span>{icon}</span>
                                                            {label}
                                                        </span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type='submit'
                                    disabled={loading || !taskData.id}
                                    className='w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                                    style={{
                                        boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full"
                                            />
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className='w-5 h-5' />
                                            Update Task
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TaskModal
