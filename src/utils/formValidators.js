import * as Yup from 'yup'

export const validateLogin = () => {
  return Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .max(12, 'Maximum 12 characters')
      .required('Password is required'),
  })
}

export const validateUser = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  return Yup.object().shape({
    name: Yup.string().min(5, 'Minimum 6 characters').required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'too short')
      .max(10, 'too long')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    designation: Yup.string().required('Designation is required'),
    salary: Yup.string().required('Salary is required'),
  })
}
