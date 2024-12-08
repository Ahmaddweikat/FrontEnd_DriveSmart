export const signUpValidationSchema = {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      required: true,
      minLength: 8,
      patterns: [
        { regex: /[A-Z]/, message: 'Must contain uppercase letter' },
        { regex: /[a-z]/, message: 'Must contain lowercase letter' },
        { regex: /[0-9]/, message: 'Must contain number' },
        { regex: /[!@#$%^&*]/, message: 'Must contain special character' }
      ]
    }
  };