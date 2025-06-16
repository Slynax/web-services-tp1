import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use('/', routes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
}); 