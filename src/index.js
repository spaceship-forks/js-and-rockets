import 'regenerator-runtime/runtime'

import solution from './solution';

const getData = async (url) => await (await fetch(url)).json();

getData('https://api.spacexdata.com/v3/launches/past').then(data => {
    const parsed = solution.prepareData(data);
    solution.renderData(parsed)
})