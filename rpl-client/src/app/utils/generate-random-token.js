import { v4 as uuidv4 } from 'uuid';

export const generateRandomToken = (length = 10) => {
  return uuidv4().replace(/-/g, '').slice(0, length)
};

