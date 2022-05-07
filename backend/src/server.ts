import express from 'express';
import router from './routes';
import cors from 'cors';

const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))