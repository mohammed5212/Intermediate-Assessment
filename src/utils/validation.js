export const validateStudentForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
    errors.phone = 'Phone must be exactly 10 digits';
  }

  return errors;
};