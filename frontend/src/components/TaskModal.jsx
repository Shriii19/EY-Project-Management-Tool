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
                    className='fixed inset-0 backdrop-blur-xl bg-black/60 z-50 flex items-center justify-center p-6'
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className='glass-dark border border-purple-500/30 rounded-3xl max-w-2xl w-full shadow-2xl relative p-8 overflow-hidden'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

                        <div className='relative z-10'>
                            <div className='flex justify-between items-center mb-8'>
                                <div className='flex items-center gap-4'>
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className='p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30'
                                    >
                                        <Save className='text-purple-400 w-7 h-7' />
                                    </motion.div>
                                    <div>
                                        <h2 className='text-3xl font-black text-white'>
                                            Edit Task
                                        </h2>
                                        <p className='text-gray-400 text-sm'>Update your task details</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className='p-3 hover:bg-red-500/10 rounded-2xl transition-all duration-300 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-500/30'
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
                                            className='glass p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm'
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="grid grid-cols-1 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label className='block text-sm font-bold text-gray-300 mb-3'>Task Title</label>
                                        <div className='glass p-4 rounded-xl border border-purple-500/30 focus-within:border-purple-400/60 transition-all duration-300'>
                                            <input
                                                type="text"
                                                name="title"
                                                required
                                                value={taskData.title}
                                                onChange={handleChange}
                                                className='w-full bg-transparent text-white text-lg font-semibold focus:outline-none placeholder:text-gray-500'
                                                placeholder='Enter your task title...'
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className='flex items-center gap-2 text-sm font-bold text-gray-300 mb-3'>
                                            <AlignLeft className='w-4 h-4 text-purple-400' />
                                            Description
                                        </label>
                                        <div className='glass p-4 rounded-xl border border-purple-500/30 focus-within:border-purple-400/60 transition-all duration-300'>
                                            <textarea
                                                name="description"
                                                rows="4"
                                                onChange={handleChange}
                                                value={taskData.description}
                                                className='w-full bg-transparent text-white resize-none focus:outline-none placeholder:text-gray-500'
                                                placeholder='Add details about your task...'
                                            />
                                        </div>
                                    </motion.div>

                                    <div className='grid grid-cols-2 gap-6'>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <label className='flex items-center gap-2 text-sm font-bold text-gray-300 mb-3'>
                                                <Flag className='w-4 h-4 text-purple-400' />
                                                Priority
                                            </label>
                                            <div className='glass p-4 rounded-xl border border-purple-500/30'>
                                                <select
                                                    name="priority"
                                                    value={taskData.priority}
                                                    onChange={handleChange}
                                                    className='w-full bg-transparent text-white font-semibold focus:outline-none'
                                                >
                                                    <option value="Low" className='bg-slate-800'>Low Priority</option>
                                                    <option value="Medium" className='bg-slate-800'>Medium Priority</option>
                                                    <option value="High" className='bg-slate-800'>High Priority</option>
                                                </select>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <label className='flex items-center gap-2 text-sm font-bold text-gray-300 mb-3'>
                                                <Calendar className='w-4 h-4 text-purple-400' />
                                                Due Date
                                            </label>
                                            <div className='glass p-4 rounded-xl border border-purple-500/30'>
                                                <input
                                                    type="date"
                                                    name="dueDate"
                                                    required
                                                    min={today}
                                                    value={taskData.dueDate}
                                                    onChange={handleChange}
                                                    className='w-full bg-transparent text-white font-semibold focus:outline-none'
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <label className='flex items-center gap-2 text-sm font-bold text-gray-300 mb-4'>
                                            <CheckCircle className='w-4 h-4 text-purple-400' />
                                            Task Status
                                        </label>
                                        <div className='flex gap-4'>
                                            {[
                                                { val: 'Yes', label: 'Completed', color: 'green', icon: '✅' },
                                                { val: 'No', label: 'In Progress', color: 'orange', icon: '⏳' }
                                            ].map(({ val, label, color, icon }) => (
                                                <motion.label
                                                    key={val}
                                                    whileHover={{ scale: 1.02 }}
                                                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${taskData.completed === val
                                                            ? `border-${color}-500/50 bg-${color}-500/10`
                                                            : 'border-gray-600/30 hover:border-gray-500/50 glass'
                                                        }`}
                                                >
                                                    <input
                                                        type='radio'
                                                        name='completed'
                                                        value={val}
                                                        checked={taskData.completed === val}
                                                        onChange={handleChange}
                                                        className={`h-5 w-5 border-2 rounded-full`}
                                                    />
                                                    <div>
                                                        <span className='text-white font-bold flex items-center gap-2'>
                                                            <span>{icon}</span>
                                                            {label}
                                                        </span>
                                                        <p className='text-xs text-gray-400 mt-1'>
                                                            {val === 'Yes' ? 'Task is completed' : 'Still working on it'}
                                                        </p>
                                                    </div>
                                                </motion.label>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.button
                                    type='submit'
                                    disabled={loading || !taskData.id}
                                    whileHover={{ scale: loading ? 1 : 1.02 }}
                                    whileTap={{ scale: loading ? 1 : 0.98 }}
                                    className='w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl transition-all duration-300 border border-purple-500/30 hover:shadow-purple-500/50'
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
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TaskModal
