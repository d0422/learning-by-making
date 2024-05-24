import express from 'express';
import App from './components/App';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log(<App />);
  res.send('Server On');
});

app.listen(port, () => {
  return console.log(`Server Start at http://localhost:${port} ☺️`);
});
