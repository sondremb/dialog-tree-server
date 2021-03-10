import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));
const port = 8000; // default port to listen

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api', (req, res) => {
  res.send("Testing testing, I'm just suggesting");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
