import validater from 'validator';

const validateEmail = (email: any): boolean => {
  return validater.isEmail(email);
};

export default validateEmail;
