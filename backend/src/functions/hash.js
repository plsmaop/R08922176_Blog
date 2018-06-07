import bcrypt from 'bcryptjs';

export default {
  hashPassword: async function hashPassword(pwd) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pwd, salt);
  },
  matchPassword: async function matchPassword(pwd, hash) {
    const match = await bcrypt.compare(pwd, hash);
    return match;
  },
};
