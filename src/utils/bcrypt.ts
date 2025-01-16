import bcrypt from 'bcryptjs';

export const hashPassword = async (password: any) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const verifyPassword = async (password: any, hashedPassword: any) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match; // true if passwords match, false otherwise
};
