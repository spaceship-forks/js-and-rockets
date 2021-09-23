import 'regenerator-runtime/runtime'

import { prepareData, renderData } from './solution';
import { fetchData } from './utils';

import { API } from './constants';

fetchData(API.PAST_LAUNCHES).then(data => {
  const preparedData = prepareData(data);
  renderData(preparedData)
})