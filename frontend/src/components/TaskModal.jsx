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
                        className='bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full shadow-2xl relative p-6 overflow-hidden'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='relative z-10'>
                            <div className='flex justify-between items-center mb-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30'>
                                        <Save className='text-cyan-400 w-6 h-6' />
                                    </div>
                                    <div>
                                        <h2 className='text-2xl font-bold text-white'>
                                            Edit Task
                                        </h2>
                                        <p className='text-slate-400 text-sm'>Update your task details</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className='p-2 hover:bg-slate-800 rounded-lg transition-all text-slate-400 hover:text-slate-200'
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
                                            className='bg-red-500/10 border border-red-500/30 p-3.5 rounded-lg text-red-400 text-sm'
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-5">
                                    <div>
                                        <label className='block text-sm font-semibold text-slate-300 mb-2'>Task Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            value={taskData.title}
                                            onChange={handleChange}
                                            className='w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500'
                                            placeholder='Enter your task title...'
                                        />
                                    </div>

                                    <div>
                                        <label className='flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2'>
                                            <AlignLeft className='w-4 h-4 text-cyan-400' />
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            rows="4"
                                            onChange={handleChange}
                                            value={taskData.description}
                                            className='w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500'
                                            placeholder='Add details about your task...'
                                        />
                                    </div>

                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label className='flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2'>
                                                <Flag className='w-4 h-4 text-cyan-400' />
                                                Priority
                                            </label>
                                            <select
                                                name="priority"
                                                value={taskData.priority}
                                                onChange={handleChange}
                                                className='w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors'
                                            >
                                                <option value="Low" className='bg-slate-800'>Low Priority</option>
                                                <option value="Medium" className='bg-slate-800'>Medium Priority</option>
                                                <option value="High" className='bg-slate-800'>High Priority</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className='flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2'>
                                                <Calendar className='w-4 h-4 text-cyan-400' />
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                name="dueDate"
                                                required
                                                min={today}
                                                value={taskData.dueDate}
                                                onChange={handleChange}
                                                className='w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className='flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3'>
                                            <CheckCircle className='w-4 h-4 text-cyan-400' />
                                            Task Status
                                        </label>
                                        <div className='flex gap-3'>
                                            {[
                                                { val: 'Yes', label: 'Completed', color: 'green', icon: '✅' },
                                                { val: 'No', label: 'In Progress', color: 'amber', icon: '⏳' }
                                            ].map(({ val, label, color, icon }) => (
                                                <label
                                                    key={val}
                                                    className={`flex-1 flex items-center gap-2.5 p-3.5 rounded-lg border-2 transition-all cursor-pointer ${taskData.completed === val
                                                            ? color === 'green' ? 'border-green-500/50 bg-green-500/10' : 'border-amber-500/50 bg-amber-500/10'
                                                            : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
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
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    disabled={loading || !taskData.id}
                                    className='w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-600 hover:to-blue-700 transition-all'
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
