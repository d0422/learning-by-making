import express from 'express';
import App from './components/App';
import { createHTML } from '@core/createHTML';

const app = express();
const port = 3000;
app.use(express.static('dist/public'));
app.get('/', (req, res) => {
  const html = createHTML(<App />);
  res.send(html);
});

app.listen(port, () => {
  return console.log(`Server Start at http://localhost:${port} ☺️`);
});
