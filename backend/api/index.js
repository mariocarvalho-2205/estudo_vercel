import app from '../index.js';

export default async (req, res) => {
  try {
    await app(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};