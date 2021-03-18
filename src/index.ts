import express from 'express';
import cors from 'cors';
import { clickResponse } from './api_old';

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));
const port = 8000; // default port to listen

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/:id', (req, res) => {
  res.send(clickResponse(parseInt(req.params.id)));
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
