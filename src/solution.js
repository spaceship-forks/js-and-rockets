import {
  checkDateFor2018LaunchYear,
  checkNASAPayload,
  sortByLaunchDate,
  sortByPayload
} from './utils';

const prepareData = (data) => data
  .filter(({ launch_date_utc, rocket: { second_stage: { payloads } }}) => {
    const is2018LaunchYearDate = checkDateFor2018LaunchYear(launch_date_utc);
    const payloadCustomers = payloads.map(({ customers }) => customers);
    const isNASAPayload = checkNASAPayload(payloadCustomers);
    return is2018LaunchYearDate && isNASAPayload;
  })
  .sort((a, b) => (sortByPayload(a, b) || sortByLaunchDate(a, b)))
  .map(({ flight_number, mission_name, rocket: { second_stage: { payloads } }}) => ({
    flight_number,
    mission_name,
    payloads_count: payloads.length
  }))
;

const renderData = (data) => {
  document.getElementById('out').innerHTML = JSON.stringify(data, null, '  ');
}

export {
  prepareData,
  renderData
};
