import { useState } from 'react';
import Modal from './Modal';
import { 
  FileText, 
  Calendar, 
  Flag, 
  Users, 
  AlertCircle,
  Check
} from 'lucide-react';

const CreateProjectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    teamMembers: []
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Available team members - ready for API integration
  const [availableTeamMembers, setAvailableTeamMembers] = useState([]);
  // TODO: Fetch from API
  // useEffect(() => {
  //   fetchTeamMembers().then(setAvailableTeamMembers);
  // }, []);

  const statusOptions = ['Active', 'On Hold', 'Completed'];
  const priorityOptions = ['Low', 'Medium', 'High'];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle team member selection
  const toggleTeamMember = (memberId) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.includes(memberId)
        ? prev.teamMembers.filter(id => id !== memberId)
        : [...prev.teamMembers, memberId]
    }));
  };

  // Handle field blur for validation
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  // Validate individual field
  const validateField = (field) => {
    let error = '';
    
    if (field === 'name' && !formData.name.trim()) {
      error = 'Project name is required';
    }
    
    if (field === 'startDate' && field === 'endDate') {
      if (formData.startDate && formData.endDate) {
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
          error = 'End date must be after start date';
        }
      }
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      description: true,
      startDate: true,
      endDate: true
    });

    if (validateForm()) {
      // Get team member details
      const selectedTeamMembers = availableTeamMembers.filter(
        member => formData.teamMembers.includes(member.id)
      );
      
      // TODO: Send data to backend API
      // createProject({ ...formData, teamMembers: selectedTeamMembers })
      //   .then(() => {
      //     handleClose();
      //   });
      
      // Reset form and close modal
      handleClose();
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      status: 'Active',
      startDate: '',
      endDate: '',
      priority: 'Medium',
      teamMembers: []
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  // Check if form is valid
  const isFormValid = formData.name.trim() !== '';

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Project"
      description="Fill in the details to create a new project"
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Project Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              placeholder="Enter project name"
              className={`w-full pl-11 pr-4 py-3 bg-gray-700/50 border ${
                touched.name && errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-purple-500'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
              aria-invalid={touched.name && errors.name ? 'true' : 'false'}
              aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
            />
          </div>
          {touched.name && errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description"
            rows={4}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Status and Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
            >
              {statusOptions.map(status => (
                <option key={status} value={status} className="bg-gray-800">
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {priorityOptions.map(priority => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priority }))}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all border ${
                    formData.priority === priority
                      ? getPriorityColor(priority)
                      : 'bg-gray-700/30 text-gray-400 border-gray-600 hover:bg-gray-700/50'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start and End Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-2">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                onBlur={() => handleBlur('startDate')}
                className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-2">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                onBlur={() => handleBlur('endDate')}
                className={`w-full pl-11 pr-4 py-3 bg-gray-700/50 border ${
                  touched.endDate && errors.endDate 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-purple-500'
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                aria-invalid={touched.endDate && errors.endDate ? 'true' : 'false'}
              />
            </div>
            {touched.endDate && errors.endDate && (
              <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Assign Team Members
          </label>
          {availableTeamMembers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                {availableTeamMembers.map(member => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleTeamMember(member.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      formData.teamMembers.includes(member.id)
                        ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                        : 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
                      {member.initials}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-white">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.role}</p>
                    </div>
                    {formData.teamMembers.includes(member.id) && (
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              {formData.teamMembers.length > 0 && (
                <p className="mt-2 text-sm text-gray-400">
                  {formData.teamMembers.length} member{formData.teamMembers.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500 bg-gray-700/20 rounded-lg border border-gray-600">
              <Users className="w-12 h-12 mb-2 opacity-50" />
              <p className="text-sm">No team members available</p>
              <p className="text-xs mt-1">Invite team members to assign them to projects</p>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-700/50">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 sm:flex-none px-6 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`flex-1 sm:flex-none px-8 py-3 font-medium rounded-lg transition-all ${
              isFormValid
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30 hover:scale-105'
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
            }`}
          >
            Create Project
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
