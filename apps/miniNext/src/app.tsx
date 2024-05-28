import express from 'express';
import { routeMapper } from '@core/routeMapper';
let number = 0;
const app = express();
const port = 3000;
app.use(express.static('dist/public'));
routeMapper(app);

app.get('/number', (req, res) => {
  res.json({ number });
});

app.listen(port, () => {
  return console.log(`Server Start at http://localhost:${port} ☺️`);
});
