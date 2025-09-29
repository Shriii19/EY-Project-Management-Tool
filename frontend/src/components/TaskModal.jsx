import React, { useCallback, useEffect, useState } from 'react'
import { DEFAULT_TASK } from '../assets/dummy'
import { AlignLeft, Calendar, CheckCircle, Flag, Save, X } from 'lucide-react' // Plus, PlusCircle removed - creation disabled

const API_BASE = 'http://localhost:4000/api/tasks'

const TaskModal = ({ isOpen, onClose, taskToEdit, onSave }) => {
    const [taskData, setTaskData] = useState(DEFAULT_TASK)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const today = new Date().toISOString().split('T')[0];

    // Block creation mode - only allow editing existing tasks
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
            // Block creation mode - close modal if no task to edit
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
        // Authentication removed - no token needed
        return {
            'Content-Type': 'application/json',
        }
    }, [])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        // Block task creation - only allow editing
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

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 backdrop-blur-lg bg-black/40 z-50 flex items-center justify-center p-6 animate-fadeIn'>
            <div className='glass-dark border border-blue-500/30 rounded-3xl max-w-2xl w-full shadow-2xl relative p-8 animate-slideUp'>
                <div className='flex justify-between items-center mb-8'>
                    <div className='flex items-center gap-4'>
                        <div className='p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30'>
                            <Save className='text-blue-400 w-6 h-6' />
                        </div>
                        <div>
                            <h2 className='text-3xl font-black text-white'>
                                Edit Task
                            </h2>
                            <p className='text-gray-400 text-sm'>Update your task details</p>
                        </div>
                    </div>

                    <button onClick={onClose} className='btn-hover p-3 hover:bg-red-500/10 rounded-2xl transition-all duration-300 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-500/30'>
                        <X className='w-6 h-6' />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    {error && (
                        <div className='glass p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm animate-fadeIn'>
                            {error}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className='block text-sm font-semibold text-gray-300 mb-3'>Task Title</label>
                            <div className='glass p-4 rounded-xl border border-blue-500/30 focus-within:border-blue-400/60 transition-all duration-300'>
                                <input 
                                    type="text" 
                                    name="title" 
                                    required 
                                    value={taskData.title} 
                                    onChange={handleChange} 
                                    className='w-full bg-transparent text-white text-lg font-medium focus:outline-none placeholder:text-gray-500' 
                                    placeholder='Enter your task title...' 
                                />
                            </div>
                        </div>

                        <div>
                            <label className='flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3'>
                                <AlignLeft className='w-4 h-4 text-blue-400' />
                                Description
                            </label>
                            <div className='glass p-4 rounded-xl border border-blue-500/30 focus-within:border-blue-400/60 transition-all duration-300'>
                                <textarea 
                                    name="description" 
                                    rows="4"
                                    onChange={handleChange} 
                                    value={taskData.description}
                                    className='w-full bg-transparent text-white resize-none focus:outline-none placeholder:text-gray-500'
                                    placeholder='Add details about your task...'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-6'>
                            <div>
                                <label className='flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3'>
                                    <Flag className='w-4 h-4 text-blue-400' />
                                    Priority
                                </label>
                                <div className='glass p-4 rounded-xl border border-blue-500/30'>
                                    <select 
                                        name="priority" 
                                        value={taskData.priority} 
                                        onChange={handleChange} 
                                        className='w-full bg-transparent text-white focus:outline-none'
                                    >
                                        <option value="Low" className='bg-slate-800'>Low Priority</option>
                                        <option value="Medium" className='bg-slate-800'>Medium Priority</option>
                                        <option value="High" className='bg-slate-800'>High Priority</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className='flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3'>
                                    <Calendar className='w-4 h-4 text-blue-400' />
                                    Due Date
                                </label>
                                <div className='glass p-4 rounded-xl border border-blue-500/30'>
                                    <input 
                                        type="date" 
                                        name="dueDate" 
                                        required 
                                        min={today} 
                                        value={taskData.dueDate} 
                                        onChange={handleChange} 
                                        className='w-full bg-transparent text-white focus:outline-none' 
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className='flex items-center gap-2 text-sm font-semibold text-gray-300 mb-4'>
                                <CheckCircle className='w-4 h-4 text-blue-400' />
                                Task Status
                            </label>
                            <div className='flex gap-6'>
                                {[
                                    { val: 'Yes', label: 'Completed', color: 'green' },
                                    { val: 'No', label: 'In Progress', color: 'orange' }
                                ].map(({ val, label, color }) => (
                                    <label key={val} className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                                        taskData.completed === val 
                                            ? `border-${color}-500/50 bg-${color}-500/10` 
                                            : 'border-gray-600/50 hover:border-gray-500/70'
                                    }`}>
                                        <input 
                                            type='radio' 
                                            name='completed' 
                                            value={val} 
                                            checked={taskData.completed === val} 
                                            onChange={handleChange} 
                                            className={`h-4 w-4 border-2 rounded-full text-${color}-500 focus:ring-${color}-500`}
                                        />
                                        <div>
                                            <span className='text-white font-medium'>{label}</span>
                                            <p className='text-xs text-gray-400 mt-1'>
                                                {val === 'Yes' ? 'Mark as completed' : 'Still working on it'}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button 
                        type='submit' 
                        disabled={loading || !taskData.id}
                        className='btn-hover w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transition-all duration-300 border border-blue-500/30'
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
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
        </div>
    )
}

export default TaskModal
