import {useState} from 'react';
import '../styles/projectForm.css';

const ProjectForm =({onSubmit, onCancel, initialData = null, isEdit = false}) =>{
  
  const [formData, setFormData] = useState({
    name : initialData?.name || '',
    description : initialData?.description || '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e)=>{
    const{name,value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
  });

  if(errors[name]){
    setErrors({
      ...errors,
      [name]: '',
    });
  }

};

//validate form
const validate =()=>{
  const newErrors = {};

  if(!formData.name.trim()){
    newErrors.name = 'Project name is required!';
  }
  else if(formData.name.trim().length<3){
    newErrors.name = 'Project name must be at least 3 characters';
  }
  else if(formData.name.trim().length>50){
    newErrors.name = 'Project name must be less than 50 characters';
  }

  if(formData.description && formData.description.length >200){
    newErrors.description = 'Description must be less than 200 characters';
  }

  return newErrors;

}

//handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();  // Stop page reload

  // Validate
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;  // Stop here if errors
  }

  // Submit
  setLoading(true);
  try {
    await onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
    });
  } catch (error) {
    console.error('Error:', error);
    setLoading(false);
  }
};


 return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{isEdit ? 'Edit Project' : 'Create New Project'}</h2>
          <button className="close-btn" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Project Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="Enter project name"
              autoFocus
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'input-error' : ''}
              placeholder="Enter project description (optional)"
              rows="4"
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : isEdit ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;