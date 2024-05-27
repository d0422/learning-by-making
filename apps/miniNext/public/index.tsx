import App from '../src/components/App';
import { hydrate } from '@core/render';

hydrate(<App />, document.getElementById('_miniNext'));
