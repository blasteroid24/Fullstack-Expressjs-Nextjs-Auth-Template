import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {console.log(`Server running at http://${HOST}:${PORT}`);});