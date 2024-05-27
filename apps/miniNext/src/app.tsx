import express from 'express';
import App from './pages/App';
import { createHTML } from '@core/createHTML';
import { getServerSidePropsFunction } from '@core/findServerSideProps';
let number = 0;
const app = express();
const port = 3000;
app.use(express.static('dist/public'));

app.get('/', async (req, res) => {
  const serverSideArray = await getServerSidePropsFunction();
  const propsObject = serverSideArray.find(
    (serverSideObject) => serverSideObject.pageName === 'App.js'
  );
  const serverSideProps = propsObject.serverSideFunction().props;

  const html = createHTML(App(serverSideProps), serverSideProps);
  res.send(html);
});

app.get('/number', (req, res) => {
  res.json({ number });
});

app.listen(port, () => {
  return console.log(`Server Start at http://localhost:${port} ☺️`);
});
