import prisma from '../config/prisma.js';

const logErrorToDB = async (type, message, route) => {
  try {
    await prisma.log.create({data: {type,message,route}});
  } catch (err) {
    console.error('Logging failed:', err);
  }
};

export default logErrorToDB;