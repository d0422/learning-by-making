import * as Page from '@/pages/index';
import { hydrate } from '@core/render';

hydrate(Page.default, document.getElementById('_miniNext'));
