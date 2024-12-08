import { useState } from 'react';

export const useSignUpForm = (initialState = {}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    experience: '',
    licenseTypes: [],
    ...initialState
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        licenseTypes: checked
          ? [...prev.licenseTypes, value]
          : prev.licenseTypes.filter(type => type !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Basic validation
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (formData.licenseTypes.length === 0) {
      errors.licenseTypes = 'Please select at least one license type';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm();

    if (isValid) {
      console.log(formData);
    } else {
      console.error('Form validation failed', errors);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    validateForm
  };
};