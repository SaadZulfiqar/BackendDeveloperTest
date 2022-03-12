import 'dotenv/config';
import Express from 'express';
import Cors from 'cors';
import Admin from './routes/admin'

const app = Express();
app.use(Cors()); // Enable All CORS Requests
app.use(Express.json()); // It parses incoming requests with JSON payloads and is based on body-parser
app.use('/api/admin', Admin);

// Port number (reading port from .env file)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));