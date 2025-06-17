import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
dotenv.config();

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});